import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoLoginComponent } from './todo-login/todo-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DisplayListComponent } from './display-list/display-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todo-login' },
  { path: 'todo-login', component: TodoLoginComponent },
  { path: 'todo-list', component: DisplayListComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    TodoLoginComponent,
    DisplayListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
