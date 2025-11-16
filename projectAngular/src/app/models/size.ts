export class Size {
  id: number;         // מזהה הגודל
  sizeName: string;   // שם הגודל

  constructor(id: number,sizeName: string) {
    this.id = id;
    this.sizeName = sizeName;
  }
}

const size = new Size(1, "Medium");