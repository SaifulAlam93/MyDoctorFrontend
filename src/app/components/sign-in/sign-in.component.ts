import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  error: string = '';

  form: any = {
    username: null,
    password: null
  };

  signInForm!: FormGroup;
  submitted = false;



  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];


  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router) { 
    }

  ngOnInit(): void {

    this.signInForm = this.fb.group({  
      username:  new FormControl('', [Validators.required]),
      password:  new FormControl('', [Validators.required]),
    });  

    if (this.storageService.isLoggedIn()) {
      // this.isLoggedIn = true;
      // this.roles = this.storageService.getUser().roles;
      this.router.navigateByUrl("/home");
    }
  }


  get f(){
    return this.signInForm.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }

    this.authService.login(this.signInForm.value).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.storageService.setUserDetail(data);
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        // this.reloadPage();
        this.router.navigateByUrl("/home");

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        alert(" " + this.errorMessage);
      }
    });
    console.log(JSON.stringify(this.signInForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.signInForm.reset();
  }

  reloadPage(): void {
    window.location.reload();
  }
}