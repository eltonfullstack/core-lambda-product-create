import { successResponse, errorResponse } from '../../../../src/shared/response/response';

describe('response utils', () => {
  it('should create success response with JSON body', () => {
    const result = successResponse(200, { id: '1' });

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ id: '1' }),
    });
  });

  it('should create error response without errors array', () => {
    const result = errorResponse(400, 'Bad request');

    expect(result).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bad request',
      }),
    });
  });

  it('should create error response with errors array', () => {
    const errors = [
      { field: 'name', message: 'Required' },
    ];

    const result = errorResponse(422, 'Validation error', errors);

    expect(result).toEqual({
      statusCode: 422,
      body: JSON.stringify({
        message: 'Validation error',
        errors,
      }),
    });
  });
});