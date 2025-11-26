import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core'; // 👈 הוסף ChangeDetectorRef
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit, OnDestroy {
  product: any = null;
  loading: boolean = true;
  error: string = '';
  private destroy$ = new Subject<void>();
  private currentRequestSub?: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private service: Service,
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


    this.service
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
}