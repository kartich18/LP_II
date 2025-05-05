import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppComponent {
  title = 'Todo List App';
  newTask = '';
  tasks: { id: number; text: string; editing: boolean }[] = [];
  editingTask = '';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({
        id: Date.now(),
        text: this.newTask,
        editing: false
      });
      this.newTask = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  startEditing(task: any) {
    task.editing = true;
    this.editingTask = task.text;
  }

  saveEdit(task: any) {
    task.text = this.editingTask;
    task.editing = false;
  }

  cancelEdit(task: any) {
    task.editing = false;
    this.editingTask = '';
  }
}