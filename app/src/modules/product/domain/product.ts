export type Product = {
  id: string
  name: string
  price: number
  quantity: number
}

export const validateProduct = (product: Product) => {
  if (product.quantity <= 0) {
    throw new Error('Product quantity must be greater than 0')
  }
}