import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsMySuffixDetailPage } from './clients-my-suffix-detail';
import { ClientsMySuffixService } from './clients-my-suffix.provider';

@NgModule({
    declarations: [
        ClientsMySuffixDetailPage
    ],
    imports: [
        IonicPageModule.forChild(ClientsMySuffixDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        ClientsMySuffixDetailPage
    ],
    providers: [ClientsMySuffixService]
})
export class ClientsMySuffixDetailPageModule {
}
