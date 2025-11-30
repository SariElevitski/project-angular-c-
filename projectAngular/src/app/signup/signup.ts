import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // נדרש לשגיאה הבאה (NG8002)
import { MatButtonModule } from '@angular/material/button';
import { Service ,CustomerDto} from '../service';

@Component({
  selector: 'app-signup',
  imports: [MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, // חשוב מאוד!
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  constructor(private service : Service){}

  fullName: string = '';
  phone: string = '';
  email: string = '';
  birthday: Date | null = null;


  signup() {

    const customerData: CustomerDto = {
            Email: this.email,
            FullName: this.fullName,
            Phone: this.phone,
            Birthday: this.birthday 
        };
    // console.log('Register attempt:', this.email);
    this.service.signup(customerData).subscribe({
        // next: (res) => {
        //         console.log('Registration successful! ID:', res.id);
        //         alert('נרשמת בהצלחה!');
        //         // כאן ניתן לסגור את הדיאלוג
        //         // this.dialogRef.close(true); 
        //     },
        //     error: (err) => {
        //         console.error('Registration failed:', err);
        //         alert(`שגיאת הרשמה: ${err.message}`);
        //     }
    }
    )
  }
}
