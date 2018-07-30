import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicesMySuffixPage } from './invoices-my-suffix';
import { InvoicesMySuffixService } from './invoices-my-suffix.provider';

@NgModule({
    declarations: [
        InvoicesMySuffixPage
    ],
    imports: [
        IonicPageModule.forChild(InvoicesMySuffixPage),
        TranslateModule.forChild()
    ],
    exports: [
        InvoicesMySuffixPage
    ],
    providers: [InvoicesMySuffixService]
})
export class InvoicesMySuffixPageModule {
}
