
export interface ChatLog {
  logId: number;
  loginId: string | null;
  logInitialQuestion: string;
  logPredictedIntent: string;
  logConfidenceScore: number;
  logCreatedAt: string;
}


export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface LogDetail {
  logId: number;
  loginId: string | null;
  initialMessage: string;
  finalIntent: string;
  confidence: number;
  conversation: {
    sender: 'user' | 'bot';
    text: string;
    timestamp: string;
  }[];
}

