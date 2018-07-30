import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsMySuffixDialogPage } from './clients-my-suffix-dialog';
import { ClientsMySuffixService } from './clients-my-suffix.provider';

@NgModule({
    declarations: [
        ClientsMySuffixDialogPage
    ],
    imports: [
        IonicPageModule.forChild(ClientsMySuffixDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        ClientsMySuffixDialogPage
    ],
    providers: [
        ClientsMySuffixService
    ]
})
export class ClientsMySuffixDialogPageModule {
}
