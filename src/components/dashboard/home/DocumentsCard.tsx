import { FileText, Upload, X, FileCode } from "lucide-react";
import { motion } from "motion/react";

const DocumentsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-[#191c1f] rounded-3xl p-8 shadow-[0_0_40px_0_rgba(206,189,255,0.05)] border border-[#494454]/5 flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#cebdff]/10 rounded-lg">
          <FileText size={20} className="text-[#cebdff]" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight">문서</h3>
      </div>

      <div className="flex-1 flex flex-col">
        <motion.div
          whileHover={{ backgroundColor: "rgba(50, 53, 57, 0.2)" }}
          className="border-2 border-dashed border-[#494454]/20 rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer group mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-[#cebdff]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Upload size={28} className="text-[#cebdff]" />
          </div>
          <p className="text-[#e1e2e7] font-medium mb-1">
            여기에 파일을 드롭하세요
          </p>
          <p className="text-[#cbc3d7]/40 text-[0.75rem] max-w-[200px]">
            이력서 또는 직무 설명서를 업로드하세요 (PDF, DOCX)
          </p>
        </motion.div>

        <div className="space-y-4">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/70 font-semibold">
            업로드된 파일
          </p>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-4 bg-[#0c0e12] rounded-2xl border border-[#494454]/10 group hover:border-[#cebdff]/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-[#7bd0ff]/10 rounded-xl">
                <FileCode size={20} className="text-[#7bd0ff]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#e1e2e7]">
                  지원자_이력서.docx
                </p>
                <p className="text-[0.65rem] text-[#cbc3d7]/50 mt-0.5">
                  2.4 MB • 2분 전 업로드됨
                </p>
              </div>
            </div>
            <button className="text-[#cbc3d7]/30 hover:text-red-400 transition-colors p-1">
              <X size={18} />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentsCard;
