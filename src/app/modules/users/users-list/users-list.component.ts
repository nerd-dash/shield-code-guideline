import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';
import { ErrorDialogComponent } from 'src/app/shared/sfc-components';
import { PageEvent } from '@angular/material/paginator';

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
    `country`
  ];

  users: User[] = [];

  pageEvent: PageEvent = {
    length: 100,
    pageIndex: 1,
    pageSize: 10
  };

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService
      .readAll({
        page: this.pageEvent.pageIndex,
        limit: this.pageEvent.pageSize
      })
      .pipe(
        first(),
        map((response) => {
          const length = response.headers.get('X-Total-Count') || '10';
          this.pageEvent.length = parseInt(length, 10);
          this.users = response.body || [];
        }),
        catchError((error) => {
          this.onError(error);
          return of([]);
        })
      )
      .subscribe();
  }

  onAdd() {
    this.router.navigate([`../${UserRoutes.FORM}`], { relativeTo: this.route });
  }

  onSearch(event:any){
    const query = event.target?.value;
    this.userService
    .readAll({
      page: this.pageEvent.pageIndex,
      limit: this.pageEvent.pageSize,
      query
    })
    .pipe(
      first(),
      map((response) => {
        const length = response.headers.get('X-Total-Count') || '10';
        this.pageEvent.length = parseInt(length, 10);
        this.users = response.body || [];
      }),
      catchError((error) => {
        this.onError(error);
        return of([]);
      })
    )
    .subscribe();
    
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    console.log(this.pageEvent);
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
