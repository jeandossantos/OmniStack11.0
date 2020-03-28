import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './index.css';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

export default function Incident() {

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const data = {
        title,
        description,
        value
    }

    function handleIncident(e) {
        e.preventDefault();
        api.post('/incidents', data, {
            headers: {
                authorization: ongId
            }
        })
        .then(_ => {
            alert('Cadastrado com Sucesso!');
            history.push('/profile');
        })
        .catch(_ => alert('Erro inesperado, Tente Novamente!'))
    }

    return (
        <div className="new-icident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>
                       Descreva o caso detalhadamente para encontrar um heroi para resolvar isso. 
                    </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size="16" color="e02041"/>
                        Voltar para home  
                    </Link>
                </section>
                <form onSubmit={handleIncident}>
                    <input type="text" value={title}
                    onChange={e => setTitle(e.target.value)} placeholder="Título do caso"/>
                    <textarea name="" value={description}
                    onChange={e => setDescription(e.target.value)} placeholder="Descrição"></textarea>
                    <input type="text" value={value}
                    onChange={e => setValue(e.target.value)} placeholder="Valor em reais"/>
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

