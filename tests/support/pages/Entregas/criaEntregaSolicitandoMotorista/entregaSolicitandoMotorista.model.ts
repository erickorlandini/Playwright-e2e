export interface EntregaSolicitandoMotoristaModel {
    pickupDataMotorista: string;
    pickupTimeMotorista: string;
    vehicleTypeMotorista: string;
    recomendToolsAbilities: abilities[];
    descriptionJob: string;
    cargoValue: string;
}

export interface abilities {
    toolsAbilities: string;
}