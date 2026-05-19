import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Filter, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SessionList from "../../components/dashboard/history/SessionList";
import SessionDetailHeader from "../../components/dashboard/history/SessionDetailHeader";
import InterviewTimeline from "../../components/dashboard/history/InterviewTimeline";

import { sessionService } from "../../services/sessionService";
import { reportService } from "../../services/reportService";
import type { SessionListItem, SessionDetail, SessionReport } from "../../types";
import type { InterviewSession, QAPair } from "../../types/types";

const HistoryLayout = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionListItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [sessionDetail, setSessionDetail] = useState<SessionDetail | null>(null);
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSessionsList = async (shouldAutoSelect: boolean = true) => {
    try {
      setIsLoadingList(true);
      setError(null);
      // Load sessions
      const res = await sessionService.getSessions(0, 50);
      const completedSessions = res.content || [];
      setSessions(completedSessions);
      
      if (shouldAutoSelect && completedSessions.length > 0) {
        setSelectedSessionId(completedSessions[0].sessionId);
      } else if (completedSessions.length === 0) {
        setSelectedSessionId(null);
        setSessionDetail(null);
        setSessionReport(null);
      }
    } catch (err: any) {
      console.error("Failed to load sessions:", err);
      setError("세션 목록을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoadingList(false);
    }
  };

  // 1. Fetch sessions list on mount
  useEffect(() => {
    loadSessionsList(true);
  }, []);

  // 2. Load session detail & report when selectedSessionId changes
  useEffect(() => {
    if (!selectedSessionId) return;

    const loadSessionData = async () => {
      try {
        setIsLoadingDetail(true);
        const [detail, report] = await Promise.all([
          sessionService.getSessionDetail(selectedSessionId),
          reportService.getSessionReport(selectedSessionId).catch((err) => {
            console.warn("Feedback report not yet created or failed to fetch:", err);
            return null; // Return null so detail can still load
          })
        ]);
        
        setSessionDetail(detail);
        setSessionReport(report);
      } catch (err: any) {
        console.error("Failed to load session details:", err);
      } finally {
        setIsLoadingDetail(false);
      }
    };

    loadSessionData();
  }, [selectedSessionId]);

  // Convert real API response to InterviewSession mock shape for components
  const formatSessionsForList = (): InterviewSession[] => {
    return sessions.map((s) => ({
      id: String(s.sessionId),
      company: "Deepterview",
      role: s.jobTitle,
      date: new Date(s.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      duration: s.sessionType === "TECHNICAL" ? "기술" : s.sessionType === "PERSONALITY" ? "인성" : "종합",
      score: s.overallScore ? Math.round(s.overallScore) : 0,
      questionCount: 0,
      qaPairs: [],
    }));
  };

  const buildMappedQAPairs = (): QAPair[] => {
    if (!sessionDetail) return [];
    return sessionDetail.questions.map((q) => ({
      id: String(q.id),
      question: q.content,
      answer: q.answerText || "답변 데이터가 존재하지 않거나 녹음이 스킵되었습니다.",
      tags: [q.questionType === "TECHNICAL" ? "기술" : "행동형"],
      answerId: q.answerId,
      aiInsight: q.answerId ? "AI 다차원 피드백 산출 완료" : "피드백 미생성",
      aiInsightType: q.answerId ? "positive" : "negative",
    }));
  };

  const getMappedSelectedSession = (): InterviewSession | null => {
    if (!sessionDetail) return null;
    const mappedPairs = buildMappedQAPairs();
    
    return {
      id: String(sessionDetail.sessionId),
      company: "Deepterview",
      role: sessionDetail.jobTitle,
      date: sessionDetail.startedAt
        ? new Date(sessionDetail.startedAt).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "진행 시간 없음",
      duration:
        sessionDetail.sessionType === "TECHNICAL"
          ? "기술 면접"
          : sessionDetail.sessionType === "PERSONALITY"
          ? "인성 면접"
          : "종합 면접",
      score: sessionReport?.overallScore
        ? Math.round(sessionReport.overallScore)
        : sessionDetail.status === "COMPLETED"
        ? 75 // default mock score if report is still loading
        : 0,
      questionCount: sessionDetail.totalQuestions,
      qaPairs: mappedPairs,
    };
  };

  // Navigations
  const handleNavigateToAnalysis = (answerId: number) => {
    if (selectedSessionId) {
      navigate(`/dashboard/history/${selectedSessionId}/analytics?answerId=${answerId}`);
    } else {
      navigate(`/dashboard/analytics?answerId=${answerId}`);
    }
  };

  const handleViewReport = () => {
    if (selectedSessionId) {
      if (sessionDetail?.questions && sessionDetail.questions.length > 0) {
        // Find the first question with a valid answerId
        const firstAnswered = sessionDetail.questions.find((q) => q.answerId);
        if (firstAnswered && firstAnswered.answerId) {
          navigate(`/dashboard/history/${selectedSessionId}/analytics?answerId=${firstAnswered.answerId}`);
        } else {
          // Navigate anyway so the user can see the questions in the sidebar
          navigate(`/dashboard/history/${selectedSessionId}/analytics`);
        }
      } else {
        // Navigate anyway if there are no questions loaded yet
        navigate(`/dashboard/history/${selectedSessionId}/analytics`);
      }
    }
  };

  const handleDeleteSession = async () => {
    if (!selectedSessionId) return;

    const confirmDelete = window.confirm(
      "이 면접 연습 기록을 정말로 삭제하시겠습니까? 삭제된 기록은 복구할 수 없습니다."
    );
    if (!confirmDelete) return;

    try {
      setIsLoadingDetail(true);
      await sessionService.deleteSession(selectedSessionId);
      
      // Successfully deleted, refresh list and auto-select next
      alert("면접 연습 기록이 성공적으로 삭제되었습니다.");
      await loadSessionsList(true);
    } catch (err) {
      console.error("Failed to delete session:", err);
      alert("세션 삭제에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const selectedMappedSession = getMappedSelectedSession();

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#cebdff] font-black mb-2 block animate-pulse">
            아카이브 REPORT
          </span>
          <h2 className="text-5xl font-black tracking-tighter text-[#e1e2e7]">
            세션 히스토리
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 px-5 py-3 bg-[#191c1f] border border-[#494454]/20 text-[#cbc3d7] rounded-2xl text-xs font-bold hover:border-[#cebdff]/30 transition-all cursor-pointer">
            <Calendar size={14} /> 최근 30일
          </button>
          <button className="flex items-center gap-3 px-5 py-3 bg-[#191c1f] border border-[#494454]/20 text-[#cbc3d7] rounded-2xl text-xs font-bold hover:border-[#cebdff]/30 transition-all cursor-pointer">
            <Filter size={14} /> 모든 직무
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      {isLoadingList ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <RefreshCw size={36} className="text-[#cebdff] animate-spin" />
          <p className="text-sm text-[#cbc3d7]/60 font-medium">세션 내역을 불러오고 있습니다...</p>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <AlertCircle size={40} className="text-red-400" />
          <p className="text-sm text-red-400 font-bold">{error}</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#191c1f]/20 rounded-[2.5rem] border border-white/5 p-12 text-center">
          <Sparkles size={48} className="text-[#cebdff]/30 mb-4" />
          <h3 className="text-xl font-bold text-[#e1e2e7] mb-2">면접 연습 기록이 존재하지 않습니다</h3>
          <p className="text-[#cbc3d7]/50 text-sm max-w-sm mx-auto">
            새로운 면접 연습을 생성하여 AI의 다차원 피드백 보고서를 확인해보세요!
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 px-8 py-3 bg-[#9b7fed] text-[#31057e] rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-[#9b7fed]/20 cursor-pointer"
          >
            면접 시작하러 가기
          </button>
        </div>
      ) : (
        <motion.div
          className="flex gap-10 flex-1 min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Left Sidebar - Session List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SessionList
              sessions={formatSessionsForList()}
              selectedSessionId={selectedSessionId ? String(selectedSessionId) : ""}
              onSelectSession={(id) => setSelectedSessionId(Number(id))}
            />
          </motion.div>

          {/* Right Content - Session Details */}
          <motion.div
            className="flex-1 overflow-y-auto scrollbar-hide pr-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {isLoadingDetail || !selectedMappedSession ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <RefreshCw size={28} className="text-[#cebdff] animate-spin" />
                <p className="text-xs text-[#cbc3d7]/60 font-mono">AI 보고서를 로딩 중입니다...</p>
              </div>
            ) : (
              <>
                <SessionDetailHeader
                  session={selectedMappedSession}
                  onViewReport={handleViewReport}
                  onDeleteSession={handleDeleteSession}
                />

                {/* Session AI Qualitative Summaries (If report exists) */}
                {sessionReport && (
                  <motion.div
                    className="grid grid-cols-2 gap-6 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="bg-[#191c1f]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/5">
                      <h4 className="text-[0.65rem] uppercase tracking-widest text-[#cebdff] font-black mb-3">AI 종합 분석 요약</h4>
                      <p className="text-xs text-[#cbc3d7]/80 leading-relaxed font-light">{sessionReport.aiSummary || "요약 데이터를 생성하는 중입니다..."}</p>
                    </div>
                    <div className="bg-[#191c1f]/80 backdrop-blur-md rounded-[2rem] p-6 border border-white/5">
                      <h4 className="text-[0.65rem] uppercase tracking-widest text-emerald-400 font-black mb-3">강점 요약</h4>
                      <p className="text-xs text-[#cbc3d7]/80 leading-relaxed font-light">{sessionReport.strengthSummary || "강점 데이터를 분석 중입니다..."}</p>
                    </div>
                  </motion.div>
                )}

                {/* Interview Timeline */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <InterviewTimeline
                    qaPairs={selectedMappedSession.qaPairs}
                    onNavigateToAnalysis={handleNavigateToAnalysis}
                  />
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HistoryLayout;
