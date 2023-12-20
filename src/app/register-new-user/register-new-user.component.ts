import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_model/user.model';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})
export class RegisterNewUserComponent implements OnInit {
  userForm;
  userPassword: boolean = true;
  user:User={
    userName: '',
    userFirstName: '',
    userLastName: '',
    userPassword: ''
  }

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      userFirstName: ['', [Validators.required, Validators.minLength(4)]],
      userLastName: ['', [Validators.required, Validators.minLength(4)]],
      userPassword: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  public addUser(userForm:NgForm) {
    console.log(userForm.value);

    this.userService.register(userForm.value).subscribe(
      (resp)=>{
        this.router.navigate(['/login']);
        console.log(resp);
      },
      (err)=>{

      }
    )
  }

  public togglePasswordVisibility() {
    this.userPassword = !this.userPassword;
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('userPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      return null;
    }
  }
}
