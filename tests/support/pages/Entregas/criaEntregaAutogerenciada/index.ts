import { Page } from "@playwright/test";
import { EntregaAutogerenciadaModel } from "./entregaAutogerenciada.model";
import data from "./entregaAutogerenciada.json";
import { addStop, pickupStop } from "../../../utils/helper";

export class EntregaAutogerenciadaPage {
    readonly page: Page;
    readonly massa = data.caseDefault as EntregaAutogerenciadaModel;

    constructor(page: Page) {
        this.page = page;
    }

    async agora(data?: EntregaAutogerenciadaModel): Promise<void> {
        
        if(!data) {
            data = this.massa;
        }

        await this.executa(data);
    }

    async executa(data: EntregaAutogerenciadaModel) {
        await this.page.waitForTimeout(2000);

        await this.page.getByRole('button', { name: 'Create delivery' }).click();
        await this.page.getByText('Create a self-managed deliveryCreate a route and assign it to your inhouse').click();

        await pickupStop(this.page, data.locationName, data.pickupAddress, data.pickupInstructions);

        await this.page.getByRole('textbox', { name: '*Pickup date' }).click();
        await this.page.getByRole('gridcell', { name: data.pickupDate }).click();

        await this.page.getByRole('textbox', { name: '*Pickup time' }).click();
        await this.page.getByRole('menuitem', { name: data.pickupTime }).click();

        await this.page.getByRole('combobox', { name: '*Vehicle type' }).click();
        await this.page.getByRole('option', { name: data.vehicleType }).click();

        await this.page.getByRole('textbox', { name: '1st drop off' }).click();
        await this.page.getByText('Praça central5 Padanaram Rd').nth(1).click();

        await addStop(this.page, data.locationNameDrop, data.email, data.phone, data.pickupAddress, data.pickupInstructions, data.orderSource, data.idOrderSource, data.pickupAddress, data.additionalBusinessName);

        // await this.page.getByRole('textbox', { name: '*Declared cargo value' }).fill(data.declareCargoValue);

        await this.page.getByRole('button', { name: 'Create delivery' }).click();
    }
}