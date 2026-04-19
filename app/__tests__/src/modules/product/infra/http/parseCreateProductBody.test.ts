import { parseBody } from '../../../../../../src/modules/product/infra/http/parseCreateProductBody';

describe('parseBody', () => {
  it('should parse body when it is a valid JSON string', () => {
    const event = {
      body: JSON.stringify({ name: 'Product', price: 10 }),
    };

    const result = parseBody(event);

    expect(result).toEqual({ name: 'Product', price: 10 });
  });

  it('should return body when it is already an object', () => {
    const event = {
      body: { name: 'Product', price: 10 },
    };

    const result = parseBody(event);

    expect(result).toEqual({ name: 'Product', price: 10 });
  });

  it('should throw error when parsed body is null', () => {
    const event = {
      body: 'null',
    };

    expect(() => parseBody(event)).toThrow('Invalid body');
  });

  it('should throw error when parsed body is not an object', () => {
    const event = {
      body: JSON.stringify('string'),
    };

    expect(() => parseBody(event)).toThrow('Invalid body');
  });

  it('should throw error when body is invalid JSON', () => {
    const event = {
      body: '{ invalid json }',
    };

    expect(() => parseBody(event)).toThrow();
  });

  it('should throw error when event is invalid', () => {
    expect(() => parseBody(null)).toThrow('Invalid body');
    expect(() => parseBody(undefined)).toThrow('Invalid body');
  });

  it('should return event when there is no body', () => {
    const event = {
      name: 'Product',
      price: 10,
    };

    const result = parseBody(event);

    expect(result).toEqual(event);
  });
});