import { Page } from "@playwright/test";
import { ReferBusinessModel } from "./referBusiness.model";
import data from "./referBusiness.json";

export class ReferBusinessPage {
    readonly page: Page;
    readonly massa = data.caseDefault as ReferBusinessModel;

    constructor(page: Page) {
        this.page = page;
    }

    async agora(data: ReferBusinessModel) {

        if(!data) {
            data = this.massa;
        }

        await this.executa(data);
    }

    async executa(data: ReferBusinessModel) {
        await this.page.waitForTimeout(2000);

        await this.page.getByRole('textbox', { name: 'Email' }).fill(data.referEmail);
        await this.page.getByRole('button', { name: 'Add Referral' }).click();

        await this.page.locator('iframe[title="Embedded form"]').contentFrame().getByRole('textbox', { name: 'Your friend\'s full name?*' }).fill(data.friendName);

        await this.page.locator('iframe[title="Embedded form"]').contentFrame().getByTestId('phone-field').fill(data.friendPhone);

        await this.page.locator('iframe[title="Embedded form"]').contentFrame().getByRole('textbox', { name: 'Their company name*' }).fill(data.companyName);

        await this.page.locator('iframe[title="Embedded form"]').contentFrame().getByTestId('submitbutton').click();

        await this.page.waitForTimeout(2000);
        await this.page.locator('iframe[title="Embedded form"]').contentFrame().getByRole('heading', { name: 'Thank you so much! 😊' }).isVisible();
    }
}