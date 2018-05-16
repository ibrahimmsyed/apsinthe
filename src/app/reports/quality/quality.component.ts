import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../../services/get-data.service';
import { UniqueDataService } from '../../services/unique-data.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.scss']
})
export class QualityComponent implements OnInit {

  responseData:any;
  table_data:any;
  table_Show:boolean=false; 
  uniqueProjectOwners:any[]=[];
  overAllQuality:any[]=[];


  individualFilteredArray:any[]=[];
  arrayLength:number
  paginationArray:any[]=[];
  individual_table_Show:any[]=[];
  previousName:string = "";

  /* chart Data */
  labels:string[] = [];
  data:number[] = []; 
  barChartData:any[]=[];
  barChartLabels:any[]=[];
  hideData:boolean =false;

  constructor(private dataService:GetDataService, private uniqueData:UniqueDataService) { }
  
  ngOnChanges(){
    //console.log('1');
  }

  ngOnInit() {
    let empId= "IN001";
    let pwd = "123";
    /* let empId= "IN002";
    let pwd = "123"; */ 
    
    this.dataService.getLoginData(empId,pwd).subscribe(data=>{
      let role= data.user_role;
      let uid = data.id;

      this.dataService.getQualityData(data.token_id,uid,role).subscribe(data =>{
        this.responseData=data;
        this.table_data = this.responseData;

        if(role == 0){
          this.uniqueProjectOwners = this.uniqueData.findUniqueProjectOwners(this.responseData);
          this.overAllQuality = this.findIndividualOverallQuality(this.uniqueProjectOwners);
        }
        else{
          this.uniqueProjectOwners.push(uid);
          this.overAllQuality = this.findIndividualOverallQuality(this.uniqueProjectOwners);
          
        }
      
        this.table_Show = true;  
      }); 
    });
  }

  findIndividualOverallQuality(uniqueUids){
    for(let i=0;i<uniqueUids.length;i++){
      let total_no_functionalities = 0;
      let total_no_issues = 0;
      let projectOwner = "";
      let uid = 0;
      let totalIndividualQuality = 0;
      this.table_data.forEach(array => {         
        if(parseInt(array.uid) == parseInt(uniqueUids[i])){
           total_no_functionalities =  total_no_functionalities+array.total_no_of_functionalities;
           total_no_issues = total_no_issues+array.total_no_of_issues;
           projectOwner = array.project_owner;    
           uid = array.uid;       
        }
      });

      totalIndividualQuality = (((total_no_functionalities-total_no_issues)/total_no_functionalities)*100);
      let temp = {"uid":uid,"projectOwner":projectOwner,"total":totalIndividualQuality};
      this.overAllQuality.push(temp);
      this.labels.push(projectOwner);
      this.data.push(totalIndividualQuality);
    }
    return this.overAllQuality;
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
    this.hideData=true;
  }

}
