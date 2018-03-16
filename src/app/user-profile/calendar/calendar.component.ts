import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  curDate:Date;
  curMonth:number;
  curYear:number;
  fDate:number;
  lDate:number;
  fdayStart:number;
  dy:Date;
  tdyDate:Date;
  dayName:number;
  calElmnt:any;
  showMonth:string;
  calAlign:any;
  nowDate:number;
  showYear:number;
  weekDays:any[];
  allMonths:any[];
  monthNum:number;

  ngOnInit() {
    let user = this.authService.userAccessToken();
    //console.log(user);

    this.curDate = new Date();
    this.curMonth = this.curDate.getMonth();
    this.curYear = this.curDate.getFullYear();

    // get first day of present month
    this.curDate = new Date(this.curYear, this.curMonth, 1);    
    this.fDate = this.curDate.getDate();
    this.fdayStart = this.curDate.getDay();
    console.log("First Date " + this.fdayStart);

    // get last day of present month 
    this.curDate.setMonth(this.curMonth+1, 0)    
    this.lDate = this.curDate.getDate();
    //console.log("Last Date " + this.lDate);

    this.allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.showYear = this.curDate.getUTCFullYear();
    this.showMonth = this.allMonths[this.curDate.getMonth()];
    this.weekDays = ['Sun', 'Mon', 'Tue', 'Wed','Thu', 'Fri', 'Sat'];
    this.dy = new Date();
    this.nowDate = this.dy.getDate();
    console.log(this.nowDate);
    
    this.dayName = this.weekDays[this.dy.getDay()];
    console.log(this.dayName);

    var dy = 1;

     var id = document.getElementById('abc');
     var createElement = document.createElement( 'div');
     createElement.setAttribute('class', 'sfsdfsdf');

    //id.appendChild(createElement);

    // var html = '<div>';
    // html += 'Hello div!';
    // html += '</div>';

    var html = '<div class="day-rows group">';
    
    for(var i=0;i<=41;i++){  
      if((i%7)==0){
        html += "</div><div class='week-row group'>";
      }
      if((i>= this.fdayStart) && (dy<= this.lDate)){
        html += "<div class='w_clm col'><span>"+ dy +"</span></div>";
        dy=dy+1;
        
      } else {
        html += "<div class='w_clm col'></div>";
      }
    }
    html += "</div>";
    
    $('.cal-rows').append(html);
    

  

    // var div = document.createElement('div');
    // div.className = "alert alert-success";
    // div.innerHTML = "</strong><strong>";

    //$('.cal-rows').append(div);

    
    // for(var i=0;i<=41;i++){  
    //  //console.log(i);
    //  if((i%7)==0){
    //   document.write("</div><div class='week-row'>");
    //  } 
     
    //  if((i>= this.fdayStart) && (dy<= this.lDate)){
    //   document.write("<div class='w_clm col'>"+ dy +"</div>");
    //   dy=dy+1;
    //   } else {
    //    document.write("<div class='w_clm col'></div>");
    //   }
     
    // }
  }

}
