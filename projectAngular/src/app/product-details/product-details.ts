import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // 👈 הוסף ChangeDetectorRef
import { ActivatedRoute,RouterModule } from '@angular/router';
import { Service } from '../service';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms'
import {Customization} from '../models/customization'
import { Product } from '../models/product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, OnDestroy {
  product: any = null;
  loading: boolean = true;
  error: string = '';
  private destroy$ = new Subject<void>();
  private currentRequestSub?: Subscription;

//הצגה של קלט התאמה אישית או לא
  Customization : boolean = false
// המשתנה לקישור בין נתון לתצוגה - לכיתוב
  Caption : String | null = null

  public Color: string = '#000000'

  constructor(
    private route: ActivatedRoute, 
    private Service: Service,
    private cdr: ChangeDetectorRef // 👈 הוסף את זה
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const id = Number(params.get('id'));
      
      if (id && !isNaN(id)) {
        this.loadProduct(id);
      } else {
        this.error = 'מזהה מוצר לא תקין';
        this.loading = false;
        
      }
    });
  }

  private loadProduct(id: number) {
    this.loading = true;
    this.product = null;
    this.error = '';


    this.Service
      .getProductById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.product = res;
          this.loading = false;
          this.cdr.markForCheck(); // 👈 הוסף את זה
        },
        error: (err) => {
          this.error = 'שגיאה בטעינת המוצר';
          this.loading = false;
          this.cdr.markForCheck(); // 👈 הוסף גם כאן
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleAddToCart(): void {
// 1. בדיקה: האם המשתמש נמצא במצב "התאמה אישית"?
    // אם Customization = true, זה אומר שהמשתמש לחץ על הכפתור ופתח את אפשרויות העריכה.
    const isCustomizedMode = this.Customization === true;

    let itemToAdd: Product | (Product & { customization?: Customization });
    
    // 2. בדיקה: האם יש טקסט שהוזן? (אם יש טקסט, נניח שההתאמה בוצעה)
    const textIsPresent = this.Caption && this.Caption.trim().length > 0;
    
    if (isCustomizedMode && textIsPresent) {
      // 3. יצירת אובייקט Customization חדש
      const customizationData: Customization = {
        id: Date.now(), // ⬅️ ID ייחודי זמני
        productId: this.product.id,
        textToPrint: this.Caption!.trim(), // ⬅️ ! מכיוון שבדקנו ש-textIsPresent הוא true
        colorText: this.Color,
        fontName: 'Arial', // ⬅️ דוגמה לפונט ברירת מחדל
        sizeText: 14, // ⬅️ דוגמה לגודל ברירת מחדל
      };

      // 4. יצירת פריט עגלה מורכב (מוצר + התאמה אישית)
      itemToAdd = {
        ...this.product,
        customization: customizationData,
      };

    } else {
      // 5. הוספת המוצר הרגיל (ללא customization)
      itemToAdd = this.product;        
    }

    this.Service.addToCart(itemToAdd);
    }

}