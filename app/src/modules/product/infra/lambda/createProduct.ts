import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createProductController } from "../../../../modules/product/interface/http/controllers/productController"
import { handleHttpError } from "../../../../modules/product/interface/http/errors/handleHttpError"

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return await createProductController(event)
  } catch (error) {
    return handleHttpError(error)
  }
}