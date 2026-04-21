import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import type { ProductRepositoryPort } from "@modules/product/application/ports/product.repository.port"
import type { Product } from "@modules/product/domain/product"
import { env } from '../../../../shared/config/env'

const client = new DynamoDBClient({ region: "us-east-1" })
const docClient = DynamoDBDocumentClient.from(client)
const TABLE = env.PRODUCT_TABLE

export const productRepository: ProductRepositoryPort = {
  async create(product: Product) {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: product
      })
    )
  },
}