import { motion } from "framer-motion";

const EmotionAnalysis = () => {
  const metrics = [
    {
      label: "아이 컨택",
      value: "높음",
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "자신감 지수",
      value: "보통",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "긴장도",
      value: "낮음",
      color: "text-[#cebdff]",
      bg: "bg-[#cebdff]/10",
    },
  ];

  const bars = [40, 60, 80, 100, 70, 50, 40];

  return (
    <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10 h-full">
      <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold mb-8">
        실시간 감정 분석
      </h4>

      <div className="space-y-6 mb-12">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between">
            <span className="text-sm text-[#e1e2e7]/80">{m.label}</span>
            <span
              className={`px-3 py-1 ${m.bg} ${m.color} text-[0.6rem] font-bold uppercase rounded-full border border-current opacity-80`}
            >
              {m.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between h-32 gap-2">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex-1 bg-[#cebdff]/20 rounded-t-lg relative group"
          >
            <div className="absolute inset-0 bg-[#cebdff] opacity-0 group-hover:opacity-40 transition-opacity rounded-t-lg" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmotionAnalysis;
