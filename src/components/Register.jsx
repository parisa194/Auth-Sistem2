import React, { useState } from "react";

export default function Register({ API_URL, onSwitchToLogin, onRegistered }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, documentNumber }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Error en registro");
                return;
            }

            // Registro exitoso → mostrar modal
            setSuccess("¡Registro exitoso!");
            setShowSuccessModal(true);

            // Opcional: si quieres guardar datos localmente
            // onRegistered(data.user);

        } catch (err) {
            console.error(err);
            setError("No se pudo conectar al servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {showSuccessModal && (
                <div className="modal-overlay animate-fadeIn">
                    <div className="modal-content animate-scaleIn">
                        <span className="modal-icon">✓</span>
                        <h2 className="modal-title">¡Registro exitoso!</h2>
                        <p className="modal-text">Tu cuenta ha sido creada correctamente.</p>

                        <button
                            className="btn btn-success"
                            onClick={() => {
                                setShowSuccessModal(false);
                                onSwitchToLogin();
                            }}
                        >
                            Ir a iniciar sesión
                        </button>
                    </div>
                </div>
            )}

            {/* Formulario de registro */}
            <div className="card">
                <h2 className="card-header">Registro</h2>

                <form onSubmit={submit}>
                    <div className="form-group">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Documento</label>
                        <input
                            type="text"
                            className="form-input"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Registrar"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={onSwitchToLogin}
                        >
                            Volver a iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

