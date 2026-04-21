import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createProductController } from "../../../../modules/product/interface/http/controllers/productController"
import { handleHttpError } from "../../../../modules/product/interface/http/errors/handleHttpError"
import logger from '@shared/logger/logger'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {

    logger.info('Creating product handler')
    logger.info('event', event as any)
    
    return await createProductController(event)
  } catch (error) {
    return handleHttpError(error)
  }
}