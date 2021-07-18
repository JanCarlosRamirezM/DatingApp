import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AlertifyService } from "../../services/alertify.service";
import { IUser } from "../../models/user";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  users: IUser[] = [];
 
  constructor(
    private _UserService: UserService,
    private _AlertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this._UserService.getUsers().subscribe(
      (users: IUser[]) => {
        this.users = users;
      },
      (error) => {
        this._AlertifyService.error(error);
      }
    );
  }
}
