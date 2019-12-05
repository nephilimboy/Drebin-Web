import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {ModelFeatureAndParameters} from "./drebin.model";


// type EntityResponseType = HttpResponse<SrcElement>;


@Injectable({providedIn: 'root'})
export class DrebinService {
    configUrl = 'http://127.0.0.1:8000/api/v1/grapher/';
    httpHeader = new HttpHeaders({'content-type': 'application/json'})

    // private handleError: HandleError;
    constructor(private http: HttpClient) {
        // this.handleError = httpErrorHandler.createHandleError('HeroesService');
    }

    getDiagram(): Observable<HttpResponse<any>> {
        return this.http.get<any>(this.configUrl, {headers: this.httpHeader});
    }

    train(modelDta: ModelFeatureAndParameters): Observable<HttpResponse<any>> {
        return this.http.post<ModelFeatureAndParameters>(this.configUrl, modelDta, {observe: 'response'});
    }


}