import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private _AuthService: AuthService) {}

  ngOnInit() {}

  register() {
    this._AuthService.register(this.model).subscribe(
      (resp) => {
        console.log('Registration successful');
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
