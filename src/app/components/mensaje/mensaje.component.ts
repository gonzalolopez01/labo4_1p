import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent {
@Input() mensaje:string='';
}
