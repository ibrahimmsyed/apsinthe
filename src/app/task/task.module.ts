import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { CompletedComponent } from './completed/completed.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TaskPipeModule } from '../pipes/task-pipe.module';


@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      NgbModule,
      TaskPipeModule
  ],
  declarations: [CreateComponent, ListComponent, CompletedComponent],
  providers:[TaskService],
  exports:[CreateComponent, ListComponent, CompletedComponent]
})
export class TaskModule { }


