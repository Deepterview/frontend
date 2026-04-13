import type { InterviewSession } from "../types/types";

export const MOCK_SESSIONS: InterviewSession[] = [
  {
    id: "1",
    company: "Google",
    role: "Senior Product Designer",
    date: "Thursday, Oct 24, 2023",
    duration: "45m 12s",
    score: 85,
    questionCount: 12,
    qaPairs: [
      {
        id: "q1",
        question:
          "Can you walk me through your design process when tackling a complex navigation problem for a multi-platform application?",
        answer:
          'Absolutely. I usually start with an audit of the current architecture. For multi-platform, the key is defining "core actions" that remain consistent while allowing the UI to adapt. In my last project at Dropbox, we used a tokenized system that prioritized mobile-first constraints...',
        tags: ["Confident", "Articulate"],
        aiInsight: "Excellent Logic",
        aiInsightType: "positive",
      },
      {
        id: "q2",
        question:
          "How do you handle disagreements with engineering leads regarding design feasibility?",
        answer:
          "I prioritize transparency. I usually try to understand the technical constraints first and then iterate on the design to find a middle ground that doesn't compromise the user experience.",
        tags: ["Concise"],
        aiInsight: "Needs More Detail",
        aiInsightType: "negative",
      },
      {
        id: "q3",
        question:
          "Tell me about a time you had to pivot your design strategy mid-sprint...",
        answer:
          'During a major redesign of our checkout flow, initial user testing showed that our new "one-click" approach was actually confusing users. I had to quickly gather the team, present the data, and we pivoted back to a multi-step progress bar within 48 hours...',
        tags: ["Problem Solving"],
      },
      {
        id: "q4",
        question:
          "Can you walk me through your design process when tackling a complex navigation problem for a multi-platform application?",
        answer:
          'Absolutely. I usually start with an audit of the current architecture. For multi-platform, the key is defining "core actions" that remain consistent while allowing the UI to adapt. In my last project at Dropbox, we used a tokenized system that prioritized mobile-first constraints...',
        tags: ["Confident", "Articulate"],
        aiInsight: "Excellent Logic",
        aiInsightType: "positive",
      },
      {
        id: "q5",
        question:
          "Can you walk me through your design process when tackling a complex navigation problem for a multi-platform application?",
        answer:
          'Absolutely. I usually start with an audit of the current architecture. For multi-platform, the key is defining "core actions" that remain consistent while allowing the UI to adapt. In my last project at Dropbox, we used a tokenized system that prioritized mobile-first constraints...',
        tags: ["Confident", "Articulate"],
        aiInsight: "Excellent Logic",
        aiInsightType: "positive",
      },
    ],
  },
  {
    id: "2",
    company: "Meta",
    role: "Frontend Engineer",
    date: "Oct 21, 2023",
    duration: "32 mins",
    score: 78,
    questionCount: 8,
    qaPairs: [],
  },
  {
    id: "3",
    company: "Airbnb",
    role: "Staff UX Researcher",
    date: "Oct 18, 2023",
    duration: "58 mins",
    score: 92,
    questionCount: 15,
    qaPairs: [],
  },
];
