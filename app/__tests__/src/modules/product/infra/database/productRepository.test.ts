const sendMock = jest.fn()

jest.mock('@aws-sdk/lib-dynamodb', () => {
  const actual = jest.requireActual('@aws-sdk/lib-dynamodb')

  return {
    ...actual,
    DynamoDBDocumentClient: {
      from: jest.fn(() => ({
        send: sendMock,
      })),
    },
    PutCommand: jest.fn((input) => input),
  }
})

// ⚠️ IMPORTANTE: env antes do import
process.env.TABLE_NAME = 'products'

// 🔥 IMPORT depois do mock
import { productRepository } from '../../../../../../src/modules/product/infra/database/productRepository'
import { PutCommand } from '@aws-sdk/lib-dynamodb'

describe('productRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should send PutCommand to DynamoDB', async () => {
    sendMock.mockResolvedValue({})

    const product = {
      id: '1',
      name: 'Mouse',
      price: 100,
      quantity: 2,
    }

    await productRepository.create(product)

    expect(PutCommand).toHaveBeenCalledWith({
      TableName: 'products',
      Item: product,
    })

    expect(sendMock).toHaveBeenCalledTimes(1)
  })

  it('should throw if DynamoDB fails', async () => {
    sendMock.mockRejectedValue(new Error('Dynamo error'))

    const product = {
      id: '1',
      name: 'Keyboard',
      price: 200,
      quantity: 1,
    }

    await expect(productRepository.create(product))
      .rejects.toThrow('Dynamo error')
  })
})