import { Component, DoCheck, EventEmitter, OnInit } from '@angular/core';
import { TaskList } from "../../mopdel/task-list";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck{

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  public checked:boolean = false;

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public setEmitTaskList(event:string): void {
    this.taskList.push({task:event, checked:false});
  }

  public deleteItemTaskList(event:number) :void {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList(): void {
    const confirm = window.confirm("Você realmente deseja apagar todas as tarefas?")
    this.taskList = [];
  }

  public validationInput(event:string, index:number): void {
    if (!event.length) {
      const confirm = window.confirm("Task está vazia, deseja excluir?");

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  public setLocalStorage(): void {
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }

  }


}
