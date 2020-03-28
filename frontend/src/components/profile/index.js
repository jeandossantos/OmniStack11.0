import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './index.css';

import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';

export default function Profile() {

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const name = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('/profile', {
            headers: {
                authorization: ongId
            }
        })
            .then(response => {
                setIncidents(response.data);
            })
            .catch( _ => {})
    }, [ongId])

    function logout() {
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');
        history.push('/');        
    }

    function removeIncident(id) {
        api.delete(`/incidents/${id}`, {
            headers: {
                authorization: ongId
            }
        })
        .then(_ => setIncidents(incidents.filter(incident => incident.id !== id)))
        .catch(_ => alert('Não foi possível excluir o caso'))
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be To Hero"/>
                <span>Bem vinda, {name}</span>
                <Link className="button" to="/incident/new">
                    Cadastrar novo caso
                </Link>
                <button className="button" onClick={logout}>
                    <FiPower size="18" color="#E02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÂO:</strong>
                    <p>{ incident.description }</p>
                    <strong>VALOR:</strong>
                    <p>{ Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>
                    <button type="button" onClick={() => removeIncident(incident.id)}>
                        <FiTrash2 size="20" color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}