import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

const Create = () => {
    const [producto, setProducto] = useState('');
    const [existencia, setExistencia] = useState(0);
    const [transaccion, setTransaccion] = useState(0);
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate();

    const productsCollection = collection(db, "inventario");

    const store = async (e) => {
        e.preventDefault();
        await addDoc(productsCollection, {
            producto: producto,
            existencia: existencia,
            transaccion: transaccion,
            descripcion: descripcion,
            fecha: serverTimestamp() // Utiliza serverTimestamp para capturar la fecha actual en Firestore
        });
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1>Crear un nuevo Tema de Clases</h1>
                    <form onSubmit={store}>
                        <div className='mb-3'>
                            <label className='form-label'>Tema</label>
                            <input
                                value={producto}
                                onChange={(e) => setProducto(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <div className='mb-3'>
                            <label className='form-label'>Horas</label>
                            <input
                                value={existencia}
                                onChange={(e) => setExistencia(e.target.value)}
                                type="number"
                                className='form-control'
                            />
                        </div>

                      {/*   <div className='mb-3'>
                            <label className='form-label'>Transaccion</label>
                            <input
                                value={transaccion}
                                onChange={(e) => setTransaccion(e.target.value)}
                                type="number"
                                className='form-control'
                            />
                        </div> */}

                        <div className='mb-3'>
                            <label className='form-label'>Objetivo</label>
                            <input
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                type="text"
                                className='form-control'
                            />
                        </div>

                        <button type='submit' className='btn btn-primary'>Nuevo Tema</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Create;
