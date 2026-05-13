import { Sliders, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { jobCategoryService } from "../../../services/jobCategoryService";

type InterviewSetupCardProps = {
  scenario: string;
  targetCompany: string;
  openPosition: string;
  setScenario: (m: string) => void;
  setTargetCompany: (m: string) => void;
  setOpenPosition: (m: string) => void;
};

type JobCategory = {
  id: number;
  name: string;
};

const InterviewSetupCard = ({
  scenario,
  targetCompany,
  openPosition,
  setScenario,
  setTargetCompany,
  setOpenPosition,
}: InterviewSetupCardProps) => {
  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);

  useEffect(() => {
    const fetchJobCategories = async () => {
      const data = await jobCategoryService.getJobCategories();
      setJobCategories(data);
    };

    fetchJobCategories();
  }, []);

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
            </select>
            <ChevronDown
              size={18}
              className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#cbc3d7] group-hover:text-[#cebdff] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-3">
            <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 font-semibold">
              경력 연차
            </label>

            <div className="relative group">
              <select
                className="w-full h-[58px] bg-[#0c0e12] border border-[#494454]/10 rounded-2xl px-5 text-[#e1e2e7] appearance-none focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all cursor-pointer outline-none"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
              >
                <option value="0-1 years">0~1년</option>
                <option value="1-3 years">1~3년</option>
                <option value="3+ years">3년 이상</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#cbc3d7] group-hover:text-[#cebdff] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 font-semibold">
              모집 포지션
            </label>

            <div className="relative group">
              <select
                className="w-full h-[58px] bg-[#0c0e12] border border-[#494454]/10 rounded-2xl px-5 text-[#e1e2e7] appearance-none focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all cursor-pointer outline-none"
                value={openPosition}
                onChange={(e) => {
                  setOpenPosition(e.target.value);
                  const job = jobCategories.find(
                    (v) => v.name === e.target.value,
                  );
                  console.log({ job });
                }}
              >
                {jobCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={18}
                className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#cbc3d7] group-hover:text-[#cebdff] transition-colors"
              />
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default InterviewSetupCard;
