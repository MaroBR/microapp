import { type } from 'os';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

type FRefresh = React.FormEvent<HTMLFormElement>;
interface intrAttrib {
  name: String;
  unit: String;
  key: String;
  cost: String;
}

function App(): JSX.Element {

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [key, setKey] = useState('');
  const [cost, setCost] = useState('');
  const [attrib, setAttrib] = useState<intrAttrib[]>([]);

  const addAttrib = (name:String, unit:String, key:String, cost:String) =>{
    const newAttrib: intrAttrib[]= [...attrib, {name, unit, key, cost}];
    setAttrib(newAttrib);
  }


  const create = (e: FRefresh) =>{
    e.preventDefault();
    addAttrib(name,unit,key,cost);
    console.log(attrib);

    fetch('http://localhost:8080/micro/v1.0/producto/',{ 
      method: 'POST',  
      headers: { 
         'Content-type' : 'text/json' 
      }, 
      body: JSON.stringify(attrib) 
    }) 
    .then(response =>  
	    response.json() 
    ) 
    .then(data => {  
        console.log(data) 
    })
  }
  
  const serch = async (e: FRefresh) =>{
    const res=await axios.get('http://localhost:8080/micro/v1.0/producto/');
  }


  const [articulos, setArticulos] = useState()
  const fetchApi = async () =>{
    const response = await fetch('http://localhost:8080/micro/v1.0/producto/')
    console.log(response.status)
    console.log(response.json())
  }

  useEffect(()=>{
    fetchApi( )
  },[])

  return (
    <Fragment>   
      <form onSubmit={create}>
        <label>Nombre: </label> <br/>
        <input value={name} type="text" onChange={e => setName(e.target.value)}/> <br/>
        <label>Unidad de medida: </label> <br/>        
        <select> 
          <option value="Pieza">Pieza</option>
          <option value="Kilogramo">Kilogramo</option>
          <option value="Pulgada">Pulgada</option>
          <option value="Litro">Litro</option>
        </select><br/> 
        <label>Clave: </label> <br/>
        <input value={key} type="text" onChange={e => setKey(e.target.value)}/> <br/>
        <label>Precio: </label> <br/>
        <input value={cost} type="number" onChange={e => setCost(e.target.value)}/> <br/>
        <button>Guardar</button>
      </form>
    </Fragment>
  );
}

export default App;
