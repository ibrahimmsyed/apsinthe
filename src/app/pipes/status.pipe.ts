import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  pure: true
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any { 
      switch(value){
            case 1:
            return "Yet To Start";
            case 2:
            return "In Progress";
            case 3:
            return "Completed";
            case 4:
            return "Paused"
      } 
  }

}
