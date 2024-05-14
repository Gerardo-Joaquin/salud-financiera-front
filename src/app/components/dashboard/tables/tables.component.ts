import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { CommonModule } from '@angular/common';
import { ExportService } from '../../../core/services/export.service';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit {

  userParentInfo: any[] = [];
  skipUserParentInfo: number = 0;
  limitUserParentInfo: number = 10;
  totalCountUserParentInfo: number = 0;

  userParentQuestions: any[] = [];
  skipUserParentQuestions: number = 0;
  limitUserParentQuestions: number = 10;
  totalCountUserParentQuestions: number = 0;

  feedbackUsers: any [] = []
  constructor(
    private dashboardService: DashboardService,
    private exportService: ExportService,
  ) { }

  ngOnInit(): void {
    this.updateUserParentInfo()
    this.updateUserParentQuestions()
    this.dashboardService.getCommentsUsers().subscribe(data => {
      this.feedbackUsers = data.data
    })
  }

  updateUserParentInfo(): void {
    this.dashboardService.getUsersParentInfo(this.skipUserParentInfo, this.limitUserParentInfo).subscribe(data => {
      if (!data.error) {
        console.log(data);
        this.userParentInfo = data.data
        this.totalCountUserParentInfo = data['total_count']
      } else {
        throw new Error('Error al obtener datos del usuario')
      }
    })
  }
  updateUserParentQuestions(): void {
    this.dashboardService.getUsersParentQuestions(this.skipUserParentQuestions, this.limitUserParentQuestions).subscribe(data => {
      if (!data.error) {
        console.log(data);
        this.userParentQuestions = data.data
        this.totalCountUserParentQuestions = data['total_count']
      } else {
        throw new Error('Error al obtener datos del usuario')
      }
    })
  }

  nextPage(tableType: string): void {
    switch (tableType) {
      case 'info':
        if (this.totalCountUserParentInfo > this.limitUserParentInfo) {
          this.skipUserParentInfo += this.limitUserParentInfo;
          this.updateUserParentInfo()
        }
        break;
      case 'question':
        if (this.totalCountUserParentQuestions > this.limitUserParentQuestions) {
          this.skipUserParentQuestions += this.limitUserParentQuestions;
          this.updateUserParentQuestions()
        }
        break;

      default:
    }
  }

  previousPage(tableType: string): void {
    switch (tableType) {
      case 'info':
        if (this.skipUserParentInfo > 0) {
          this.skipUserParentInfo -= this.limitUserParentInfo;
          if (this.skipUserParentInfo < 0) {
            this.skipUserParentInfo = 0;
          }
          this.updateUserParentInfo()
        }
        break;
      case 'question':
        if (this.skipUserParentQuestions > 0) {
          this.skipUserParentQuestions -= this.limitUserParentQuestions;
          if (this.skipUserParentQuestions < 0) {
            this.skipUserParentQuestions = 0;
          }
          this.updateUserParentQuestions()
        }
        break;
    }
  }
  exportData(tableType: string) {
    switch (tableType) {
      case 'info':
        this.exportService.exportToCsv(this.userParentInfo, 'usuarios.csv')
        break;
      case 'question':
        this.exportService.exportToCsv(this.userParentQuestions, 'preguntas.csv')
        break;
      case 'feedback':
        this.exportService.exportToCsv(this.feedbackUsers, 'feedback.csv')
        break;
    }
  }


}
