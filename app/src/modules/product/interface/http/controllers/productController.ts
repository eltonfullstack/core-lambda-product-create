import type { z } from 'zod'
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { createProductUseCase } from '../../../../product/application/usecases/createProduct'
import { productRepository } from '../../../../product/infra/database/productRepository'

import { createProductSchema } from '../validators/createProduct.schema'

import logger from '../../../../../shared/logger/logger'
import { validate } from '../validators/validate'
import { successResponse } from '../../../../../shared/response'
import { parseBody } from '../../../../product/infra/http/parseCreateProductBody'

type CreateProductInput = z.infer<typeof createProductSchema>

export const createProductController = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  logger.info('Creating product')

  const body = parseBody(event)

  const data: CreateProductInput = validate(createProductSchema, body)

  await createProductUseCase(productRepository, data)

  return successResponse(201, `${data.name} was created`)
}