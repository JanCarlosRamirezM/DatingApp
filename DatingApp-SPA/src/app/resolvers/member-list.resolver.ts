import { catchError } from 'rxjs/operators';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberListResolver implements Resolve<IUser[] | null> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(): Observable<IUser[] | null> {
    return this.userService.getUsers().pipe(
      catchError((error) => {
        this.alertifyService.error(error);
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
