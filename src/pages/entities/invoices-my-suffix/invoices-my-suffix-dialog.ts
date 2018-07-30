import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { InvoicesMySuffix } from './invoices-my-suffix.model';
import { InvoicesMySuffixService } from './invoices-my-suffix.provider';
import { ClientsMySuffix, ClientsMySuffixService } from '../clients-my-suffix';


@IonicPage()
@Component({
    selector: 'page-invoices-my-suffix-dialog',
    templateUrl: 'invoices-my-suffix-dialog.html'
})
export class InvoicesMySuffixDialogPage {

    invoices: InvoicesMySuffix;
    clients: ClientsMySuffix[];
    invDate: string;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private clientsService: ClientsMySuffixService,
                private invoicesService: InvoicesMySuffixService) {
        this.invoices = params.get('item');
        if (this.invoices && this.invoices.id) {
            this.invoicesService.find(this.invoices.id).subscribe(data => {
                this.invoices = data;
            });
        } else {
            this.invoices = new InvoicesMySuffix();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.invoices.id : null],
            invNo: [params.get('item') ? this.invoices.invNo : '',  Validators.required],
            invDate: [params.get('item') ? this.invoices.invDate : '',  Validators.required],
            invAmount: [params.get('item') ? this.invoices.invAmount : '',  Validators.required],
            invStatus: [params.get('item') ? this.invoices.invStatus : 'false', ],
            clients: [params.get('item') ? this.invoices.clientsId : '',],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ionViewDidLoad() {
        this.clientsService.query()
            .subscribe(data => { this.clients = data; }, (error) => this.onError(error));
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the invoices-my-suffix, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    compareClients(first: ClientsMySuffix, second: ClientsMySuffix): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackClientsById(index: number, item: ClientsMySuffix) {
        return item.id;
    }
}
