import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Todo } from '../../../../types';

export class TodoValidator {
    static unique(GetTodos: () => Todo[]) {
        return (c:AbstractControl): ValidationErrors | null => {
            const val: string = c.value
            const todos = GetTodos() || []
            if (todos.map(x=>x.todo).includes(val)) {
                return {error: "To-do must be unique!"}
            }
            return null
        }
    }

    static min(minlength: number) {
        return (c: AbstractControl): ValidationErrors | null => {
            const val: string = c.value
            if (!val || val.length < minlength) {
                return {error: `To-do must be at least ${minlength} characters long!`}
            }
            return null
        }
    }


}