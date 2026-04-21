import { errorResponse } from '../../../../../shared/response/response'
import { formatZodError } from '../../../../../shared/utils/zodErrorFormatter'
import { ZodError } from 'zod'

export function handleHttpError(
  error: unknown,
  body?: Record<string, unknown>
) {
  if (error instanceof ZodError) {
    return errorResponse(
      400,
      'Validation error',
      formatZodError(error, body ?? {})
    )
  }

  if (error instanceof Error) {
    return errorResponse(500, 'Internal server error', [
      { field: '_', message: error.message },
    ])
  }

  return errorResponse(500, 'Internal server error', [
    { field: '_', message: 'Unknown error' },
  ])
}