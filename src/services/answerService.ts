import api from "../lib/api";
import type { ApiResponse, SubmitAnswerResponse, AnswerAnalysis } from "../types";

export const answerService = {
  submitAnswer: async (
    questionId: number,
    durationSec: number,
    completionStatus: "COMPLETED" | "SKIPPED" | "TIMEOUT",
    audioBlob: Blob
  ): Promise<SubmitAnswerResponse> => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "answer.wav");

    const res = await api.post<ApiResponse<SubmitAnswerResponse>>("/api/v1/answers", formData, {
      params: {
        questionId,
        durationSec,
        completionStatus,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },

  getAnalysis: async (answerId: number): Promise<AnswerAnalysis> => {
    const res = await api.get<ApiResponse<AnswerAnalysis>>(
      `/api/v1/answers/${answerId}/analysis`
    );
    return res.data.data;
  },
};
