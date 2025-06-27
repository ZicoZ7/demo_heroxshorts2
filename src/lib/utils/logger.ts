import winston from 'winston'
import path from 'path'

const logDir = path.join(process.cwd(), 'logs')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'hero-shorts' },
  transports: [
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log') 
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

export interface LogContext {
  jobId?: string;
  videoId?: string;
  userId?: string;
  stage?: string;
  error?: Error | unknown;
  progress?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  operation?: string;
  deletedCount?: number;
  recoveredCount?: number;
  fromStage?: string;
  retryCount?: number;
  originalError?: Error | unknown;
  videoPath?: string;
  args?: string[];
  [key: string]: unknown;  // Allow additional properties
}

export function logInfo(message: string, context?: LogContext) {
  logger.info(message, { ...context })
}

export function logError(message: string, context?: LogContext) {
  logger.error(message, { 
    ...context,
    error: context?.error instanceof Error ? {
      message: context.error.message,
      stack: context.error.stack,
      name: context.error.name
    } : context?.error
  })
}

export function logWarning(message: string, context?: LogContext) {
  logger.warn(message, { ...context })
}

export function logDebug(message: string, context?: LogContext) {
  logger.debug(message, { ...context })
}

export default logger
