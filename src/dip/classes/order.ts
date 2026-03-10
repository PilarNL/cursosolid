import { OrderStatus } from './interfaces/order-status';
import { CustomerProtocol } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    public readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly customer: CustomerProtocol,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  set orderStatus(status: OrderStatus) {
    this._orderStatus = status;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log('O carrinho está vazio.');
      return;
    }
    this.orderStatus = 'closed';
    this.messaging.sendMessage(
      `Obrigado pela compra! Seu pedido de ${this.cart.totalWithDiscount().toFixed(2)} foi recebido.`,
    );
    console.log(
      `O cliente é ${this.customer.getName()} - ${this.customer.getIDN()}`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
    console.log('Pedido finalizado.');
  }
}
