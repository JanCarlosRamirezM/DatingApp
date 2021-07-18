import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: "Bearer " + localStorage.getItem("token"),
  }),
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = environment.apiUrl + "users/";

  constructor(private _HttpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._HttpClient.get<User[]>(this.baseUrl, httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this._HttpClient.get<User>(this.baseUrl + id, httpOptions);
  }
}
