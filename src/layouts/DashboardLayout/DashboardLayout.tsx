import { motion } from "framer-motion";
import InterviewSetupCard from "../../components/dashboard/home/InterviewSetupCard";
import DocumentsCard from "../../components/dashboard/home/DocumentsCard";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionService } from "../../services/sessionService";
import { portfolioService } from "../../services/portfolioService";
import type { PortfolioQuestionsResponse } from "../../types";

const DashboardLayout = () => {
  const [openPosition, setOpenPosition] = useState("");
  const [jobCategoryId, setJobCategoryId] = useState<number | null>(null);
  const [careerYears, setCareerYears] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(1);
  const [objective, setObjective] = useState<File[] | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [portfolioStatus, setPortfolioStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  const getErrorMessage = (error: unknown): string => {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "data" in error.response &&
      typeof error.response.data === "object" &&
      error.response.data !== null &&
      "message" in error.response.data &&
      typeof error.response.data.message === "string"
    ) {
      return error.response.data.message;
    }

    return "세션 생성 중 오류가 발생했습니다.";
  };

  const handleCreateSession = async () => {
    if (!jobCategoryId) {
      alert("직군 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setIsCreatingSession(true);
    setPortfolioStatus(null);

    try {
      let portfolioResult: PortfolioQuestionsResponse | null = null;
      const portfolioFile = objective?.[0];

      if (portfolioFile) {
        setPortfolioStatus("포트폴리오 업로드 중...");
        const upload = await portfolioService.uploadPortfolio(portfolioFile);

        setPortfolioStatus("포트폴리오 텍스트 추출 중...");
        await portfolioService.extractPortfolio(upload.portfolioId);

        setPortfolioStatus("맞춤 면접 질문 생성 중...");
        portfolioResult = await portfolioService.generateQuestions(upload.portfolioId);
      }

      const requestPayload = {
        jobCategoryId,
        jobTitle: openPosition,
        careerYears,
        sessionType: "TECHNICAL" as const,
        totalQuestions: portfolioResult
          ? Math.min(totalQuestions, portfolioResult.questions.length)
          : totalQuestions,
      };

      setPortfolioStatus("면접 세션 생성 중...");
      const data = await sessionService.createSession(requestPayload);

      if (data?.sessionId) {
        sessionStorage.setItem("activeSessionId", data.sessionId.toString());

        if (portfolioResult) {
          sessionStorage.setItem(
            "portfolioQuestions",
            JSON.stringify(portfolioResult.questions),
          );
          sessionStorage.setItem(
            "portfolioId",
            portfolioResult.portfolioId.toString(),
          );
        } else {
          sessionStorage.removeItem("portfolioQuestions");
          sessionStorage.removeItem("portfolioId");
        }

        navigate("/dashboard/practice", {
          state: {
            sessionId: data.sessionId,
            portfolioQuestions: portfolioResult?.questions,
          },
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      alert(getErrorMessage(error));
    } finally {
      setIsCreatingSession(false);
      setPortfolioStatus(null);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-[#e1e2e7] mb-4">
          세션 설정
        </h2>
        <p className="text-[#cbc3d7] text-xl max-w-2xl leading-relaxed font-light">
          AI 기반 면접을 위한 지능형 설정을 정의하세요.
        </p>
      </motion.section>

      {/* Configuration Grid */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <InterviewSetupCard
          totalQuestions={totalQuestions}
          careerYears={careerYears}
          openPosition={openPosition}
          setTotalQuestions={setTotalQuestions}
          setCareerYears={setCareerYears}
          setOpenPosition={setOpenPosition}
          setJobCategoryId={setJobCategoryId}
        />
        <DocumentsCard objective={objective} setObjective={setObjective} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <div className="flex flex-col items-center py-20 gap-4">
          {portfolioStatus && (
            <p className="text-[#cbc3d7] text-sm font-medium">{portfolioStatus}</p>
          )}
          <motion.button
            onClick={handleCreateSession}
            disabled={isCreatingSession}
            whileHover={
              isCreatingSession
                ? undefined
                : {
                    scale: 1.05,
                    boxShadow: "0 0 60px rgba(155, 127, 237, 0.4)",
                  }
            }
            whileTap={isCreatingSession ? undefined : { scale: 0.95 }}
            className="group relative px-14 py-6 bg-[#9b7fed] rounded-full overflow-hidden transition-all duration-500 shadow-[0_0_40px_rgba(155,127,237,0.2)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#cebdff] to-[#7bd0ff] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="flex items-center gap-5 text-[#31057e] font-black text-lg tracking-[0.25em]">
              <span>{isCreatingSession ? "처리 중..." : "세션 시작하기"}</span>
              {!isCreatingSession && (
                <ChevronRight
                  size={24}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              )}
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
