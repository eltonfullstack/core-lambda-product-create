import type { APIGatewayProxyEvent } from 'aws-lambda'

export function parseBody(event: APIGatewayProxyEvent) {
  if (!event.body) {
    throw new Error('Invalid body')
  }

  const parsed =
    typeof event.body === 'string'
      ? JSON.parse(event.body)
      : event.body

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid body')
  }

  return parsed
}