
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceItemsMySuffixDialogPage } from './invoice-items-my-suffix-dialog';
import { InvoiceItemsMySuffixService } from './invoice-items-my-suffix.provider';
import { InvoicesMySuffixService } from '../invoices-my-suffix';
import { StockMySuffixService } from '../stock-my-suffix';

@NgModule({
    declarations: [
        InvoiceItemsMySuffixDialogPage
    ],
    imports: [
        IonicPageModule.forChild(InvoiceItemsMySuffixDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        InvoiceItemsMySuffixDialogPage
    ],
    providers: [
        InvoiceItemsMySuffixService,
        StockMySuffixService,
        InvoicesMySuffixService,
    ]
})
export class InvoiceItemsMySuffixDialogPageModule {
}
