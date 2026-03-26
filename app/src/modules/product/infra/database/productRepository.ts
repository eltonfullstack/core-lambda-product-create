import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"
import { ProductRepositoryPort } from "@modules/product/application/ports/product.repository.port"
import { Product } from "@modules/product/domain/product"

const client = new DynamoDBClient({ region: "us-east-1" })
const docClient = DynamoDBDocumentClient.from(client)
const TABLE = process.env.PRODUCT_TABLE

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