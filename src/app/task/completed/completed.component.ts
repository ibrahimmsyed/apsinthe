import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../task';
import { AuthService } from '../../services/auth.service';
import { UserToken } from '../../model/User';

@Component({
      selector: 'app-completed',
      templateUrl: './completed.component.html',
      styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

      private taskCompleted:Task[];
      private showList:boolean=false;
      private user_token: UserToken;

      constructor(private _taskdata:TaskService, private authservice:AuthService) {
            
      }

      ngOnInit() {
            this.user_token = new UserToken;
            this.user_token = this.authservice.userAccessToken(); 
            this._taskdata.getUser(this.user_token.token, this.user_token.id);

            this._taskdata.getCurrentTask().subscribe(
                  (data) => {
                        this.taskCompleted = data;
                        this.showList = true
                  },
                  err => console.error(err),
                  () => console.log('done')
            )
      }

}
