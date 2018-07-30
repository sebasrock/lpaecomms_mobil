import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockMySuffixPage } from './stock-my-suffix';
import { StockMySuffixService } from './stock-my-suffix.provider';

@NgModule({
    declarations: [
        StockMySuffixPage
    ],
    imports: [
        IonicPageModule.forChild(StockMySuffixPage),
        TranslateModule.forChild()
    ],
    exports: [
        StockMySuffixPage
    ],
    providers: [StockMySuffixService]
})
export class StockMySuffixPageModule {
}
