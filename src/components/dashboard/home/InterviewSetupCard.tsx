import { Sliders, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

const InterviewSetupCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#191c1f] rounded-3xl p-8 shadow-[0_0_40px_0_rgba(206,189,255,0.05)] border border-[#494454]/5"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#cebdff]/10 rounded-lg">
          <Sliders size={20} className="text-[#cebdff]" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">
          Interview Setup
        </h3>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 mb-3 font-semibold">
            Interview Scenario
          </label>
          <div className="relative group">
            <select className="w-full bg-[#0c0e12] border border-[#494454]/10 rounded-2xl py-4 px-5 text-[#e1e2e7] appearance-none focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all cursor-pointer outline-none">
              <option>Technical Architecture</option>
              <option>Behavioral Leadership</option>
              <option>Product Case Study</option>
              <option>Frontend Engineering</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#cbc3d7] group-hover:text-[#cebdff] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 mb-3 font-semibold">
              Target Company
            </label>
            <input
              type="text"
              className="w-full bg-[#0c0e12] border border-[#494454]/10 rounded-2xl py-4 px-5 text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all placeholder:text-[#cbc3d7]/20 outline-none"
              placeholder="e.g. Google, Stripe"
            />
          </div>
          <div>
            <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 mb-3 font-semibold">
              Open Position
            </label>
            <input
              type="text"
              className="w-full bg-[#0c0e12] border border-[#494454]/10 rounded-2xl py-4 px-5 text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all placeholder:text-[#cbc3d7]/20 outline-none"
              placeholder="e.g. Senior Architect"
            />
          </div>
        </div>

        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 mb-3 font-semibold">
            Core Objective
          </label>
          <textarea
            className="w-full bg-[#0c0e12] border border-[#494454]/10 rounded-2xl py-4 px-5 text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all placeholder:text-[#cbc3d7]/20 resize-none outline-none min-h-[120px]"
            placeholder="Describe what you want the AI to focus on during the evaluation..."
          />
        </div>
      </form>
    </motion.div>
  );
};

export default InterviewSetupCard;
