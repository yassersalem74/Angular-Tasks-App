import { Component } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { AddTaskComponent } from "../../components/add-task/add-task.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskListComponent, AddTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
