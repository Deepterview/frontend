type vitalsProps = {
  label?: string;
  value?: string;
  progress?: number;
  color?: string;
};
const PerformanceVitals = () => {
  const vitals: vitalsProps[] = [
    {
      label: "미소 비율",
      value: "92%",
      progress: 92,
      color:
        "bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-500 shadow-[0_0_10px_rgba(22,163,74,0.2)]",
    },
    {
      label: "고개 안정성",
      value: "60%",
      progress: 60,
      color:
        "bg-gradient-to-r from-[#5b4423] via-[#8b6a2b] to-[#c08a32] shadow-[0_0_10px_rgba(192,138,50,0.16)]",
    },
    {
      label: "주요 감정 상태",
      value: "중립",
    },
  ];

  return (
    <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10">
      <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold mb-8">
        성과 지표
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
                  className={`h-full ${v.color || "bg-[#7bd0ff]"} rounded-full transition-all duration-1000`}
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
