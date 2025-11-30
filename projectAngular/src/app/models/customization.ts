export class Customization {
  id: number;             // מזהה ההתאמה
  productId: number;      // מזהה המוצר
  textToPrint: string;    // טקסט להדפסה
  colorText: string;      // צבע טקסט
  fontName: string;       // שם הפונט
  sizeText: number;       // גודל הטקסט

  constructor(
    id: number,
    productId: number,
    textToPrint: string,
    colorText: string,
    fontName: string,
    sizeText: number
  ) {
    this.id = id;
    this.productId = productId;
    this.textToPrint = textToPrint;
    this.colorText = colorText;
    this.fontName = fontName;
    this.sizeText = sizeText;
  }
}

