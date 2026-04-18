import { createProductUseCase } from "../../../../../src/modules/product/application/usecases/createProduct"
import { ProductRepositoryPort } from "../../../../../src/modules/product/application/ports/product.repository.port"
import * as productDomain from "../../../../../src/modules/product/domain/product"

// mock do uuid (sem alterar produção)
jest.mock("uuid", () => ({
  v4: () => "fixed-id"
}))

// mock da validação do domínio
jest.spyOn(productDomain, "validateProduct").mockImplementation(jest.fn())

describe("createProductUseCase", () => {
  let repositoryMock: jest.Mocked<ProductRepositoryPort>

  beforeEach(() => {
    repositoryMock = {
      create: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<ProductRepositoryPort>

    jest.clearAllMocks()
  })

  it("should create a product successfully", async () => {
    const input = {
      name: "Product 1",
      price: 100,
      quantity: 10,
    }

    const result = await createProductUseCase(repositoryMock, input)

    expect(result).toEqual({
      id: "fixed-id",
      ...input,
    })

    expect(productDomain.validateProduct).toHaveBeenCalledWith(result)
    expect(repositoryMock.create).toHaveBeenCalledWith(result)
  })

  it("should call validateProduct before saving", async () => {
    const input = {
      name: "Product 2",
      price: 200,
      quantity: 20,
    }

    await createProductUseCase(repositoryMock, input)

    expect(productDomain.validateProduct).toHaveBeenCalledTimes(1)
  })

  it("should throw if validation fails", async () => {
    const input = {
      name: "",
      price: 100,
      quantity: 10,
    }

    ;(productDomain.validateProduct as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Validation error")
    })

    await expect(
      createProductUseCase(repositoryMock, input)
    ).rejects.toThrow("Validation error")

    expect(repositoryMock.create).not.toHaveBeenCalled()
  })
})