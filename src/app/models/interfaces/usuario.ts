export interface Usuario {
    id?: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    tipo: 'admin' | 'empleado';    
    esHabilitado: boolean;
}