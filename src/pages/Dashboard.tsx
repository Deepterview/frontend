import DocumentsCard from "../components/dashboard/home/DocumentsCard";
import InterviewSetupCard from "../components/dashboard/home/InterviewSetupCard";
import StartSessionButton from "../components/dashboard/home/StartSessionButton";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div>
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#e1e2e7] mb-4">
          Configure Session
        </h2>
        <p className="text-[#cbc3d7] text-xl max-w-2xl leading-relaxed font-light">
          Define the intelligence parameters for your AI-driven interview.
        </p>
      </motion.section>

      {/* Configuration Grid */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <InterviewSetupCard />
        <DocumentsCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <StartSessionButton />
      </motion.div>
    </div>
  );
};

export default Dashboard;
