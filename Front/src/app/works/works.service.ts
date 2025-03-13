import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Work} from './models/work';

@Injectable()
export class WorksService {
  worksApiBaseUrl = 'http://localhost:4200/works';
  constructor(private http: HttpClient) { }

  getAllWorks():Observable<Work[]>{
    return  this.http.get<Work[]>(`${this.worksApiBaseUrl}`);
  }

  addWork(work:Work):Observable<any>{
    return  this.http.post<any>(`${this.worksApiBaseUrl}`,{...work});
  }

  updateAWork(work:Work):Observable<any>{
    return this.http.put<Work>(`${this.worksApiBaseUrl}/${work.workContractID}`,{...work});
  }

  deleteWork(workContractId:number):Observable<any>{
    return this.http.delete(`${this.worksApiBaseUrl}/${workContractId}`);
  }
}
