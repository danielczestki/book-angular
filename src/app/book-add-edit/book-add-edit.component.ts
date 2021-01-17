import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Book } from '../book';
import { BookService } from '../book.service';


@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html',
  styleUrls: ['./book-add-edit.component.css']
})
export class BookAddEditComponent implements OnInit {

  @Input() token: string;
  @Output() reloadList = new EventEmitter<boolean>();

  form: FormGroup;
  mode = 'add';

  constructor(private formBuilder: FormBuilder, private bookService: BookService) { }

  ngOnInit(): void {
    this.cancelEdit();
  }

  save(): void {
    if (this.mode === 'add') {
      this.bookService.add(this.form.value, this.token).subscribe(data => {
        this.cancelEdit();
        this.reloadList.emit(true);
      });
    } else {
      this.bookService.update(this.form.value, this.token).subscribe(data => {
        this.cancelEdit();
        this.reloadList.emit(true);
      });
    }
  }

  load(id: number): void {
    this.bookService.get(id).subscribe(book => {
      this.buildForm(book);
      this.mode = 'edit';
    });
  }

  cancelEdit(): void {
    this.buildForm({} as Book);
    this.mode = 'add';
  }

  buildForm(book: Book): void {
    this.form = this.formBuilder.group({
      id: [book.id],
      title: [book.title, [Validators.required, Validators.minLength(3)]],
      author: [book.author, [Validators.required, Validators.minLength(3)]],
      category: [book.category, [Validators.required, Validators.minLength(3)]]
    });
  }
}
