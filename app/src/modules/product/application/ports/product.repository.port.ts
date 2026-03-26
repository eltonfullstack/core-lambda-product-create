import { Product } from "@modules/product/domain/product"

export type ProductRepositoryPort = {
    create: (product: Product) => Promise<void>
}
