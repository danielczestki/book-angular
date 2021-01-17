import { Component, OnInit, ViewChild } from '@angular/core';
import { BookAddEditComponent } from '../book-add-edit/book-add-edit.component';
import { TokenService } from '../token.service';
import {BookListComponent} from "../book-list/book-list.component";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @ViewChild(BookAddEditComponent) bookAddEditComponent: BookAddEditComponent;
  @ViewChild(BookListComponent) bookListComponent: BookListComponent;

  token: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.get().subscribe(data => this.token = data.token);
  }

  editBookEmit($event: any): void {
    this.bookAddEditComponent.load($event);
  }

  reloadList($event: boolean): void {
    this.bookListComponent.list();
  }
}
