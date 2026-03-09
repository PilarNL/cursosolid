import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import { Product } from './entities/product';
import { ShoppingCart } from './entities/shopping-cart';

const cart = new ShoppingCart();
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(cart, messaging, persistency);

cart.addItem(new Product('Book', 10.1234));
cart.addItem(new Product('Pen', 2.01));
cart.addItem(new Product('Notebook', 5.99));
console.log(cart.items);
console.log('Total:', cart.total());

cart.removeItem(0);
console.log(cart.items);
console.log('Total:', cart.total());

order.checkout();
console.log(cart.items);
console.log('Status do pedido:', order.orderStatus);
