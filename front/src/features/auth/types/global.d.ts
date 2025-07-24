export {};

declare global {
  interface Window {
    Kakao: {
      Auth: {
        logout: (callback?: () => void) => void;
      };
      isInitialized: () => boolean;
      init: (appKey: string) => void;

    };
  }
}