import type { APIGatewayProxyEvent } from 'aws-lambda'

export function parseBody<T = Record<string, unknown>>(
  event: APIGatewayProxyEvent
): T {
  console.log('BODY:', event.body)
  if (!event.body) {
    throw new Error('Invalid body')
  }

  let parsed: unknown = event.body

  // caso AWS padrão (string)
  if (typeof event.body === 'string') {
    try {
      parsed = JSON.parse(event.body)
    } catch {
      throw new Error('Invalid JSON body')
    }
  }

  // caso já venha objeto (Postman / mock / API Gateway mal configurado)
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Invalid body format')
  }

  return parsed as T
}