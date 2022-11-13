import { Component, Input } from '@angular/core';

import { User } from '../../models/User';

@Component({
  selector: 'sfc-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: User[] = [];

  displayedColumns = [`id`, `firstName`, `lastName`, `email`, `gender`, `country`];
}
