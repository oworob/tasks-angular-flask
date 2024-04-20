import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'todo-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      <ul>
        @for (todo of todos; track todo) {
          <li>
            {{ todo.todo }}
            <button (click)="DeleteTodo(todo.id)">Delete</button>
            <a [routerLink]="['/todo', todo.id]">View</a>
          </li>
        } @empty {
          <p>There's nothing yet.</p>
        }
      </ul>
    </div>
  `,
})

export class TodoList {

  @Input() todos!: Todo[]
  @Output() delete = new EventEmitter<number>();

  DeleteTodo(id:number) {
    this.delete.emit(id)
  }

}
