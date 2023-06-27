import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from './services/tasks.service';

@NgModule({
  declarations: [],
  providers: [TasksService],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
