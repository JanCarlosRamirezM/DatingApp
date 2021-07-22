import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { AlertifyService } from "../../../services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { IUser } from "./../../../interfaces/IUser";

@Component({
  selector: "member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"],
})
export class MemberDetailComponent implements OnInit {
  user: any;

  constructor(
    private _userService: UserService,
    private _alertifyService: AlertifyService,
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    let userId = this._router.snapshot.params["id"];
    this._userService.getUser(userId).subscribe(
      (user: IUser) => {
        this.user = user;
      },
      (error) => {
        this._alertifyService.error(error);
      }
    );
  }
}
