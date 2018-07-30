import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicesMySuffixDetailPage } from './invoices-my-suffix-detail';
import { InvoicesMySuffixService } from './invoices-my-suffix.provider';

@NgModule({
    declarations: [
        InvoicesMySuffixDetailPage
    ],
    imports: [
        IonicPageModule.forChild(InvoicesMySuffixDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        InvoicesMySuffixDetailPage
    ],
    providers: [InvoicesMySuffixService]
})
export class InvoicesMySuffixDetailPageModule {
}
