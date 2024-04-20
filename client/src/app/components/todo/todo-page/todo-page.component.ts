import { Component } from '@angular/core';
import { TodoList } from './todo-list/todo-list.component';
import { TodoForm } from './todo-form/todo-form.component';
import { DatePipe } from '@angular/common';
import { TodoService } from '../todo.service';
import { Todo } from '../../../types';

@Component({
    selector: 'todo-page',
    standalone: true,
    imports: [TodoList, TodoForm, DatePipe],
    template: `
    <div class="todo">
    <h2>To-do:</h2>
        <todo-list [todos]="todos" (delete)="DeleteTodo($event)" />
        <hr/>
        <todo-form [todos]="todos" (add)="AddTodo($event)"/>
    </div>
  `,
})

export class TodoPage {
  constructor(private TodoService: TodoService) {}

  todos: Todo[] = []
  
  ngOnInit() {
    this.TodoService.GetTodos().subscribe(data => this.todos = data)
  }

  private deleting = false
  DeleteTodo(id: number) {
    if (!this.deleting) {
      this.deleting = true
      this.TodoService.DeleteTodo(id).subscribe(res => this.todos = this.todos.filter(t => t.id !== id))
    }
  }

  AddTodo(todo:string) {
    this.TodoService.AddTodo(todo).subscribe(data => this.todos.push(data))
  }

}
