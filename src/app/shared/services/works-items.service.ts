import {Injectable} from '@angular/core';
import {WorksItems} from "../../../types/works-items";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../enviroments/environment.developer";
import {LoaderService} from "./loader.service";

@Injectable({
  providedIn: 'root'
})
export class WorksItemsService {

  constructor(private http: HttpClient) {
  }

  getVisibleWorksItems(): Observable<WorksItems[]> {
    return this.http.get<WorksItems[]>(environment.api + '?address=main');
  }

  getAllWorksItems(): Observable<WorksItems[]> {
    return this.http.get<WorksItems[]>(environment.api + '?address=works');
  }

  getWork(id: number): Observable<WorksItems> {
    return this.http.get<WorksItems>(environment.api + `?address=work&id=${id}`);
  }

}

