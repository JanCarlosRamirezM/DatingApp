import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = environment.apiUrl + "users/";

  constructor(private _HttpClient: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this._HttpClient.get<IUser[]>(this.baseUrl);
  }

  getUser(id: number): Observable<IUser> {
    return this._HttpClient.get<IUser>(this.baseUrl + id);
  }
}
