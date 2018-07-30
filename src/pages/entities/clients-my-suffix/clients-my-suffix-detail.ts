import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { ClientsMySuffix } from './clients-my-suffix.model';
import { ClientsMySuffixService } from './clients-my-suffix.provider';

@IonicPage({
    segment: 'clients-my-suffix-detail/:id',
    defaultHistory: ['EntityPage', 'clients-my-suffixPage']
})
@Component({
    selector: 'page-clients-my-suffix-detail',
    templateUrl: 'clients-my-suffix-detail.html'
})
export class ClientsMySuffixDetailPage {
    clients: ClientsMySuffix;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private clientsService: ClientsMySuffixService, private toastCtrl: ToastController) {
        this.clients = new ClientsMySuffix();
        this.clients.id = params.get('id');
    }

    ionViewDidLoad() {
        this.clientsService.find(this.clients.id).subscribe(data => this.clients = data);
    }

    open(item: ClientsMySuffix) {
        let modal = this.modalCtrl.create('ClientsMySuffixDialogPage', {item: item});
        modal.onDidDismiss(clients => {
            if (clients) {
                this.clientsService.update(clients).subscribe(data => {
                    this.clients = data;
                    let toast = this.toastCtrl.create(
                        {message: 'ClientsMySuffix updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
