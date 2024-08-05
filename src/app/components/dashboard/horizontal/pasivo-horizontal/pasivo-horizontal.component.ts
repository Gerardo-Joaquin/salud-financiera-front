import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pasivo-horizontal',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './pasivo-horizontal.component.html',
  styleUrl: './pasivo-horizontal.component.scss'
})
export class PasivoHorizontalComponent {

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

  concepts: any[] = [];


  years = ['2021', '2022', '2023', '2024'];
  data:any
  constructor() {
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data')!)
      this.constructChart();
      this.financialData = this.data.horizontalAnalysis_balanceSheet_NOAssets
    }
  }
  private constructChart() {
    const horizontalAnalysis_balanceSheet_NOAssets = this.data.horizontalAnalysis_balanceSheet_NOAssets;
    this.concepts = Object.keys(horizontalAnalysis_balanceSheet_NOAssets[this.years[0]]);
    this.barChartAllLabels = ['Total Pasivo Circulante', 'Total Pasivo Largo Plazo', 'Capital Contribuido', 'Capital Ganado', 'Capital Contable', 'Pasivo + Capital'];
    this.barChartAllData = this.years.map(year => {
      return {
        data: [
          horizontalAnalysis_balanceSheet_NOAssets[`${year} (%)`]['Total Pasivo Circulante'],
          horizontalAnalysis_balanceSheet_NOAssets[`${year} (%)`]['Total Pasivo Largo Plazo'],
          horizontalAnalysis_balanceSheet_NOAssets[`${year} (%)`]['Capital Contribuido'],
          horizontalAnalysis_balanceSheet_NOAssets[`${year} (%)`]['Capital Ganado'],
          horizontalAnalysis_balanceSheet_NOAssets[`${year} (%)`]['Capital Contable'],
          horizontalAnalysis_balanceSheet_NOAssets[`${year} (%)`]['Pasivo + Capital'],
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
    const numF = parseFloat(num)
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
