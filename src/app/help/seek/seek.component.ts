import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm, ValidatorFn, AsyncValidatorFn, Validators } from '@angular/forms';
import { BroadcastService } from '../../services/broadcast.service';
import { Seek } from '../../model/broadcast';
import { AuthService } from '../../services/auth.service';
import { UserToken } from '../../model/User';

@Component({
  selector: 'app-seek',
  templateUrl: './seek.component.html',
  styleUrls: ['./seek.component.scss']
})
export class SeekComponent implements OnInit {

  private seekForm: FormGroup;
  seekers: Seek;
  user_token: UserToken;
  
  constructor(private broadcastservice : BroadcastService, private authservice : AuthService) { }

  ngOnInit() {
    this.user_token = new UserToken;
    this.user_token = this.authservice.userAccessToken();
    // Each will create new Form control.
    this.seekForm = new FormGroup({
      'title': new FormControl('', Validators.required),
      'message': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
    });
  }

  onSubmit(seekForm: NgForm) {
    console.log('Form successful submit.');
    console.log(this.seekForm.value);
        
    this.seekers = new Seek;
    this.seekers.title = this.seekForm.value.title;
    this.seekers.message = this.seekForm.value.message;
    this.seekers.send_party = parseInt(this.user_token.id);
    this.seekers.broad_status = 0;
    this.seekers.user_token = this.user_token.token;
    this.broadcastservice.createbroadcast(this.seekers).subscribe(data => { console.log('success'); console.log(data); })

  }

  

}
