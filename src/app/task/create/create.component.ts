import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core'; 
import { Task, Dates } from '../task';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserToken } from '../../model/User';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
}) 

export class CreateComponent implements OnInit { 

      @Input() tasks:Task; 
      private pageValue;
      private currentpage:boolean = false;
      private currentTask:object = {};
      private JobType:string[]=['Job Type','New Build','Refresh','Issues'];
      private Complexity:string[]=['Complexity','Simple','Medium','Complex'];
      private Publishers:string[]=['Publisher','WM','CVS','DG'];
      private POCS:string[]=['POCs','Bill','Khary','Noble'];
      private Status:string[]=['Status','Yet To Start', 'In Progress'];
      private scheduled_hours:number;
      private schStart:any;
      private schEnd:any;
      private actStart:any;
      private actEnd:any; 
      private dateFormats:Dates;
      private ctaText:string;
      private editReason:boolean = false;
      private editformdate;
      private storeInitialValue:boolean = true;
       

      @ViewChild('taskCreateForm') taskCreateForm;

      constructor(private task:TaskService, private router:Router, private authservice:AuthService) {  }

      user_token: UserToken;

      ngOnInit() { 
            this.user_token = new UserToken;
            this.user_token = this.authservice.userAccessToken();

            console.log(this.user_token.token, this.user_token.id)

            this.task.getUser(this.user_token.token, this.user_token.id);

            this.ctaText = this.tasks ? 'Save task': 'Create new task';
            if(this.tasks) {  
                  console.log(this.tasks) 
                  this.currentpage = !this.currentpage
                  this.schStart=this.dateFormat(this.tasks.scheduled_start_date);
                  this.schEnd=this.dateFormat(this.tasks.scheduled_end_date);      
                  this.currentTask = {            
                        jobtype:this.tasks.jobtype,
                        converge_id:this.tasks.converge_id,
                        complexity:this.tasks.complexity,
                        publisher:this.tasks.publisher,
                        pocs:this.tasks.pocs,
                        schHours:this.tasks.scheduled_hours,
                        task_status:this.tasks.task_status,
                        comments:this.tasks.job_comments,
                        schStart:this.schStart,
                        schEnd:this.schEnd
                  };
            }else{ 
                  this.editReason = true
                  this.currentTask = {
                        converge_id:'',
                        jobtype:'Job Type',
                        complexity:'Complexity',
                        publisher:'Publisher',
                        pocs:'POCs',
                        task_status:'Status'
                  }  
            }
      } 

      changejobtype(value){
            let index = this.JobType.indexOf(value); 
            if(index===2){}
      }

      ngAfterViewChecked(){
            if(this.tasks) {
                  this.taskCreateForm.valueChanges.debounceTime(500).subscribe(data =>{
                        if(this.storeInitialValue){
                              this.editformdate = data;
                              this.storeInitialValue = false;
                        } 

                        if(JSON.stringify(data).toLowerCase() === JSON.stringify(this.editformdate).toLowerCase()){
                              console.log('true')
                        }else{
                              this.editReason = true
                        }

                        //this.editReason = true
                  });
            }
      }

      onSubmit(data){
            data.scheduled_start_date = this.dateFormatString(data.scheduled_start_date);
            data.scheduled_end_date = this.dateFormatString(data.scheduled_end_date);  
            if(this.tasks)  { 
                  this.task.updateTask(data, this.tasks.task_id).subscribe(
                        (data)=>{
                              console.log(data); 
                        },
                        err => console.error(err)
                  ); 
            }else{
                  data.complexity = this.complexIndex(data.complexity);
                  data.task_status = this.statusIndex(data.task_status);

                  this.task.saveTask(data).subscribe(
                        (data)=>{
                              console.log(data);
                              this.resetForm(); 
                              //this.router.navigate(['task-list']);
                        },
                        err => console.error(err)
                  ); 
            }
      }

      resetForm(){ 
      } 

      dateFormat(date){
            let changeToDateFormat = date.split('-');
            this.dateFormats = {
                  year:parseInt(changeToDateFormat[0]),
                  day:parseInt(changeToDateFormat[2]),
                  month:parseInt(changeToDateFormat[1]) 
            }   
            return this.dateFormats 
        }
        
      dateFormatString(data){
            let convertDate = Object.values(data);
            return convertDate.join('-')
      }

      jsonEqual(a,b){
            return JSON.stringify(a) === JSON.stringify(b);
      }
      complexIndex(data){
            console.log(data, this.Complexity.indexOf(data))
            return this.Complexity.indexOf(data);
      }
      statusIndex(data){
            return this.Status.indexOf(data);
      }

}
