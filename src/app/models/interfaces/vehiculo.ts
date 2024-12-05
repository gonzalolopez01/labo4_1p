export interface Vehiculo {
    id?: string;
    nombre: string;
    tipo: 'aereo' | 'terrestre' | 'maritimo' | null;
    ruedas: number;
    capacidad: number;    
    estado: boolean;
}
