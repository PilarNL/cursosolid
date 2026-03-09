import { Item } from './interfaces/cart-item';

export class ShoppingCart {
  private readonly _items: Item[] = [];

  addItem(item: Item): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<Item[]> {
    return this._items;
  }

  total(): number {
    return +this._items
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    console.log('Limpando carrinho...');
    this._items.length = 0;
    console.log('Carrinho limpo.');
  }
}
