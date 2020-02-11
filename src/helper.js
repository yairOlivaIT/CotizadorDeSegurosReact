//toma el año que el usuario le esta pasando
// Obtiene la diferencia de años
export function obtenerDiferenciaYear(year){
    return new Date().getFullYear() - year;  
}

//calcula el total a pagar segun la marca
export function totalAPagarSegunLaMarca(marca){
    let incremento;
    //es el 30% de lo que llevemos NO DE LOS 2000, osea del resultado que obtenemos antes
    switch(marca){
        case 'americano':
            incremento = 1.15;
            break;
        case 'europeo' :
            incremento = 1.30;
            break;
        case 'asiatico' :
            incremento = 1.05;
            break;

        default:
            break; 
    }
    return incremento;
}

// Aumentar segun el Plan , calcula el tipo de seguro
export function aumentarSegunElPlan(plan){
    return (plan === 'basico') ? 1.20 : 1.50;
}

// Muestra la primer letra en mayuscula
export function primerLetraMayuscula (texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}