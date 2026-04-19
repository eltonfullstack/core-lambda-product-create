import { formatZodError } from '../../../../src/shared/utils/zodErrorFormatter';
import { ZodError } from 'zod';

describe('formatZodError', () => {
  it('should format normal zod error issues', () => {
    const error = new ZodError([
      {
        path: ['name'],
        message: 'Required',
        code: 'invalid_type',
      } as any,
    ]);

    const result = formatZodError(error, {});

    expect(result).toEqual([
      {
        field: 'name',
        message: "Field 'name' is required",
      },
    ]);
  });

  it('should detect invalid type when field exists in inputData', () => {
    const error = new ZodError([
      {
        path: ['price'],
        message: 'Invalid type',
        code: 'invalid_type',
      } as any,
    ]);

    const result = formatZodError(error, {
      price: 'not-a-number',
    });

    expect(result).toEqual([
      {
        field: 'price',
        message: "Field 'price' must be a valid type",
      },
    ]);
  });

  it('should return default message when not invalid_type', () => {
    const error = new ZodError([
      {
        path: ['quantity'],
        message: 'Some error',
        code: 'custom',
      } as any,
    ]);

    const result = formatZodError(error, {});

    expect(result).toEqual([
      {
        field: 'quantity',
        message: 'Some error',
      },
    ]);
  });

  it('should handle nested paths', () => {
    const error = new ZodError([
      {
        path: ['user', 'name'],
        message: 'Required',
        code: 'invalid_type',
      } as any,
    ]);

    const result = formatZodError(error, {});

    expect(result).toEqual([
      {
        field: 'user.name',
        message: "Field 'user.name' is required",
      },
    ]);
  });
});