import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from '../todo-service.service'
@Component({
  selector: 'app-todo-login',
  templateUrl: './todo-login.component.html',
  styleUrls: ['./todo-login.component.css']
})
export class TodoLoginComponent implements OnInit {

  public userName;
  public password;
  public errMsg;
  public errDiv = false
  constructor(
    public _todoService : TodoServiceService
  ) { }

  ngOnInit(): void {
  }


  login() {
    const json = {}
    json['user_name'] = this.userName
    json['password'] = this.password

   this._todoService.checkLogin(json).subscribe((response) => {
     if (response) {
        localStorage.setItem('user_id', response[0].user_id);
     }
   }, error => {
    this.errDiv = true;
    this.errMsg = 'userName/Password do not match';
  })
  }
}
