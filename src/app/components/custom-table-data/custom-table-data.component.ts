import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrugInteractionData } from 'src/app/interfaces/drugInteractionData';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-custom-table-data',
  templateUrl: './custom-table-data.component.html',
  styleUrls: ['./custom-table-data.component.scss']
})
export class CustomTableDataComponent implements OnInit {
  interactionData!: DrugInteractionData; 
  public isLogedIn = false;

  constructor(private apiService: ApiService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {

    this.isLogedIn = this.storageService.isLoggedIn();
    if(!this.isLogedIn){
      this.router.navigateByUrl('login');
    }


    this.apiService.getDrugInteractionsData().subscribe({
      next:res=>{
        this.interactionData = res;
        console.log('Categories---', this.interactionData);
      },
      error:console.log
      
    });
    
  }
}
