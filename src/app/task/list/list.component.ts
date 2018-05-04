import { Component, OnInit} from '@angular/core'; 
import { TaskService } from '../../services/task.service';
import { Task } from '../task';   
import { UserToken } from '../../model/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit { 
      private taskdata:Task[];
      private addActive:boolean = false 
      private showList:boolean=false;
      private opened:boolean = true
      private showForm = {};
      private previous;
      private taskStatus:boolean;
      private actHours;

      constructor(private task:TaskService, private authservice:AuthService ) { 
            
      }

      private user_token: UserToken;

      ngOnInit() {
            this.user_token = new UserToken;
            this.user_token = this.authservice.userAccessToken(); 
            this.task.getUser(this.user_token.token, this.user_token.id);
            
            if(this.user_token.token != undefined){
                  this.showForm = {};
                  this.task.getCurrentTask()
                  .subscribe( 
                        (data) => {
                              this.taskdata=data;
                              this.showList=true;
                              console.log(this.taskdata)
                        },
                        err => console.error(err),
                        //() => //console.log('done')
                  ) 
            }
      }  

      openTaskDetail(current){ 
            this.opened = !this.opened
            this.addActive = !this.addActive
            if(this.previous){
                  this.showForm[this.previous] = !this.showForm[this.previous];
            }
            this.previous = current;
            this.showForm[current] = !this.showForm[current];
      }

      changeTaskStatus(id, status){  

            let startHours = this.taskdata.find(item => item.task_id === id);
            let startHourse = this.utcConvesionDB(startHours.actual_start_time);
            console.log('ast',startHours.actual_start_time,'--------', startHourse)
            let ast = this.currentTime(status);           
            let aet = this.pauseTime(status, startHourse);
                        
            this.task.updateTaskStatus(id,status,ast,aet)
            .subscribe(
                  (data)=>{
                        console.log(data)
                  },
                  err =>{
                        console.error(err)
                  }
            );

            //to update local data

            for(let i=0; i<this.taskdata.length; i++){
                  if(this.taskdata[i].task_id==id){
                        //this.actHours = this.taskdata[i].actual_hours;
                        this.taskdata[i].task_status = this.evaluateStatus(status)
                  }else{
                        if(this.taskdata[i].task_status==2){
                              this.taskdata[i].task_status = 1;
                        }
                  } 
            } 

      }

      onTaskComplete(id, status){   
            let aet = this.endTime(status);

            this.task.completeTask(id,status,aet)
            .subscribe(
                  (data)=>{
                        console.log(data)
                  },
                  err =>{
                        console.error(err)
                  }
            );

            //to update local data
           for(let i=0; i<this.taskdata.length; i++){
                  if(this.taskdata[i].task_id==id){
                        this.taskdata[i].task_status = status;
                  } 
            }
            console.log(this.taskdata)
      }

      evaluateStatus(status){
            if(status===1){
                  return 2;  
            }
            if(status===2){
                  return 4;  
            }
            if(status===3){
                  return 3
            }
            if(status===4){
                  return 2
            }
      }

      currentTime(status){
            if(status===1){ 
                  return this.utcConversion();
            }            
      }

      endTime(status){
            if(status===3){ 
                  return this.utcConversion();
            }            
      }

      pauseTime(status, startHours){
            if(status===2){ 
                  this.actHours = this.actualHours(startHours, this.utcConversion());
                  console.log(startHours,'---',this.actHours)
                  return this.utcConversion();
            }else{
                  return null
            }
      }

      utcConversion(){
            let d = new Date()
           // console.log('date',d)
            let utc = d.getTime() + (d.getTimezoneOffset() * 60000)
            let nd = new Date(utc + (3600000*+5.5));
            let dateConversion = nd.toISOString().slice(0, 19).replace('T', ' '); 
            //console.log('utcConversion', nd,'-----------------', dateConversion)
            return dateConversion;
      }

      utcConvesionDB(date){ 
            let d= new Date(date);
            //let d =  a.setHours(a.getHours() + 4);
            //console.log('dbdate',d)
            let utc = d.getTime() + (330 * 60000) - 330
            let nd = new Date(utc);
            let dateConversion = nd.toISOString().slice(0, 19).replace('T', ' '); 
            console.log('utcConvesionDB',nd,'-----------------', dateConversion)
            return dateConversion;
      }

      actualHours(startDate1, endDate1) { 
            let actualStartTime = new Date(startDate1); //new Date('2018-03-01 18:30:00')
            let actualEndTime =  new Date(endDate1); // 3 + 18:30:00 to 23:45:00
            //this.weekendcout = this.weekends(actualStartTime, actualEndTime)
            let startDate = new Date(actualStartTime.toLocaleString("en-US", {timeZone: "America/New_York"}));
            let endDate =new Date(actualEndTime.toLocaleString("en-US", {timeZone: "America/New_York"}));


            var minutesWorked = 0; 
            if (endDate < startDate) { return 0; } 
            var current = startDate;
         
            var workHoursStart = 9;
            var workHoursEnd = 17.5;
            var includeWeekends = true; 

            while(current <= endDate){
                  var currentTime = current.getHours() + (current.getMinutes() / 60);
                  if(currentTime >= workHoursStart && currentTime <= workHoursEnd 
                        && (includeWeekends ? current.getDay() !== 0 && current.getDay() !== 6 : true)){ 
                        minutesWorked++;
                  } 
                current.setTime(current.getTime() + 1000 * 60);
            } 
            console.log((minutesWorked / 60 * 100)/100)
            return Math.round(minutesWorked / 60 * 100) / 100;
        }

        startEnd(){

        }


}
