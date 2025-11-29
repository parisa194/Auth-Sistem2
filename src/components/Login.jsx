import React, { useState } from "react";

export default function Login({ API_URL, onSwitchToRegister, onLogin }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();
			if (!res.ok) {
				setError(data.message || "Error en login");
				setLoading(false);
				return;
			}

			// backend returns tokenJWT and user
			const token = data.tokenJWT || data.token;
			const user = data.user || null;
			onLogin(user, token);
		} catch (err) {
			setError("No se pudo conectar al servidor");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="card">
			<h2 className="card-header">Iniciar sesión</h2>

			<form onSubmit={submit}>
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
						className="btn btn-primary"
						disabled={loading}
					>
						{loading ? "Entrando..." : "Entrar"}
					</button>

					<button
						type="button"
						className="btn btn-link"
						onClick={onSwitchToRegister}
					>
						Crear cuenta
					</button>
				</div>
			</form>
		</div>
	);
}
