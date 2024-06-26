import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showError:boolean=false;
  logininfo: any;
  passwordFieldType: string = 'password';
  constructor(private fb: FormBuilder,private http:ServiceService,private _router:Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
}
onSubmit() {
  if (this.loginForm.valid) {
   const payload = {
    "Password": this.loginForm.get(['password'])?.value,
    "Username":  this.loginForm.get(['username'])?.value,
    };
    console.log(payload);
    this.http.login(payload).subscribe(
      (res: any) => {
        console.log(res);
        this.logininfo=res;
        if (res) {
          this.http.userinfo=res;
          localStorage.setItem('userinfo', JSON.stringify(this.logininfo));
          this._router.navigateByUrl('home');
        } else {
          // Handle the case where the response is false or null
        }
      },
      (error: any) => {
        // In case of an error, handle it appropriately
        console.error('Login error', error);
        // window.alert('Invalid Username or Password');
        this.showError = true; // Show the error message if login fails
      }
    );
  } else {
    // Show error if form is invalid
    this.showError = true;
  }
}

togglePasswordVisibility(): void {
  this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
}

}
