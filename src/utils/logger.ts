export const logger = {
  error: (message: string, error?: any, context?: Record<string, any>) => {
    const isDev = import.meta.env.DEV;
    if (isDev) {
      console.error(`[ERROR] ${message}`, {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        ...context,
        timestamp: new Date().toISOString(),
      });
    } else {
      // In production, suppress stack traces and sensitive parameters to prevent information leakage
      console.error(`[SECURE LOG] ${message}: ${error instanceof Error ? error.message : 'Error recorded'}`);
    }
  },
  warn: (message: string, context?: Record<string, any>) => {
    if (import.meta.env.DEV) {
      console.warn(`[WARN] ${message}`, {
        ...context,
        timestamp: new Date().toISOString(),
      });
    }
  },
  info: (message: string, context?: Record<string, any>) => {
    if (import.meta.env.DEV) {
      console.info(`[INFO] ${message}`, {
        ...context,
        timestamp: new Date().toISOString(),
      });
    }
  }
};
