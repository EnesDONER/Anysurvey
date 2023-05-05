import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  apiUrl="https://localhost:44347/api/";
  constructor(protected http: HttpClient) {
  }

  public getAll(route:string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}${route}`);
  }
  public getById(id: number,route:string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${route}/${id}`);
  }

  // getById(id: number): Observable<T> {
  //   return this.getAll().pipe(
  //     map(items => items.find(item => item.id === id))
  //   );
  public add(entity: T): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/${entity.constructor.name.toLowerCase()}/add`, entity);
  }
  public remove(entity: T): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/${entity.constructor.name.toLowerCase()}/remove`, entity);
  }
  public update(entity: T): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}/${entity.constructor.name.toLowerCase()}/update`, entity);
  }
}
