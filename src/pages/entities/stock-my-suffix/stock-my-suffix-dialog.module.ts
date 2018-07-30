import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockMySuffixDialogPage } from './stock-my-suffix-dialog';
import { StockMySuffixService } from './stock-my-suffix.provider';

@NgModule({
    declarations: [
        StockMySuffixDialogPage
    ],
    imports: [
        IonicPageModule.forChild(StockMySuffixDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        StockMySuffixDialogPage
    ],
    providers: [
        StockMySuffixService
    ]
})
export class StockMySuffixDialogPageModule {
}
