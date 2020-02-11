import React , { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear , totalAPagarSegunLaMarca , aumentarSegunElPlan } from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;

const Label = styled.label`
    flex: 0 0 100px;
`;

const Select = styled.select`
    display: block;
    width: 100%;
    padding : 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;

const InputRadio = styled.input`
    margin: 0 1rem;
`;

const Button = styled.button`
    background-color :#00838F;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color .3s ease;
    margin-top: 2rem;
    /* aplicando hover */

    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }

`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem 0rem 1rem 0rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    
`;


const Formulario = ({guardarResumen , guardarCargando}) => {

    //STATE
    const [ datos, guardarDatos ] = useState({
        marca: '',
        year: '',
        plan: ''
    });

    const [ error, guardarError ] = useState(false);

    //extraer los valores del state
    const { marca , year , plan } = datos; 
    
    //Leer datos del formulario y colocarlos en el state
    const obtenerInformacion = e =>{
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }

    //cuando el usuario presiona submit
    const cotizarSeguro = e =>{
        e.preventDefault();
        
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        
        // una base de 2000
        let resultado = 2000;


        // obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);
        
        // por cada año hay que restar el 3%
        resultado -= (( diferencia*3 ) *resultado ) /100;
        console.log(resultado);
        // Americano 15%
        // Asiatico 5%
        // Europeo 30% 
        resultado = resultado * totalAPagarSegunLaMarca(marca);
        console.log(resultado);

        // Basíco aumenta 20%
        // Completo 50%
        const incrementoPlan = aumentarSegunElPlan(plan);
        resultado = parseFloat( incrementoPlan * resultado ).toFixed(2); //el toFixed da dos numeros despues de la coma
        
        guardarCargando(true);

        //Despues de 3 segundos que no se muestre el spinner y por eso pasa a false y se muestra la informacion
        setTimeout(()=>{

            //elimina el spinner
            guardarCargando(false);
                // pasa la informacion al componente principal
                guardarResumen({
                    cotizacion : Number(resultado),
                    datos
                })

        },3000);
       
    
    }

    return (  
        <form
            onSubmit={cotizarSeguro}
        >
            { error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Plan</Label>
                <InputRadio 
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                /> Básico

                <InputRadio  
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                /> Completo
            </Campo>

            <Button type="submit">Cotizar</Button>
        </form>

    );
}
 
Formulario.propTypes = {
    guardarResumen : PropTypes.func.isRequired,
    guardarCargando : PropTypes.func.isRequired
}
export default Formulario;