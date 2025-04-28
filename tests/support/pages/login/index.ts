import { Page } from "@playwright/test";
import { LoginModel } from "./login.model";
import data from './login.json';
import { URL_METROBI } from "../../../../playwright.config";

export class LoginPage {
    readonly page: Page;
    readonly user = data.caseDefault as LoginModel;

    constructor(page: Page) {
        this.page = page;
    }

    async ir(url? : string) {

        if(!url) {
            url = URL_METROBI;
        }
        await this.page.goto(url);
    }

    async executa(user: LoginModel) {
        await this.page.locator('input[name="emailAddress"]').fill(user.email);
        await this.page.locator('input[name="password"]').fill(user.senha);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async agora(user? : LoginModel, url? : string){
        await this.ir(url);

        if(user === undefined){
            user = this.user;
        }  
        await this.executa(user);
    }
}