import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";
import EnviaConsoleLog1Handler from "../event/handler/EnviaConsoleLog1Handler";
import EnviaConsoleLog2Handler from "../event/handler/EnviaConsoleLog2Handler";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EnviaConsoleLogHandler from "../event/handler/EnviaConsoleLogHandler";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const eventDispatcher = new EventDispatcher();
    const spyeEventDispatcher = jest.spyOn(eventDispatcher, "notify");

    CustomerFactory.RegisterHandlers(new EnviaConsoleLog1Handler(), eventDispatcher)
    CustomerFactory.RegisterHandlers(new EnviaConsoleLog2Handler(), eventDispatcher)

    let customer = CustomerFactory.create("John");

    eventDispatcher.unregisterAll();

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();

  });

  it("should create a customer validate notify event", () => {
    const eventDispatcher = new EventDispatcher();
    const spyeEventDispatcher = jest.spyOn(eventDispatcher, "notify");

    CustomerFactory.RegisterHandlers(new EnviaConsoleLog1Handler(), eventDispatcher)
    CustomerFactory.RegisterHandlers(new EnviaConsoleLog2Handler(), eventDispatcher)

    CustomerFactory.create("John");

    eventDispatcher.unregisterAll();

    expect(spyeEventDispatcher).toHaveBeenCalled();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");

    let customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
  });

  it("should create a customer with an address validate event notify", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");

    const eventDispatcher = new EventDispatcher();
    const spyeEventDispatcher = jest.spyOn(eventDispatcher, "notify");

    CustomerFactory.RegisterHandlers(new EnviaConsoleLogHandler(), eventDispatcher)

    CustomerFactory.createWithAddress("John", address);

    expect(spyeEventDispatcher).toHaveBeenCalled();
  });
});
