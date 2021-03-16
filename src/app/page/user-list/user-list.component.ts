import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
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
}
