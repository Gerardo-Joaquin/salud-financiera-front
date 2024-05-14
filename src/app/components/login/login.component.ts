import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  public loading: boolean = false
  constructor(
    private auth: LoginService,
    private fb: FormBuilder,
    private ts: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    })
  }

  authenticate() {
    console.log(this.authForm.value);
    if (this.authForm.valid) {
      this.loading = true;
      this.auth.loginUser(this.authForm.value).subscribe((data: any) => {
        if (!data['error']) {
          console.log(data);
          localStorage.setItem('user-session', JSON.stringify(data['data']))
          localStorage.setItem('user-token', JSON.stringify(data['token']))
          console.log(data['data']);
          this.router.navigateByUrl('/dashboard')
        } else {
          this.ts.warning(data['data'])
          console.log(data['data']);
        }
      }).add(() => this.loading = false)
    } else {
      this.ts.error('Ingresa los datos correctos')
    }
  }
}
