import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom
import '../index.css'; // Importa tus estilos CSS

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Utiliza el hook useNavigate para la navegación

    const handleLogin = (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        // Comprueba si las credenciales son correctas
        if (email === "Docente" && password === "123") {
            navigate('/show'); // Si las credenciales son correctas, redirige al componente Show
        } else {
            alert("Credenciales incorrectas. Por favor, intente de nuevo."); // Muestra un mensaje de error si las credenciales son incorrectas
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Ingreso Docentes</h2>
                <div className="form-group">
                    <label htmlFor="email">Usuario</label>
                    <input type="text" id="email" placeholder='Docente' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder='123' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-login">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
