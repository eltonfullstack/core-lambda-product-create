import { createProductController } from '../../../../../../../../src/modules/product/interface/http/controllers/productController'; // Importa o controlador de criação de produtomodules/product/interface/http/controllers/productController';
import { createProductUseCase } from '../../../../../../../../src/modules/product/application/usecases/createProduct';
import { validate } from '../../../../../../../../src/modules/product/interface/http/validators/validate';
import { parseBody } from '../../../../../../../../src/modules/product/infra/http/parseCreateProductBody';
import { successResponse } from '../../../../../../../../src/shared/response';
import type { APIGatewayProxyEvent } from 'aws-lambda';

jest.mock('../../../../../../../../src/modules/product/application/usecases/createProduct', () => ({
  createProductUseCase: jest.fn(),
}));

jest.mock('../../../../../../../../src/modules/product/infra/database/productRepository', () => ({
  productRepository: {},
}));

jest.mock('../../../../../../../../src/modules/product/interface/http/validators/validate', () => ({
  validate: jest.fn(),
}));

jest.mock('../../../../../../../../src/modules/product/infra/http/parseCreateProductBody', () => ({
  parseBody: jest.fn(),
}));

jest.mock('../../../../../../../../src/shared/response', () => ({
  successResponse: jest.fn(),
}));

jest.mock('../../../../../../../../src/shared/logger/logger', () => ({
  info: jest.fn(),
}));

describe('createProductController', () => {
  const event = {
    body: JSON.stringify({
      name: 'Mouse',
      price: 100,
      quantity: 2,
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create product successfully', async () => {
    const parsedBody = { name: 'Mouse', price: 100, quantity: 2 };
    const validatedData = parsedBody;

    (parseBody as jest.Mock).mockReturnValue(parsedBody);
    (validate as jest.Mock).mockReturnValue(validatedData);
    (createProductUseCase as jest.Mock).mockResolvedValue(undefined);
    (successResponse as jest.Mock).mockReturnValue({
      statusCode: 201,
      body: 'ok',
    });

    const result = await createProductController(event as APIGatewayProxyEvent);

    expect(parseBody).toHaveBeenCalledWith(event);
    expect(validate).toHaveBeenCalled();
    expect(createProductUseCase).toHaveBeenCalledWith(
      expect.any(Object),
      validatedData
    );
    expect(successResponse).toHaveBeenCalledWith(
      201,
      'Mouse was created'
    );

    expect(result).toEqual({
      statusCode: 201,
      body: 'ok',
    });
  });

  it('should throw if parseBody fails', async () => {
    (parseBody as jest.Mock).mockImplementation(() => {
      throw new Error('parse error');
    });

    await expect(createProductController(event as APIGatewayProxyEvent))
      .rejects.toThrow('parse error');
  });

  it('should throw if validation fails', async () => {
    (parseBody as jest.Mock).mockReturnValue({});
    (validate as jest.Mock).mockImplementation(() => {
      throw new Error('validation error');
    });

    await expect(createProductController(event as APIGatewayProxyEvent))
      .rejects.toThrow('validation error');
  });

  it('should throw if use case fails', async () => {
    (parseBody as jest.Mock).mockReturnValue({});
    (validate as jest.Mock).mockReturnValue({});
    (createProductUseCase as jest.Mock).mockRejectedValue(
      new Error('usecase error')
    );

    await expect(createProductController(event as APIGatewayProxyEvent))
      .rejects.toThrow('usecase error');
  });
});