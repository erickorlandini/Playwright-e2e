import { Page } from "@playwright/test";
import { EntregaSolicitandoMotoristaModel } from "./entregaSolicitandoMotorista.model";
import data from "./entregaSolicitandoMotorista.json";
import { addJobDescription, recomendTools } from "../../../utils/helper";

export class EntregaSolicitandoMotoristaPage {
    readonly page: Page;
    readonly massa = data.caseDefault as unknown as EntregaSolicitandoMotoristaModel;

    constructor(page: Page) {
        this.page = page;
    }

    async agora(data: EntregaSolicitandoMotoristaModel) {

        if(!data) {
            data = this.massa;
        }

        await this.executa(data);
    }

    async executa(data: EntregaSolicitandoMotoristaModel) {
        await this.page.waitForTimeout(2000);

        await this.page.getByRole('button', { name: 'Create delivery' }).click();
        await this.page.getByText('Request a driverCreate a').click();

        // await this.page.getByRole('textbox', { name: '*Pickup date' }).click();
        // await this.page.getByRole('gridcell', { name: data.pickupDataMotorista }).click();

        await this.page.getByRole('textbox', { name: '*Pickup time' }).click();
        await this.page.getByRole('menuitem', { name: data.pickupTimeMotorista }).click();

        await this.page.getByRole('combobox', { name: '*Vehicle type' }).click();
        await this.page.getByRole('option', { name: data.vehicleTypeMotorista }).click();

        await this.page.getByRole('textbox', { name: '1st drop off' }).click();
        await this.page.getByText('Praça central5 Padanaram Rd').nth(1).click();

        await this.page.locator('[data-test-id="save-stop-button"]').click();

        if(data.recomendToolsAbilities) {
            await recomendTools(this.page, data.recomendToolsAbilities);
        }

        if(data.descriptionJob != "") {
            await addJobDescription(this.page, data.descriptionJob);
        }

        await this.page.getByRole('textbox', { name: '*Declared cargo value' }).fill(data.cargoValue);

        await this.page.getByRole('button', { name: 'Create delivery' }).click();

    }
}