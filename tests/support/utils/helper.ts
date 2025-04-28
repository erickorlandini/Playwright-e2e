import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { LoginModel } from "../pages/login/login.model";
import path from 'path';
import { abilities } from "../pages/Entregas/criaEntregaSolicitandoMotorista/entregaSolicitandoMotorista.model";

export function nomeComNumeroAleatorio(name: string, quantidade: number = 5) {
    const numberRandom = Math.floor(Math.random() * (10 ** quantidade));
    const numberString = numberRandom.toString().padStart(quantidade, '0');
    const nameWithRandom = name + numberString;
    return nameWithRandom;
}

export async function login(page: Page, user?: LoginModel) {
    await new LoginPage(page).agora(user);
}

export async function pickupStop(page: Page, locationName: string, pickupAddress: string, pickupInstructions: string) {
    await page.getByRole('button').nth(1).click();
    await page.getByRole('textbox', { name: 'Add a name for the pickup stop' }).fill(locationName);

    await page.getByRole('textbox', { name: '*Pickup address' }).click();
    await page.getByRole('textbox', { name: '*Pickup address' }).fill(pickupAddress);
    const optionPickup = page.getByRole('menuitem', { name: 'Sao Paulo Brazilian' });

    await page.waitForTimeout(2000);
    if (await optionPickup.isVisible()) {
        await optionPickup.click();
    }

    await page.getByRole('textbox', { name: 'How should driver find the' }).fill(pickupInstructions);

    await page.getByRole('button', { name: 'Attach a file or photo' }).click();

    const image = path.resolve(__dirname, 'package.png');

    await page.getByText('Click or drag file to this area to uploadYou can upload JPG, JPEG, PNG or PDF').setInputFiles(image);

    await page.getByRole('button', { name: 'Upload' }).click();

    await page.locator('[data-test-id="save-stop-button"]').click();

    const alertDeliveryMessage = page.getByRole('heading', { name: 'Would you like to apply these' });

    if(await alertDeliveryMessage.isVisible()) {
        await page.getByRole('button', { name: 'All future deliveries' }).click();
    }
}

export async function addStop(page: Page, locationName: string, email: string, phone: string, pickupAddress: string, pickupInstructions: string, orderSource: string, idOrderSource: string, additionalAddress?: any, additionalBusinessName?: any) {
    await page.getByRole('textbox', { name: 'Enter the recipient\'s name' }).fill(locationName);
    await page.getByRole('textbox', { name: 'Enter the recipient\'s email' }).fill(email);
    await page.getByRole('textbox', { name: '*Address' }).clear();
    await page.getByRole('textbox', { name: '*Address' }).fill(pickupAddress);
    const optionPickup = page.getByRole('menuitem', { name: 'Sao Paulo Brazilian' });

    await page.waitForTimeout(2000);
    if (await optionPickup.isVisible()) {
        await optionPickup.click();
    }
    await page.getByRole('textbox', { name: 'Enter the recipient\'s phone' }).fill(phone);
    
    if(additionalAddress != "") {
        const buttonAddAddress = page.getByRole('button', { name: 'Add additional address' });
        if(await buttonAddAddress.isVisible()) {
            await page.getByRole('textbox', { name: 'Enter any additional address' }).fill(additionalAddress);
        }
    }
    
    if(additionalBusinessName != "") {
        const buttonAddBusiness = page.getByRole('button', { name: 'Add business name' });
        if(await buttonAddBusiness.isVisible()) {
            await page.getByRole('textbox', { name: 'Enter the recipient\'s business name' }).fill(additionalBusinessName);
        }
    }

    await page.getByRole('textbox', { name: 'What should the driver do at' }).fill(pickupInstructions);

    await page.getByRole('button', { name: 'Add order ids' }).click();
    await page.getByRole('combobox', { name: 'Order source' }).click();
    await page.getByRole('option', { name: orderSource }).click();
    await page.getByRole('textbox', { name: 'Shopify order id' }).fill(idOrderSource);

    await page.getByRole('button', { name: 'Add' }).click();

    await page.locator('[data-test-id="save-stop-button"]').click();

    const alertDeliveryMessage = page.getByRole('heading', { name: 'Would you like to apply these' });

    if(await alertDeliveryMessage.isVisible()) {
        await page.getByRole('button', { name: 'All future deliveries' }).click();
    }
}

export async function recomendTools(page: Page, data: abilities[]) {
    await page.getByRole('button', { name: 'Recommend tools/abilities for' }).click();

    await recomendToolsAbilities(page)

    async function recomendToolsAbilities(page: Page) {
        for(let acao of data) {
            await page.getByRole('combobox', { name: 'Recommended tools / abilities' }).click();
            await page.getByRole('option', { name: acao.toolsAbilities }).click();
        }
    }
}

export async function addJobDescription(page: Page, descriptionJob: string) {
    await page.getByRole('button', { name: 'Add job description' }).click();

    await page.getByRole('textbox', { name: 'What will be delivered?' }).fill(descriptionJob);
}