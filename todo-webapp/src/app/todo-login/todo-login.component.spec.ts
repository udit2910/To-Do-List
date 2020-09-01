import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoLoginComponent } from './todo-login.component';

describe('TodoLoginComponent', () => {
  let component: TodoLoginComponent;
  let fixture: ComponentFixture<TodoLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
