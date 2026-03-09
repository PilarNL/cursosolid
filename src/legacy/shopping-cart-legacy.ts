type Item = {
  name: string;
  price: number;
};
type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  private readonly _items: Item[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: Item): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<Item[]> {
    return this._items;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  set orderStatus(status: OrderStatus) {
    this._orderStatus = status;
  }

  total(): number {
    return +this._items
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(message: string): void {
    console.log('Mensagem enviada:', message);
  }

  saveOrder(): void {
    console.log('Pedido salvo com sucesso.');
  }

  clear(): void {
    console.log('Limpando carrinho...');
    this._items.length = 0;
    console.log('Carrinho limpo.');
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('O carrinho está vazio.');
      return;
    }
    this.orderStatus = 'closed';
    this.sendMessage('Obrigado pela compra!');
    this.saveOrder();
    this.clear();
    console.log('Pedido finalizado.');
  }
}

const cart = new ShoppingCartLegacy();
cart.addItem({ name: 'Book', price: 10.1234 });
cart.addItem({ name: 'Pen', price: 2.01 });
cart.addItem({ name: 'Notebook', price: 5.99 });
console.log(cart.items);
console.log('Total:', cart.total());
cart.removeItem(0);
console.log(cart.items);
console.log('Total:', cart.total());
cart.checkout();
console.log(cart.items);
console.log('Status do pedido:', cart.orderStatus);
