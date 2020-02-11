import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { primerLetraMayuscula } from '../helper';

const ContenedorResumen = styled.div`
    padding: .2rem 1rem 1rem 1rem;
    text-align: center;
    background-color: #00838F;
    color: #FFFFFF;
    margin: 0 auto;
    margin-top: 1rem;
`;

const Resumen = ({datos}) => {

    // extraer de datos
    const { marca , year , plan } = datos;

    // para que no muestre el h2 de resumen de cotizacion ya que tiene que tener datos para mostrar esa parte
    if( marca === '' || year === '' || plan === '') return null;
    
    return (
        <ContenedorResumen> 
            <h2>Resumen de Cotización</h2>
                <ul>
                    <li>Marca : {primerLetraMayuscula(marca)}</li>
                    <li>Año del Auto : {year}</li>
                    <li>Plan : {primerLetraMayuscula(plan)}</li>
                </ul>
        </ContenedorResumen>
    );
}

Resumen.propTypes = {
    datos : PropTypes.object.isRequired
}
 
export default Resumen;