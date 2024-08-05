import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RentabilidadComponent } from './rentabilidad/rentabilidad.component';
import { EstructuraComponent } from "./estructura/estructura.component";
import { LiquidezComponent } from "./liquidez/liquidez.component";

@Component({
  selector: 'app-indices',
  standalone: true,
  imports: [CommonModule, NgbModule, RentabilidadComponent, EstructuraComponent, LiquidezComponent],
  templateUrl: './indices.component.html',
  styleUrl: './indices.component.scss'
})
export class IndicesComponent {


  active = 1
}
