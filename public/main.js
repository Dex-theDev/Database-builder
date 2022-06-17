const updateButton = document.querySelector('#updateButton')
const deleteButton = document.querySelector('#deleteButton')
updateButton.addEventListener('click', updateEntry)
deleteButton.addEventListener('click', deleteEntry)

async function updateEntry(){
    try{
        const response = await fetch('updateEntry', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                question: document.getElementsByName("question")[0].value,
                answer: document.getElementsByName("answer")[0].value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.log(err)
    }

}

async function deleteEntry(){
    const input = document.getElementById('deleteInput')
    console.log(input.value)
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err){
        console.error(err)
    }
}














