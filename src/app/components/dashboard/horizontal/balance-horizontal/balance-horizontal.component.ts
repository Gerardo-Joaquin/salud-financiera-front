import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-balance-horizontal',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './balance-horizontal.component.html',
  styleUrl: './balance-horizontal.component.scss'
})
export class BalanceHorizontalComponent {

  public barChartAllLabels!: any


  public barChartAllData: any;

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
        // min: -10,

        display: true,

      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw as number;
            const valueF = value.toFixed(2)
            return `${label}: ${valueF}%`;
          }
        }
      }
    },


  };

  financialData: any;

  concepts: any[] = []


  years = ['2021', '2022', '2023', '2024'];
  data: any
  constructor() {
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data')!)
      this.constructChart();
      this.financialData = this.data.horizontalAnalysis_incomeStatement
    }
  }
  private constructChart() {
    const horizontalAnalysis_incomeStatement = this.data.horizontalAnalysis_incomeStatement;
    this.concepts = Object.keys(horizontalAnalysis_incomeStatement[this.years[0]]);
    this.barChartAllLabels = ['Utilidad bruta', 'Utilidad de operación', 'Utilidad antes de impuestos', 'Utilidad neta'];
    this.barChartAllData = this.years.map(year => {
      return {
        data: [
          horizontalAnalysis_incomeStatement[`${year} (%)`]['Utilidad bruta'],
          horizontalAnalysis_incomeStatement[`${year} (%)`]['Utilidad de operación'],
          horizontalAnalysis_incomeStatement[`${year} (%)`]['Utilidad antes de impuestos'],
          horizontalAnalysis_incomeStatement[`${year} (%)`]['Utilidad Neta'],
        ],
        label: year,
        backgroundColor: this.getBackgroundColorForYear(year)
      };
    });
  }

  private getBackgroundColorForYear(year: string): string {
    const colors: any = {
      '2021': '#2fbee1',
      '2022': '#13a1c7',
      '2023': '#1381a7',
      '2024': '#166788',
    };
    return colors[year] || '#cccccc'; // Default color if year is not in the colors map
  }

  ngOnInit(): void { }

  formatNumber(num: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(num);
  }

  formatPercent(num: string): string {
    const numF = parseFloat(num);
    return num != 'N.A.' ? numF.toFixed(1) + '%' : 'N.A.'
  }

  transformData(value: string) {
    return (value.replace('%', ''))
  }
  selectConcept(concept: any) {
    this.barChartAllLabels = [concept]

    this.barChartAllData = [
      { data: [(this.financialData['2021 (%)'][concept])], label: '2021', backgroundColor: '#2fbee1' },
      { data: [(this.financialData['2022 (%)'][concept])], label: '2022', backgroundColor: '#13a1c7' },
      { data: [(this.financialData['2023 (%)'][concept])], label: '2023', backgroundColor: '#1381a7' },
      { data: [(this.financialData['2024 (%)'][concept])], label: '2024', backgroundColor: '#166788' },
    ]

  }
}
