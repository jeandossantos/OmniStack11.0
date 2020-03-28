import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import './index.css';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';


export default function Register () {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsap] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    
    const history = useHistory();
    
    function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        api.post('/ongs', data)
            .then(response => {
                alert(`Seu ID: ${response.data}`);
                history.push('/');
            })
            .catch(e => alert(e.response.data));
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>
                       Faça seu cadastro, entre na plataforma e ajudo a encontrar os casos de sua ONG. 
                    </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size="16" color="e02041"/>
                        Já tenho cadastro.    
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text" value={name}
                    onChange={e => setName(e.target.value)} placeholder="Nome da ONG"/>
                    <input type="email"value={email}
                    onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
                    <input type="text" value={whatsapp}
                    onChange={e => setWhatsap(e.target.value)} placeholder="Whatsapp"/>
                    <div className="input-group">
                        <input type="text" value={city}
                        onChange={e => setCity(e.target.value)} placeholder="Cidade"/>
                        <input type="text" value={uf}
                        onChange={e => setUf(e.target.value)} placeholder="UF"
                        style={ { width: 80 }}/>
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
