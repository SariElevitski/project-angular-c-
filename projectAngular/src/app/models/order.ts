export class Order {
  id: number;             // מזהה ההזמנה
  customersId: number;    // מזהה הלקוח
  orderDate: Date;        // תאריך ההזמנה
  totalPrice: number;     // מחיר כולל

  constructor(id: number,customersId: number,orderDate: Date,totalPrice: number) {
    this.id = id;
    this.customersId = customersId;
    this.orderDate = orderDate;
    this.totalPrice = totalPrice;
  }
}

const order = new Order(1, 1, new Date(), 100.50);
