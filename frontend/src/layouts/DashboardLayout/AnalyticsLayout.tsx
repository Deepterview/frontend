import { motion } from "framer-motion";
import AnalyticsHeader from "../../components/dashboard/Analytics/AnalyticsHeader";
import TranscriptItem from "../../components/dashboard/Analytics/TranscriptItem";
import { MOCK_SESSIONS } from "../../mocks/data";

const session = MOCK_SESSIONS[0];
const AnalyticsLayout = () => {
  return (
    <div className="max-w-6xl mx-auto pb-32">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <AnalyticsHeader
          company={session.company}
          role={session.role}
          date={session.date}
          duration={session.duration}
          score={session.score}
        />
      </motion.div>

      {/* Transcript List */}
      <motion.div
        className="space-y-8 mt-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {session.qaPairs.map((pair) => (
          <TranscriptItem key={pair.id} pair={pair} />
        ))}
      </motion.div>
    </div>
  );
};

export default AnalyticsLayout;
