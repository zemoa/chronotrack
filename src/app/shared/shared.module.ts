import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent, TaskItemComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from "primeng/card";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, TaskItemComponent],
  imports: [CommonModule, TranslateModule, FormsModule, ButtonModule, SkeletonModule, CardModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, ButtonModule, TaskItemComponent]
})
export class SharedModule {}
