import { validateProduct, Product } from '../../../../../src/modules/product/domain/product';

describe('Product Domain - validateProduct', () => {
  const validProduct: Product = {
    id: '1',
    name: 'Notebook',
    price: 3000,
    quantity: 10,
  };

  it('should not throw when product quantity is greater than 0', () => {
    expect(() => validateProduct(validProduct)).not.toThrow();
  });

  it('should throw error when quantity is 0', () => {
    const invalidProduct = { ...validProduct, quantity: 0 };

    expect(() => validateProduct(invalidProduct))
      .toThrow('Product quantity must be greater than 0');
  });

  it('should throw error when quantity is negative', () => {
    const invalidProduct = { ...validProduct, quantity: -5 };

    expect(() => validateProduct(invalidProduct))
      .toThrow('Product quantity must be greater than 0');
  });
});