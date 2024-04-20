import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../../../types';
import { JsonPipe, DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'todo-single',
  standalone: true,
  imports: [JsonPipe, NgIf, DatePipe],
  template: `
    <p *ngIf="!todo">Loading to-do...</p>
    <div *ngIf="todo">
      <p>Date added: {{ todo.date_added | date}}</p>
      <p>To-do: {{todo.todo}}</p>
    </div>
  `,
})
export class TodoSingle implements OnInit {
  todo_id: string = '';
  todo: Todo | undefined;

  constructor(private route: ActivatedRoute, private TodoService: TodoService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todo_id = params['id']
    });
    this.TodoService.GetTodo(parseInt(this.todo_id)).subscribe(data => this.todo = data)
    console.log(this.todo)
  }

}
