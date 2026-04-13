export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
}

export interface SessionConfig {
  scenario: string;
  targetCompany: string;
  openPosition: string;
  objective: string;
}

export interface QAPair {
  id: string;
  question: string;
  answer: string;
  tags?: string[];
  aiInsight?: string;
  aiInsightType?: "positive" | "neutral" | "negative";
}

export interface InterviewSession {
  id: string;
  company: string;
  role: string;
  date: string;
  duration: string;
  score: number;
  questionCount: number;
  qaPairs: QAPair[];
}

export interface InterviewTimelineProps {
  qaPairs: QAPair[];
}

export interface SessionListProps {
  sessions: InterviewSession[];
  selectedSessionId: string;
  onSelectSession: (id: string) => void;
}

export interface SessionDetailHeaderProps {
  session: InterviewSession;
}
