import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Color } from 'chart.js'
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { states } from '../../../utils/states';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-info',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule, NgbModule],
  templateUrl: './dashboard-info.component.html',
  styleUrl: './dashboard-info.component.scss'
})
export class DashboardInfoComponent {

  public barChartLabels!: any
  public barChartType = 'bar';
  public barChartLegend = true;


  positiveColor = '#2fbee1'
  negativeColor = '#f44336'

  ventas = [102040, 112040, 105510, 112505];
  pasivoCirculante = [52040, 55210, 59011, 61028];
  activoCirculante = [80000, 85000, 82000, 90000];
  utilidadBruta = [30000, 35000, 32000, 40000];
  sumaVentas = this.ventas.reduce((total, valor) => total + valor, 0)
  sumaPasivo = this.pasivoCirculante.reduce((total, valor) => total + valor, 0)
  sumaActivo = this.activoCirculante.reduce((total, valor) => total + valor, 0)
  sumaUtilidadBruta = this.utilidadBruta.reduce((total, valor) => total + valor, 0)

  //ventas
  valorInicialVentas = this.ventas[0];
  valorFinalVentas = this.ventas[this.ventas.length - 1];

  incrementoTotalVentas = this.valorFinalVentas - this.valorInicialVentas;
  incrementoPorcentualVentas = (this.incrementoTotalVentas / this.valorInicialVentas) * 100;
  restanteVentas = 100 - parseInt(this.incrementoPorcentualVentas.toFixed(2))

  // activos
  valorInicialActivo = this.activoCirculante[0];
  valorFinalActivo = this.activoCirculante[this.ventas.length - 1];

  incrementoActivos = this.valorFinalActivo - this.valorInicialActivo;
  incrementoPorcentualActivos = (this.incrementoActivos / this.valorInicialActivo) * 100;
  restanteActivos = 100 - parseInt(this.incrementoPorcentualActivos.toFixed(2))
  // pasivos
  valorInicialPasivo = this.pasivoCirculante[0];
  valorFinalPasivo = this.pasivoCirculante[this.ventas.length - 1];

  incrementoPasivos = this.valorFinalPasivo - this.valorInicialPasivo;
  incrementoPorcentualPasivos = (this.incrementoPasivos / this.valorInicialPasivo) * 100;
  restantePasivos = 100 - parseInt(this.incrementoPorcentualPasivos.toFixed(2))
  // bruta
  valorInicialBruta = this.utilidadBruta[0];
  valorFinalBruta = this.utilidadBruta[this.ventas.length - 1];

  incrementoBruta = this.valorFinalBruta - this.valorInicialBruta;
  incrementoPorcentualBruta = (this.incrementoBruta / this.valorInicialBruta) * 100;
  restanteBruta = 100 - parseInt(this.incrementoPorcentualBruta.toFixed(2))

  dataVentas = this.incrementoTotalVentas
  dataPasivoCirculante = this.incrementoPasivos
  dataActivos = this.incrementoActivos
  dataUtilidad = this.incrementoBruta

  public barChartData!: any[];

  public lineChartData!: any[];

