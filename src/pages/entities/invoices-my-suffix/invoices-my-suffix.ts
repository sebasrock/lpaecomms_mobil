import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { InvoicesMySuffix } from './invoices-my-suffix.model';
import { InvoicesMySuffixService } from './invoices-my-suffix.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-invoices-my-suffix',
    templateUrl: 'invoices-my-suffix.html'
})
export class InvoicesMySuffixPage {
    invoices: InvoicesMySuffix[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private invoicesService: InvoicesMySuffixService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.invoices = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.invoicesService.query().subscribe(
            (response) => {
                this.invoices = response;
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

    trackId(index: number, item: InvoicesMySuffix) {
        return item.id;
    }

    open(slidingItem: any, item: InvoicesMySuffix) {
        let modal = this.modalCtrl.create('InvoicesMySuffixDialogPage', {item: item});
        modal.onDidDismiss(invoices => {
            if (invoices) {
                if (invoices.id) {
                    this.invoicesService.update(invoices).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'InvoicesMySuffix updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.invoicesService.create(invoices).subscribe(data => {
                        this.invoices.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'InvoicesMySuffix added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(invoices) {
        this.invoicesService.delete(invoices.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'InvoicesMySuffix deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(invoices: InvoicesMySuffix) {
        this.navCtrl.push('InvoicesMySuffixDetailPage', {id: invoices.id});
    }
}
