import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from '../todo-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-list',
  templateUrl: './display-list.component.html',
  styleUrls: ['./display-list.component.css']
})
export class DisplayListComponent implements OnInit {

  public userId;
  public listTodo;
  public titleName;
  public todoId;
  public showErrDiv = false;
  public errMsg;
  constructor(
    public _todoService: TodoServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('user_id'));
    if(this.userId) {
      this.getTodolist();
    } else {
      this.router.navigate(['/todo-login']);
    }
  }

  getTodolist() {
    this._todoService.getTodolist(this.userId).subscribe((response) => {
      if (response) {
        this.listTodo = response
      }
    }, error => {
      console.log('error', error);
    })
  }

  addTodo() {
    const json = {}
    json['title'] = ""
    json['description'] = ""
    json['todo_id'] = ""
    this.listTodo.push(json)
  }

  saveTodo(title, des) {
    if(title && des) {
      const bodyJson = this.generateBodyJson(title, des)
      this._todoService.addTodo(bodyJson).subscribe((response) => {
        if (response) {
          this.getTodolist();
        }
      }, error => {
        console.log('error', error);
      })
    } else {
      this.showErrDiv = true
      this.errMsg = 'please fill up all details'
    }

  }

  updateTodo(item) {
    if (item.title && item.description && item.title.trim() && item.description.trim()) {
      const bodyJson = this.generateUpdateBodyJson(item)
      this._todoService.updateTodo(bodyJson).subscribe((response) => {
        if (response) {
          this.getTodolist();
        }
      }, error => {
        console.log('error', error);
      })
    } else {
      this.showErrDiv = true
      this.errMsg = 'please fill up all details'
    }
  }


  deleteTodo(item, index) {
    if (item && item.todo_id) {
      this._todoService.removeTodolist(this.userId, item.todo_id).subscribe((response) => {
        if (response) {
          this.getTodolist();
        }
      }, error => {
        console.log('error', error);
      })
    } else {
      this.listTodo.splice(index, 1);
    }
  }

  generateBodyJson(title, des) {
    const json = {}
    json['title'] = title
    json['description'] = des
    json['user_id'] = this.userId
    return json
  }

  generateUpdateBodyJson(item) {
    const json = {}
    json['title'] = item.title
    json['description'] = item.description
    json['user_id'] = this.userId
    json['todo_id'] = item.todo_id
    return json
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/todo-login']);
  }

}
