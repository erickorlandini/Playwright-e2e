import { Page } from "@playwright/test";

export class ViewEntregasAnterioresPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async agora(page: Page) {
        await this.executa(page);
    }

    async executa(page: Page) {
        await page.waitForTimeout(4000);

        await page.getByRole('button', { name: 'Show past deliveries' }).click();

        const cardDate20 = page.getByText(':45 AM - 11:00 AMSUVAssign driverSelf ManagedPickup at SteakHouse SP$0.000');

        if(await cardDate20.isVisible()) {
            await page.getByText(':45 AM - 11:00 AMSUVAssign driverSelf ManagedPickup at SteakHouse SP$0.000').isVisible();
            console.log("Card do dia filtrado esta visível");
        } else {
            throw new Error("Erro ao filtrar os deliverys por data");
        }

        const cardDate21 = page.getByText(':45 AM - 11:00 AMSUVAssign driverSelf ManagedPickup at SteakHouse SP$0.000');

        if(await cardDate21.isVisible()) {
            await page.getByText(':45 AM - 02:45 AMVanNot reservedMetrobi deliveryNot ReservedPickup at Praça').isVisible();
            console.log("Card do dia filtrado esta visível");
        } else {
            throw new Error("Erro ao filtrar os deliverys por data");
        }
    }
}