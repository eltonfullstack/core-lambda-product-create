import { handler } from "../../main";

const mockEvent = {
  body: JSON.stringify({
    name: "Product 2",
    price: 101,
    quantity: 10,
  }),
};

handler(mockEvent)
  .then((res: any) => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch((err: any) => {
    console.log("err", err);
  });
