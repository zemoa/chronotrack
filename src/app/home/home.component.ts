import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { TasksSelectors } from '../core/business/tasks.state';
import { Observable } from 'rxjs';
import { Tasks } from '../core/business/tasks.action';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(TasksSelectors.slices.loading) loading$!: Observable<boolean>
  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    this.store.dispatch(new Tasks.FetchAll())
  }

}
