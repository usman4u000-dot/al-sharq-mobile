export const logger = {
  error: (message: string, error?: any, context?: Record<string, any>) => {
    // In a production environment, this would send data to a service like Sentry, Datadog, or LogRocket.
    console.error(`[ERROR] ${message}`, {
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      ...context,
      timestamp: new Date().toISOString(),
    });
  },
  warn: (message: string, context?: Record<string, any>) => {
    console.warn(`[WARN] ${message}`, {
      ...context,
      timestamp: new Date().toISOString(),
    });
  },
  info: (message: string, context?: Record<string, any>) => {
    console.info(`[INFO] ${message}`, {
      ...context,
      timestamp: new Date().toISOString(),
    });
  }
};
