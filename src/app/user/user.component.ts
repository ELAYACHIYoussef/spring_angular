import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  message;
  constructor(private userService: UserService){
    
  }
  ngOnInit(): void {

    this.forUser();
  }

  forUser(){
    this.userService.forUser().subscribe(
      (Response)=>{
        console.log(Response);
        this.message=Response;
      },
      (Error)=>{
        console.log(Error);
      }
    )
  }
}
