import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(private userService: UserService,
    private userAuthService: UserAuthService,
    private router:Router,
    private formBuilder: FormBuilder
    
    ){
      this.loginForm=this.formBuilder.group({
        userName: ['', [Validators.required, Validators.minLength(4)]],
        userPassword: ['', [Validators.required,Validators.maxLength(15),Validators.minLength(6)]],
      
      })

  }

  ngOnInit(): void {
    
   }

  login(loginForm: NgForm) {
   this.userService.login(loginForm.value).subscribe(
    (response:any)=>{
      
      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);
      console.log(response)
       const role= response.user.role[0].roleName;
       if(role==='Admin'){
          this.router.navigate(['/admin']);
       }else{
        this.router.navigate(['/user']);
       }
         
    },
    (err)=>{
      console.log(err);
    }
   )
  } 
 
}
