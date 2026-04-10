import InterviewSetupCard from "../components/dashboard/home/InterviewSetupCard";
import Sidebar from "../components/dashboard/Sidebar";
import StartSessionButton from "../components/dashboard/home/StartSessionButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { motion } from "motion/react";
import DocumentsCard from "../components/dashboard/home/DocumentsCard";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <Header />
      <main className="ml-64 flex flex-col">
        {/* Sidebar (Left Navigation) */}
        <Sidebar />

        {/* Right Main Content Area */}
        <div className="mt-32 px-12 max-w-7xl w-full mx-auto flex-1">
          {/* Header Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mb-10">
            <InterviewSetupCard />
            <DocumentsCard />
          </div>

          <StartSessionButton />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
