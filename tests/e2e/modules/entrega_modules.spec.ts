import { Page, test } from '@playwright/test';
import { context as ct } from "../../support/data/globalContext";
import { login } from '../../support/utils/helper';
import { EntregaAutogerenciadaModel } from '../../support/pages/Entregas/criaEntregaAutogerenciada/entregaAutogerenciada.model';
import { EntregaAutogerenciadaPage } from '../../support/pages/Entregas/criaEntregaAutogerenciada';
import dataEta from '../../support/pages/Entregas/criaEntregaAutogerenciada/entregaAutogerenciada.json';
import { EntregaSolicitandoMotoristaPage } from '../../support/pages/Entregas/criaEntregaSolicitandoMotorista';
import { EntregaSolicitandoMotoristaModel } from '../../support/pages/Entregas/criaEntregaSolicitandoMotorista/entregaSolicitandoMotorista.model';
import dataEsm from '../../support/pages/Entregas/criaEntregaSolicitandoMotorista/entregaSolicitandoMotorista.json';
import { ReferBusinessModel } from '../../support/pages/Entregas/referBusiness/referBusiness.model';
import { ReferBusinessPage } from '../../support/pages/Entregas/referBusiness';
import dataRb from '../../support/pages/Entregas/referBusiness/referBusiness.json';
import { FiltrerDatePage } from '../../support/pages/Entregas/filterDate';
import { ViewEntregasAnterioresPage } from '../../support/pages/Entregas/viewEntregasAnteriores';
import { NewDeliveryPage } from '../../support/pages/Entregas/criaNovoDelivery';
import dataNd from '../../support/pages/Entregas/criaEntregaAutogerenciada/entregaAutogerenciada.json';
import { NewDeliveryModel } from '../../support/pages/Entregas/criaNovoDelivery/criaNovoDelivery.model';

let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await login(page, ct.gerais.usuario);
});

test.afterAll(async () => {
    page.close();
});

test.describe('Modulo (Entregas)', () => {
    test('Deve criar uma nova entrega autogerenciada', async () => {
        const dt = dataEta.caseDefault as EntregaAutogerenciadaModel;
        const eta = new EntregaAutogerenciadaPage(page);
        await eta.agora(dt);
    });

    test('Deve criar uma nova entrega solicitando motorista', async () => {
        const dt = dataEsm.caseDefault as unknown as EntregaSolicitandoMotoristaModel;
        const esm = new EntregaSolicitandoMotoristaPage(page);
        await esm.agora(dt);
    });

    test('Deve indicar o email de um amigo para ganhar uma bonificação', async () => {
        const dt = dataRb.caseDefault as ReferBusinessModel;
        const rb = new ReferBusinessPage(page);
        await rb.agora(dt);
    });

    test('Deve filtrar as entregas conforme a data', async () => {
        const fd = new FiltrerDatePage(page);
        await fd.agora(page);
    });

    test('Deve filtrar as entregas anteriores a data do dia', async () => {
        const vea = new ViewEntregasAnterioresPage(page);
        await vea.agora(page);
    });

    test('Deve criar um novo Delivery pelo botão no painel', async () => {
        const dt = dataNd.caseDefault as EntregaAutogerenciadaModel;
        const nd = new NewDeliveryPage(page);
        await nd.agora(dt);
    });
});