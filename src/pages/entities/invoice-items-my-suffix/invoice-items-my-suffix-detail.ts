import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { InvoiceItemsMySuffix } from './invoice-items-my-suffix.model';
import { InvoiceItemsMySuffixService } from './invoice-items-my-suffix.provider';

@IonicPage({
    segment: 'invoice-items-my-suffix-detail/:id',
    defaultHistory: ['EntityPage', 'invoice-items-my-suffixPage']
})
@Component({
    selector: 'page-invoice-items-my-suffix-detail',
    templateUrl: 'invoice-items-my-suffix-detail.html'
})
export class InvoiceItemsMySuffixDetailPage {
    invoiceItems: InvoiceItemsMySuffix;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private invoiceItemsService: InvoiceItemsMySuffixService, private toastCtrl: ToastController) {
        this.invoiceItems = new InvoiceItemsMySuffix();
        this.invoiceItems.id = params.get('id');
    }

    ionViewDidLoad() {
        this.invoiceItemsService.find(this.invoiceItems.id).subscribe(data => this.invoiceItems = data);
    }

    open(item: InvoiceItemsMySuffix) {
        let modal = this.modalCtrl.create('InvoiceItemsMySuffixDialogPage', {item: item});
        modal.onDidDismiss(invoiceItems => {
            if (invoiceItems) {
                this.invoiceItemsService.update(invoiceItems).subscribe(data => {
                    this.invoiceItems = data;
                    let toast = this.toastCtrl.create(
                        {message: 'InvoiceItemsMySuffix updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
