import { motion } from "framer-motion";
import VideoFeed from "../../components/dashboard/practice/VideoFeed";
import Transcript from "../../components/dashboard/practice/Transcript";
import EmotionAnalysis from "../../components/dashboard/practice/EmotionAnalysis";
import PerformanceVitals from "../../components/dashboard/practice/PerformanceVitals";
import AIInsight from "../../components/dashboard/practice/AIInsight";

const PracticeLayout = () => {
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
          <VideoFeed />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Transcript />
        </motion.div>
      </div>

      {/* Right Column - Analytics */}
      <div className="col-span-4 space-y-8 flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex-1"
        >
          <EmotionAnalysis />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex-1"
        >
          <PerformanceVitals />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="flex-1"
        >
          <AIInsight />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PracticeLayout;
