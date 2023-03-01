import React, { useState } from "react";
import "../styles/lista.css";
import { v4 } from 'uuid';

const ListaNotas = ({ lista ,modificar,handlerSearch,agregar,eliminar}) => {

  const [modal, setModal] = useState(false)
  const [ obj,setObj ] = useState({})
  const [crear,setCrear] = useState(false)


  const handlerObtener=(ids)=>{
    if(!modal){
      setModal(true)
      let {id,titulo,mensaje,fecha} = lista.find((e)=> e.id == ids)
      setObj({
        id,
        titulo,
        mensaje,
        fecha
      })
    }else{
      setId(0)
    }
  }

  function mostrar(){
    setCrear(true)
  }

  // function handlerEliminar(id){
  //   console.log(id);
  // }

  return (
    <div>
      { crear && <CrearNota agregar={ agregar } setestado={ ()=>{setCrear(false)} } />}
      <h1 className="titulo-general">Notas App</h1>
      <div className="form-content">
        <Entrada placeholder={ "Busque su nota" } event={ handlerSearch } type={"text"} />
        <div className="btn-content"><button type="button" onClick={ mostrar } >Crear</button></div>
      </div>
      <div className="content-list">
        { lista.length==0 && <div>No tiene elementos</div> }
        <Lista lista={lista} handerObtener={ handlerObtener }  />
      </div>
        {modal && <Modal objeto={ obj } handlerUpdate={ modificar } eliminar={ eliminar } setEstado={ ()=>{setModal(false)} }/>}
    </div>
  );
};

const Lista = ({ lista,handerObtener }) => {

  return lista.map((v, i) => {
    return <Nota key={i} 
                mensaje={v.mensaje} 
                fecha={v.fecha} id={ v.id } 
                titulo={ v.titulo }
                handlerObtener={ ()=>{ handerObtener(v.id) } } />;
  });
};

const Entrada = ({type,placeholder,event,valor}) => {
  return <input className="form" type={type} defaultValue={ valor } onChange={ event } placeholder={placeholder} />;
}

const Nota = ({ mensaje, fecha,handlerObtener,titulo }) => {

  const cortador = (texto,cantidad) =>{
    if(texto.length >= cantidad){
      return texto.substring(0,cantidad)+"..."
    }
    return texto
  }

  return (
    <div className="card" onClick={ handlerObtener } >
      <div className="msg">
        <p className="titulo">{cortador(titulo,25)}</p>
        <p className="mensaje">{cortador(mensaje,150)}</p>
      </div>
      <p className="fecha">{fecha}</p>
    </div>
  );
};

const Modal=({objeto,setEstado,handlerUpdate,eliminar})=>{

  return(
    <div className="modal" style={ {textAlign:"end"} }>
      <button type="button" style={ {margin:"24px 24px 0px 0px",fontWeight:"bold"} } onClick={ setEstado } >&#10005;</button>
      <CardModal handlerUpdate={  handlerUpdate } objeto={ objeto } eliminar={ eliminar } handlerStado={ setEstado } />
    </div>
  )
}

const CardModal=({objeto,handlerUpdate,handlerStado,eliminar})=>{

  const [titulo,setTitulo]= useState(objeto.titulo)
  const [mensaje,setMensaje]= useState(objeto.mensaje)

  function obtenerTItulo(e){
    setTitulo(e.target.value)
  }

  function obtenerMensaje(e){
    setMensaje(e.target.value)
  }

  function update(){
    let data = {
      id:objeto.id,
      titulo,
      mensaje,
      fecha : new Date().toLocaleDateString()
    }
    handlerUpdate(data)
    handlerStado()
  }

  function handlerEliminar(){
    handlerStado()
    eliminar(objeto)
  }

  return(
    <div className="modal-card">
      <div className="modal-header">
        <Entrada placeholder={"Titulo..."} valor={ titulo } event={ obtenerTItulo } type={ "text" }  />
      </div>
      <div className="modal-body">
        <textarea className="area" placeholder="Ingrese mensaje..." onChange={ obtenerMensaje } defaultValue={ mensaje } resize="none" name="" id="" rows="10"></textarea>
        <p style={ {marginRight:"16px",fontWeight:"bold"} }>{objeto.fecha}</p>
      </div>
      <div className="modal-footer">
        <button className="guardar" type="button" onClick={update} >Guardar</button>
        <button type="button" className="guardar" onClick={ handlerEliminar } > Eliminar </button>
      </div>
    </div>
  )
}

const CrearNota=({agregar,setestado})=>{

  const [titulo, setTitulo] = useState("")
  const [mensaje, setMensaje] = useState("")

  function obtenerDatos(){
    if(titulo && mensaje){
      let data = {
        id: v4(),
        titulo,
        mensaje,
        fecha:new Date().toLocaleDateString()
      }
      agregar(data)
      setestado()
    }else{
      alert("Rellene los campos")
    }
    
  }

  function getTitulo(e){
    setTitulo(e.target.value)
  }

  function getMensaje(e){
    setMensaje(e.target.value)
  }

  return (
    <div className="content-crear">
      <div style={ {display:"flex",alignItems:"center",justifyContent:"space-between"} } >
        <h2 style={ {textAlign:"start"} }>Nota</h2>
        <span style={{fontSize:"20px",fontWeight:"bold",cursor:"default"}} onClick={ setestado } >&#10005;</span>
      </div>
      <div className="crear-header">
        <Entrada placeholder={"Titulo..."} type={"text"} event={ getTitulo } />
      </div>
      <div className="crear-body">
        <textarea className="text" name="" id="" rows="10" placeholder="Mensaje..." type="text" onChange={ getMensaje } /> 
      </div>
      <div className="crear-footer">
        <button type="button" onClick={ obtenerDatos }> Guardar </button>
        
      </div>
    </div>
  )
}

export default ListaNotas;
