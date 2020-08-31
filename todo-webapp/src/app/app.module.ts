import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoLoginComponent } from './todo-login/todo-login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'todo-login' },
  { path: 'todo-login', component: TodoLoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoLoginComponent
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
