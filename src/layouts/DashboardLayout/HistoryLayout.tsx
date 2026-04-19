import { Calendar, Filter } from "lucide-react";
import SessionList from "../../components/dashboard/history/SessionList";
import SessionDetailHeader from "../../components/dashboard/history/SessionDetailHeader";
import InterviewTimeline from "../../components/dashboard/history/InterviewTimeline";
import { useState } from "react";
import { motion } from "framer-motion";
import { MOCK_SESSIONS } from "../../mocks/data";

const HistoryLayout = () => {
  const [selectedSessionId, setSelectedSessionId] = useState(
    MOCK_SESSIONS[0].id,
  );
  const selectedSession =
    MOCK_SESSIONS.find((s) => s.id === selectedSessionId) || MOCK_SESSIONS[0];

  return (
    <motion.div
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Filters */}
      <motion.div
        className="flex items-center justify-between mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#cebdff] font-black mb-2 block">
            아카이브
          </span>
          <h2 className="text-5xl font-black tracking-tighter text-[#e1e2e7]">
            세션 히스토리
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 px-5 py-3 bg-[#191c1f] border border-[#494454]/20 text-[#cbc3d7] rounded-2xl text-xs font-bold hover:border-[#cebdff]/30 transition-all">
            <Calendar size={14} /> 최근 30일
          </button>
          <button className="flex items-center gap-3 px-5 py-3 bg-[#191c1f] border border-[#494454]/20 text-[#cbc3d7] rounded-2xl text-xs font-bold hover:border-[#cebdff]/30 transition-all">
            <Filter size={14} /> 모든 직무
          </button>
        </div>
      </motion.div>

      {/* process history  */}
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
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <SessionList
            sessions={MOCK_SESSIONS}
            selectedSessionId={selectedSessionId}
            onSelectSession={setSelectedSessionId}
          />
        </motion.div>

        {/* Right Content - Session Details */}
        <motion.div
          className="flex-1 overflow-y-auto scrollbar-hide pr-4"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <SessionDetailHeader session={selectedSession} />

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <InterviewTimeline qaPairs={selectedSession.qaPairs} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryLayout;
