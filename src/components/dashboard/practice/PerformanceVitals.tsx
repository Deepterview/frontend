type PerformanceVitalsProps = {
  smileRatio: number;
  headStability: number;
  dominantEmotion: string;
};

const PerformanceVitals = ({
  smileRatio,
  headStability,
  dominantEmotion,
}: PerformanceVitalsProps) => {
  const vitals = [
    {
      label: "미소 비율",
      value: `${smileRatio}%`,
      progress: smileRatio,
      color:
        "bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-500 shadow-[0_0_10px_rgba(22,163,74,0.2)]",
    },
    {
      label: "고개 안정성",
      value: `${headStability}%`,
      progress: headStability,
      color:
        "bg-gradient-to-r from-[#5b4423] via-[#8b6a2b] to-[#c08a32] shadow-[0_0_10px_rgba(192,138,50,0.16)]",
    },
    {
      label: "주요 감정 상태",
      value: dominantEmotion,
    },
  ];

  return (
    <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10 h-full">
      <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold mb-8">
        성과 지표 (LIVE)
      </h4>

      <div className="space-y-8">
        {vitals.map((v) => (
          <div key={v.label} className="space-y-3">
            <div className="flex justify-between text-[0.65rem] font-bold uppercase tracking-widest">
              <span className="text-[#cbc3d7]/60">{v.label}</span>
              <span className="text-[#e1e2e7]">{v.value}</span>
            </div>
            {v.progress !== undefined && (
              <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
                <div
                  className={`h-full ${v.color} rounded-full transition-all duration-300`}
                  style={{ width: `${v.progress}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceVitals;
