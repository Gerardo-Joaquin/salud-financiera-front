import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-rentabilidad',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './rentabilidad.component.html',
  styleUrl: './rentabilidad.component.scss'
})
export class RentabilidadComponent {
  selectedIndice: any

  public barChartData = [
    { data: [2.3, 5.6, 34, 76.1], label: 'Roe' },
  ];

  public barChartAllLabels = ['ROE', 'Margen', 'Rotación', 'Apalancamiento', 'Multiplicación'];

  public barChartAllData: any[] = [];
  public barChartIndiceData: any[] = []
  public barchartIndiceLabel: any[] = []

  public barChartLabels = ['2021', '2022', '2023', '2024'];

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
      //       const valueF = value.toFixed(2)
      //       return `${label}: ${valueF}%`;
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
      const data = JSON.parse(localStorage.getItem('data')!)
      const indicators = data.indicators
      const years = ['2021', '2022', '2023', '2024']
      this.barChartAllData = [
        { data: [indicators['2021']['ROE (UN/CC)'], indicators['2021']['Marge (UN/VTAS)'], indicators['2021']['Rotación (VTAS/AT)'], indicators['2021']['Apalancamiento (AT/CC)'], indicators['2021']['Multiplicación de los tres anteriores']], label: '2021', backgroundColor: '#2fbee1' },
        { data: [indicators['2022']['ROE (UN/CC)'], indicators['2022']['Marge (UN/VTAS)'], indicators['2022']['Rotación (VTAS/AT)'], indicators['2022']['Apalancamiento (AT/CC)'], indicators['2022']['Multiplicación de los tres anteriores']], label: '2022', backgroundColor: '#13a1c7' },
        { data: [indicators['2023']['ROE (UN/CC)'], indicators['2023']['Marge (UN/VTAS)'], indicators['2023']['Rotación (VTAS/AT)'], indicators['2023']['Apalancamiento (AT/CC)'], indicators['2023']['Multiplicación de los tres anteriores']], label: '2023', backgroundColor: '#1381a7' },
        { data: [indicators['2024']['ROE (UN/CC)'], indicators['2024']['Marge (UN/VTAS)'], indicators['2024']['Rotación (VTAS/AT)'], indicators['2024']['Apalancamiento (AT/CC)'], indicators['2024']['Multiplicación de los tres anteriores']], label: '2024', backgroundColor: '#166788' },
      ];
      this.data = {
        headers: years,
        rows: [
          { name: 'ROE (UN/CC)', values: years.map(year => `${indicators[year]['ROE (UN/CC)'].toFixed(3)}%`) },
          { name: 'Margen (UN/VTAS)', values: years.map(year => `${indicators[year]['Marge (UN/VTAS)'].toFixed(3)}%`) },
          { name: 'Rotación (VTAS/AT)', values: years.map(year => `${indicators[year]['Rotación (VTAS/AT)'].toFixed(3)}`) },
          { name: 'Apalancamiento (AT/CC)', values: years.map(year => `${indicators[year]['Apalancamiento (AT/CC)'].toFixed(3)}`) },
          { name: 'Multiplicación de los tres anteriores', values: years.map(year => `${indicators[year]['Multiplicación de los tres anteriores'].toFixed(3)}%`) }
        ]
      };
    }
  }


  selectIndice(row: any) {
    console.log(row);
    this.selectedIndice = row
    this.barchartIndiceLabel = [row.name]
    this.barChartIndiceData = [
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
