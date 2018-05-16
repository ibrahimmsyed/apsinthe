import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductivityComponent } from './productivity/productivity.component';
import { TaskService } from '../services/task.service';
import { UtilizationComponent } from './utilization/utilization.component';
import { QualityComponent } from './quality/quality.component';
import { BarChartComponent } from '../reports-components/bar-chart/bar-chart.component';
import { PieChartComponent } from '../reports-components/pie-chart/pie-chart.component';
import { PaginationComponent } from '../reports-components/pagination/pagination.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  declarations: [ProductivityComponent, UtilizationComponent, QualityComponent,PaginationComponent/* BarChartComponent*/ ,PieChartComponent,]
})
export class ReportsModule { }
 