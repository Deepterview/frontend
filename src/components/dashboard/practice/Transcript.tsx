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
          placeholder="메모를 입력하거나 AI에게 면접 피드백을 요청하세요..."
          className="w-full bg-[#191c1f] border border-[#494454]/20 rounded-full py-5 pl-14 pr-32 text-sm text-[#e1e2e7] focus:ring-2 focus:ring-[#cebdff]/20 focus:border-[#cebdff]/30 transition-all outline-none"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-[#9b7fed] text-[#31057e] font-bold rounded-full text-xs uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all">
          제출 <Send size={14} />
        </button>
      </div>

      {/* Live Transcript Card */}
      <div className="bg-[#191c1f] rounded-[2rem] p-8 border border-[#494454]/10 shadow-[0_0_40px_0_rgba(206,189,255,0.05)]">
        <div className="flex items-center justify-between mb-8">
          <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-[#cbc3d7]/60 font-bold">
            실시간 대화록
          </h4>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#cebdff]/10 text-[#cebdff] text-[0.6rem] font-bold uppercase rounded-full border border-[#cebdff]/20">
              자신감 있음
            </span>
            <span className="px-3 py-1 bg-[#7bd0ff]/10 text-[#7bd0ff] text-[0.6rem] font-bold uppercase rounded-full border border-[#7bd0ff]/20">
              또렷한 전달력
            </span>
          </div>
        </div>

        <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
          <div className="space-y-2">
            <p className="text-sm font-bold text-[#cebdff]">면접관:</p>
            <p className="text-[#e1e2e7]/80 leading-relaxed italic">
              "멀티 플랫폼 애플리케이션의 복잡한 내비게이션 문제를 해결할 때의 디자인 프로세스를 설명해주실 수 있나요?"
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-[#e1e2e7] leading-relaxed text-lg font-light">
              네, 물론입니다. 저는 보통 현재 아키텍처를 점검하는 것부터 시작합니다. 멀티 플랫폼의 핵심은 UI가 유연하게 적응하면서도 일관성을 유지하는 "핵심 동작"을 정의하는 것입니다. 지난 Dropbox 프로젝트에서는 모바일 퍼스트 제약 조건을 우선시하는 토큰화된 시스템을 사용했습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Transcript;
