import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estructura',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './estructura.component.html',
  styleUrl: './estructura.component.scss'
})
export class EstructuraComponent {
  selectedIndice: any

  public barChartAllLabels!:any

  public barChartAllData: any[] = [];
  public barChartIndiceData: any[] = []
  public barchartIndiceLabel: any[] = []

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
      this.constructCharts()
    }
  }

  constructCharts() {
    const indicators = this.data.indicators
    const years = ['2021', '2022', '2023', '2024']
    this.barChartAllLabels =  ['Pasivo Total/Activo Total', 'Pasivo Total/CC'];
    this.barChartAllData = [
      { data: [indicators['2021']['Pasivo Total / Activo Total'], indicators['2021']['Pasivo Total / CC']], label: '2021', backgroundColor: '#2fbee1' },
      { data: [indicators['2022']['Pasivo Total / Activo Total'], indicators['2022']['Pasivo Total / CC']], label: '2022', backgroundColor: '#13a1c7' },
      { data: [indicators['2023']['Pasivo Total / Activo Total'], indicators['2023']['Pasivo Total / CC']], label: '2023', backgroundColor: '#1381a7' },
      { data: [indicators['2024']['Pasivo Total / Activo Total'], indicators['2024']['Pasivo Total / CC']], label: '2024', backgroundColor: '#166788' },
    ];
    this.data = {
      headers: years,
      rows: [
        { name: 'Pasivo Total / Activo Total', values: years.map(year => `${indicators[year]['Pasivo Total / Activo Total'].toFixed(3)}%`) },
        { name: 'Pasivo Total / CC', values: years.map(year => `${indicators[year]['Pasivo Total / CC'].toFixed(3)}`) },
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
