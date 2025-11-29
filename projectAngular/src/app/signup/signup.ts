import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // נדרש לשגיאה הבאה (NG8002)
import { MatButtonModule } from '@angular/material/button';

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

  username: string = '';
  phone: string = '';
  email: string = '';
  birthDate: Date | null = null;


  register() {
    console.log('Register attempt:', this.email);
    // הוסף כאן את הלוגיקה לקריאה לסרביס
  }
}
