import React, { useState, useEffect } from "react";

// Services
import api from "./services/api";

// Estilos
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(()=>{
    api
      .get("/repositories")
      .then((response)=> {setRepositories(response.data);});
  }, []);

  async function handleAddRepository() {
    const newRepo = {
      title: "novo"+Date.now(),
      techs: ["novoTeste"],
      url: "http://www.novoteste.com.br"
    };

    api
      .post("/repositories", newRepo)
      .then((response)=>{

        const newRepo = response.data;

        if(newRepo.id!=null)
          setRepositories([...repositories, newRepo]);
      });
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`/repositories/${id}`)
      .then(()=>{
        const newRepositoriesList = repositories.filter((repo)=>repo.id != id);
        setRepositories(newRepositoriesList);
      });
  }
  
  const repositoriesList = repositories.map((repository)=> {
    return (<li key={repository.id}>
          {repository.title}

          <button onClick={()=>handleRemoveRepository(repository.id)}>
              Remover
          </button>
      </li>);
    })

  return (
    <div>
      <ul data-testid="repository-list">
          {repositoriesList}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
