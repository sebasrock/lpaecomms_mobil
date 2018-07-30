import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { InvoiceItemsMySuffix } from './invoice-items-my-suffix.model';
import { InvoiceItemsMySuffixService } from './invoice-items-my-suffix.provider';

@IonicPage({
    defaultHistory: ['EntityPage']
})
@Component({
    selector: 'page-invoice-items-my-suffix',
    templateUrl: 'invoice-items-my-suffix.html'
})
export class InvoiceItemsMySuffixPage {
    invoiceItems: InvoiceItemsMySuffix[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private invoiceItemsService: InvoiceItemsMySuffixService,
                private modalCtrl: ModalController, private toastCtrl: ToastController) {
        this.invoiceItems = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.invoiceItemsService.query().subscribe(
            (response) => {
                this.invoiceItems = response;
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

    trackId(index: number, item: InvoiceItemsMySuffix) {
        return item.id;
    }

    open(slidingItem: any, item: InvoiceItemsMySuffix) {
        let modal = this.modalCtrl.create('InvoiceItemsMySuffixDialogPage', {item: item});
        modal.onDidDismiss(invoiceItems => {
            if (invoiceItems) {
                if (invoiceItems.id) {
                    this.invoiceItemsService.update(invoiceItems).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'InvoiceItemsMySuffix updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.invoiceItemsService.create(invoiceItems).subscribe(data => {
                        this.invoiceItems.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'InvoiceItemsMySuffix added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(invoiceItems) {
        this.invoiceItemsService.delete(invoiceItems.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'InvoiceItemsMySuffix deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(invoiceItems: InvoiceItemsMySuffix) {
        this.navCtrl.push('InvoiceItemsMySuffixDetailPage', {id: invoiceItems.id});
    }
}
