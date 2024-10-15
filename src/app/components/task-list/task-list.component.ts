import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { TaskDataService } from '../../services/task-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: any[] = [];
  private taskAddedSubscription!: Subscription; // Definite assignment assertion

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private taskDataService: TaskDataService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
    this.taskAddedSubscription = this.taskDataService.taskAdded$.subscribe(() => {
      this.loadTasks();
    });
  }

  ngOnDestroy(): void {
    this.taskAddedSubscription.unsubscribe();
  }

  loadTasks(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.taskService.getTasks(currentUser.id).subscribe(tasks => {
        console.log('Tasks loaded:', tasks);
        this.tasks = tasks;
      });
    }
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  completeTask(task: any): void {
    task.status = 'completed';
    this.taskService.updateTask(task).subscribe(() => {
      this.loadTasks();
    });
  }
}