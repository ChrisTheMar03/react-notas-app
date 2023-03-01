import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, json } from 'react-router-dom'
import ListaNotas from './components/ListaNotas.jsx'
import './styles/app.css'
import { lista } from './data/data.js'

function App() {

  const [list, setList] = useState( JSON.parse(localStorage.getItem("notitas")) || [])

  useEffect(() => {
      const storage = localStorage.getItem("notitas")
      if(storage==null){
        localStorage.setItem("notitas",[])
      }
  }, [lista])
  

  function buscar(e){
    const valor = e.target.value
    // console.log(valor);
    let nuevo = JSON.parse(localStorage.getItem("notitas")).filter((v)=>{
      return v.titulo.toLowerCase().includes(valor.toLowerCase()) || v.mensaje.toLowerCase().includes(valor.toLowerCase())
    }) 
    setList(nuevo)
  }

  function modificar(nota){
    let items = list.map((v)=>{
      if(v.id == nota.id){
        v=nota
      }
      return v
    })
    localStorage.setItem("notitas",JSON.stringify(items))
    setList(items)
  }

  function agregar(nota){
    const lst = [nota,...list]
    localStorage.setItem("notitas",JSON.stringify(lst))
    setList(lst)

  }

  function eliminarElemento(objeto){
    const indice = list.findIndex(v => v.id == objeto.id)
    list.splice(indice,1)
    localStorage.setItem("notitas",JSON.stringify(list))
    setList(list)
    // setList()
    // setList(lst)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ListaNotas lista={list}  agregar={ agregar } eliminar={eliminarElemento}  modificar={ modificar } handlerSearch={ buscar } /> } />
        </Routes>
      </BrowserRouter>    
    </div>
  )
}

export default App
