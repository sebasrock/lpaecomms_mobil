import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { InvoiceItemsMySuffix } from './invoice-items-my-suffix.model';

@Injectable()
export class InvoiceItemsMySuffixService {
    private resourceUrl = Api.API_URL + '/invoice-items';

    constructor(private http: HttpClient) { }

    create(invoiceItems: InvoiceItemsMySuffix): Observable<InvoiceItemsMySuffix> {
        return this.http.post(this.resourceUrl, invoiceItems);
    }

    update(invoiceItems: InvoiceItemsMySuffix): Observable<InvoiceItemsMySuffix> {
        return this.http.put(this.resourceUrl, invoiceItems);
    }

    find(id: number): Observable<InvoiceItemsMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
