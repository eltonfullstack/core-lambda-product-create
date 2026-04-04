import { ZodError } from "zod"
import { FieldError } from "@shared/response/response"

export const formatZodError = (
  error: ZodError,
  inputData: Record<string, unknown>
): FieldError[] => {
  return error.issues.map((err) => {
    const field = err.path.join(".")
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
      message,
    }
  })
}