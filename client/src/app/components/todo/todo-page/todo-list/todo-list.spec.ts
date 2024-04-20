import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoList } from './todo-list.component';
import { Todo } from '../../../../types';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoListComponent', () => {
    let component: TodoList;
    let fixture: ComponentFixture<TodoList>;
    let deleteButton: HTMLButtonElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoList);
        component = fixture.componentInstance;
        component.todos = [{ id: 1, todo: 'Test todo' }, { id: 2, todo: 'Test todo2' }] as Todo[];
        fixture.detectChanges();
        deleteButton = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display todo data', () => {
        const todoText = fixture.nativeElement.textContent;
        expect(todoText).toContain('Test todo');
    });

});
