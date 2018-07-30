import { BaseEntity } from './../../../models';

export class ClientsMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public clientID?: string,
        public clientFirstName?: string,
        public clientLastName?: string,
        public clientAddress?: string,
        public clientPhone?: string,
        public clientStatus?: boolean,
        public clientIDS?: BaseEntity[],
    ) {
        this.clientStatus = false;
    }
}
