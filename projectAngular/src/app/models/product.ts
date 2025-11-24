export class Product {

    
  id: number;                // מזהה המוצר
  name: string;              // שם המוצר
  price: number;             // מחיר המוצר
  imageUrl: string;          // כתובת ה-URL של התמונה
  categoryId: number;        // מזהה הקטגוריה
  sizeId: number;     
  typeId: number;     //תת קטגוריה

  constructor(id: number,name: string,price: number,imageUrl: string,categoryId: number,sizeId: number,typeId:number
) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.categoryId = categoryId;
    this.sizeId = sizeId;
    this.typeId = typeId;
  }

}


