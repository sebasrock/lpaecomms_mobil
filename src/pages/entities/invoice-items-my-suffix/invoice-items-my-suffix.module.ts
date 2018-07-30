import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoiceItemsMySuffixPage } from './invoice-items-my-suffix';
import { InvoiceItemsMySuffixService } from './invoice-items-my-suffix.provider';

@NgModule({
    declarations: [
        InvoiceItemsMySuffixPage
    ],
    imports: [
        IonicPageModule.forChild(InvoiceItemsMySuffixPage),
        TranslateModule.forChild()
    ],
    exports: [
        InvoiceItemsMySuffixPage
    ],
    providers: [InvoiceItemsMySuffixService]
})
export class InvoiceItemsMySuffixPageModule {
}
