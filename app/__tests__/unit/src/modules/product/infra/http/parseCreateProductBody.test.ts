import type { APIGatewayProxyEvent } from "aws-lambda";
import { parseBody } from "../../../../../../../src/modules/product/infra/http/parseCreateProductBody";

describe("parseBody", () => {
  it("should parse body when it is a valid JSON string", () => {
    const event = {
      body: JSON.stringify({ name: "Product", price: 10 }),
    };

    const result = parseBody(event as APIGatewayProxyEvent);

    expect(result).toEqual({ name: "Product", price: 10 });
  });

  it("should return body when it is already an object", () => {
    const event = {
      body: { name: "Product", price: 10 },
    };

    const result = parseBody(event as unknown as APIGatewayProxyEvent);

    expect(result).toEqual({ name: "Product", price: 10 });
  });

  xit("should throw error when parsed body is null", () => {
    const event = {
      body: "null",
    };

    expect(() => parseBody(event as APIGatewayProxyEvent)).toThrow(
      "Missing body",
    );
  });

  xit("should throw error when parsed body is not an object", () => {
    const event = {
      body: JSON.stringify("string"),
    };

    expect(() => parseBody(event as APIGatewayProxyEvent)).toThrow(
      "Missing body",
    );
  });

  it("should throw error when body is invalid JSON", () => {
    const event = {
      body: "{ invalid json }",
    };

    expect(() => parseBody(event as APIGatewayProxyEvent)).toThrow();
  });

  it("should throw error when event is invalid", () => {
    expect(() => parseBody({} as APIGatewayProxyEvent)).toThrow("Missing body");
    expect(() => parseBody({} as APIGatewayProxyEvent)).toThrow("Missing body");
  });

  it("should throw error when there is no body", () => {
    const event = {} as APIGatewayProxyEvent;

    expect(() => parseBody(event)).toThrow("Missing body");
  });
});
