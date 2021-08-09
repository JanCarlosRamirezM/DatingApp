import { catchError } from 'rxjs/operators';
import { IUser } from './../interfaces/IUser';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberDetailResolver implements Resolve<IUser | null> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUser | null> {
    let idUser = route.params['id'];
    return this.userService.getUser(idUser).pipe(
      catchError((error) => {
        this.alertifyService.error(error);
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
