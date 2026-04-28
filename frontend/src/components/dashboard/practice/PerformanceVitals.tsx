import React from "react";

const PerformanceVitals = () => {
  const vitals = [
    { label: "시선 안정성", value: "94%", progress: 94 },
    { label: "말하기 속도", value: "138 WPM", progress: 65 },
    {
      label: "불필요한 추임새 횟수",
      value: "2회 (낮음)",
      progress: 20,
      color: "bg-red-400/30",
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
            <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
              <div
                className={`h-full ${v.color || "bg-[#7bd0ff]"} rounded-full transition-all duration-1000`}
                style={{ width: `${v.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceVitals;
