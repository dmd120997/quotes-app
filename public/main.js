const create = document.querySelector('#create-button');
const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');
const messageFormDiv = document.querySelector('#message-form');

create.addEventListener('click', event => {
    event.preventDefault();
    fetch('/quotes', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            quote: document.querySelector('#quote').value
        })
    })
    .then( res => res.json())
    .then( response => {
        console.log({response});
        if (!response?.success) {
            messageFormDiv.textContent = response?.message;
        } else {
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})


update.addEventListener('click', i => {
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Voldemort',
            quote: 'I must be the one to kill Harry Potter'
        })
    })
    .then( res => {
        if (res.ok) return res.json()
    })
    .then( response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify ({
            name: 'Voldemort'
        })
    })
    .then( res => {
        if (res.ok) return res.json()
    })
    .then( response => {
        if ( response === 'No quote to delete') {
            messageDiv.textContent = 'No Voldemort quote to delete'
        } 
    })
    .then( response => {
        window.location.reload(true)
    })
    .catch(error => console.error(error))
})