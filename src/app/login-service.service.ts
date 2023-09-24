import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  public login (): Observable<any>{
    return this.http.get("http://localhost:8080/").pipe(map(
    val => {return val}
   ));
   
  }
}
