import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { TodoValidator } from './todo-form-validator';
import { Todo } from '../../../../types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, JsonPipe],
  template: `
    <form (submit)="AddTodo($event)" [formGroup]="todo_form">
        <h3>Add new to-do:</h3>
        
        <label for="content">What do I need to do?*</label>
        <input id="content" type="text" formControlName="content" [ngClass]="{'error': todo_form.invalid && todo_form.get('content')?.dirty}">
        <p class="error" *ngIf="todo_form.get('content')?.errors && todo_form.get('content')?.dirty">{{ todo_form.get('content')?.errors?.['error'] }} </p>

        <label for="deadline">By when?</label>
        <input id="deadline" type="date" formControlName="deadline" [min]="today">
        <p class="error" *ngIf="todo_form.get('deadline')?.errors && todo_form.get('deadline')?.dirty">{{ todo_form.get('deadline')?.errors?.['error'] }} </p>

        <button disabled="!todo_form.invalid" >Submit</button>
    </form>
  `,
})
export class TodoForm {

  today = new Date().toISOString().split('T')[0];
  @Input() todos!: Todo[]
  @Output() add = new EventEmitter<string>();
  // new_todo = new FormControl('', { validators: [TodoValidator.unique(() => this.todos), TodoValidator.min(4)] });

  todo_form = new FormGroup({
    content: new FormControl('', { validators: [TodoValidator.unique(() => this.todos), TodoValidator.min(4)] }),
    deadline: new FormControl('')
  });
  
  AddTodo(e: Event) {
    e.preventDefault()
    // if (this.new_todo.value) {
    //   this.add.emit(this.new_todo.value)
    //   this.new_todo.reset()
    // }
    console.log(this.todo_form)
    
  }

  // AddTodo(e: Event) {
  //   e.preventDefault()
  //   if (this.todoForm.valid) {
  //     const todoData = {
  //       todo: this.todoForm.value.todo,
  //       date: this.todoForm.value.date
  //     };
  //     this.add.emit(todoData);
  //     this.todoForm.reset();
  //   }
  // }
}
