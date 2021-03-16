import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  
  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new User());
      }

      return this.userService.get(Number(params.id));
    })
  );

  updating: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  onFormSubmit(userForm: NgForm, record: User): void {
    this.updating = true;
    if(record.id === 0) {
      this.userService.create(record).subscribe(
        () => this.router.navigate([''])
      )
    } else {
      this.userService.update(record).subscribe(
        () => this.router.navigate([''])
      );
    }
  }
}