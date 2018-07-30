import { BaseEntity } from './../../../models';

export class StockMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public stockID?: string,
        public stockName?: string,
        public stockDesc?: string,
        public stockOnHand?: string,
        public stockPrice?: number,
        public stockStatus?: boolean,
        public stockIDS?: BaseEntity[],
    ) {
        this.stockStatus = false;
    }
}
