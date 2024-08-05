import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-liquidez',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './liquidez.component.html',
  styleUrl: './liquidez.component.scss'
})
export class LiquidezComponent {
  selectedIndice: any

  public barChartAllLabels!: any

  public barChartAllData: any[] = [];

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
      // tooltip: {
      //   callbacks: {
      //     label: (context) => {
      //       const label = context.dataset.label || '';
      //       const value = context.raw as number;
      //       const valueF = value.toFixed(3)
      //       return `${label}: ${valueF}`;
      //     }
      //   }
      // }
    },

  };

  public data: any
  dataIndicators: any
  constructor(

  ) {
    if (localStorage.getItem('data')) {
      this.data = JSON.parse(localStorage.getItem('data')!)
      this.constructChart()
    }
  }

  constructChart() {
    const indicators = this.data.indicators
    const years = ['2021', '2022', '2023', '2024']
    this.barChartAllLabels = ['Pasivo Total/Activo Total', 'Pasivo Total/CC'];
    this.barChartAllData = [
      { data: [indicators['2021']['Razón de liquidez (AC/PC)'], indicators['2021']['Prueba Ácida (AC-Inventario/PC)']], label: '2021', backgroundColor: '#2fbee1' },
      { data: [indicators['2022']['Razón de liquidez (AC/PC)'], indicators['2022']['Prueba Ácida (AC-Inventario/PC)']], label: '2022', backgroundColor: '#13a1c7' },
      { data: [indicators['2023']['Razón de liquidez (AC/PC)'], indicators['2023']['Prueba Ácida (AC-Inventario/PC)']], label: '2023', backgroundColor: '#1381a7' },
      { data: [indicators['2024']['Razón de liquidez (AC/PC)'], indicators['2024']['Prueba Ácida (AC-Inventario/PC)']], label: '2024', backgroundColor: '#166788' },
    ];
    this.data = {
      headers: years,
      rows: [
        { name: 'Razón de liquidez (AC/PC)', values: years.map(year => `${indicators[year]['Razón de liquidez (AC/PC)'].toFixed(3)}`) },
        { name: 'Prueba Ácida (AC-Inventario/PC)', values: years.map(year => `${indicators[year]['Prueba Ácida (AC-Inventario/PC)'].toFixed(3)}`) },
      ]
    };
  }


  selectIndice(row: any) {
    this.selectedIndice = row
    this.barChartAllLabels = [row.name]
    this.barChartAllData = [
      { data: [this.transformData(row.values[0])], label: '2021', backgroundColor: '#2fbee1' },
      { data: [this.transformData(row.values[1])], label: '2022', backgroundColor: '#13a1c7' },
      { data: [this.transformData(row.values[2])], label: '2023', backgroundColor: '#1381a7' },
      { data: [this.transformData(row.values[3])], label: '2024', backgroundColor: '#166788' },
    ]
  }

  transformData(value: string) {
    return (value.replace('%', ''))
  }
}
