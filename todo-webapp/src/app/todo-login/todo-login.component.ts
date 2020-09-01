import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service'
import { Router } from '@angular/router';

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
    public _todoService: TodoServiceService,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }


  login() {
    if (this.userName && this.password && this.userName.trim() && this.password.trim()) {
      const json = {}
      json['user_name'] = this.userName
      json['password'] = this.password
      this._todoService.checkLogin(json).subscribe((response) => {
        if (response) {
          sessionStorage.setItem('user_id', response[0].user_id);
          this.router.navigate(['/todo-list']);
        }
      }, error => {
        this.errDiv = true;
        this.errMsg = 'userName/Password do not match';
      })
    } else {
      this.errDiv = true;
      this.errMsg = 'Please fill all the details';
    }
  }
}