  public barChartOptions: ChartConfiguration['options'] = {
    backgroundColor: '#1382a756',
    datasets: {
      bar: {
        borderRadius: 14
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {

    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed + '%';
          }
        }
      }
    }
  };
  public doughnutChartLabels: string[] = [
    'Incremento',
  ];

  public doughnutChartDataVentas!: ChartData<'doughnut'>;
  public doughnutChartDataActivo!: ChartData<'doughnut'>;
  public doughnutChartDataPasivo!: ChartData<'doughnut'>;
  public doughnutChartDataBruto!: ChartData<'doughnut'>;

  years: string[] = []
  selectedYear = 'all'
  allData: any;

  constructor(
    private dashboard: DashboardService,
    private loading: LoadingService,
  ) {
    if (localStorage.getItem('data')) {
      this.years = ['2021', '2022', '2023', '2024']
      this.allData = JSON.parse(localStorage.getItem('data')!)

      this.ventas = this.years.map(year => this.allData.incomeStatement[year]['Ventas Netas']);
      this.utilidadBruta = this.years.map(year => this.allData.incomeStatement[year]['Utilidad bruta']);
      this.pasivoCirculante = this.years.map(year => this.allData.balanceSheet_NOassets[year]['Total Pasivo Circulante']);
      this.activoCirculante = this.years.map(year => this.allData.balanceSheet_assets[year]['Total Activo Circulante']);
      this.constructCharts()
    }
  }

  chargeDataForYear(year: string) {
    this.selectedYear = year
    if (year == 'all') {
      this.ventas = this.years.map(year => this.allData.incomeStatement[year]['Ventas Netas']);
      this.utilidadBruta = this.years.map(year => this.allData.incomeStatement[year]['Utilidad bruta']);
      this.pasivoCirculante = this.years.map(year => this.allData.balanceSheet_NOassets[year]['Total Pasivo Circulante']);
      this.activoCirculante = this.years.map(year => this.allData.balanceSheet_assets[year]['Total Activo Circulante']);
      this.constructCharts()
    } else {
      this.dataActivos = this.allData.balanceSheet_assets[year]['Total Activo Circulante']
      this.dataVentas = this.allData.incomeStatement[year]['Ventas Netas']
      this.dataPasivoCirculante = this.allData.balanceSheet_NOassets[year]['Total Pasivo Circulante']
      this.dataUtilidad = this.allData.incomeStatement[year]['Utilidad bruta']
      // this.constructCharts()}
      this.lineChartData = []
      this.barChartData = [
        { data: [this.dataVentas, this.dataActivos, this.dataPasivoCirculante, this.dataUtilidad], label: 'Pesos' },
      ];
      this.barChartLabels = ['Ventas', 'Activo circulante', 'Pasivo circulante', 'Utilidad bruta']
      // console.log(this.barChartData);
    }
  }


  constructCharts() {
    this.sumaVentas = this.ventas.reduce((total, valor) => total + valor, 0)
    this.sumaPasivo = this.pasivoCirculante.reduce((total, valor) => total + valor, 0)
    this.sumaActivo = this.activoCirculante.reduce((total, valor) => total + valor, 0)
    this.sumaUtilidadBruta = this.utilidadBruta.reduce((total, valor) => total + valor, 0)

    //ventas
    this.valorInicialVentas = this.ventas[0];
    this.valorFinalVentas = this.ventas[this.ventas.length - 1];

    this.incrementoTotalVentas = this.valorFinalVentas - this.valorInicialVentas;
    this.incrementoPorcentualVentas = (this.incrementoTotalVentas / this.valorInicialVentas) * 100;
    this.restanteVentas = this.incrementoPorcentualVentas < 100 ? 100 - parseInt(this.incrementoPorcentualVentas.toFixed(2)) : 0

    // activos
    this.valorInicialActivo = this.activoCirculante[0];
    this.valorFinalActivo = this.activoCirculante[this.ventas.length - 1];

    this.incrementoActivos = this.valorFinalActivo - this.valorInicialActivo;
    this.incrementoPorcentualActivos = (this.incrementoActivos / this.valorInicialActivo) * 100;
    this.restanteActivos = this.incrementoPorcentualActivos < 100 ? 100 - parseInt(this.incrementoPorcentualActivos.toFixed(2)) : 0;
    // pasivos
    this.valorInicialPasivo = this.pasivoCirculante[0];
    this.valorFinalPasivo = this.pasivoCirculante[this.ventas.length - 1];

    this.incrementoPasivos = this.valorFinalPasivo - this.valorInicialPasivo;
    this.incrementoPorcentualPasivos = (this.incrementoPasivos / this.valorInicialPasivo) * 100;
    this.restantePasivos = this.incrementoPorcentualPasivos < 100 ? 100 - parseInt(this.incrementoPorcentualPasivos.toFixed(2)) : 0
    // bruta
    this.valorInicialBruta = this.utilidadBruta[0];
    this.valorFinalBruta = this.utilidadBruta[this.ventas.length - 1];

    this.incrementoBruta = this.valorFinalBruta - this.valorInicialBruta;
    this.incrementoPorcentualBruta = (this.incrementoBruta / this.valorInicialBruta) * 100;
    this.restanteBruta = this.incrementoPorcentualBruta < 100 ? 100 - parseInt(this.incrementoPorcentualBruta.toFixed(2)) : 0

    this.dataVentas = this.incrementoTotalVentas
    this.dataPasivoCirculante = this.incrementoPasivos
    this.dataActivos = this.incrementoActivos
    this.dataUtilidad = this.incrementoBruta

    this.doughnutChartDataVentas = {
      datasets: [
        { data: [parseInt(this.incrementoPorcentualVentas.toFixed(2)), this.restanteVentas], backgroundColor: [this.determineColor(this.incrementoPorcentualVentas), '#D9D9D9'] }
      ]
    };
    this.doughnutChartDataActivo = {
      datasets: [
        { data: [parseInt(this.incrementoPorcentualActivos.toFixed(2)), this.restanteActivos], backgroundColor: [this.determineColor(this.incrementoPorcentualActivos), '#D9D9D9'] }
      ]
    };
    this.doughnutChartDataPasivo = {
      datasets: [
        { data: [parseInt(this.incrementoPorcentualPasivos.toFixed(2)), this.restantePasivos], backgroundColor: [this.determineColor(this.incrementoPorcentualPasivos), '#D9D9D9'] }
      ]
    };
    this.doughnutChartDataBruto = {
      datasets: [
        { data: [parseInt(this.incrementoPorcentualBruta.toFixed(2)), this.restanteBruta], backgroundColor: [this.determineColor(this.incrementoPorcentualBruta), '#D9D9D9'] }
      ]
    };
    this.lineChartData = [
      { data: this.activoCirculante, label: 'Activo Circulante', type: 'line', fill: false, borderColor: '#F5D300 ' },
      { data: this.utilidadBruta, label: 'Utilidad Bruta', type: 'line', fill: false, borderColor: '#FF6F61 ' },
      { data: this.pasivoCirculante, label: 'Pasivo Circulante', type: 'line', fill: false, borderColor: '#40E0D0 ' },
    ];
    this.barChartLabels = ['2021', '2022', '2023', '2024'];
    this.barChartData = [
      { data: this.ventas, label: 'Ventas' },
    ];
  }

  ngOnInit() {
    // this.loading.setLoading(true)

  }

  determineColor(incremento: number) {
    return incremento >= 0 ? this.positiveColor : this.negativeColor;
  };


  changeValues(type: number) {

    if (type == 0) {
      this.dataActivos = this.incrementoActivos
    }

  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  }


}
