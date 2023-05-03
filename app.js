let banco = [];

const getBanco = async () =>{
    let url = 'http://127.0.0.1:5000/tarefas';
    const response = fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        return data.tarefas
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      return await response
}

const setBanco = async (tarefa, status) => {
    const formData = new FormData();
    formData.append('tarefa', tarefa);
    formData.append('status', status);  
    let url = 'http://127.0.0.1:5000/tarefas';
    await fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

const delBanco = async (id) => {
  let url = 'http://127.0.0.1:5000/tarefas?id=' + id;
  await fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const attBanco = async (id) => {
    let url = 'http://127.0.0.1:5000/tarefas?id=' + id;
    await fetch(url, {
      method: 'put'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = async () => {
    limparTarefas();
    const banco = await getBanco(); 
    banco.forEach ( (item) => criarItem (item.tarefa, item.status, item.id));
}

const inserirItem = async (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        await setBanco(texto, '');
        await atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = async (id) => {
    await delBanco(id)
    atualizarTela();
}

const atualizarItem = async (indice) => {
    await attBanco(indice)
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();