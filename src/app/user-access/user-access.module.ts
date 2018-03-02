import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,FormsModule
  ],
  declarations: [],
  providers: [AuthService],
  exports:[]
})
export class UserAccessModule { }
