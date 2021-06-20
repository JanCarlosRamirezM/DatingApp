import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(
    private _AuthService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  register() {
    this._AuthService.register(this.model).subscribe(
      (resp) => {
        this.alertifyService.success('Registration successful');
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
