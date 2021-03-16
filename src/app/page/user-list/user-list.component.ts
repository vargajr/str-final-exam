import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$:Observable<User[]> = this.userService.list$;
  selectedItemToDelete:User = new User();
  phraseControl: FormControl = new FormControl('');
  phrase: string = '';
  orderBy:string = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
    this.phraseControl.valueChanges.pipe(
      debounceTime(500)
    )
    .subscribe(
      newValue => this.phrase = newValue
    );
  }

  setToDelete(record:User): void {
    this.selectedItemToDelete = record;
  }

  deleteUser():void {
    this.userService.remove(this.selectedItemToDelete).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

  onOrder(columnName:string):void {
    this.orderBy = columnName;
  }
}
