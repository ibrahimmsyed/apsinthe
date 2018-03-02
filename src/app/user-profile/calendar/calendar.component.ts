import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
    let user = this.authService.userAccessToken();
    console.log(user);
  }

}
