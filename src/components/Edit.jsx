import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = () => {
    
    const [ producto, setProducto ] = useState('')
    const [ existencia, setExistencia ] = useState(0)
    const [ transaccion, setTransaccion ] = useState(0)
    const [ descripcion, setDescripcion ] = useState('')



    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "inventario", id)
        const data = {producto: producto, existencia: existencia, transaccion: transaccion, descripcion: descripcion  }
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "inventario", id) )
        if(product.exists()) {
            //console.log(product.data())
            setProducto(product.data().producto)
            setExistencia(product.data().existencia)
            // setTransaccion(product.data().transaccion)
            setDescripcion(product.data().descripcion)
            //setDescription(product.data().description)    
            //setStock(product.data().stock)
        }else{
            console.log('El tema no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Inventario</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Tema</label>
                        <input
                            value={producto}
                            onChange={ (e) => setProducto(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  

                    <div className='mb-3'>
                        <label className='form-label'>Horas Diarias</label>
                        <input
                            value={existencia}
                            onChange={ (e)=> setExistencia(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  
                   {/*  <div className='mb-3'>
                        <label className='form-label'>Transaccion</label>
                        <input
                            value={transaccion}
                            onChange={ (e)=> setTransaccion(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  */} 
                    <div className='mb-3'>
                        <label className='form-label'>Objetivo</label>
                        <input
                            value={descripcion}
                            onChange={ (e) => setDescripcion(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                 </form>   
            </div>
        </div>
    </div> 
    )
}

export default Edit