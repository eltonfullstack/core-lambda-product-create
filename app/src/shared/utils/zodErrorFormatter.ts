import { ZodError, ZodIssue } from "zod"

export type FieldError = {
  field: string
  message: string
}

/**
 * Formata os erros do Zod para um padrão consistente.
 * @param error - instância de ZodError
 * @param inputData - objeto que foi validado
 * @returns FieldError[]
 */
export const formatZodError = (
  error: ZodError,
  inputData: Record<string, any> = {}
): FieldError[] => {
  return error.issues.map((err: ZodIssue) => {
    const field = err.path.join('.')
    let message = err.message

    if (err.code === "invalid_type") {
      const hasField = field in inputData

      if (!hasField) {
        message = `Field '${field}' is required`
      } else {
        message = `Field '${field}' must be a valid type`
      }
    }

    return {
      field,
      message
    }
  })
}