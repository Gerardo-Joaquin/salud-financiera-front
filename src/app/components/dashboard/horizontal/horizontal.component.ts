import { Component } from '@angular/core';
import { PasivoVerticalComponent } from '../vertical/pasivo-vertical/pasivo-vertical.component';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RentabilidadComponent } from '../indices/rentabilidad/rentabilidad.component';
import { BalanceGeneralComponent } from '../balance-general/balance-general.component';
import { ActivoVerticalComponent } from '../vertical/activo-vertical/activo-vertical.component';
import { BalanceHorizontalComponent } from "./balance-horizontal/balance-horizontal.component";
import { ActivoHorizontalComponent } from "./activo-horizontal/activo-horizontal.component";
import { PasivoHorizontalComponent } from "./pasivo-horizontal/pasivo-horizontal.component";

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [CommonModule, NgbModule, RentabilidadComponent, BalanceGeneralComponent, ActivoVerticalComponent, PasivoVerticalComponent, BalanceHorizontalComponent, ActivoHorizontalComponent, PasivoHorizontalComponent],
  templateUrl: './horizontal.component.html',
  styleUrl: './horizontal.component.scss'
})
export class HorizontalComponent {
  active = 1
}
