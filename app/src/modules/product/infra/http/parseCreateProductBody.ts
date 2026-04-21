import type { APIGatewayProxyEvent } from 'aws-lambda'

export function parseBody<T = Record<string, unknown>>(
  event: APIGatewayProxyEvent
): T {
  if (!event.body) {
    throw new Error('Invalid body')
  }

  let parsed: unknown

  try {
    parsed =
      typeof event.body === 'string'
        ? JSON.parse(event.body)
        : event.body
  } catch {
    throw new Error('Invalid JSON body')
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid body format')
  }

  return parsed as T
}