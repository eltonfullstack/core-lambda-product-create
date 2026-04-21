import { z } from 'zod';
import { formatZodError } from '../../../../../src/shared/utils/zodErrorFormatter';

describe('formatZodError', () => {
  it('should format zod error', () => {
    const schema = z.object({
      name: z.string(),
    });

    const result = schema.safeParse({});

    expect(result.success).toBe(false);

    if (!result.success) {
      const formatted = formatZodError(result.error, {});

      expect(formatted).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
          }),
        ])
      );
    }
  });

  it('should detect invalid type when field exists in inputData', () => {
    const schema = z.object({
      price: z.number(),
    });

    const result = schema.safeParse({
      price: 'not-a-number',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const formatted = formatZodError(result.error, {
        price: 'not-a-number',
      });

      expect(formatted[0].field).toBe('price');
    }
  });
});