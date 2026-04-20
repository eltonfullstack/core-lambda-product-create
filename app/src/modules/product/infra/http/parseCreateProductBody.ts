type EventWithBody = {
  body?: string | Record<string, unknown>
} & Record<string, unknown>

export function parseBody(event: EventWithBody) {
  if (event?.body) {
    const parsed =
      typeof event.body === 'string'
        ? JSON.parse(event.body)
        : event.body

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid body')
    }

    return parsed
  }

  if (!event || typeof event !== 'object') {
    throw new Error('Invalid body')
  }

  return event
}