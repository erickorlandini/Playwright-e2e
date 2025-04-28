import { Page } from "@playwright/test";

export class FiltrerDatePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async agora(page: Page) {
        await this.executa(page);
    }

    async executa(page: Page) {
        await page.waitForTimeout(2000);

        await page.locator('header div').filter({ hasText: 'Hi, 76 👋All pickup' }).locator('div').nth(1).click();

        await page.getByRole('gridcell', { name: '21' }).click();

        const cardDate21 = page.getByText(':45 AM - 11:00 AMSUVAssign driverSelf ManagedPickup at SteakHouse SP$0.000');

        if(await cardDate21.isVisible()) {
            throw new Error("Erro ao filtrar os deliverys por data");
        } else {
            await page.getByText(':45 AM - 02:45 AMVanNot reservedMetrobi deliveryNot ReservedPickup at Praça').isVisible();
            console.log("Card do dia filtrado esta visível");
        }
    }
}