import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../models/user";

const httpOptions = {
  headers:  new HttpHeaders({
    Authorization: "Bearer " +  localStorage.getItem("token"),
  }),
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = environment.apiUrl + "users/";

  constructor(private _HttpClient: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    console.log(httpOptions);

    return this._HttpClient.get<IUser[]>(this.baseUrl, httpOptions);
  }

  getUser(id: number): Observable<IUser> {
    return this._HttpClient.get<IUser>(this.baseUrl + id, httpOptions);
  }
}
