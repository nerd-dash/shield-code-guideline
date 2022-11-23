import { TableDataSource } from './../../../shared/models/table-data-source.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services';
import { ErrorDialogComponent } from 'src/app/shared/sfc-components';

import { User } from '../../../shared/models/User';
import { UserRoutes } from '../users-routing.module';

@Component({
  selector: 'sfc-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  displayedColumns = [
    `id`,
    `firstName`,
    `lastName`,
    `email`,
    `gender`,
    `country`
  ];

  inputSearchFormControl = new FormControl('');

  formGroup = new FormGroup({
    inputSearchFormControl: this.inputSearchFormControl
  });

  users!: TableDataSource[];
  isLoading = true;
  hasError = false;

  pageEvent: PageEvent = {
    length: 100,
    pageIndex: 0,
    pageSize: 10
  };

  private query = '';

  private sub = new Subscription();

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateTable();

    this.sub.add(
      this.inputSearchFormControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value) => this.onSearch(value))
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd() {
    this.router.navigate([`../${UserRoutes.FORM}`], { relativeTo: this.route });
  }

  onSearch(value: string) {
    this.query = value;
    this.pageEvent = {
      length: 100,
      pageIndex: 0,
      pageSize: 10
    };
    this.updateTable();
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this.updateTable();
  }

  tableComponentEvent(event: TableDataSource) {
    console.log(event);
  }

  private updateTable() {
    this.isLoading = true;
    this.hasError = false;

    this.userService
      .readAll({
        page: this.pageEvent.pageIndex + 1,
        limit: this.pageEvent.pageSize,
        query: this.query
      })
      .pipe(first())
      .subscribe(
        (response) => {
          const length = response.headers.get('X-Total-Count') || '10';
          this.pageEvent.length = parseInt(length, 10);
          this.users =
            response.body?.map(this.userToTableDataSourceParser) || [];
          this.isLoading = false;
        },
        (error) => {
          this.onError(error);
          return of([]);
        }
      );
  }

  private onError(error: Error): void {
    this.hasError = true;
    this.isLoading = false;
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '30wv',
      data: error
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.error(result);
    });
  }

  private userToTableDataSourceParser({
    country,
    id,
    email,
    firstName,
    gender,
    lastName
  }: User): TableDataSource {
    return {
      selectId: id,
      country
    };
  }
}
