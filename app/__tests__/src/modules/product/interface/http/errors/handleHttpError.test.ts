import { handleHttpError } from '../../../../../../../src/modules/product/interface/http/errors/handleHttpError';
import { errorResponse } from '../../../../../../../src/shared/response/response';
import { formatZodError } from '../../../../../../../src/shared/utils/zodErrorFormatter';
import { ZodError } from 'zod';

jest.mock('../../../../../../../src/shared/response/response', () => ({
  errorResponse: jest.fn(),
}));

jest.mock('../../../../../../../src/shared/utils/zodErrorFormatter', () => ({
  formatZodError: jest.fn(),
}));

describe('handleHttpError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle ZodError correctly', () => {
    const zodError = new ZodError([]);
    const formatted = [{ field: 'name', message: 'Required' }];

    (formatZodError as jest.Mock).mockReturnValue(formatted);
    (errorResponse as jest.Mock).mockReturnValue({
      statusCode: 400,
    });

    const result = handleHttpError(zodError, {});

    expect(formatZodError).toHaveBeenCalledWith(zodError, {});
    expect(errorResponse).toHaveBeenCalledWith(
      400,
      'Validation error',
      formatted
    );

    expect(result).toEqual({
      statusCode: 400,
    });
  });

  it('should handle generic error correctly', () => {
    const error = new Error('Something went wrong');

    (errorResponse as jest.Mock).mockReturnValue({
      statusCode: 500,
    });

    const result = handleHttpError(error);

    expect(errorResponse).toHaveBeenCalledWith(
      500,
      'Internal server error',
      [
        { field: '_', message: 'Something went wrong' },
      ]
    );

    expect(result).toEqual({
      statusCode: 500,
    });
  });
});