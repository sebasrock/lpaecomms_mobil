import { BaseEntity } from './../../../models';

export class InvoicesMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public invNo?: string,
        public invDate?: any,
        public invAmount?: number,
        public invStatus?: boolean,
        public clientsId?: number,
        public invNos?: BaseEntity[],
    ) {
        this.invStatus = false;
    }
}
