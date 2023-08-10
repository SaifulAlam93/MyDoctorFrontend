import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DrugInteractionData } from '../interfaces/drugInteractionData';
import { StorageService } from './storage.service';


const url = 'http://localhost:8080/api/prescriptions';

const providedRestApi = 'https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=341248';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient, private storageService: StorageService) { }

  getPrescriptionByID(id: number){
    return this.http.get<any>(url+"/" + id)
  }


  getPrescriptionList(){
    return this.http.get<any[]>(url)
  }

  createPrescription(data: any){
    return this.http.post(url, data)
  }

  updatePrescription(data: any){
    return this.http.put(url+'/'+ data.id, data)
  }


  deletPrescriptionByID(id: number){
    return this.http.delete(url+"/" + id)
  }

  getDrugInteractionsData(){
    return this.http.get<DrugInteractionData>(providedRestApi);
  }


  getPrescriptionListByDateBetween(str: any, end:any){
    return this.http.get<any[]>(url+'?strDate='+ str+ '&endDate='+end)
  }
}
