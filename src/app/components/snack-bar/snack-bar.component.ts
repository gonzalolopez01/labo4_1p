import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
  snackBarMessage: string = this.snackBarRef.containerInstance.snackBarConfig.data?.message || 'Mensaje por defecto';
}
