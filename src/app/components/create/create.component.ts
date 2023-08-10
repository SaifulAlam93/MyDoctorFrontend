import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  now: Date = new Date();
  prescriptionForm!: FormGroup;

  id!: any;
  public isLogedIn = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute,
    private router: Router, private storageService: StorageService) {


    this.prescriptionForm = this.fb.group({
      id: [],
      prescriptionDate: [formatDate(this.now, 'yyyy-MM-ddTHH:mm', 'en'), [Validators.required]],
      name: ['', [Validators.required]],
      age: [[Validators.required]],
      gender: ['', [Validators.required]],
      diagnosis: '',
      medicines: '',
      nextVisitDate: '',
    });
  }
  ngOnInit(): void {

    this.isLogedIn = this.storageService.isLoggedIn();
    if(!this.isLogedIn){
      this.router.navigateByUrl('login');
    }




    this.id = this.route.snapshot.params['id'];
    if (this.id != "null") {
      this.apiService.getPrescriptionByID(this.id).subscribe({
        next: res => {
          this.prescriptionForm.patchValue(res);
        },
        error: res => { }
      });
    }

  }


  get f() {
    return this.prescriptionForm.controls;
  }


  submit() {
    if (this.prescriptionForm.invalid) {
      return;
    }
    if (this.id != 'null') {
      this.prescriptionForm.value.id = this.id;
      this.apiService.updatePrescription(this.prescriptionForm.value).subscribe({
        next: res => {
          this.router.navigateByUrl('home');
        },
        error: res => {
          alert("Something is Wrong!!");
        }
      });
    } else {
      this.apiService.createPrescription(this.prescriptionForm.value).subscribe({
        next: res => {
          this.router.navigateByUrl('home');
        },
        error: res => {
          alert("Something is Wrong!!");
        }
      });
    }
  }

}
