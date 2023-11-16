import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean = false;
  private test:any= 4
    constructor(
                private userAuthService: UserAuthService,

                 private router: Router,
                 public userService: UserService,
                 
    
    ){
    
  }
 ngOnInit(): void {
     
 }
  
 public isLoggedIn(){
  return this.userAuthService.isLoggedIn();
 
}
//this.isLogin=true;
public logout(){
  this.userAuthService.clear();
  this.router.navigate(['/']);
  
}
public isAdmin(){
  return this.userAuthService.isAdmin();
}
public isUser(){
  return this.userAuthService.isUser();
}

}
