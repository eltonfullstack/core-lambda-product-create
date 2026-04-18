import { Product } from "../../../product/domain/product"

export type ProductRepositoryPort = {
    create: (product: Product) => Promise<void>
}
