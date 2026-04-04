import { createProductController } from "@modules/product/interface/http/controllers/productController"
import { handleHttpError } from "@modules/product/interface/http/errors/handleHttpError"

export const handler = async (event: any) => {
  console.log('EVENT:', JSON.stringify(event, null, 2))

  try {
    return await createProductController(event)
  } catch (error) {
    return handleHttpError(error)
  }
}