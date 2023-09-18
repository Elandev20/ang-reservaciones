import { Pasajero } from "./passenger.interface";

export interface booking{
    hotelId : number;
    pasajeroId: number;
    fInicio : string;
    fFin : string;
    habitacionId : number;
    nombreEmergencia : string;
    telefonoEmergencia : string;
    Pasajero : Pasajero
}