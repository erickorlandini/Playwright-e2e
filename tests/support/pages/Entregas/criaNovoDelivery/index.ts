import { Page } from "@playwright/test";
import { NewDeliveryModel } from "./criaNovoDelivery.model";
import data from "../criaEntregaAutogerenciada/entregaAutogerenciada.json";
import { pickupStop } from "../../../utils/helper";
import { EntregaAutogerenciadaModel } from "../criaEntregaAutogerenciada/entregaAutogerenciada.model";
import dataDelivery from "./criaNovoDelivery.json";

export class NewDeliveryPage {
    readonly page: Page;
    readonly massa = data.caseDefault as EntregaAutogerenciadaModel;
    readonly dados = dataDelivery.caseDefault as NewDeliveryModel;

    constructor(page: Page) {
        this.page = page;
    }

    async agora(data?: EntregaAutogerenciadaModel, dt?: NewDeliveryModel): Promise<void> {
        
        if(!data) {
            data = this.massa;
        }

        if(!dt) {
            dt = this.dados;
        }

        await this.executa(data, dt);
    }

    async executa(data: EntregaAutogerenciadaModel, dt: NewDeliveryModel) {
        await this.page.waitForTimeout(2000);

        await this.page.getByRole('button', { name: 'Schedule a new delivery' }).click();

        await pickupStop(this.page, data.locationName, data.pickupAddress, data.pickupInstructions);

        await this.page.getByRole('textbox', { name: '*Pickup date' }).click();
        await this.page.getByRole('gridcell', { name: dt.deliveryDate }).click();

        await this.page.getByRole('textbox', { name: '*Pickup time' }).click();
        await this.page.getByRole('menuitem', { name: dt.deliveryTime }).click();

        await this.page.getByRole('combobox', { name: '*Vehicle type' }).click();
        await this.page.getByRole('option', { name: dt.deliveryVehicleType }).click();

        await this.page.getByRole('textbox', { name: '*Declared cargo value' }).fill(dt.deliveryCargoValue);

        await this.page.getByRole('button', { name: 'Create delivery' }).click();
    }
}