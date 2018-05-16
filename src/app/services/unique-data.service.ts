import { Injectable } from '@angular/core';

@Injectable()
export class UniqueDataService {

  uniqueProjectOwners:any[] = [];
  individualFilteredArray:any[] = [];
  
  constructor() { }

  findUniqueProjectOwners(res){
    for(let i = 0;i<res.length;i++){
      if(this.uniqueProjectOwners.indexOf(res[i].uid) == -1){
        this.uniqueProjectOwners.push(res[i].uid);        
      }
    }
    return this.uniqueProjectOwners;
  }

  filterIndividualArray(uid,array){
    this.individualFilteredArray = [];
    array.forEach(array => {         
        if(parseInt(array.uid) == parseInt(uid)){
          this.individualFilteredArray.push(array);
        }
    }); 
    return this.individualFilteredArray;
  }

}
