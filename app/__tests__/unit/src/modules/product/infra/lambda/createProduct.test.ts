import type { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../../../../../../src/modules/product/infra/lambda/createProduct';
import { createProductController } from '../../../../../../../src/modules/product/interface/http/controllers/productController';
import { handleHttpError } from '../../../../../../../src/modules/product/interface/http/errors/handleHttpError';

jest.mock('../../../../../../../src/modules/product/interface/http/controllers/productController', () => ({
  createProductController: jest.fn(),
}));

jest.mock('../../../../../../../src/modules/product/interface/http/errors/handleHttpError', () => ({
  handleHttpError: jest.fn(),
}));



describe('Lambda createProduct handler', () => {
  const event = {
    body: JSON.stringify({ name: 'Product', price: 10 }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return controller response on success', async () => {
    const mockResponse = {
      statusCode: 201,
      body: JSON.stringify({ id: '1' }),
    };

    (createProductController as jest.Mock).mockResolvedValue(mockResponse);

    const result = await handler(event as APIGatewayProxyEvent);

    expect(createProductController).toHaveBeenCalledWith(event);
    expect(result).toEqual(mockResponse);
  });

  it('should call handleHttpError when controller throws', async () => {
    const error = new Error('fail');
    const errorResponse = {
      statusCode: 500,
      body: JSON.stringify({ message: 'error' }),
    };

    (createProductController as jest.Mock).mockRejectedValue(error);
    (handleHttpError as jest.Mock).mockReturnValue(errorResponse);

    const result = await handler(event as APIGatewayProxyEvent);

    expect(createProductController).toHaveBeenCalledWith(event);
    expect(handleHttpError).toHaveBeenCalledWith(error);
    expect(result).toEqual(errorResponse);
  });
});