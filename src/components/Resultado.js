import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { TransitionGroup , CSSTransition } from 'react-transition-group';

const Mensaje = styled.p`
    background-color: rgb(127,224,237);
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
`;

const ResultadoCotizacion = styled.div`
    background-color: rgb(127,224,237);
    text-align: center;
    padding: .5rem;
    border: 1px solid #26C6DA;
    margin-top: 1rem;
    position: relative;
`;

const Total = styled.p`
    margin: 0rem;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    color: #00838F;
`;


const Resultado = ({cotizacion}) => {
    
    return ( 
        (cotizacion === 0)
        ? <Mensaje>Elige marca , año y tipo de seguro</Mensaje>
        : (
            <ResultadoCotizacion>
                <TransitionGroup
                    component ="span"
                    className="resultado"
                >
                    <CSSTransition
                        classNames="resultado"
                        key={cotizacion}
                        timeout={{ enter:500, exit:500}} //tiempo que toma la animacion en realizarce
                    >
                        <Total>El total es: $ <span>{cotizacion}</span></Total>
                    </CSSTransition>
                </TransitionGroup>
            </ResultadoCotizacion>
        )
     );
}

Resultado.propTypes = {
    cotizacion : PropTypes.number.isRequired
}
 
export default Resultado;