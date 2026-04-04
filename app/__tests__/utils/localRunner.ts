import { handler } from "../../src/modules/product/infra/lambda/createProduct";

const mockEvent = {
  body: JSON.stringify({
    name: "Product 3",
    price: 103,
    quantity: 30,
  }),
};

handler(mockEvent)
  .then((res: any) => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch((err: any) => {
    console.log("err", err);
  });