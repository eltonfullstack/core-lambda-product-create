import { createProductUseCase } from "@modules/product/application/usecases/createProduct"
import { productRepository } from "@modules/product/infra/database/productRepository"
import logger from "@shared/logger/logger"
import { createProductSchema } from "../validators/createProduct.schema"

export const createController = async (data: any) => {

    logger.info('Creating product')

    const parsed = createProductSchema.parse(data)

    return createProductUseCase(productRepository, parsed)
}