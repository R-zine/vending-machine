import express from "express";
import { faker } from "@faker-js/faker";

const app = express();
const port = 3000;

const mockedData = () =>
  Array.from({ length: Math.round(Math.random() * 10) + 10 }, (_item) => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    price: faker.commerce.price({ min: 0.5, max: 5, dec: 2, symbol: "$" }),
    quantity: faker.number.int({ min: 0, max: 15 }),
  }));

app.get("/", (_req, res) => {
  res.send(JSON.stringify(mockedData()));
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
