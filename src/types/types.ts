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
