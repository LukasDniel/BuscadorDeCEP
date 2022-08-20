import { useState } from 'react';
import './styles.css';
import { FiSearch } from 'react-icons/fi'

import api from './services/api';

function App() {
  const [input, setInput] = useState();
  const [cep, setCep] = useState({});


async function handleSearch(){
    if(input === ''){
      alert('Preencha o formulário')
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert('Ops! Erro ao buscar');
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Buscador de CEP </h1>

      <div className="containerInput">
        <input
        type='text'
        placeholder="digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          <span>Endereço: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>UF: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
