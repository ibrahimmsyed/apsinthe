import { Component, OnInit } from '@angular/core';
//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { UniqueDataService } from '../../services/unique-data.service';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.scss']
})
export class ProductivityComponent implements OnInit {

  responseData:any;
  table_data:any;
  table_Show:boolean=false; 
  uniqueProjectOwners:any[]=[];
  overAllProductivity:any[]=[];

  

  

  /* chart Data */
  labels:string[] = [];
  data:number[] = []; 
  barChartData:any[]=[];
  barChartLabels:any[]=[];

  /* pagination Data */
  arrayLength:number
  paginationArray:any[]=[];
  hideData:boolean
  individual_table_Show:any[]=[];
  individualFilteredArray:any[]=[];
  previousName:string = "";

  constructor(private dataService:GetDataService, private uniqueData:UniqueDataService) {   }

  ngOnChanges(){
    //console.log('ok');
  }

  ngOnInit() {
    let empId= "IN001";
    let pwd = "123";
    /* let empId= "IN002";
    let pwd = "123"; */
    
    

    this.dataService.getLoginData(empId,pwd).subscribe(data=>{
      let role= data.user_role;
      let uid = data.id;

        this.dataService.getProductivityData(data.token_id,uid,role).subscribe(data =>{
          this.responseData=data;
          this.table_data = this.responseData;
    
          if(role == 0){
            this.uniqueProjectOwners = this.uniqueData.findUniqueProjectOwners(this.responseData);
            this.overAllProductivity = this.findIndividualOverallProductivity(this.uniqueProjectOwners);
          }
          else{
            this.uniqueProjectOwners.push(uid);
            this.overAllProductivity = this.findIndividualOverallProductivity(this.uniqueProjectOwners);
            
          }
        
          this.table_Show = true;   
        });  
    });

      

    /* this.barChartData=[{data: [67, 49], label: 'Series A'},{data: [43, 45], label: 'Series B'},{data: [43, 45], label: 'Series C'}];
    this.barChartLabels=["a","b"];

    this.labels= ["a","b","c"];
    this.data = [10,20,30]; */
  }

 

   findIndividualOverallProductivity(uniqueUids){
    for(let i=0;i<uniqueUids.length;i++){
      let totalScheduledHours = 0;
      let totalActualHours = 0;
      let projectOwner = "";
      let uid = 0;
      let totalIndividualProductivity = 0;
      this.table_data.forEach(array => {         
        if(parseInt(array.uid) == parseInt(uniqueUids[i])){
           totalScheduledHours =  totalScheduledHours+array.scheduled_hours;
           totalActualHours = totalActualHours+array.actual_hours;
           projectOwner = array.project_owner;    
           uid = array.uid;       
        }
      });

      totalIndividualProductivity = ((totalScheduledHours/totalActualHours)*100);
      let temp = {"uid":uid,"projectOwner":projectOwner,"total":totalIndividualProductivity};
      this.overAllProductivity.push(temp);
      this.labels.push(projectOwner);
      this.data.push(totalIndividualProductivity);
    }
    return this.overAllProductivity;
  } 

  filterIndividualData(uid,owner){    
    this.individualFilteredArray = this.uniqueData.filterIndividualArray(uid,this.table_data);    
    this.arrayLength = this.individualFilteredArray.length;

    if(this.previousName != ""){
      this.individual_table_Show[this.previousName] = false;
    }
    this.previousName = owner;
    this.individual_table_Show[owner] = true;    
  }

  paginationWork(data){
    this.paginationArray=this.individualFilteredArray.slice(data[0],data[1]);
    this.hideData = true;
  }

}
