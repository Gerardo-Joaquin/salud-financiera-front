import { Component, ViewChild } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, Color } from 'chart.js'
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { states } from '../../../utils/states';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-info',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './dashboard-info.component.html',
  styleUrl: './dashboard-info.component.scss'
})
export class DashboardInfoComponent {

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barWeightData!: ChartData<'bar'>

  public dataGenereAge!: ChartData<'bar'>;

  public dataState!: ChartData<'bar'>;

  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Positivas', 'Negativas'],
    datasets: [
      {
        data: [120, 65],
        backgroundColor: [
          '#67A89B',
          '#5877A2'
        ]
      },
    ],
  };
  public piePrimericeData!: ChartData<'pie', number[], string | string[]>

  public piePanialData!: ChartData<'pie', number[], string | string[]>

  public lineDateGenderData!: ChartConfiguration['data'];

  public lineChartOptions: any = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };

  commentsUsers: any[] = []
  allUsers: any[] = []
  states: any[] = states
  stateSelected = 'Ciudad de Mexico'
  constructor(
    private dashboard: DashboardService,
    private loading: LoadingService,
  ) { }

  ngOnInit() {
    this.loading.setLoading(true)
    forkJoin({
      commentUsers: this.dashboard.getCommentsUsers(),
      users: this.dashboard.getUsersParentInfo(0, 0, true)
    }).subscribe(res => {
      this.commentsUsers = res.commentUsers.data
      this.allUsers = res.users.data
      this.generateAgeGenderDistribution()
      this.generateStateDistribution()
      this.loadDateGenderData()
      this.generateDistributionKgBaby()
      this.generateTypeClothePieBar()
      this.generateTypeEtape()
    }).add(() => {
      this.loading.setLoading(false)
    })
  }

  generateStateDistribution() {
    const stateGroup: any = {}

    this.allUsers.forEach(user => {
      const state = user.Estado
      const city = user.Ciudad
      if (state == this.stateSelected) {
        if (!stateGroup[city]) {
          stateGroup[city] = { count: 1 }
        } else {
          stateGroup[city].count++
        }
      }
    })

    const labels = Object.keys(stateGroup).sort((a, b) => parseInt(a) - parseInt(b));
    const labelsData = labels.map(city => stateGroup[city].count);

    this.dataState = {
      labels: labels,
      datasets: [
        { data: labelsData, label: 'Usuarios', backgroundColor: '#879AD1' },
      ],
    };
    console.log(stateGroup);
  }

  generateDistributionKgBaby() {
    const babyGroup: any = {
      '-3 Kg': { count: 0 },
      '3 - 6 Kg': { count: 0 },
      '6 - 9 Kg': { count: 0 },
      '9 - 12 Kg': { count: 0 },
      '12 - 14 Kg': { count: 0 },
      '14 - 16 Kg': { count: 0 },
      '16 - 17 Kg': { count: 0 },
      '17+ Kg': { count: 0 }
    };

    this.allUsers.forEach(user => {
      const weight = user.PesoBebe
      if (weight < 3) {
        babyGroup['-3 Kg'].count++;
      } else if (weight >= 3 && weight < 6) {
        babyGroup['3 - 6 Kg'].count++;
      } else if (weight >= 6 && weight < 9) {
        babyGroup['6 - 9 Kg'].count++;
      } else if (weight >= 9 && weight < 12) {
        babyGroup['9 - 12 Kg'].count++;
      } else if (weight >= 12 && weight < 14) {
        babyGroup['12 - 14 Kg'].count++;
      } else if (weight >= 14 && weight < 16) {
        babyGroup['14 - 16 Kg'].count++;
      } else if (weight >= 16 && weight < 17) {
        babyGroup['16 - 17 Kg'].count++;
      } else {
        babyGroup['17+ Kg'].count++;
      }
    })


    const labels = Object.keys(babyGroup).sort((a, b) => parseInt(a) - parseInt(b));
    const labelsData = labels.map(weight => babyGroup[weight].count);

    this.barWeightData = {
      labels: labels,
      datasets: [
        { data: labelsData, label: 'bebés', backgroundColor: '#879AD1' },
      ],

    };
  }
  generateTypeClothePieBar() {
    const babyGroup: any = {}

    this.allUsers.forEach(user => {
      const type = user.TipoPanial
      if (!babyGroup[type]) {
        babyGroup[type] = { count: 0 }
      }
      babyGroup[type].count++
    })

    const labels = Object.keys(babyGroup).sort((a, b) => parseInt(a) - parseInt(b));
    const labelsData = labels.map(type => babyGroup[type].count);

    this.piePanialData = {
      labels: labels,
      datasets: [
        {
          data: labelsData,
          backgroundColor: [
            '#A08CCB',
            '#C0C0C0'
          ]
        },
      ],
    };
  }
  generateTypeEtape() {
    const babyGroup: any = {}

    this.allUsers.forEach(user => {
      const type = user.TipoEtapaBebe
      if (!babyGroup[type]) {
        babyGroup[type] = { count: 0 }
      }
      babyGroup[type].count++
    })

    const labels = Object.keys(babyGroup).sort((a, b) => parseInt(a) - parseInt(b));
    const labelsData = labels.map(type => babyGroup[type].count);
    const upperLabels = labels.map(label => label.toUpperCase())
    this.piePrimericeData = {
      labels: upperLabels,
      datasets: [
        {
          data: labelsData,
          backgroundColor: [
            '#faaf16',
            '#fcb7af',
            '#ffe4e1',
            '#b2e2f2',
            '#baa2e2',
            '#b232f2',
            '#fdfaaa',
            '#adfd96'
          ]
        },
      ],
    };
  }

  loadDateGenderData() {
    // Inicializar arreglos para almacenar los recuentos de usuarios masculinos y femeninos para cada mes
    const maleDataByMonth = Array(12).fill(0);
    const femaleDataByMonth = Array(12).fill(0);

    // Recorrer la lista de usuarios y contar la cantidad de usuarios masculinos y femeninos para cada mes
    this.allUsers.forEach(user => {
      const date = new Date(user.FechaAcceso);
      const month = date.getMonth();
      const gender = user.Genero;

      if (gender === 'h') {
        maleDataByMonth[month]++;
      } else if (gender === 'm') {
        femaleDataByMonth[month]++;
      }
    });
    this.lineDateGenderData = {
      datasets: [
        {
          data: maleDataByMonth,
          label: 'Hombre',
          backgroundColor: 'rgba(80,80,255,0.2)',
          borderColor: 'rgba(80,80,255,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(80,80,255,0.8)',
          fill: 'origin',
        },
        {
          data: femaleDataByMonth,
          label: 'Mujer',
          backgroundColor: 'rgba(255,2,200,0.2)',
          borderColor: 'rgba(255,2,200,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,2,200,0.8)',
          fill: 'origin',
        },
      ],
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    };
  }

  generateAgeGenderDistribution() {
    const ageGroups: any = {
      '18-20': { male: 0, female: 0, other: 0, no: 0 },
      '21-30': { male: 0, female: 0, other: 0, no: 0 },
      '31-40': { male: 0, female: 0, other: 0, no: 0 },
      '41-50': { male: 0, female: 0, other: 0, no: 0 },
      '51-60': { male: 0, female: 0, other: 0, no: 0 },
      '61-70': { male: 0, female: 0, other: 0, no: 0 },
      '71+': { male: 0, female: 0, other: 0, no: 0 }
    };

    this.allUsers.forEach(user => {
      const age = this.calculateAge(user.Edad);
      let ageGroup;
      if (age <= 20) {
        ageGroup = '18-20';
      } else if (age <= 30) {
        ageGroup = '21-30';
      } else if (age <= 40) {
        ageGroup = '31-40';
      } else if (age <= 50) {
        ageGroup = '41-50';
      } else if (age <= 60) {
        ageGroup = '51-60';
      } else if (age <= 70) {
        ageGroup = '61-70';
      } else {
        ageGroup = '71+';
      }

      if (user.Genero == 'h') {
        ageGroups[ageGroup].male++;
      } else if (user.Genero == 'm') {
        ageGroups[ageGroup].female++;
      } else if (user.Genero == 'o') {
        ageGroups[ageGroup].other++;
      } else {
        ageGroups[ageGroup].no++;
      }
    });

    const labels = Object.keys(ageGroups);
    const maleData = labels.map(ageGroup => ageGroups[ageGroup].male);
    const femaleData = labels.map(ageGroup => ageGroups[ageGroup].female);
    const otherData = labels.map(ageGroup => ageGroups[ageGroup].other);
    const noData = labels.map(ageGroup => ageGroups[ageGroup].no);

    this.dataGenereAge = {
      labels: labels,
      datasets: [
        { data: maleData, label: 'Hombres' },
        { data: femaleData, label: 'Mujeres' },
        { data: otherData, label: 'Otro' },
        { data: noData, label: 'Prefirió no decir' }
      ]
    };

    return ageGroups;
  }

  calculateAge(birthday: string): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onStateChange(ev: any) {
    this.stateSelected = ev.target.value;
    this.generateStateDistribution()
  }
}
