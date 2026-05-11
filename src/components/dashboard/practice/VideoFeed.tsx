import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, VibrateOff, Video, VideoOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }

    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !isMicOn));
      setIsMicOn(!isMicOn);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => (track.enabled = !isVideoOn));
      setIsVideoOn(!isVideoOn);
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden bg-[#111417] shadow-[0_0_50px_rgba(0,0,0,0.3)]">
      {/* Video Element */}
      <video
        ref={videoRef}
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
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[0.65rem] font-bold text-red-500 uppercase tracking-widest">
            라이브 세션
          </span>
        </div>
        <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-[0.65rem] font-mono text-white/80">
            00:14:52
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMic}
          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
            isMicOn
              ? "bg-white/10 text-white border border-white/20"
              : "bg-red-500 text-white"
          }`}
        >
          {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 cursor-pointer"
          onClick={() => {
            navigate("/dashboard/analytics");
          }}
        >
          <VibrateOff size={28} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleVideo}
          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer ${
            isVideoOn
              ? "bg-white/10 text-white border border-white/20"
              : "bg-red-500 text-white"
          }`}
        >
          {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
        </motion.button>
      </div>
    </div>
  );
};

export default VideoFeed;
