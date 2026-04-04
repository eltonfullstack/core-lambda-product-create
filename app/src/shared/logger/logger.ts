import pino from 'pino'
import pretty from 'pino-pretty'

const isLocal = process.env.NODE_ENV === 'local'

const stream = isLocal
  ? pretty({
      colorize: true,
      ignore: 'pid,hostname',
    })
  : undefined

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  stream
)

export default logger