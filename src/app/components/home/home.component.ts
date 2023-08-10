import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isLogedIn = false;

  prescriptionList!: any[];
  constructor(private apiService: ApiService, private router: Router, private storageService: StorageService) { }
  ngOnInit(): void {


    this.isLogedIn = this.storageService.isLoggedIn();
    if(!this.isLogedIn){
      this.router.navigateByUrl('login');
    }

    this.apiService.getPrescriptionList().subscribe({
      next: res => {
        this.prescriptionList = res;
      },
      error: console.log
    });
  }

  deleteData(id: number) {
    this.apiService.deletPrescriptionByID(id).subscribe({
      next: res => {
        this.ngOnInit();
      },
      error: res => {
        alert("Something is wrong!!");
      }
    })
  }

  clickMethod(data: any) {
    if (confirm("Are you sure to delete the data of " + data.name)) {
      this.deleteData(data.id);
    }
  }
  startDate: any;
  endDate: any;

  searchDateAlternative() {
    if(this.startDate> this.endDate){
      alert("The Start Date must be less than the End Date.");
      return;
    }
    this.apiService.getPrescriptionListByDateBetween(this.startDate, this.endDate).subscribe({
      next: res => {
        this.prescriptionList = res;
      },
      error: res => {
        alert("Something is wrong!!");
      }
    })
  }


}
