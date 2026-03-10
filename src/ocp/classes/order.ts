import { OrderStatus } from './interfaces/order-status';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { ShoppingCart } from './shopping-cart';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    public readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
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
    this.persistency.saveOrder();
    this.cart.clear();
    console.log('Pedido finalizado.');
  }
}
