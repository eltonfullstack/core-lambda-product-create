import type { APIGatewayProxyEvent } from 'aws-lambda'

export function parseBody<T = Record<string, unknown>>(
  event: APIGatewayProxyEvent
): T {
  const body = event.body

  if (!body) {
    throw new Error('Missing body')
  }

  // caso 1: AWS padrão (string JSON)
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as T
    } catch {
      throw new Error('Invalid JSON body')
    }
  }

  // caso 2: já veio objeto (Postman / mock / gateway alterado)
  if (typeof body === 'object') {
    return body as T
  }

  throw new Error('Invalid body format')
}