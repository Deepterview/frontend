import { motion } from "framer-motion";

type EmotionAnalysisProps = {
  eyeContact: number;
  confidence: number;
  anxiety: number;
};

const EmotionAnalysis = ({
  eyeContact,
  confidence,
  anxiety,
}: EmotionAnalysisProps) => {
  const getColorData = (value: number, type: "eye" | "conf" | "anx") => {
    if (type === "anx") {
      if (value > 60) return { color: "text-red-400", bg: "bg-red-400/10" };
      if (value > 30) return { color: "text-yellow-400", bg: "bg-yellow-400/10" };
      return { color: "text-green-400", bg: "bg-green-400/10" };
    }
    if (value > 70) return { color: "text-green-400", bg: "bg-green-400/10" };
    if (value > 40) return { color: "text-yellow-400", bg: "bg-yellow-400/10" };
    return { color: "text-red-400", bg: "bg-red-400/10" };
  };

  const metrics = [
    { label: "아이 컨택", value: eyeContact, ...getColorData(eyeContact, "eye") },
    { label: "자신감 지수", value: confidence, ...getColorData(confidence, "conf") },
    { label: "긴장도", value: anxiety, ...getColorData(anxiety, "anx") },
  ];

  // Visualizing anxiety/stress levels with bars
  const bars = [
    anxiety,
    Math.max(20, anxiety * 0.8),
    Math.max(30, confidence * 0.5),
    Math.max(10, eyeContact * 0.2),
    Math.max(25, anxiety * 0.6),
    anxiety * 0.4,
    Math.max(15, confidence * 0.3),
  ];

  return (
    <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10 h-full flex flex-col">
      <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold mb-8">
        실시간 감정 분석 (LIVE)
      </h4>

      <div className="space-y-6 mb-12">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-sm text-[#e1e2e7]/80">{m.label}</span>
            <span
              className={`px-3 py-1 ${m.bg} ${m.color} text-[0.7rem] font-mono font-bold rounded-full border border-current opacity-80 transition-all duration-300`}
            >
              {m.value}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between h-32 gap-2 mt-auto">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: `${Math.max(10, h)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`flex-1 ${anxiety > 50 ? "bg-red-500/30" : "bg-[#cebdff]/20"} rounded-t-lg relative group transition-colors duration-500`}
          >
            <div className={`absolute inset-0 ${anxiety > 50 ? "bg-red-500" : "bg-[#cebdff]"} opacity-0 group-hover:opacity-40 transition-opacity rounded-t-lg`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmotionAnalysis;
