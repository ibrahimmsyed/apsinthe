import { NgModule } from '@angular/core';
import { BucketPipe } from './bucket.pipe';
import { StatusPipe } from "./status.pipe";
import { ComplexityPipe } from './complexity.pipe';
import { StatusControlPipe } from './status-control.pipe'; 

@NgModule({
      declarations: [ BucketPipe, StatusPipe, ComplexityPipe, StatusControlPipe ],
      exports: [ BucketPipe, StatusPipe, ComplexityPipe, StatusControlPipe ]
})
export class TaskPipeModule { }
  