export class Customer {

  id: number;              // מזהה הלקוח
  fullName: string;       // שם מלא
  email: string;          // דוא"ל
  birthday: Date;         // תאריך לידה
  phone: string;          // טלפון

  constructor(
    id: number,
    fullName: string,
    email: string,
    birthday: Date,
    phone: string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.birthday = birthday;
    this.phone = phone;
  }
}



