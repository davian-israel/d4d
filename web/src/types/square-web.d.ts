export {};

declare global {
  interface Window {
    Square?: {
      payments: (
        applicationId: string,
        locationId: string,
      ) => Promise<{
        card: () => Promise<{
          attach: (selector: string) => Promise<void>;
          destroy: () => Promise<void>;
          tokenize: () => Promise<{
            status: string;
            token?: string;
            errors?: unknown;
          }>;
        }>;
      }>;
    };
  }
}
