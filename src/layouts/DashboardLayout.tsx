import InterviewSetupCard from "../components/dashboard/home/InterviewSetupCard";
import Sidebar from "../components/dashboard/Sidebar";
import StartSessionButton from "../components/dashboard/home/StartSessionButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion } from "framer-motion";
import DocumentsCard from "../components/dashboard/home/DocumentsCard";

const DashboardLayout = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#05070a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Header />
      <motion.main
        className="ml-64 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Sidebar (Left Navigation) */}
        <Sidebar />

        {/* Right Main Content Area */}
        <div className="mt-32 px-12 max-w-7xl w-full mx-auto flex-1">
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
      </motion.main>
      <Footer />
    </motion.div>
  );
};

export default DashboardLayout;
