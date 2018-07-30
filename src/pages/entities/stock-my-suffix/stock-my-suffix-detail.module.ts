import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { StockMySuffixDetailPage } from './stock-my-suffix-detail';
import { StockMySuffixService } from './stock-my-suffix.provider';

@NgModule({
    declarations: [
        StockMySuffixDetailPage
    ],
    imports: [
        IonicPageModule.forChild(StockMySuffixDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        StockMySuffixDetailPage
    ],
    providers: [StockMySuffixService]
})
export class StockMySuffixDetailPageModule {
}
