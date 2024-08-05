import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { babystages } from '../../utils/constants';
import { ToastrService } from 'ngx-toastr';
import { UserFormService } from '../../core/services/user-form.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { states } from '../../utils/states';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgbModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private ts: ToastrService,
    private ngModal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  openModal(content: any, size: string) {
    this.ngModal.open(content, { size, centered: true })
  }


}
