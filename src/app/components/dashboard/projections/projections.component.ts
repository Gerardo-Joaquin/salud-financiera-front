import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-projections',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective, NgbModule],
  templateUrl: './projections.component.html',
  styleUrl: './projections.component.scss'
})
export class ProjectionsComponent {
  selectedIndice: any

  public barChartAllLabels!: any

  public barChartAllData!: any;

  public barChartOptions: ChartConfiguration['options'] = {
    backgroundColor: '',
    datasets: {
      bar: {
        borderRadius: 5
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        // min: 0,
        display: true,

      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },

  };

  data: any
  constructor(

  ) {
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data')!)
      this.generateChart()

    }

  }

  generateChart() {
    const projections = this.data.projections;
    const years = ['2021', '2022', '2023', '2024', '2025', '2026']
    this.barChartAllLabels = ['Ventas Netas', 'Utilidad bruta', 'EbitDA'];

    this.barChartAllData = years.map(year => {
      return {
        data: [
          projections[year]['Ventas Netas'],
          projections[year]['Utilidad bruta'],
          projections[year]['EbitDA'],
        ],
        label: year,
        backgroundColor: this.getBackgroundColorForYear(year)
      }
    })
  }
  private getBackgroundColorForYear(year: string): string {
    const colors: any = {
      '2021': '#2fbee1',
      '2022': '#13a1c7',
      '2023': '#1381a7',
      '2024': '#166788',
      '2025': '#1b485e',
      '2026': '#1b485e'
    };
    return colors[year] || '#cccccc'; // Default color if year is not in the colors map
  }

  updateChart(type: string) {
    this.selectedIndice = type
    this.barChartAllLabels = [type]
    const projections = this.data.projections;
    this.barChartAllData = [
      { data: [projections['2021'][type]], label: '2021', backgroundColor: '#2fbee1' },
      { data: [projections['2022'][type]], label: '2022', backgroundColor: '#13a1c7' },
      { data: [projections['2023'][type]], label: '2023', backgroundColor: '#1381a7' },
      { data: [projections['2024'][type]], label: '2024', backgroundColor: '#166788' },
      { data: [projections['2025'][type]], label: '2025', backgroundColor: '#1b485e' },
      { data: [projections['2026'][type]], label: '2026', backgroundColor: '#1b485e' },
    ]
  }
}
