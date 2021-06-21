'use strict'

const getContact = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json.data[1])
    return json.data;
}

const createContact = async (contato) => {
    const url = 'http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/';
    const options = {
        method: 'POST',
        body: JSON.stringify(contato)
    }
    const teste = await fetch(url, options);
    console.log(teste.json())
}

const createRow = (contato) => {
    const tbody = document.querySelector('main>table>tbody')
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${contato.id}</td>
        <td>${contato.nome}</td>
        <td>${contato.email}</td>
        <td>${contato.cidade}</td>
        <td>${contato.estado}</td>
    `

    tbody.appendChild(newRow);
}

const clearTable = () => {
    const tbody = document.querySelector('main>table>tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }
}

const updateTable = async () => {
    clearTable();
    const url = 'http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/';
    const contatos = await getContact(url);
    contatos.forEach(createRow);
}

const clearFields = () => {
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
}

const isValidForm = () => document.querySelector('main>form').reportValidity();

const saveContact = async () => {
    if (isValidForm()) {
        const newContact = {
            // 'id': '',
            'nome': document.getElementById('nome').value,
            'email': document.getElementById('email').value,
            'cidade': document.getElementById('cidade').value,
            'estado': document.getElementById('estado').value
        }
        await createContact(newContact);
        updateTable();
        clearFields();
    }
}

const getID = () =>{
    const answer = prompt('Insira um ID');
    return answer;
} 

const deleteClient = async () => {
    const ID = getID();

    const url = `http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/${ID}`;
    const options = {
        method: 'DELETE',
    }
    await fetch(url, options);
    updateTable();
}

const updateContact = async () => {
    const ID = getID();

    const url = `http://127.0.0.1/Aula-JS/Backend/apiphp/contatos/${ID}`;
    const contato = await getContact(url);

    const inputs = Array.from(document.querySelectorAll('main>form input'))
    const contact = {
        'id'    : ID,
        'nome'  : inputs[0].value = contato[0].nome,
        'email' : inputs[1].value = contato[0].email,
        'cidade': inputs[2].value = contato[0].cidade,
        'estado': inputs[3].value = contato[0].estado,
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(contact)
    };

    const optionsDelete = {
        method: 'DELETE'
    }

    await fetch(url, optionsDelete);

    await fetch(url, options);
}

document.getElementById('salvar')
    .addEventListener('click', saveContact);

document.getElementById('deletar')
    .addEventListener('click', deleteClient);

document.getElementById('editar')
    .addEventListener('click', updateContact);

updateTable();