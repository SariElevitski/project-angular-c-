import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // נדרש לשגיאה הבאה (NG8002)
import { MatButtonModule } from '@angular/material/button';
import { Service, CustomerCreateDto } from '../service';

@Component({
  selector: 'app-signup',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, // חשוב מאוד!
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  constructor(private service: Service) {}
  
  fullName: string = '';
  phone: string = '';
  email: string = '';
  birthday: Date | null = null;

  signup() {
    let birthdayString: string | null = null;

    if (this.birthday) {
      // המרה לפורמט 'YYYY-MM-DD' (הנדרש ל-DateOnly)
      // en-CA מבטיח את הפורמט הזה
      birthdayString = this.birthday.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }

    // יצירת ה-DTO
    const customerData: CustomerCreateDto = {
      Email: this.email,
      FullName: this.fullName,
      Phone: this.phone,
      Birthday: birthdayString, // ⬅️ שולח מחרוזת קצרה
    };

    // ⬅️ חובה לבטל הערות כדי לראות אם יש שגיאת CORS/HTTP!
    this.service.signup(customerData).subscribe({
      next: (res) => {
        console.log('Registration successful! ID:', res);
        alert('נרשמת בהצלחה!');
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert(`שגיאת הרשמה: ${err.message}`);
      },
    });
  }
}
