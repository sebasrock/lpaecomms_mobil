import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { StockMySuffix } from './stock-my-suffix.model';

@Injectable()
export class StockMySuffixService {
    private resourceUrl = Api.API_URL + '/stocks';

    constructor(private http: HttpClient) { }

    create(stock: StockMySuffix): Observable<StockMySuffix> {
        return this.http.post(this.resourceUrl, stock);
    }

    update(stock: StockMySuffix): Observable<StockMySuffix> {
        return this.http.put(this.resourceUrl, stock);
    }

    find(id: number): Observable<StockMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
