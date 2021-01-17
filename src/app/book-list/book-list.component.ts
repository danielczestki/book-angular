import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  @Output() editBookEmit = new EventEmitter<number>();
  @Input() token: string;
  books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.bookService.list().subscribe(books => this.books = books);
  }

  remove(id: number): void {
    this.bookService.remove(id, this.token).subscribe(data => {
      this.list();
    });
  }

  edit(id: number): void {
    this.editBookEmit.emit(id);
  }
}
