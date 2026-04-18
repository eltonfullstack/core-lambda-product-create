import { handler } from "../../src/modules/product/infra/lambda/createProduct";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const mockEvent: Partial<APIGatewayProxyEvent> = {
  body: JSON.stringify({
    name: "Product 3",
    price: 103,
    quantity: 30,
  }),
};

handler(mockEvent as APIGatewayProxyEvent)
  .then((res: APIGatewayProxyResult) => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch((err: unknown) => {
    console.log("err", err);
  });