import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { TasksState } from '../core/business/tasks.state';
import { TasksService } from '../core/services/tasks.service';
import { MockProvider } from 'ng-mocks';
import { Task } from '../core/business/tasks.model';
import { delay, of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule, NgxsModule.forRoot([TasksState])],
      providers: [MockProvider(TasksService, {
        save: (name: string) => of(new Task(name, '1234')),
        fetchAll: () => of([new Task('Task 1', '1'), new Task('Task 2', '2')]).pipe(delay(200))
      })]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', waitForAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'PAGES.HOME.TITLE'
    );
  }));
});
