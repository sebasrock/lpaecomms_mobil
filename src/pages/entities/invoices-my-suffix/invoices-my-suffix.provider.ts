import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';
// todo: handle dates

import { InvoicesMySuffix } from './invoices-my-suffix.model';

@Injectable()
export class InvoicesMySuffixService {
    private resourceUrl = Api.API_URL + '/invoices';

    constructor(private http: HttpClient) { }

    create(invoices: InvoicesMySuffix): Observable<InvoicesMySuffix> {
        return this.http.post(this.resourceUrl, invoices);
    }

    update(invoices: InvoicesMySuffix): Observable<InvoicesMySuffix> {
        return this.http.put(this.resourceUrl, invoices);
    }

    find(id: number): Observable<InvoicesMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
