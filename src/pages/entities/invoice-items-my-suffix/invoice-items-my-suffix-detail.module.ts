import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceItemsMySuffixDetailPage } from './invoice-items-my-suffix-detail';
import { InvoiceItemsMySuffixService } from './invoice-items-my-suffix.provider';

@NgModule({
    declarations: [
        InvoiceItemsMySuffixDetailPage
    ],
    imports: [
        IonicPageModule.forChild(InvoiceItemsMySuffixDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        InvoiceItemsMySuffixDetailPage
    ],
    providers: [InvoiceItemsMySuffixService]
})
export class InvoiceItemsMySuffixDetailPageModule {
}
