import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Smile,
  Volume2,
  Award,
  AlertCircle,
  ArrowLeft,
  MessageSquare,
  HelpCircle,
  User,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import { answerService } from "../../services/answerService";
import { sessionService } from "../../services/sessionService";
import type { AnswerAnalysis } from "../../types";

const AnalyticsLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const answerIdParam = searchParams.get("answerId");
  const [activeAnswerId, setActiveAnswerId] = useState<number | null>(
    answerIdParam ? Number(answerIdParam) : null
  );

  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // States to populate the sidebar of questions for the session
  const [sessionQuestions, setSessionQuestions] = useState<any[]>([]);
  const [sessionTitle, setSessionTitle] = useState("");

  // 1. If activeAnswerId changes, fetch the detailed analysis
  useEffect(() => {
    if (answerIdParam) {
      setActiveAnswerId(Number(answerIdParam));
    }
  }, [answerIdParam]);

  useEffect(() => {
    if (!activeAnswerId) return;

    const fetchAnalysis = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await answerService.getAnalysis(activeAnswerId);
        setAnalysis(data);

        // Once we have the answer, if we don't have the sidebar loaded, load its session questions
        if (data && sessionQuestions.length === 0) {
          loadSessionSidebarOfAnswer(activeAnswerId);
        }
      } catch (err: any) {
        console.error("Failed to load answer analysis:", err);
        setError("답변 분석 데이터를 불러오는데 실패했거나 AI 분석이 아직 대기 중입니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalysis();
  }, [activeAnswerId]);

  // 2. Fetch the session and all its questions so the user can easily switch between them!
  const loadSessionSidebarOfAnswer = async (ansId: number) => {
    try {
      // Retrieve recent sessions to find which session holds this answer
      const sessionListRes = await sessionService.getSessions(0, 20);
      for (const s of sessionListRes.content) {
        const detail = await sessionService.getSessionDetail(s.sessionId);
        const hasAnswer = detail.questions.some((q) => q.answerId === ansId);
        if (hasAnswer) {
          setSessionQuestions(detail.questions);
          setSessionTitle(detail.jobTitle);
          break;
        }
      }
    } catch (err) {
      console.warn("Could not load session sidebar:", err);
    }
  };

  // 3. Fallback: If page is loaded directly without an answerId, auto-load the latest completed session's first answer
  useEffect(() => {
    if (answerIdParam) return; // Already have active param, skip auto-load

    const autoLoadLatest = async () => {
      try {
        setIsLoading(true);
        const res = await sessionService.getSessions(0, 10);
        if (res.content && res.content.length > 0) {
          // Get details of the latest session
          const latestSessionId = res.content[0].sessionId;
          const detail = await sessionService.getSessionDetail(latestSessionId);
          setSessionQuestions(detail.questions);
          setSessionTitle(detail.jobTitle);

          // Find first question that has been answered
          const firstAnswered = detail.questions.find((q) => q.answerId);
          if (firstAnswered && firstAnswered.answerId) {
            setSearchParams({ answerId: String(firstAnswered.answerId) });
            setActiveAnswerId(firstAnswered.answerId);
          } else {
            setError("최근 진행한 세션 중 완료된 답변 분석 데이터가 없습니다.");
          }
        } else {
          setError("아직 진행한 면접 연습 데이터가 없습니다.");
        }
      } catch (err) {
        console.error("Auto load latest session failed:", err);
        setError("기본 연습 데이터를 조회하는 도중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    autoLoadLatest();
  }, [answerIdParam]);

  const handleSelectQuestion = (ansId: number) => {
    setSearchParams({ answerId: String(ansId) });
    setActiveAnswerId(ansId);
  };

  return (
    <div className="flex gap-8 pb-32 max-w-[1400px] mx-auto min-h-screen">
      {/* 1. Sidebar Question Switcher */}
      {sessionQuestions.length > 0 && (
        <motion.div
          className="w-80 shrink-0 bg-[#191c1f]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-6 h-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-[#cebdff] font-bold">
              진행 중인 세션
            </span>
            <h3 className="text-lg font-black text-[#e1e2e7] tracking-tight mt-1 truncate">
              {sessionTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {sessionQuestions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => q.answerId && handleSelectQuestion(q.answerId)}
                disabled={!q.answerId}
                className={`w-full text-left p-4 rounded-2xl transition-all border text-xs flex flex-col gap-2 ${
                  !q.answerId
                    ? "bg-black/20 border-transparent text-[#cbc3d7]/20 cursor-not-allowed"
                    : q.answerId === activeAnswerId
                    ? "bg-[#cebdff]/10 border-[#cebdff]/30 text-[#e1e2e7] shadow-lg shadow-[#cebdff]/5"
                    : "bg-[#111417]/40 border-transparent hover:bg-[#191c1f] hover:border-white/5 text-[#cbc3d7]/60 cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-[0.65rem] uppercase tracking-wider text-[#cebdff]">
                    질문 0{idx + 1}
                  </span>
                  {!q.answerId ? (
                    <span className="text-[0.6rem] text-red-400 font-bold bg-red-400/5 px-2 py-0.5 rounded border border-red-400/10">미답변</span>
                  ) : (
                    <span className="text-[0.6rem] text-emerald-400 font-bold bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10">AI 분석완료</span>
                  )}
                </div>
                <p className="font-medium line-clamp-2 leading-relaxed">{q.content}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 2. Main Analytics Dashboard */}
      <div className="flex-1 min-w-0">
        {isLoading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <RefreshCw size={40} className="text-[#cebdff] animate-spin" />
            <p className="text-sm text-[#cbc3d7]/60 font-mono tracking-wider animate-pulse">
              AI 다차원 ML 리포트를 생성하고 있습니다...
            </p>
          </div>
        ) : error ? (
          <div className="h-[60vh] flex flex-col items-center justify-center bg-[#191c1f]/20 rounded-[2.5rem] border border-white/5 p-12 text-center">
            <AlertCircle size={48} className="text-red-400 mb-4" />
            <h3 className="text-xl font-bold text-[#e1e2e7] mb-2">분석을 불러올 수 없습니다</h3>
            <p className="text-[#cbc3d7]/50 text-sm max-w-sm mx-auto mb-6">{error}</p>
            <button
              onClick={() => navigate("/dashboard/history")}
              className="px-6 py-2.5 bg-[#cebdff]/10 hover:bg-[#cebdff]/20 text-[#cebdff] rounded-full border border-[#cebdff]/30 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeft size={12} className="inline mr-2" /> 히스토리 목록으로 이동
            </button>
          </div>
        ) : analysis ? (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header & Question Context */}
            <div className="bg-[#191c1f]/60 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
              <div>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#cebdff] font-black animate-pulse">
                  AI DEEP LEARNING ANALYSIS
                </span>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-10 h-10 rounded-xl bg-[#cebdff]/10 flex items-center justify-center shrink-0 border border-[#cebdff]/20">
                    <MessageSquare size={18} className="text-[#cebdff]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#e1e2e7] tracking-tight leading-relaxed">
                    "{analysis.starAnalysis?.situationFeedback ? "면접 질문 분석 리포트" : "질문 내용"}"
                  </h2>
                </div>
                <p className="text-md text-[#cbc3d7] font-light leading-relaxed mt-4 pl-14 italic">
                  {sessionQuestions.find((q) => q.answerId === activeAnswerId)?.content || "면접 질문 내용입니다."}
                </p>
              </div>

              {/* Transcript Block */}
              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <User size={16} className="text-[#cbc3d7]/60" />
                  <span className="text-[0.65rem] uppercase tracking-widest text-[#cbc3d7]/50 font-bold">
                    사용자 답변 STT 텍스트 변환
                  </span>
                </div>
                <div className="p-6 bg-black/40 rounded-2xl border border-white/5">
                  <p className="text-sm text-[#cbc3d7] leading-relaxed font-light font-sans">
                    {analysis.transcript || "변환된 텍스트가 없습니다."}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Analytics Columns */}
            <div className="grid grid-cols-2 gap-8">
              {/* verbal / speech analytics */}
              <div className="bg-[#191c1f]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Volume2 size={20} className="text-[#7bd0ff]" />
                  <h3 className="text-sm font-black tracking-wider uppercase text-[#e1e2e7]">
                    언어적 자질 분석 (Speech)
                  </h3>
                </div>

                {analysis.speechAnalysis ? (
                  <div className="space-y-6">
                    {/* WPM Gauge */}
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                      <div>
                        <h4 className="text-[0.65rem] text-[#cbc3d7]/40 font-bold uppercase tracking-wider">발화 속도 (WPM)</h4>
                        <p className="text-2xl font-black text-white mt-1">
                          {Math.round(analysis.speechAnalysis.wpm)} <span className="text-xs text-[#cbc3d7]/40 font-medium">단어/분</span>
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[0.6rem] font-bold ${
                        analysis.speechAnalysis.wpm >= 110 && analysis.speechAnalysis.wpm <= 150
                          ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                          : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                      }`}>
                        {analysis.speechAnalysis.wpm >= 110 && analysis.speechAnalysis.wpm <= 150 ? "안정적 속도" : "조율 권장"}
                      </span>
                    </div>

                    {/* Filler Words */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[0.65rem] text-[#cbc3d7]/60 font-bold uppercase">사용 빈도 높은 습관어</span>
                        <span className="text-xs text-amber-400 font-bold">{analysis.speechAnalysis.fillerCount}회 발견</span>
                      </div>
                      <div className="flex flex-wrap gap-2 p-4 bg-black/20 rounded-2xl border border-white/5 min-h-[50px] items-center">
                        {analysis.speechAnalysis.fillerWords && Object.keys(analysis.speechAnalysis.fillerWords).length > 0 ? (
                          Object.entries(analysis.speechAnalysis.fillerWords).map(([word, count]) => (
                            <span key={word} className="px-3 py-1 bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[0.65rem] font-bold rounded-xl">
                              "{word}" : {count}회
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-[#cbc3d7]/30">습관어가 검출되지 않아 맑고 정돈된 표현입니다. ✨</span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between text-[0.65rem] font-bold mb-1">
                          <span className="text-[#cbc3d7]/60 uppercase">문장 전달 선명도</span>
                          <span className="text-[#7bd0ff]">{Math.round(analysis.speechAnalysis.clarityScore * 100)}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysis.speechAnalysis.clarityScore * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[0.65rem] font-bold mb-1">
                          <span className="text-[#cbc3d7]/60 uppercase">발화 공백 안정비 (Silence)</span>
                          <span className="text-[#7bd0ff]">{Math.round((1 - analysis.speechAnalysis.silenceRatio) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(1 - analysis.speechAnalysis.silenceRatio) * 100}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[0.7rem] text-[#cbc3d7]/80 leading-relaxed font-light">
                      {analysis.speechAnalysis.feedback || "언어 분석 진행 중..."}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#cbc3d7]/40 italic">언어 감정 분석을 대기 중입니다...</p>
                )}
              </div>

              {/* nonverbal / facial analytics */}
              <div className="bg-[#191c1f]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <Smile size={20} className="text-[#cebdff]" />
                  <h3 className="text-sm font-black tracking-wider uppercase text-[#e1e2e7]">
                    비언어적 자질 분석 (Facial)
                  </h3>
                </div>

                {analysis.nonverbalAnalysis ? (
                  <div className="space-y-6">
                    {/* Emotion distribution or vital details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-black/20 rounded-2xl border border-white/5 text-center">
                        <span className="text-[0.55rem] text-[#cbc3d7]/40 uppercase font-black tracking-wider block">아이컨택 비율</span>
                        <span className="text-2xl font-black text-white mt-1 block">
                          {Math.round(analysis.nonverbalAnalysis.eyeContactScore)}%
                        </span>
                      </div>
                      <div className="p-4 bg-black/20 rounded-2xl border border-white/5 text-center">
                        <span className="text-[0.55rem] text-[#cbc3d7]/40 uppercase font-black tracking-wider block">표정 자신감</span>
                        <span className="text-2xl font-black text-white mt-1 block">
                          {Math.round(analysis.nonverbalAnalysis.confidenceScore)}%
                        </span>
                      </div>
                    </div>

                    {/* Dominant Emotion Ring */}
                    <div className="flex items-center justify-between p-4 bg-[#cebdff]/5 rounded-2xl border border-[#cebdff]/10">
                      <div>
                        <span className="text-[0.6rem] text-[#cebdff] font-bold uppercase tracking-wider block">핵심 감정 지표</span>
                        <span className="text-lg font-black text-white mt-1 block">
                          {analysis.nonverbalAnalysis.dominantEmotion === "NEUTRAL"
                            ? "차분하고 담담한 상태 😐"
                            : analysis.nonverbalAnalysis.dominantEmotion === "HAPPY"
                            ? "긍정적이며 미소 지음 🙂"
                            : analysis.nonverbalAnalysis.dominantEmotion === "SURPRISE"
                            ? "집중하여 몰입함 😲"
                            : "감정 반응 안정적"}
                        </span>
                      </div>
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#cebdff] bg-[#cebdff]/10 px-3 py-1 rounded-lg">
                        {analysis.nonverbalAnalysis.dominantEmotion}
                      </span>
                    </div>

                    {/* Head Stability & Smile Score */}
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between text-[0.65rem] font-bold mb-1">
                          <span className="text-[#cbc3d7]/60 uppercase">자세 및 머리 안정도 (Head Stability)</span>
                          <span className="text-[#cebdff]">{Math.round(analysis.nonverbalAnalysis.headStabilityScore)}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#9b7fed] to-[#cebdff]"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysis.nonverbalAnalysis.headStabilityScore}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[0.65rem] font-bold mb-1">
                          <span className="text-[#cbc3d7]/60 uppercase">미소 지수 (Smile Ratio)</span>
                          <span className="text-[#cebdff]">{Math.round(analysis.nonverbalAnalysis.smileRatio)}%</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#9b7fed] to-[#cebdff]"
                            initial={{ width: 0 }}
                            animate={{ width: `${analysis.nonverbalAnalysis.smileRatio}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-[0.7rem] text-[#cbc3d7]/80 leading-relaxed font-light">
                      {analysis.nonverbalAnalysis.feedback || "비언어 행동 분석 진행 중..."}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#cbc3d7]/40 italic">비언어 영상 행동 분석을 대기 중입니다...</p>
                )}
              </div>
            </div>

            {/* STAR Structural competency card */}
            {analysis.starAnalysis && (
              <motion.div
                className="bg-[#191c1f]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <Award size={20} className="text-[#cebdff]" />
                    <h3 className="text-sm font-black tracking-wider uppercase text-[#e1e2e7]">
                      STAR 프레임워크 역량 평가 (Situation-Task-Action-Result)
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.65rem] text-[#cbc3d7]/40 uppercase font-black tracking-wider">콘텐츠 구조화 점수:</span>
                    <span className="text-lg font-black text-[#cebdff]">{Math.round(analysis.starAnalysis.totalScore)}점</span>
                  </div>
                </div>

                {/* Grid Layout of STAR breakdown */}
                <div className="grid grid-cols-4 gap-6">
                  {/* Situation */}
                  <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[0.65rem] font-bold text-[#cebdff] uppercase tracking-wider">S (상황)</span>
                        <span className="text-[0.65rem] font-black text-white">{Math.round(analysis.starAnalysis.situationScore)}점</span>
                      </div>
                      <p className="text-[0.65rem] text-[#cbc3d7]/60 leading-relaxed font-light line-clamp-4">
                        {analysis.starAnalysis.situationFeedback}
                      </p>
                    </div>
                  </div>

                  {/* Task */}
                  <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[0.65rem] font-bold text-[#cebdff] uppercase tracking-wider">T (목표/과제)</span>
                        <span className="text-[0.65rem] font-black text-white">{Math.round(analysis.starAnalysis.taskScore)}점</span>
                      </div>
                      <p className="text-[0.65rem] text-[#cbc3d7]/60 leading-relaxed font-light line-clamp-4">
                        {analysis.starAnalysis.taskFeedback}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[0.65rem] font-bold text-[#cebdff] uppercase tracking-wider">A (해결 행동)</span>
                        <span className="text-[0.65rem] font-black text-white">{Math.round(analysis.starAnalysis.actionScore)}점</span>
                      </div>
                      <p className="text-[0.65rem] text-[#cbc3d7]/60 leading-relaxed font-light line-clamp-4">
                        {analysis.starAnalysis.actionFeedback}
                      </p>
                    </div>
                  </div>

                  {/* Result */}
                  <div className="bg-black/20 p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[0.65rem] font-bold text-[#cebdff] uppercase tracking-wider">R (성과)</span>
                        <span className="text-[0.65rem] font-black text-white">{Math.round(analysis.starAnalysis.resultScore)}점</span>
                      </div>
                      <p className="text-[0.65rem] text-[#cbc3d7]/60 leading-relaxed font-light line-clamp-4">
                        {analysis.starAnalysis.resultFeedback}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Coaching & Follow-up questions */}
            {analysis.llmFeedback && (
              <motion.div
                className="bg-[#191c1f]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <Sparkles size={20} className="text-[#cebdff]" />
                  <h3 className="text-sm font-black tracking-wider uppercase text-[#e1e2e7]">
                    LLM 인공지능 정성 평가 및 다음 대비 전략
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <span className="text-[0.6rem] text-emerald-400 font-bold uppercase tracking-widest block mb-2">
                      강점 (Strengths)
                    </span>
                    <p className="text-[0.7rem] text-[#cbc3d7]/80 leading-relaxed font-light">
                      {analysis.llmFeedback.strength}
                    </p>
                  </div>

                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <span className="text-[0.6rem] text-red-400 font-bold uppercase tracking-widest block mb-2">
                      보완할 점 (Weaknesses)
                    </span>
                    <p className="text-[0.7rem] text-[#cbc3d7]/80 leading-relaxed font-light">
                      {analysis.llmFeedback.weakness}
                    </p>
                  </div>

                  <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                    <span className="text-[0.6rem] text-[#cebdff] font-bold uppercase tracking-widest block mb-2">
                      개선 로드맵 (Improvement Roadmap)
                    </span>
                    <p className="text-[0.7rem] text-[#cbc3d7]/80 leading-relaxed font-light">
                      {analysis.llmFeedback.improvement}
                    </p>
                  </div>
                </div>

                {/* Follow-up Questions */}
                {analysis.llmFeedback.followupQuestions && analysis.llmFeedback.followupQuestions.length > 0 && (
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#e1e2e7]">
                      <HelpCircle size={14} className="text-[#cebdff]" />
                      <span>추천되는 다음 꼬리 질문 (AI Follow-up Questions)</span>
                    </div>
                    <div className="space-y-2">
                      {analysis.llmFeedback.followupQuestions.map((qText, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3 text-xs text-[#cbc3d7]/80 hover:text-white transition-all hover:bg-white/[0.07]"
                        >
                          <TrendingUp size={12} className="text-[#cebdff] shrink-0" />
                          <span>{qText}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default AnalyticsLayout;
