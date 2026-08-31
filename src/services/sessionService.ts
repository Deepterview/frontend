import api from "../lib/api";
import type {
  ApiResponse,
  SessionListResponse,
  CreateSessionRequest,
  SessionDetail,
  SessionStatus,
  QuestionResponse,
} from "../types";

export const sessionService = {
  getSessions: async (
    page = 0,
    size = 10,
    status?: string,
  ): Promise<SessionListResponse> => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    if (status) params.append("status", status);

    const res = await api.get<ApiResponse<SessionListResponse>>(
      "/api/v1/sessions",
      {
        params,
      },
    );
    return res.data.data;
  },

  createSession: async (
    request: CreateSessionRequest,
  ): Promise<SessionDetail> => {
    const res = await api.post<ApiResponse<SessionDetail>>(
      "/api/v1/sessions",
      request,
    );
    return res.data.data;
  },

  getSessionDetail: async (sessionId: number): Promise<SessionDetail> => {
    const res = await api.get<ApiResponse<SessionDetail>>(
      `/api/v1/sessions/${sessionId}`,
    );
    return res.data.data;
  },

  startSession: async (
    sessionId: number,
  ): Promise<{ sessionId: number; status: SessionStatus }> => {
    const res = await api.patch<
      ApiResponse<{ sessionId: number; status: SessionStatus }>
    >(`/api/v1/sessions/${sessionId}/start`);
    return res.data.data;
  },

  endSession: async (
    sessionId: number,
  ): Promise<{ sessionId: number; status: SessionStatus }> => {
    const res = await api.patch<
      ApiResponse<{ sessionId: number; status: SessionStatus }>
    >(`/api/v1/sessions/${sessionId}/end`);
    return res.data.data;
  },

  deleteSession: async (sessionId: number): Promise<void> => {
    await api.delete(`/api/v1/sessions/${sessionId}`);
  },

  getNextQuestion: async (
    sessionId: number,
    answerId: number,
  ): Promise<QuestionResponse> => {
    const res = await api.post<ApiResponse<QuestionResponse>>(
      `/api/v1/sessions/${sessionId}/questions/next`,
      { answerId },
    );
    return res.data.data;
  },

  generatePythonReport: async (sessionId: number): Promise<void> => {
    await api.post<ApiResponse<void>>(`/api/v1/sessions/${sessionId}/report`);
  },
};
