import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'complexity',
  pure:true
})
export class ComplexityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
        //console.log(value)
      switch(value){
            case 1:
            return "Simple";
            case 2:
            return "Medium";
            case 3:
            return "Complex"
      } 
  }

}
