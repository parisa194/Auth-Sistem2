import React from "react";

export default function Home({ user, onLogout }) {
    return (
        <div className="card">
            <h2 className="card-header">Bienvenido</h2>
            <div className="home-user-info">
                <p className="home-user-name">
                    Usuario: <strong>{user?.username || user?.email}</strong>
                </p>
                <p className="home-user-id">ID: {user?.id}</p>
            </div>
            <div className="home-actions">
                <button className="btn btn-danger" onClick={onLogout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}