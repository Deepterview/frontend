import { AlertCircle, ArrowRight, Sparkles } from "lucide-react";

const AIInsight = () => {
  return (
    <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10">
      <div className="flex items-center gap-3 mb-6">
        {/* positive */}
        <Sparkles size={18} className="text-[#cebdff]" />
        <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold">
          AI Insight: Excellent Logic
        </h4>

        {/* negative */}
        {/* <AlertCircle size={18} className="text-rose-400" />
        <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-rose-400 font-bold">
          AI Insight: Needs More Detail
        </h4> */}
      </div>

      <p className="text-[#e1e2e7]/80 leading-relaxed text-sm mb-8 font-light italic">
        "Your response demonstrates strong logical structure and clear
        reasoning. To make it even more impactful, consider slowing down
        slightly during key transitions to better highlight your leadership and
        decision-making."
      </p>

      <button className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-[#cebdff] hover:gap-3 transition-all">
        View full analysis <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default AIInsight;
