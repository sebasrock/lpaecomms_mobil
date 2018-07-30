import { BaseEntity } from './../../../models';

export class InvoiceItemsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public invitemNo?: string,
        public invitemQty?: string,
        public stockId?: number,
        public invoicesId?: number,
    ) {
    }
}
