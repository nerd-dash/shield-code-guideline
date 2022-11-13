import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';
import { ErrorDialogComponent } from 'src/app/shared/sfc-components';

import { User } from '../../../shared/models/User';
import { UserRoutes } from '../users-routing.module';

@Component({
  selector: 'sfc-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  displayedColumns = [
    `id`,
    `firstName`,
    `lastName`,
    `email`,
    `gender`,
    `country`,
    `actions`
  ];

  users: User[] = [];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  onAdd() {
    this.router.navigate([`../${UserRoutes.FORM}`], { relativeTo: this.route });
  }

  private onError(error: Error): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '30wv',
      data: error
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.error(result);
    });
  }
}
