import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ErrorDialogComponent } from './error-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ErrorDialogComponent
  ]
})
export class ErrorDialogModule {}
