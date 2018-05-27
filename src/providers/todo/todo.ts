import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {

  private todos = [];
  private archiveTodos = [];

  constructor() {
    console.log('Hello TodoProvider Provider');
  }

  archiveTodo(todoIndex){
    let todoTobeArchived = this.todos[todoIndex]; // hold the todos that we want to archive
    this.todos.splice(todoIndex,1); // remove the todo from the list 
    this.archiveTodos.push(todoTobeArchived); // add the one we have removed to the archived
  }

  getTodos(){
    return this.todos;
  }

  getArchiveTodos(){//delete
    return this.archiveTodos;
  }

  addTodos(todo){//create
    this.todos.push(todo);
  }

  editTodo(todo , todoIndex){//edit
    this.todos[todoIndex] = todo;
  }

}
