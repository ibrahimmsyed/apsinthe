import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  message: any;
  constructor(private alertservice: AlertService) { }

  ngOnInit() {
    this.loadMessage();
    
  }
  loadMessage(){
    this.alertservice.getMessage().
    subscribe(
      message => {
        this.message = message;
        setTimeout(()=>{    
              this.message = "";
        },8000);
    },
    error => {
        console.log(error);
    });

    
    
  }
}
