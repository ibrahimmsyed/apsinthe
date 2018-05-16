import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../task/task';

@Injectable()
export class TaskService { 
 
      //private url = 'http://10.98.20.102/trackR-master/index.php/'; 
      private url = 'http://10.98.101.142/apsinthe/trackR/index.php/';
      private token;
      private userID;
      //private url = 'http://10.98.20.100/trackRR/index.php/'; 
      
      
      private task : Task[] = [];
      private todosData:string[]=[];

      

      constructor(private http:HttpClient) {}

      getUser(usrToken, uId){
            this.token = usrToken;
            this.userID = uId;  
      }

      getCurrentTask(){  
            console.log('aaa',this.token)
            return this.http.get<Task[]>(this.url+'task?token='+this.token+'&uid=2')
      } 

      saveTask(data){
            data.token = this.token;
            data.uid = this.userID; 
            console.log(data) 
            return this.http.post<any>(this.url+'task/create', data) 
      } 

      updateTask(data, taskid){ 
            data.token = this.token;
            data.uid = this.userID;  
            console.log(data)
            return this.http.post<any>(this.url+'task/update/'+taskid, data) 
      } 

      updateTaskStatus(taskId, status, ast, aet){
            let data = new Task();
            data.token = this.token;
            data.uid = this.userID;
            data.task_status = this.evaluateStatus(status);
            if(status === 4 || status === 1){data.actual_start_time = ast}            
            if(status===2){data.actual_end_time = aet;}
            return this.http.post<any>(this.url+'task/status/'+taskId, data);
      }

      completeTask(taskId, status, aet){
            let data = new Task();
            data.token = this.token;
            data.uid = this.userID;
            data.task_status = this.evaluateStatus(status);  
            data.actual_end_time = aet; 
            return this.http.post<any>(this.url+'task/status/'+taskId, data);
      }

      pauseAllTask(taskId){
            //update all other tasks status based on updateTastStatus() function
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

      
}
