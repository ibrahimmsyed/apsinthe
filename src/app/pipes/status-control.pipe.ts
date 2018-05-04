import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
      name: 'current_status',
      pure: true
})
export class StatusControlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      switch(value){
            case 1 :
            return "Start";
            case 4:
            return "Start";
            case 2:
            return "Stop"; 
      }
  }

}
