import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const StartSessionButton = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center py-20">
      <motion.button
        onClick={() => navigate("/dashboard/practice")}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 60px rgba(155, 127, 237, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        className="group relative px-14 py-6 bg-[#9b7fed] rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(155,127,237,0.2)] cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#cebdff] to-[#7bd0ff] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        <span className="flex items-center gap-5 text-[#31057e] font-black text-lg tracking-[0.25em]">
          세션 시작하기
          <ChevronRight
            size={24}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </span>
      </motion.button>
    </div>
  );
};

export default StartSessionButton;
