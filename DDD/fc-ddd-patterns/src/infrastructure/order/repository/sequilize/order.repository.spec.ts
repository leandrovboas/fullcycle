import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";
import { extendSequelize } from "@hatchifyjs/sequelize-create-with-associations";

describe("Order repository test", () => {
  let sequelize: Sequelize;
  extendSequelize(Sequelize);
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      isActive: order.IsActive(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

  const orderResult = await orderRepository.find(order.id);

  expect(order).toStrictEqual(orderResult);
});

it("should throw an error when order is not found", async () => {
  const orderRepository = new OrderRepository();

  expect(async () => {
    await orderRepository.find("456ABC");
  }).rejects.toThrow("Order not found");
});

it("should find all orders", async () => {
  const customerRepository = new CustomerRepository();
  const customer = new Customer("321", "Customer 1");
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  customer.changeAddress(address);
  await customerRepository.create(customer);

  const customer2 = new Customer("21", "Customer 1");
  customer2.changeAddress(address);
  await customerRepository.create(customer2);

  const productRepository = new ProductRepository();
  const product = new Product("321", "Product 1", 10);
  await productRepository.create(product);

  const orderItem = new OrderItem(
    "1",
    product.name,
    product.price,
    product.id,
    2
  );
  const orderItem2 = new OrderItem(
    "2",
    product.name,
    product.price,
    product.id,
    2
  );

  const order1 = new Order("123", "321", [orderItem]);
  const order2 = new Order("321", "21", [orderItem2]);

  const orderRepository = new OrderRepository();
  await orderRepository.create(order1);
  await orderRepository.create(order2);

  const orders = await orderRepository.findAll();

  expect(orders).toHaveLength(2);
  expect(orders).toContainEqual(order1);
  expect(orders).toContainEqual(order2);
});

it("should update a order", async () => {
  const customerRepository = new CustomerRepository();
  const customer = new Customer("123", "Customer 1");
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  customer.changeAddress(address);
  await customerRepository.create(customer);

  const productRepository = new ProductRepository();
  const product = new Product("123", "Product 1", 10);
  await productRepository.create(product);

  const orderItem = new OrderItem(
    "1",
    product.name,
    product.price,
    product.id,
    2
  );

  const order = new Order("123", "123", [orderItem]);

  const orderRepository = new OrderRepository();
  await orderRepository.create(order);
  order.changeActive(false)
  await orderRepository.update(order);
  const orderModel = await OrderModel.findOne(
    { where: { id: "123" } });

    expect(orderModel.isActive === order.IsActive());
});

});
