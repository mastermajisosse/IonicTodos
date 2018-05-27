import { Component } from '@angular/core';
import { NavController , AlertController , reorderArray , ToastController } from 'ionic-angular';

import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = [];
  // hadi bach
  public reorderIsEnabled = false;
  public archiveTodosPage = ArchivedTodosPage;

  constructor(private toastController:ToastController ,private TodoProvider:TodoProvider , public navCtrl: NavController , private alertController:AlertController) {
    this.todos = this.TodoProvider.getTodos();
  }

  archiveTodo(todoIndex){
    this.TodoProvider.archiveTodo(todoIndex);
  }

  // tatsifet to a new page
  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  //hadi mni tan click edit tatwli false(or true) , o mni nkliki done tatwli l3aks
  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReorder($event){
    reorderArray(this.todos , $event);
  }

  opentodoalert(){
    let addtodoAlert = this.alertController.create({
      title: "Add to Todo",
      message: "Enter Your Todo",
      inputs: [
        {
          type: "text",
          name: "addtodoinput"
        }
      ],
      buttons:[
        {
          text:"cancel"
        },
        {
          text:"add todo",
          handler:(inputData) =>{
            let todotext;
            todotext = inputData.addtodoinput;
            this.TodoProvider.addTodos(todotext);

            addtodoAlert.onDidDismiss(()=>{
              let addtodoToast = this.toastController.create({
                message: "todo Added",
                duration : 2000
              });
              addtodoToast.present();
            });
          }
        }
      ],
    });
    addtodoAlert.present();
  }

  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit a Todo",
      message: "Edit Your Todo",
      inputs: [
        {
          type: "text",
          name: "Edittodoinput",
          value: this.todos[todoIndex]
        }
      ],
      buttons:[
        {
          text:"cancel"
        },
        {
          text:"edit a todo",
          handler:(inputData) =>{
            let todotext;
            todotext = inputData.Edittodoinput;
            this.TodoProvider.editTodo(todotext , todoIndex);

            editTodoAlert.onDidDismiss(()=>{
              let edittodotoast = this.toastController.create({
                message: "todo edited",
                duration : 2000
              });
              edittodotoast.present();
            });
          }
        }
      ],
    });
    editTodoAlert.present();
  }

}
