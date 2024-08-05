import { Component } from '@angular/core';
import { RentabilidadComponent } from '../indices/rentabilidad/rentabilidad.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { BalanceGeneralComponent } from "../balance-general/balance-general.component";
import { ActivoVerticalComponent } from "./activo-vertical/activo-vertical.component";
import { PasivoVerticalComponent } from "./pasivo-vertical/pasivo-vertical.component";

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [CommonModule, NgbModule, RentabilidadComponent, BalanceGeneralComponent, ActivoVerticalComponent, PasivoVerticalComponent],
  templateUrl: './vertical.component.html',
  styleUrl: './vertical.component.scss'
})
export class VerticalComponent {

  active = 1

}
