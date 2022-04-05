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

describe("Order repository test", () => {
    let sequelize: Sequelize;

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
      const productRepository = new ProductRepository();
      const orderRepository = new OrderRepository();

      const customer = new Customer("123", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository.create(customer);
  
      
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
      await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
          where: { id: order.id },
          include: ["items"],
        });

      expect(orderModel?.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: order.total(),
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

    it("Should update a Order", async () => {

        const customerRepository2 = new CustomerRepository();
        const productRepository2 = new ProductRepository();
        const orderRepository2 = new OrderRepository();

        const customer2 = new Customer("123", "Customer 2");
        const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer2.changeAddress(address2);
        await customerRepository2.create(customer2);

        const product = new Product("123", "Product 2", 10);
        await productRepository2.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);
        await orderRepository2.create(order);

        // Updating Order
        const customer = new Customer("456", "Customer 2");
        const address = new Address("Street 2", 2, "Zipcode 2", "City 2");
        customer.changeAddress(address);
        await customerRepository2.create(customer);

        const product2 = new Product("456", "Product 2", 20);
        await productRepository2.create(product2);
        const orderItem2 = new OrderItem(
            "2",
            product2.name,
            product2.price,
            product2.id,
            2
        );
        order.changeCustomerId("456")
        order.changeItems([orderItem2])

        expect(order.customerId).toBe("456");
        expect(order.items).toEqual([orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
          where: { id: "123" },
          include: [
            {
              model: OrderItemModel
            }
          ]
        });

        const updatedOrder = await orderRepository.find("123");

        expect(orderModel?.toJSON()).toStrictEqual({
          id: updatedOrder.id,
          customer_id: updatedOrder.customerId,
          total: updatedOrder.total(),
          items: [
            {
              id: orderItem2.id,
              name: orderItem2.name,
              price: orderItem2.price,
              quantity: orderItem2.quantity,
              order_id: updatedOrder.id,
              product_id: product2.id,
            },
          ],
        });
    });

    it("should find all orders", async () => {

        const customerRepository2 = new CustomerRepository();
        const productRepository2 = new ProductRepository();
        const orderRepository2 = new OrderRepository();

        const customer = new Customer("890", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository2.create(customer);
        const product = new Product("890", "Product 1", 10);

        await productRepository2.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("890", "890", [orderItem]);
        await orderRepository2.create(order);

        const foundOrders = await orderRepository2.findAll();
        const orders = [order];

        expect(orders).toEqual(foundOrders);
    });

    it("should find a order", async () => {

      const customerRepository2 = new CustomerRepository();
      const productRepository2 = new ProductRepository();
      const orderRepository2 = new OrderRepository();

      const customer = new Customer("890", "Customer 1");
      const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
      customer.changeAddress(address);
      await customerRepository2.create(customer);
      const product = new Product("890", "Product 1", 10);

      await productRepository2.create(product);

      const orderItem = new OrderItem(
          "1",
          product.name,
          product.price,
          product.id,
          2
      );
      
      const newOder = new Order("890", "890", [orderItem]);
      await orderRepository2.create(newOder);

      const order = await orderRepository2.find("890");

      expect(order).toEqual(newOder);
  });

});
