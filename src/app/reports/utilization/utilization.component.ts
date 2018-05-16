import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { UniqueDataService } from '../../services/unique-data.service';

@Component({
  selector: 'app-utilization',
  templateUrl: './utilization.component.html',
  styleUrls: ['./utilization.component.scss']
})
export class UtilizationComponent implements OnInit {

  responseData:any;
  table_data:any;
  table_Show:boolean=false;


/* chart Data */
  labels:string[] = [];
  data:number[] = []; 


  constructor(private dataService:GetDataService, private uniqueData:UniqueDataService) { }

  ngOnInit() {
    let empId= "IN001";
    let pwd = "123";
    /* let empId= "IN002";
    let pwd = "123"; */ 
    
    this.dataService.getLoginData(empId,pwd).subscribe(data=>{
      let role= data.user_role;
      let uid = data.id;

      this.dataService.getUtilizationData(data.token_id,uid,role).subscribe(data =>{
        this.responseData=data;
        for(let i = 0; i< this.responseData.length;i++){
          this.labels.push(this.responseData[i].name);
          this.data.push((this.responseData[i].total_no_of_workedhours/((this.responseData[i].total_no_of_presentdays)*8))*100);
        }
        this.table_Show =true;
      });
    });    
  }

  filterFunction(){

  }

}
