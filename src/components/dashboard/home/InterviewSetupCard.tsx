import { Sliders, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

type InterviewSetupCardProps = {
  scenario: string;
  targetCompany: string;
  openPosition: string;
  setScenario: (m: string) => void;
  setTargetCompany: (m: string) => void;
  setOpenPosition: (m: string) => void;
};
const InterviewSetupCard = ({
  scenario,
  targetCompany,
  openPosition,
  setScenario,
  setTargetCompany,
  setOpenPosition,
}: InterviewSetupCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#191c1f] rounded-3xl p-8 shadow-[0_0_40px_0_rgba(206,189,255,0.05)] border border-[#494454]/5 self-start"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#cebdff]/10 rounded-lg">
          <Sliders size={20} className="text-[#cebdff]" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">면접 설정</h3>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 mb-3 font-semibold">
            면접 시나리오
          </label>
          <div className="relative group">
            <select
              className="w-full bg-[#0c0e12] border border-[#494454]/10 rounded-2xl py-4 px-5 text-[#e1e2e7] appearance-none focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all cursor-pointer outline-none"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            >
              <option>기술 인터뷰 (코딩, 컴퓨터 공학 지식 관련 질문)</option>
              <option>행동 인터뷰 (팀워크, 갈등 해결, 리더십 관련 질문)</option>
              <option>
                인사 인터뷰 (성격, 지원 동기, 조직 문화 적합성 관련 질문)
              </option>
              <option>시스템 설계 인터뷰 (아키텍처, 확장성 관련 질문)</option>
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
              목표 기업
            </label>
            <input
              type="text"
              className="w-full bg-[#0c0e12] border border-[#494454]/10 rounded-2xl py-4 px-5 text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all placeholder:text-[#cbc3d7]/20 outline-none"
              placeholder="예: 구글, 스트라이프"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 mb-3 font-semibold">
              모집 분야
            </label>
            <input
              type="text"
              className="w-full bg-[#0c0e12] border border-[#494454]/10 rounded-2xl py-4 px-5 text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all placeholder:text-[#cbc3d7]/20 outline-none"
              placeholder="예: 시니어 아키텍트"
              value={openPosition}
              onChange={(e) => setOpenPosition(e.target.value)}
            />
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default InterviewSetupCard;
