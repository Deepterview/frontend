import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, VibrateOff, VideoOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface VideoFeedProps {
  onStartInterview?: () => void;
  onEndInterview?: () => void;
}

const VideoFeed = forwardRef<HTMLVideoElement, VideoFeedProps>(
  ({ onStartInterview, onEndInterview }, ref) => {
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const navigate = useNavigate();

    // Dynamic live recording timer
    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      if (isRecording) {
        setRecordingTime(0);
        interval = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } else {
        setRecordingTime(0);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isRecording]);

    const formatTime = (seconds: number) => {
      const hrs = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, "0");
      const mins = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${hrs}:${mins}:${secs}`;
    };

    useEffect(() => {
      let activeStream: MediaStream | null = null;

      async function setupCamera() {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          activeStream = mediaStream;
          setStream(mediaStream);
          if (ref && "current" in ref && ref.current) {
            ref.current.srcObject = mediaStream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      }

      setupCamera();

      return () => {
        // 1. Stop recorder and save if active during unmount
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
        }

        // 2. Stop camera stream tracks
        if (activeStream) {
          activeStream.getTracks().forEach((track) => track.stop());
        }

        // Notify parent layout that interview ended on unmount
        if (onEndInterview) {
          onEndInterview();
        }
      };
    }, []);

    const startRecording = () => {
      if (!stream) {
        alert("카메라 스트림을 준비 중입니다. 잠시 후 다시 시 độ해 주세요.");
        return;
      }

      chunksRef.current = [];

      // Dynamically choose supported container, prefer mp4 container
      let options = { mimeType: "video/mp4" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: "video/webm;codecs=h264" };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: "video/webm;codecs=vp9" };
          if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: "video/webm" };
          }
        }
      }

      try {
        const recorder = new MediaRecorder(stream, options);

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        recorder.onstop = () => {
          if (chunksRef.current.length === 0) return;
          const blob = new Blob(chunksRef.current, {
            type: recorder.mimeType || "video/mp4",
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style.display = "none";
          a.href = url;
          // Saved as .mp4
          const timestamp = new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/:/g, "-");
          a.download = `deepterview_practice_${timestamp}.mp4`;
          a.click();

          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          }, 100);
        };

        recorder.start(1000); // chunk every 1 second
        mediaRecorderRef.current = recorder;
        setIsRecording(true);

        // Notify parent layout that interview started
        if (onStartInterview) {
          onStartInterview();
        }
      } catch (err) {
        console.error("Failed to start MediaRecorder:", err);
        alert("녹화를 시작할 수 없습니다. 카메라/마이크 권한을 확인하세요.");
      }
    };

    const stopRecordingAndNavigate = () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        const originalOnStop = mediaRecorderRef.current.onstop;

        // Override onstop to trigger download AND navigate
        mediaRecorderRef.current.onstop = (e) => {
          if (originalOnStop) {
            originalOnStop.call(mediaRecorderRef.current, e);
          }
          if (onEndInterview) {
            onEndInterview();
          }
          navigate("/dashboard/analytics");
        };

        mediaRecorderRef.current.stop();
      } else {
        if (onEndInterview) {
          onEndInterview();
        }
        navigate("/dashboard/analytics");
      }
      setIsRecording(false);
    };

    return (
      <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-[#111417] shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        {/* Video Element */}
        <video
          ref={ref}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoOn ? "opacity-100" : "opacity-0"}`}
        />

        {!isVideoOn && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#191c1f]">
            <div className="w-32 h-32 rounded-full bg-[#cebdff]/10 flex items-center justify-center">
              <VideoOff size={48} className="text-[#cebdff]/40" />
            </div>
          </div>
        )}

        {/* Overlay Info */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 backdrop-blur-md rounded-full border border-red-500/30">
            <div
              className={`w-2 h-2 rounded-full bg-red-500 ${isRecording ? "animate-pulse" : ""}`}
            />
            <span className="text-[0.65rem] font-bold text-red-500 uppercase tracking-widest">
              {isRecording ? "라이브 녹화 중" : "라이브 세션"}
            </span>
          </div>
          <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-[0.65rem] font-mono text-white/80">
              {formatTime(recordingTime)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            disabled={isRecording}
            className={`px-6 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
              isRecording
                ? "bg-[#191c1f] text-emerald-400 border border-emerald-500/30 shadow-none cursor-not-allowed opacity-80"
                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50"
            }`}
          >
            <Play
              size={20}
              fill={isRecording ? "none" : "currentColor"}
              className={isRecording ? "animate-pulse text-emerald-400" : ""}
            />
            <span className="text-xs uppercase tracking-wider">
              {isRecording ? "Recording..." : "면접 시작 (Start)"}
            </span>
          </motion.button>

          {/* Stop (End Session) Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 hover:shadow-red-500/50 cursor-pointer"
            onClick={stopRecordingAndNavigate}
          >
            <VibrateOff size={24} />
          </motion.button>
        </div>
      </div>
    );
  },
);

export default VideoFeed;
