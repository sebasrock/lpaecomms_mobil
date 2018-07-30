import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicesMySuffixDialogPage } from './invoices-my-suffix-dialog';
import { InvoicesMySuffixService } from './invoices-my-suffix.provider';
import { ClientsMySuffixService } from '../clients-my-suffix';

@NgModule({
    declarations: [
        InvoicesMySuffixDialogPage
    ],
    imports: [
        IonicPageModule.forChild(InvoicesMySuffixDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        InvoicesMySuffixDialogPage
    ],
    providers: [
        InvoicesMySuffixService,
        ClientsMySuffixService,
    ]
})
export class InvoicesMySuffixDialogPageModule {
}
