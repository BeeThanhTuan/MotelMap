import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MotelModels } from '../models/motel-models';

@Injectable({
  providedIn: 'root'
})
export class MotelService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(
    private httpClient: HttpClient,
  ) {}

  public getAllMotels(): Observable<MotelModels[]> {
    const url = `${this.REST_API_SERVER}/api/motels`;
    return this.httpClient.get<MotelModels[]>(url, this.httpOptions);
  }

  public getMotelById(id: string): Observable<MotelModels> {
    const url = `${this.REST_API_SERVER}/api/motel/${id}`;
    return this.httpClient.get<MotelModels>(url, this.httpOptions);
  }

  public postMotel(data: any):Observable<any> {
    const url = `${this.REST_API_SERVER}/api/motel`;
    return this.httpClient.post<any>(url, data, this.httpOptions);
  }
  
  public deleteMotel(id:string):Observable<any> {
    const url = `${this.REST_API_SERVER}/api/motel/${id}`;
    return this.httpClient.delete<any>(url, this.httpOptions);
  }

}
