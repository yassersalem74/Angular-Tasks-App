import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { TaskDataService } from '../../services/task-data.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private taskDataService: TaskDataService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        const task = {
          id: Math.random().toString(36).substr(2, 4),
          title: this.taskForm.value.title,
          userId: currentUser.id,
          userName: currentUser.name,
          status: 'pending'
        };

        console.log('Adding task:', task);

        this.taskService.addTask(task).subscribe(() => {
          this.taskForm.reset();
           // Emit event to notify task list to reload
          this.taskDataService.taskAdded();
        });
      }
    }
  }
}