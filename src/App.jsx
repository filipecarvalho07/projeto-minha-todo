
import { useState, useEffect } from 'react';
import Parse from './parseConfig';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(true);

  async function carregarTarefas() {
    try {
      const Tarefa = Parse.Object.extend('Tarefa');
      const query = new Parse.Query(Tarefa);
      const resultados = await query.find();

      setTarefas(
        resultados.map(tarefa => ({
          id: tarefa.id,
          titulo: tarefa.get('titulo'),
          concluida: tarefa.get('concluida') ?? false
        }))
      );
    } catch (erro) {
      console.error('Erro ao carregar tarefas:', erro);
      alert('Não foi possível carregar as tarefas.');
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function adicionarTarefa() {
    if (input.trim() === '') {
      return;
    }

    try {
      const Tarefa = Parse.Object.extend('Tarefa');
      const novaTarefa = new Tarefa();

      novaTarefa.set('titulo', input.trim());

      const resultado = await novaTarefa.save();

      setTarefas([
        ...tarefas,
        {
          id: resultado.id,
          titulo: resultado.get('titulo'),
          concluida: false
        }
      ]);

      setInput('');
    } catch (erro) {
      console.error('Erro ao adicionar tarefa:', erro);
        alert(
          'Erro: ' + erro.message +
          '\nCódigo: ' + erro.code
          );
    }
  }

  async function excluirTarefa(id) {
    try {
      const Tarefa = Parse.Object.extend('Tarefa');
      const tarefa = new Tarefa();
      tarefa.id = id;

      await tarefa.destroy();

      setTarefas(tarefas.filter(item => item.id !== id));
    } catch (erro) {
      console.error('Erro ao excluir tarefa:', erro);
      alert('Não foi possível excluir a tarefa.');
    }
  }

  async function concluirTarefa(id) {
  try {
    const Tarefa = Parse.Object.extend('Tarefa');
    const tarefa = new Tarefa();

    tarefa.id = id;

    const tarefaAtual = tarefas.find(item => item.id === id);
    const novoStatus = !tarefaAtual.concluida;

    tarefa.set('concluida', novoStatus);

    await tarefa.save();

    setTarefas(
      tarefas.map(item =>
        item.id === id
          ? { ...item, concluida: novoStatus }
          : item
      )
    );
  } catch (erro) {
    console.error('Erro ao concluir tarefa:', erro);
    alert('Não foi possível atualizar a tarefa.');
  }
}

  return (
    <div className="container">
      <h1>Minha Lista de Tarefas</h1>
      <p>Organize suas atividades diárias.</p>

      <div className="formulario">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') adicionarTarefa();
          }}
          placeholder="Digite uma nova tarefa"
        />

        <button onClick={adicionarTarefa}>
          Adicionar
        </button>
      </div>

      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : (
        <ul>
          {tarefas.map(tarefa => (
            <li key={tarefa.id}>
              <span
                className={tarefa.concluida ? 'concluida' : ''}
                onClick={() => concluirTarefa(tarefa.id)}
              >
                {tarefa.titulo}
              </span>

              <button
                className="excluir"
                onClick={() => excluirTarefa(tarefa.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="contador">
        Total de tarefas: {tarefas.length}
      </p>
    </div>
  );
}

export default App;
