import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../../types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private url = `${window.location.protocol}//${window.location.hostname}:${5000}/todo`

    constructor(private http: HttpClient) { }


    DeleteTodo(id: number): Observable<Object> {
        return this.http.delete(`${this.url}/${id}`)
    }

    GetTodo(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.url}/${id}`)
    }

    AddTodo(todo: string): Observable<Todo> {
        return this.http.post<Todo>(this.url, { todo })
    }

    GetTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.url)
    }
}
