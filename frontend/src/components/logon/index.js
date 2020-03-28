import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.css';

import {FiLogIn} from 'react-icons/fi';

import hereosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');

    const history = useHistory();

     function handleLogon(e) {
        e.preventDefault();
        api.post('/login', { id })
        .then(response => {
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        })
        .catch(e => {
            alert(e.response.data);
        })
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça Seu Logon</h1>
                    <input type="text" value={id}
                    onChange={ e => setId(e.target.value)} placeholder="Sua ID"/>
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size="16" color="e02041"/>
                        Não tenho cadastro</Link>
                </form>
            </section>
            <img src={hereosImg} alt="Hereos"/>
        </div>
        
    );
}