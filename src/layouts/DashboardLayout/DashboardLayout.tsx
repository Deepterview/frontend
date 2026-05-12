import { motion } from "framer-motion";
import InterviewSetupCard from "../../components/dashboard/home/InterviewSetupCard";
import DocumentsCard from "../../components/dashboard/home/DocumentsCard";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const DashboardLayout = () => {
  const [scenario, setScenario] = useState("기술 인터뷰");
  const [targetCompany, setTargetCompany] = useState("");
  const [openPosition, setOpenPosition] = useState("");
  const [objective, setObjective] = useState<File[] | null>(null);

  const printConsole = () => {
    console.log({
      scenario,
      targetCompany,
      openPosition,
      objective,
    });
  };
  // const handleCreateSession = async () => {
  //   try {
  //     const formData = new FormData();

  //     formData.append("scenario", scenario);
  //     formData.append("targetCompany", targetCompany);
  //     formData.append("openPosition", openPosition);

  //     if (objective && objective.length > 0) {
  //       objective.forEach((file) => {
  //         formData.append("objective", file);
  //       });
  //     }

  //     const response = await fetch("/api/v1/sessions", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to create session");
  //     }

  //     const data = await response.json();

  //     console.log("Session created:", data);
  //   } catch (error) {
  //     console.error("API Error:", error);
  //   }
  // };

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
          세션 설정
        </h2>
        <p className="text-[#cbc3d7] text-xl max-w-2xl leading-relaxed font-light">
          AI 기반 면접을 위한 지능형 설정을 정의하세요.
        </p>
      </motion.section>

      {/* Configuration Grid */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <InterviewSetupCard
          scenario={scenario}
          targetCompany={targetCompany}
          openPosition={openPosition}
          setScenario={setScenario}
          setTargetCompany={setTargetCompany}
          setOpenPosition={setOpenPosition}
        />
        <DocumentsCard objective={objective} setObjective={setObjective} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <div className="flex justify-center py-20">
          <motion.button
            onClick={printConsole}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(155, 127, 237, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-14 py-6 bg-[#9b7fed] rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(155,127,237,0.2)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#cebdff] to-[#7bd0ff] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="flex items-center gap-5 text-[#31057e] font-black text-lg tracking-[0.25em]">
              <span>세션 시작하기</span>
              <ChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
