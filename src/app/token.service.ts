import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private url = 'http://book.loc/token';

  constructor(private http: HttpClient) { }

  get(): Observable<any>  {
    return this.http.get(this.url);
  }
}
