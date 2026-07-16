import { useState, useEffect } from 'react';
import api from '../../services/api';
import './dashboard.css';

export default function Dashboard() {
    const [stats, setStats] = useState({
        patients: 0,
        doctors: 0,
        appointments: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
                    api.get('/patient?size=1'),
                    api.get('/doctor?size=1'),
                    api.get('/appointment?size=1')
                ]);

                setStats({
                    patients: patientsRes.data.totalElements || 0,
                    doctors: doctorsRes.data.totalElements || 0,
                    appointments: appointmentsRes.data.totalElements || 0
                });
            } catch (err) {
                console.error("Erreur lors du chargement du dashboard", err);
                setError("Impossible de charger les statistiques. Vérifiez votre connexion à l'API.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="dashboard-container"><p>Chargement des données...</p></div>;
    }

    if (error) {
        return <div className="dashboard-container"><p className="error-text">{error}</p></div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Tableau de Bord - Vue d'ensemble</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Patients</h3>
                    <p className="stat-number">{stats.patients}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Total Médecins</h3>
                    <p className="stat-number">{stats.doctors}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Rendez-vous</h3>
                    <p className="stat-number">{stats.appointments}</p>
                </div>
            </div>
        </div>
    );
}