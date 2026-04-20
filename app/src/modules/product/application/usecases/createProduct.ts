import { v4 as uuid } from "uuid"
import type { Product} from "../../../product/domain/product";
import { validateProduct } from "../../../product/domain/product"
import type { ProductRepositoryPort } from "../../../product/application/ports/product.repository.port"

export const createProductUseCase = async (repository: ProductRepositoryPort, data: Omit<Product, "id">) => {
  
  const product: Product = { id: uuid(), ...data }
  validateProduct(product)

  await repository.create(product)
  return product

}