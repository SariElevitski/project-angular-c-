export class Type {
  id: number;    // מזהה הסוג
  name: string;  // שם הסוג

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  
}

const type = new Type(1, "Shirt");
