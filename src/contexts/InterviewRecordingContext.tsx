import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface InterviewRecordingContextValue {
  isRecording: boolean;
  startRecorder: (stream: MediaStream) => void;
  stopRecorder: () => Promise<void>;
  markQuestionStart: () => void;
  extractAnswerBlob: () => Blob | null;
  extractFullInterviewBlob: () => Blob | null;
  getMimeType: () => string;
}

const InterviewRecordingContext = createContext<InterviewRecordingContextValue | null>(
  null,
);

function resolveMimeType(): string {
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  for (const mimeType of candidates) {
    if (MediaRecorder.isTypeSupported(mimeType)) {
      return mimeType;
    }
  }
  return "video/webm";
}

export function InterviewRecordingProvider({ children }: { children: ReactNode }) {
  const allChunksRef = useRef<Blob[]>([]);
  const chunkCountRef = useRef(0);
  const questionStartChunkIndexRef = useRef(0);
  const mimeTypeRef = useRef(resolveMimeType());
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const stopResolverRef = useRef<(() => void) | null>(null);

  const [isRecording, setIsRecording] = useState(false);

  const markQuestionStart = useCallback(() => {
    questionStartChunkIndexRef.current = chunkCountRef.current;
  }, []);

  const startRecorder = useCallback((stream: MediaStream) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      return;
    }

    allChunksRef.current = [];
    chunkCountRef.current = 0;
    questionStartChunkIndexRef.current = 0;
    mimeTypeRef.current = resolveMimeType();

    const recorder = new MediaRecorder(stream, { mimeType: mimeTypeRef.current });

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        allChunksRef.current.push(event.data);
        chunkCountRef.current += 1;
      }
    };

    recorder.onerror = (event) => {
      console.error("MediaRecorder error:", event);
    };

    recorder.start(1000);
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    markQuestionStart();
  }, [markQuestionStart]);

  const stopRecorder = useCallback(() => {
    return new Promise<void>((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        setIsRecording(false);
        resolve();
        return;
      }

      stopResolverRef.current = resolve;
      recorder.onstop = () => {
        stopResolverRef.current?.();
        stopResolverRef.current = null;
        mediaRecorderRef.current = null;
        setIsRecording(false);
      };
      recorder.stop();
    });
  }, []);

  const extractAnswerBlob = useCallback((): Blob | null => {
    const start = questionStartChunkIndexRef.current;
    const end = chunkCountRef.current;
    if (end <= start) {
      return null;
    }
    const chunks = allChunksRef.current.slice(start, end);
    if (chunks.length === 0) {
      return null;
    }
    return new Blob(chunks, { type: mimeTypeRef.current });
  }, []);

  const extractFullInterviewBlob = useCallback((): Blob | null => {
    if (allChunksRef.current.length === 0) {
      return null;
    }
    return new Blob(allChunksRef.current, { type: mimeTypeRef.current });
  }, []);

  const getMimeType = useCallback(() => mimeTypeRef.current, []);

  const value = useMemo(
    () => ({
      isRecording,
      startRecorder,
      stopRecorder,
      markQuestionStart,
      extractAnswerBlob,
      extractFullInterviewBlob,
      getMimeType,
    }),
    [
      isRecording,
      startRecorder,
      stopRecorder,
      markQuestionStart,
      extractAnswerBlob,
      extractFullInterviewBlob,
      getMimeType,
    ],
  );

  return (
    <InterviewRecordingContext.Provider value={value}>
      {children}
    </InterviewRecordingContext.Provider>
  );
}

export function useInterviewRecording() {
  const context = useContext(InterviewRecordingContext);
  if (!context) {
    throw new Error("useInterviewRecording must be used within InterviewRecordingProvider");
  }
  return context;
}
