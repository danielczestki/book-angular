import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = 'http://book.loc/books';

  constructor(private http: HttpClient) { }

  list(): Observable<Book[]>  {
    return this.http.get<Book[]>(this.url);
  }

  remove(id: number, token: string): Observable<any> {
    const httpParams = {
      _token: token
    };

    return this.http.delete(this.url + '/' + id, {params: httpParams});
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>(this.url + '/' + id);
  }

  update(book: Book, token: string): Observable<any> {
    const body = {
        _token: token,
        title: book.title,
        author: book.author,
        category: book.category
    };

    return this.http.put(this.url + '/' + book.id, body);
  }

  add(book: Book, token: string): Observable<any> {
    const body = {
      _token: token,
      title: book.title,
      author: book.author,
      category: book.category
    };

    return this.http.post(this.url, body);
  }
}
