import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { InvoicesMySuffix } from './invoices-my-suffix.model';
import { InvoicesMySuffixService } from './invoices-my-suffix.provider';

@IonicPage({
    segment: 'invoices-my-suffix-detail/:id',
    defaultHistory: ['EntityPage', 'invoices-my-suffixPage']
})
@Component({
    selector: 'page-invoices-my-suffix-detail',
    templateUrl: 'invoices-my-suffix-detail.html'
})
export class InvoicesMySuffixDetailPage {
    invoices: InvoicesMySuffix;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private invoicesService: InvoicesMySuffixService, private toastCtrl: ToastController) {
        this.invoices = new InvoicesMySuffix();
        this.invoices.id = params.get('id');
    }

    ionViewDidLoad() {
        this.invoicesService.find(this.invoices.id).subscribe(data => this.invoices = data);
    }

    open(item: InvoicesMySuffix) {
        let modal = this.modalCtrl.create('InvoicesMySuffixDialogPage', {item: item});
        modal.onDidDismiss(invoices => {
            if (invoices) {
                this.invoicesService.update(invoices).subscribe(data => {
                    this.invoices = data;
                    let toast = this.toastCtrl.create(
                        {message: 'InvoicesMySuffix updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }

}
