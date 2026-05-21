import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import VideoFeed from "../../components/dashboard/practice/VideoFeed";
import Transcript from "../../components/dashboard/practice/Transcript";
import EmotionAnalysis from "../../components/dashboard/practice/EmotionAnalysis";
import PerformanceVitals from "../../components/dashboard/practice/PerformanceVitals";
// import AIInsight from "../../components/dashboard/practice/AIInsight";
import { useFaceAnalysis } from "../../hooks/useFaceAnalysis";

const PracticeLayout = () => {
  const location = useLocation();
  const sessionId = location.state?.sessionId;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const analysisResult = useFaceAnalysis(videoRef, isInterviewStarted);

  return (
    <motion.div
      className="grid grid-cols-12 gap-8 min-h-screen items-stretch"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      {/* Left Column - Video & Transcript */}
      <div className="col-span-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <VideoFeed
            ref={videoRef}
            sessionId={sessionId}
            onStartInterview={() => setIsInterviewStarted(true)}
            onEndInterview={() => setIsInterviewStarted(false)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Transcript isInterviewStarted={isInterviewStarted} />
        </motion.div>
      </div>

      {/* Right Column - Analytics */}
      <div className="col-span-4 flex flex-col gap-6 self-start">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="h-fit"
        >
          <EmotionAnalysis
            eyeContact={analysisResult.eyeContact}
            confidence={analysisResult.confidence}
            anxiety={analysisResult.anxiety}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="h-fit"
        >
          <PerformanceVitals
            smileRatio={analysisResult.smileRatio}
            headStability={analysisResult.headStability}
            dominantEmotion={analysisResult.dominantEmotion}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PracticeLayout;
