import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../interfaces/IUser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.users = data['users'];
    });
  }
}
