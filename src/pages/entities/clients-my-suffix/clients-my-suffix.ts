import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { ClientsMySuffix } from './clients-my-suffix.model';
import { ClientsMySuffixService } from './clients-my-suffix.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-clients-my-suffix',
    templateUrl: 'clients-my-suffix.html'
})
export class ClientsMySuffixPage {
    clients: ClientsMySuffix[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private clientsService: ClientsMySuffixService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.clients = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.clientsService.query().subscribe(
            (response) => {
                this.clients = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: ClientsMySuffix) {
        return item.id;
    }

    open(slidingItem: any, item: ClientsMySuffix) {
        let modal = this.modalCtrl.create('ClientsMySuffixDialogPage', {item: item});
        modal.onDidDismiss(clients => {
            if (clients) {
                if (clients.id) {
                    this.clientsService.update(clients).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'ClientsMySuffix updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.clientsService.create(clients).subscribe(data => {
                        this.clients.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'ClientsMySuffix added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(clients) {
        this.clientsService.delete(clients.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'ClientsMySuffix deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(clients: ClientsMySuffix) {
        this.navCtrl.push('ClientsMySuffixDetailPage', {id: clients.id});
    }
}
