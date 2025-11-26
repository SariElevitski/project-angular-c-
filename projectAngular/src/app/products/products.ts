import { Component, OnInit } from '@angular/core';
import {Observable,Subject,switchMap,startWith,debounceTime,distinctUntilChanged,map,combineLatest} from 'rxjs';
import { Service } from '../service';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true, // 👈 הוסף את זה בחזרה!
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // לשורת חיפוש
  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  
  //זרם המוצרים הסופי
  products$!: Observable<Product[]>;

  // סינון מחיר
  minPrice: number | null = null;
  maxPrice: number | null = null;
  private priceTerms = new Subject<{min: number | null, max: number | null}>(); // 👈 הוסף () כאן!


  //הזרקת שירותים ROUTE
  constructor(private productService: Service, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    // 🔗 1. יצירת זרם מונח החיפוש (מטפל בקלט המשתמש)
    const searchFlow$ = this.searchTerms.pipe(
      startWith(this.searchTerm),
      debounceTime(300),
      distinctUntilChanged()
    );
    
    // 🏷️ 2. יצירת זרם מזהה הקטגוריה (מטפל בפרמטרים של ה-URL)
    const categoryIdFlow$ = this.route.queryParams.pipe(
      startWith({} as Params),
      map((params: Params) => {
        const id = params['categoryId'];
        // 🚨 לוגיקה מתוקנת: אם ID ריק, 'null', או '0' - החזר null
        // ה-String(id) מטפל בבטיחות בערכים כמו null/undefined
        if (!id || String(id) === '0' || String(id) === 'null') {
          return null;
        }
        // אם ID חוקי (לדוגמה '1', '2'), החזר אותו כמחרוזת
        return String(id);
      })
    ); 
    
    //זרם המחיר
    const priceFlow$ = this.priceTerms.pipe(
        // מתחיל עם ערכי ברירת המחדל (null, null)
        startWith({ min: this.minPrice, max: this.maxPrice }),
        debounceTime(300), // זמן המתנה לפני שליחת הבקשה
        // מונע שליחת בקשה אם הטווח לא השתנה מהותית
        distinctUntilChanged((prev, curr) => prev.min === curr.min && prev.max === curr.max)
    );

    //  שילוב הזרמים לקריאת שרת אחת
    this.products$ = combineLatest([
      searchFlow$, 
      categoryIdFlow$,
      priceFlow$
    ] as const).pipe(
      // מפעיל קריאת שרת בכל פעם שאחד הערכים משתנה
      switchMap(([term, categoryId, price]) =>
        this.productService.getProducts(term, categoryId, price.min, price.max)
      )
    );
  }
  
  
  // מופעל כאשר יש שינוי בקלט של תיבת החיפוש.
  onSearchChange(): void {
    this.searchTerms.next(this.searchTerm.trim());
  }

  //מופעל כאשר יש שינוי באחד משדות המחיר
  onPriceChange(): void {
    // נרמול הערכים: המרה למספר, ושליחת null אם השדה ריק או אפס (לצורך סינון אופציונלי)
    const min = this.minPrice ? Number(this.minPrice) : null;
    const max = this.maxPrice ? Number(this.maxPrice) : null;
    
    this.priceTerms.next({ min: min, max: max });
  }
}