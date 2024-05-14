import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { babystages } from '../../utils/constants';
import { ToastrService } from 'ngx-toastr';
import { UserFormService } from '../../core/services/user-form.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { states } from '../../utils/states';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  rating = 3
  statesArray: any[] = states
  form!: FormGroup;
  babystages: any[] = babystages
  formFeedback!: FormGroup;
  idUser: string = '';
  permissionGeolocalization: boolean = false;
  citiesStateSelected: [] = []
  firstBaby: boolean = false;
  constructor(
    private fb: FormBuilder,
    private ts: ToastrService,
    private userService: UserFormService,
    private actRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idUser = this.actRouter.snapshot.queryParams['id']
    console.log(this.idUser);
    this.setUpForms()
    this.getLocation()
  }

  onChangeState(ev: any) {
    const stateSelected = ev.target.value;
    this.citiesStateSelected = this.statesArray.find((s) => s.state == stateSelected).cityes
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.permissionGeolocalization = true;
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.userService.getAddress(latitude, longitude).subscribe(data => {
          console.log(data['address']);
          const address = data['address']
          this.form.patchValue({
            'state': address['state'],
            'city': address['city'],
            'county': address['county']
          })
          this.form.get('state')?.disable()
          this.form.get('city')?.disable()
        })
      }, error => {
        if (error.code === error.PERMISSION_DENIED) {
          this.permissionGeolocalization = false;
          this.ts.info('Se denegarón los permisos de ubicación, seleccione su estado y municipio manualmente')
        } else {
          this.ts.error('ocurrio un error al obtener la ubicación')
        }
      })
    } else {
      this.ts.error('El navegador no es compatible con la geolocalizacion')
    }
  }
  setUpForms(): void {
    this.form = this.fb.group({
      id: [this.idUser],
      city: [, Validators.required],
      country: [''],
      state: [, Validators.required],
      genere: ['m', Validators.required],
      birthday: [, Validators.required],
      primerize: '',
      babystage: ['rn', Validators.required],
      babyweight: [, Validators.required],
      babyclothe: [, Validators.required],
      babycount: [1, Validators.required]
    })
    this.formFeedback = this.fb.group({
      state: [this.rating, Validators.required],
      feedback: [''],
      acceptEmails: [false],
      name: [, Validators.required],
      email: [,Validators.required],
    })
  }
  rate(rating: number): void {
    this.rating = rating;
    this.formFeedback.patchValue({
      state: this.rating
    })
  }
  saveForm(): void {
    if (this.form.valid && this.formFeedback.valid) {
      this.form.patchValue({
        primerize: this.form.get('babycount')!.value == 1 ? 'si': 'no'
      })
      const body = {
        'user-form': this.form.getRawValue(),
        'user-feedback': this.formFeedback.value
      }
      console.log(body);
      this.userService.uploadForm(body).subscribe(data => {
        if (!data.error) {
          this.ts.success('Se envió la información correctamente')
          this.router.navigate([], { queryParams: {} }).then(() => {
            window.location.reload()
          });
        } else {
          this.ts.error('Ocurrió un error, inténtelo mas tarde')
        }
      })

    } else {
      console.log(this.form.value);
      console.log(this.formFeedback.value);
      this.ts.error('Asegúrate de colocar toda la info que se requiera')
    }
  }

  onFirstChange(ev: any) {
    console.log(ev.target.value);
    const first = ev.target.value;
    if (first == 'no') {
      this.firstBaby = true;
    } else {
      this.firstBaby = false;
    }
  }
}
