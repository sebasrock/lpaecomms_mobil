import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsMySuffixPage } from './clients-my-suffix';
import { ClientsMySuffixService } from './clients-my-suffix.provider';

@NgModule({
    declarations: [
        ClientsMySuffixPage
    ],
    imports: [
        IonicPageModule.forChild(ClientsMySuffixPage),
        TranslateModule.forChild()
    ],
    exports: [
        ClientsMySuffixPage
    ],
    providers: [ClientsMySuffixService]
})
export class ClientsMySuffixPageModule {
}
