import { createProductController } from "../../../../modules/product/interface/http/controllers/productController"
import { handleHttpError } from "../../../../modules/product/interface/http/errors/handleHttpError"

export const handler = async (event: any) => {

  try {
    return await createProductController(event)
  } catch (error) {
    return handleHttpError(error)
  }
}