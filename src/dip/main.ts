// import { IndividualCustomer } from './classes/customer';
import { EnterpriseCustomer } from './classes/customer';
import { FiftyPercentDiscount } from './classes/discount';
import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';

const cart = new ShoppingCart(new FiftyPercentDiscount());
const messaging = new Messaging();
const persistency = new Persistency();
// const individualCustomer = new IndividualCustomer(
//   'John',
//   'Doe',
//   '123.456.789-00',
// );
const enterpriseCustomer = new EnterpriseCustomer(
  'ACME Inc.',
  '12.345.678/0001-00',
);
const order = new Order(cart, messaging, persistency, enterpriseCustomer);

cart.addItem(new Product('Book', 10.1234));
cart.addItem(new Product('Pen', 2.01));
cart.addItem(new Product('Notebook', 5.99));
console.log(cart.items);
console.log('Total:', cart.total());

cart.removeItem(0);
console.log(cart.items);
console.log('Total:', cart.total());
console.log('Total com desconto:', cart.totalWithDiscount());

order.checkout();
console.log(cart.items);
console.log('Status do pedido:', order.orderStatus);
