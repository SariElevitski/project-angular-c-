import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  switchMap,
  startWith,
  debounceTime,
  distinctUntilChanged,
  map,
  combineLatest,
} from 'rxjs';
import { Service } from '../service';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true, // הנחה שאתה משתמש ב-standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  // לשורת חיפוש
  searchTerm: string = '';
  private searchTerms = new Subject<string>(); //זרם המוצרים הסופי
  products$!: Observable<Product[]>;

  //הזרקת שירותים ROUTE
  constructor(private productService: Service, private route: ActivatedRoute) {}
  ngOnInit(): void {
    // 🔗 1. יצירת זרם מונח החיפוש (מטפל בקלט המשתמש)
    const searchFlow$ = this.searchTerms.pipe(
      startWith(this.searchTerm),
      debounceTime(300),
      distinctUntilChanged()
    ); // 🏷️ 2. יצירת זרם מזהה הקטגוריה (מטפל בפרמטרים של ה-URL)

    const categoryIdFlow$ = this.route.queryParams.pipe(
      startWith({} as Params),
      map((params: Params) => {
        const id = params['categoryId']; // 🚨 לוגיקה מתוקנת: אם ID ריק, 'null', או '0' - החזר null
        // ה-String(id) מטפל בבטיחות בערכים כמו null/undefined
        if (!id || String(id) === '0' || String(id) === 'null') {
          return null;
        } // אם ID חוקי (לדוגמה '1', '2'), החזר אותו כמחרוזת
        return String(id);
      })
    ); // 🤝 3. שילוב שני הזרמים לקריאת שרת אחת

    this.products$ = combineLatest([searchFlow$, categoryIdFlow$]).pipe(
      // מפעיל קריאת שרת בכל פעם שאחד הערכים משתנה
      switchMap(([term, categoryId]) =>
        this.productService.getProducts(term, categoryId)
      )
    );
  }
  /*
   * מופעל כאשר יש שינוי בקלט של תיבת החיפוש.
   */

  onSearchChange(): void {
    this.searchTerms.next(this.searchTerm.trim());
  }
}
