import api from "../lib/api";
import type {
  ApiResponse,
  PortfolioUploadResponse,
  PortfolioExtractResponse,
  PortfolioQuestionsResponse,
} from "../types";

export const portfolioService = {
  uploadPortfolio: async (file: File): Promise<PortfolioUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post<ApiResponse<PortfolioUploadResponse>>(
      "/api/v1/portfolios",
      formData,
    );
    return res.data.data;
  },

  extractPortfolio: async (portfolioId: number): Promise<PortfolioExtractResponse> => {
    const res = await api.post<ApiResponse<PortfolioExtractResponse>>(
      `/api/v1/portfolios/${portfolioId}/extract`,
    );
    return res.data.data;
  },

  generateQuestions: async (portfolioId: number): Promise<PortfolioQuestionsResponse> => {
    const res = await api.post<ApiResponse<PortfolioQuestionsResponse>>(
      `/api/v1/portfolios/${portfolioId}/questions`,
    );
    return res.data.data;
  },

  processPortfolio: async (file: File): Promise<PortfolioQuestionsResponse> => {
    const upload = await portfolioService.uploadPortfolio(file);
    await portfolioService.extractPortfolio(upload.portfolioId);
    return portfolioService.generateQuestions(upload.portfolioId);
  },
};
