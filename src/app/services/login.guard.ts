import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(router: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        console.log('loginguardT');
        this.router.navigate(['/user-profile/calendar'], { queryParams: { returnUrl: state.url }});
        return false;
    }else{
      console.log('loginguardF');
        return true;
    }
  }
}
