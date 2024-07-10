import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const app = express();
app.use(cors());
const port = 3000;

const currency = faker.finance.currency();

const mockedData = () =>
  Array.from({ length: Math.round(Math.random() * 10) + 10 }, (_item) => ({
    id: faker.string.uuid(),
    name: faker.commerce.product(),
    image: faker.image.urlLoremFlickr({ width: 280, height: 180 }),
    price: faker.number.float({ min: 0.5, max: 5, fractionDigits: 1 }),
    currency,
    quantity: faker.number.int({ min: 0, max: 15 }),
  }));

app.get("/", (_req, res) => {
  res.send(JSON.stringify(mockedData()));
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
