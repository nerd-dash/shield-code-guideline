import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services';
import { ErrorDialogComponent } from 'src/app/shared/sfc-components';

@Component({
  selector: 'sfc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService
      .readAll()
      .pipe(
        first(),
        catchError((error) => {
          this.onError(error);
          return of([]);
        })
      )
      .subscribe((users) => (this.users = users));
  }

  private onError(error: Error): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '30wv',
      data: error
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
