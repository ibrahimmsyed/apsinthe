import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeekComponent } from './seek/seek.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SeekdetailComponent } from './seekdetail/seekdetail.component';
import { SeekedComponent } from './seeked/seeked.component';
import { OfferedComponent } from './offered/offered.component';


@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  declarations: [SeekComponent, SeekdetailComponent, SeekedComponent, OfferedComponent]
})
export class HelpModule { }
