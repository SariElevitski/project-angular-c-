export class OrderItem {
  id: number;                // מזהה הפריט בהזמנה
  orderId: number;           // מזהה ההזמנה
  productId: number;         // מזהה המוצר
  customizationsId: number;  // מזהה ההתאמה
  quantity: number;          // כמות
  pricePerUnit: number;      // מחיר ליחידה

  constructor(id: number,
    orderId: number,
    productId: number,
    customizationsId: number,
    quantity: number,
    pricePerUnit: number
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.customizationsId = customizationsId;
    this.quantity = quantity;
    this.pricePerUnit = pricePerUnit;
  }
}


const orderItem = new OrderItem(1, 1, 201, 301, 2, 25.00);