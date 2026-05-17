import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, Send, Sparkles } from "lucide-react";
import { answerService } from "../../../services/answerService";

interface Message {
  id: string;
  sender: "interviewer" | "user";
  text: string;
}

interface TranscriptProps {
  isInterviewStarted?: boolean;
}

const Transcript = ({ isInterviewStarted = false }: TranscriptProps) => {
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds countdown
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "interviewer",
      text: `"멀티 플랫폼 애플리케이션의 복잡한 내비게이션 문제를 해결할 때의 디자인 프로세스를 설명해주실 수 있나요?"`,
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the transcript when new answers appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Timer countdown logic
  useEffect(() => {
    if (!isInterviewStarted) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft, isInterviewStarted]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "ko-KR";

      rec.onresult = (event: any) => {
        let finalResult = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalResult += event.results[i][0].transcript;
          }
        }
        if (finalResult) {
          setInputText((prev) => prev + (prev ? " " : "") + finalResult);
        }
      };

      rec.onerror = (e: any) => {
        console.error("Speech recognition error:", e);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Safe helper to synthesize a 1-second silent audio WAV file
  const createSilentAudioBlob = (): Blob => {
    const sampleRate = 8000;
    const duration = 1;
    const numSamples = sampleRate * duration;
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    const writeString = (view: DataView, offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + numSamples * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, numSamples * 2, true);

    for (let i = 0; i < numSamples; i++) {
      view.setInt16(44 + i * 2, 0, true);
    }

    return new Blob([buffer], { type: "audio/wav" });
  };

  const toggleListening = async () => {
    if (!recognitionRef.current) {
      alert(
        "이 브라우저는 음성 인식을 지원하지 않습니다. Chrome 브라우저를 사용해 주세요.",
      );
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setIsListening(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;

        recognitionRef.current.start();

        audioChunksRef.current = [];
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.start();
        mediaRecorderRef.current = recorder;
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start voice capture:", err);
        alert("마이크 사용 권한을 허용해 주세요.");
      }
    }
  };

  // Handles auto-submitting when the 300s timer runs out
  const handleTimeout = async () => {
    const audioBlob = createSilentAudioBlob();
    try {
      const mockQuestionId = 1;
      const mockDurationSec = 300;

      await answerService.submitAnswer(
        mockQuestionId,
        mockDurationSec,
        "TIMEOUT",
        audioBlob,
      );

      // Append timeout message to the live transcript card
      const timeoutMessage: Message = {
        id: Math.random().toString(),
        sender: "user",
        text: "(시간 초과 - 답변 없음)",
      };

      setMessages((prev) => [...prev, timeoutMessage]);
      setInputText("");

      if (isListening) {
        toggleListening();
      }

      audioChunksRef.current = [];
      setTimeLeft(300); // Reset timer for the next question
    } catch (err) {
      console.error("Failed to auto-submit timeout answer:", err);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    let audioBlob: Blob;
    if (audioChunksRef.current.length > 0) {
      audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    } else {
      audioBlob = createSilentAudioBlob();
    }

    try {
      const mockQuestionId = 1;
      // Calculate actual time spent (e.g. if timeLeft is 285s, spent is 15s)
      const actualDurationSec = Math.max(1, 300 - timeLeft);

      await answerService.submitAnswer(
        mockQuestionId,
        actualDurationSec,
        "COMPLETED",
        audioBlob,
      );

      // Append typing/recording response to live transcript
      const newUserMessage: Message = {
        id: Math.random().toString(),
        sender: "user",
        text: inputText,
      };

      setMessages((prev) => [...prev, newUserMessage]);
      setInputText("");

      // Stop listening if active
      if (isListening) {
        toggleListening();
      }

      audioChunksRef.current = [];
      setTimeLeft(300); // Reset timer back to 300 for the next question
    } catch (err) {
      console.error("Failed to submit answer:", err);
      alert("답변을 전송하는 데 실패했습니다. 네트워크 상태를 확인해 주세요.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Input & Voice Control Area */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Sparkles size={18} className="text-[#cebdff]" />
        </div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            isListening
              ? "말씀해 주세요... 실시간으로 받아적고 있습니다..."
              : "메모를 입력하거나 AI에게 면접 피드백을 요청하세요..."
          }
          className="w-full bg-[#191c1f] border border-[#494454]/20 rounded-full py-5 pl-14 pr-48 text-sm text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all outline-none"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Voice input button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleListening}
            className={`p-3 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
              isListening
                ? "bg-red-500 text-white border-red-400/30 animate-pulse"
                : "bg-white/5 text-[#cebdff] hover:bg-white/10 border-white/10"
            }`}
            title={isListening ? "음성 인식 중지" : "음성 인식 시작"}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </motion.button>

          {/* Submit button */}
          <button
            type="submit"
            className="px-6 py-3 bg-[#9b7fed] text-[#31057e] font-bold rounded-full text-xs uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer"
          >
            제출 <Send size={14} />
          </button>
        </div>
      </form>

      {/* Live Transcript Card */}
      <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10 shadow-[0_0_40px_0_rgba(206,189,255,0.05)]">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold">
            실시간 대화록
          </h4>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#cebdff]/10 text-[#cebdff] text-[0.6rem] font-bold uppercase rounded-full border border-[#cebdff]/20">
              {timeLeft}s
            </span>
          </div>
        </div>

        <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-2">
              <p
                className={`text-sm font-bold ${
                  msg.sender === "interviewer"
                    ? "text-[#cebdff]"
                    : "text-emerald-400"
                }`}
              >
                {msg.sender === "interviewer" ? "면접관:" : "나 (답변):"}
              </p>
              <p
                className={`leading-relaxed ${
                  msg.sender === "interviewer"
                    ? "text-[#e1e2e7]/80 italic"
                    : "text-[#e1e2e7] text-lg font-light"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Transcript;
