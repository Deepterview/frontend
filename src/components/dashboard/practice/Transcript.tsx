import { Send, Sparkles } from "lucide-react";

const Transcript = () => {
  return (
    <div className="space-y-6">
      {/* Input Area */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Sparkles size={18} className="text-[#cebdff]" />
        </div>
        <input
          type="text"
          placeholder="Type notes or ask AI for interview feedback..."
          className="w-full bg-[#191c1f] border border-[#494454]/20 rounded-full py-5 pl-14 pr-32 text-sm text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all outline-none"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-[#9b7fed] text-[#31057e] font-bold rounded-full text-xs uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all">
          Submit <Send size={14} />
        </button>
      </div>

      {/* Live Transcript Card */}
      <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10 shadow-[0_0_40px_0_rgba(206,189,255,0.05)]">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold">
            Live Transcript
          </h4>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#cebdff]/10 text-[#cebdff] text-[0.6rem] font-bold uppercase rounded-full border border-[#cebdff]/20">
              Confident
            </span>
            <span className="px-3 py-1 bg-[#7bd0ff]/10 text-[#7bd0ff] text-[0.6rem] font-bold uppercase rounded-full border border-[#7bd0ff]/20">
              Articulate
            </span>
          </div>
        </div>

        <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
          <div className="space-y-2">
            <p className="text-sm font-bold text-[#cebdff]">Interviewer:</p>
            <p className="text-[#e1e2e7]/80 leading-relaxed italic">
              "Can you walk me through your design process when tackling a
              complex navigation problem for a multi-platform application?"
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[#e1e2e7] leading-relaxed text-lg font-light">
              Absolutely. I usually start with an audit of the current
              architecture. For multi platform, the key is defining "core
              actions" that remain consistent while allowing the UI to adapt. In
              my last project at Dropbox, we used a tokenized system that
              prioritized mobile-first constraints
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Transcript;
