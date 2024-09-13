import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AppRequest {
  constructor(private http: HttpClient) {}
}
