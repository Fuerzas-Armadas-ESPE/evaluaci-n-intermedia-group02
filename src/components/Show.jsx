import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './estilos.css';
import { async } from '@firebase/util'
const MySwal = withReactContent(Swal)

const Show = () => {
    //1 - configuramos los hooks
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('producto'); // Asumiendo que 'producto' es un campo
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' para ascendente o 'desc' para descendente
    // Hooks para gestionar el estado de las actividades
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState('');
    const [completedActivities, setCompletedActivities] = useState([]);
    const [pendingActivities, setPendingActivities] = useState([]);
    // Variable de estado para las nuevas actividades completadas
    const [newCompletedActivity, setNewCompletedActivity] = useState('');
    // Variable de estado para las nuevas actividades pendientes
    const [newPendingActivity, setNewPendingActivity] = useState('');

    //2 - referenciamos a la DB firestore
    const productsCollection = collection(db, "inventario")

    //3 - Funcion para mostrar TODOS los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        //console.log(data.docs)
        setProducts(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
        //console.log(products)
    }
    //4 - Funcion para eliminar un doc
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "inventario", id)
        await deleteDoc(productDoc)
        getProducts()
    }
    //5 - Funcion de confirmacion para Sweet Alert 2
    const confirmDelete = (id) => {
        MySwal.fire({
            title: '¿Elimina el producto?',
            text: "No puedes revertir esta accion!",
            icon: 'Advertencia',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                //llamamos a la fcion para eliminar   
                deleteProduct(id)
                Swal.fire(
                    'Eliminado!',
                    'Tu producto se ha eliminado.',
                    'exito'
                )
            }
        })
    }
    //6 - usamos useEffect
    useEffect(() => {
        let result = products;
        // Filtrado
        if (searchTerm) {
            result = result.filter(product =>
                product.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
                // Agrega más campos de búsqueda si es necesario
            );
        }

        // Ordenamiento
        result = result.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        getProducts()
        // eslint-disable-next-line
        setFilteredProducts(result);

    }, [products, searchTerm, sortKey, sortOrder]);
    //7 - devolvemos vista de nuestro componente

    const downloadPdf = () => {
        const input = document.getElementById('miTabla'); // Asegúrate de que tu tabla tenga este ID
        html2canvas(input, {
            useCORS: true,
            logging: true,
            letterRendering: 1,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JsPDF({
                orientation: 'landscape',
            });
            const imgWidth = 208; // Asumiendo un tamaño de página A4
            const pageHeight = 295;  // Altura en mm de una página A4
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save("download.pdf");
        });
    };
    // Función para obtener las actividades
    const getActivities = async () => {
        // Aquí deberías obtener las actividades relacionadas con cada tema del curso desde tu base de datos
        // Por simplicidad, aquí estamos simulando datos de ejemplo
        const exampleCompletedActivities = [
            { id: 1, description: 'Actividad completada 1' },
            // Agrega más actividades completadas si es necesario
        ];
        const examplePendingActivities = [
            { id: 3, description: 'Actividad pendiente 1' },
            // Agrega más actividades pendientes si es necesario
        ];
        setCompletedActivities(exampleCompletedActivities);
        setPendingActivities(examplePendingActivities);
    };

    // Función para agregar una nueva actividad pendiente
    const addPendingActivity = () => {
        const newPendingActivityObject = { id: pendingActivities.length + 1, description: newPendingActivity };
        setPendingActivities([...pendingActivities, newPendingActivityObject]);
        setNewPendingActivity('');
    };

    // Función para eliminar una actividad
    const deleteActivity = async (activityType, id) => {
        if (activityType === 'completed') {
            // Aquí deberías agregar la lógica para eliminar una actividad completada de tu base de datos
            // Por simplicidad, aquí estamos simulando la eliminación de una actividad completada
            const updatedCompletedActivities = completedActivities.filter(activity => activity.id !== id);
            setCompletedActivities(updatedCompletedActivities);
        } else if (activityType === 'pending') {
            // Aquí deberías agregar la lógica para eliminar una actividad pendiente de tu base de datos
            // Por simplicidad, aquí estamos simulando la eliminación de una actividad pendiente
            const updatedPendingActivities = pendingActivities.filter(activity => activity.id !== id);
            setPendingActivities(updatedPendingActivities);
        }
    };

    const addCompletedActivity = () => {
        const newCompletedActivityObject = { id: completedActivities.length + 1, description: newCompletedActivity };
        setCompletedActivities([...completedActivities, newCompletedActivityObject]);
        setNewCompletedActivity('');
    };

    useEffect(() => {
        getActivities();
    }, []);

    return (
        <>
            <div className='container' id="miTabla">
                <div className='row'>
                    <div className='col'>
                        <div className="d-grid gap-2">
                            <Link to="/create" className='btn btn-primary btn-sm-small mt-2 mb-2'>Nuevo <i className="fa-solid fa-plus"></i></Link>
                            <button onClick={downloadPdf} className="btn btn-success btn-sm-small">Descargar <i className="fa-solid fa-file-pdf"></i></button>



                        </div>


                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Tema</th>
                                    <th>Horas</th>
                                    {/* <th>Transacción</th> */}
                                    <th>Objetivo</th>
                                    {/* <th>Fecha</th> */}
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.producto}</td>
                                        <td>{product.existencia}</td>
                                        {/* <td>{product.transaccion}</td> */}
                                        <td>{product.descripcion}</td>
                                        {/* <td>{new Date(product.fecha.seconds * 1000).toLocaleString()}</td> */}
                                        <td>
                                            <Link to={`/edit/${product.id}`} className="btn-accion btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => { confirmDelete(product.id) }} className="btn-accion btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                                  
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="container" id="miTabla">
                <div className="row">
                    <div className="col">
                        {/* Actividades realizadas */}
                        <div className="activity-column">
                            <h2>Actividades realizadas</h2>
                            <br />
                            <ul>
                                {completedActivities.map(activity => (
                                    <li key={activity.id} className="actividad-realizada">
                                        <span>{activity.description}</span>
                                        <button className="btn-eliminar" onClick={() => deleteActivity('completed', activity.id)}>Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                            <div className="agregar-actividad">
                                <input type="text" value={newCompletedActivity} onChange={(e) => setNewCompletedActivity(e.target.value)} style={{ marginRight: '10px' }} />
                                <button onClick={addCompletedActivity} className="btn-agregar">Agregar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        {/* Línea vertical que divide las secciones */}
                        <div className="divisor-vertical"></div>
                    </div>
                    <div className="col">
                        {/* Actividades pendientes */}
                        <div className="activity-column">
                            <h2>Actividades pendientes</h2>
                            <br />
                            <ul>
                                {pendingActivities.map(activity => (
                                    <li key={activity.id} className="actividad-pendiente">
                                        <span>{activity.description}</span>
                                        <button className="btn-eliminar" onClick={() => deleteActivity('pending', activity.id)}>Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                            <div className="agregar-actividad">
                                <input type="text" value={newPendingActivity} onChange={(e) => setNewPendingActivity(e.target.value)} style={{ marginRight: '10px' }} />
                                <button onClick={addPendingActivity} className="btn-agregar">Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Show