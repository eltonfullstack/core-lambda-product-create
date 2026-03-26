import * as dotenv from 'dotenv'
dotenv.config()

import { ZodError } from 'zod'
import { formatZodError } from './src/shared/utils/zodErrorFormatter'
import { createController } from './src/modules/product/interface/http/controllers/productController'
import { errorResponse, successResponse } from './src/shared/response'

export const handler = async (event: any) => {
  try {
    const body = JSON.parse(event.body)

    const product = await createController(body)

    return successResponse(201, product)

  } catch (error: any) {
    if (error instanceof ZodError) {
      return errorResponse(
        400,
        "Validation error",
        formatZodError(error)
      )
    }

    return errorResponse(500, "Internal server error", error.message)
  }
}