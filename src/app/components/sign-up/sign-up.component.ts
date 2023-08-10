import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{



  signUpForm!: FormGroup;

  msg: any ;

  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router){}
  ngOnInit(): void {


    this.signUpForm = this.fb.group({  
      username:  new FormControl('', Validators.required),  
      email:  new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),  
      password:  new FormControl('', Validators.required),  
      confPassword:  new FormControl('', Validators.required),  
    });  
  }


passPolici: boolean = false;

  checkPassword(){
    if(this.signUpForm.value.password!==this.signUpForm.value.confPassword){
      this.passPolici = true;
    }else{
      this.passPolici = false;
    }
  }
  get f(){
    return this.signUpForm.controls;
  }

  onSubmit(){
   console.log(this.signUpForm.value);

this.authService.register(this.signUpForm.value).subscribe({
  next: res =>{
    this.router.navigateByUrl("/login");
  },
  error: errRes =>{
    this.msg = errRes;
    console.log(this.msg);
    
    alert(this.msg.error.message)
  },
})

  }
}
