import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../event/customer-created.event";

export default class CustomerFactory {

  private static _eventDispatcher: EventDispatcher;
  private static _enviaConsoleLogHandler: EventHandlerInterface;

  constructor(_eventDispatcher: EventDispatcher) {
    
  }
  
  public static RegisterHandlers(handler: EventHandlerInterface, _eventDispatcher: EventDispatcher) {
    this._eventDispatcher = _eventDispatcher;
    this._enviaConsoleLogHandler = handler
    this._eventDispatcher.register("CustomerCreatedEvent", this._enviaConsoleLogHandler);
  }

  public static create(name: string): Customer {
    this._eventDispatcher.notify( new CustomerCreatedEvent({}));
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);

    this._eventDispatcher.notify( new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address
    }));

    return customer;
  }
}
