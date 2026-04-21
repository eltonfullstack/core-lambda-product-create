import { PutCommand } from '@aws-sdk/lib-dynamodb';

const sendMock = jest.fn();

jest.mock('@aws-sdk/lib-dynamodb', () => {
  const sendMockLocal = jest.fn();

  return {
    DynamoDBDocumentClient: {
      from: jest.fn(() => ({
        send: sendMockLocal,
      })),
    },
    PutCommand: jest.fn((input) => ({
      input,
    })),
    __sendMock: sendMockLocal,
  };
});

// 🔥 IMPORT DEPOIS DO MOCK
import { productRepository } from '../../../../../../src/modules/product/infra/database/productRepository';

const { __sendMock } = require('@aws-sdk/lib-dynamodb');

describe('productRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send PutCommand to DynamoDB', async () => {
    __sendMock.mockResolvedValue({});

    const product = {
      id: '1',
      name: 'Mouse',
      price: 100,
      quantity: 2,
    };

    await productRepository.create(product);

    expect(PutCommand).toHaveBeenCalledWith({
      TableName: 'products',
      Item: product,
    });

    expect(__sendMock).toHaveBeenCalledTimes(1);
  });

  xit('should throw if DynamoDB fails', async () => {
    __sendMock.mockRejectedValue(new Error('Dynamo error'));

    const product = {
      id: '1',
      name: 'Keyboard',
      price: 200,
      quantity: 1,
    };

    await expect(productRepository.create(product))
      .rejects.toThrow('Dynamo error');
  });
});