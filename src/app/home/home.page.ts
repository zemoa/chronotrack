import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TasksStore } from '../engine/business/tasks.store';
import { Observable } from 'rxjs';
import { LoadExistingTasks } from '../engine/api/tasks.actions';
import { TaskDto } from '../engine/api/tasks.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @Select(TasksStore.loadingTasks) loading$!: Observable<boolean>;
  @Select(TasksStore.taskList) taskList$!: Observable<TaskDto[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    console.debug("send loading event");
    this.store.dispatch(new LoadExistingTasks());
  }

}
