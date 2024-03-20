const express = require('express')
const uuid = require('uuid')
const port = 3333
const app = express()
app.use(express.json())

/*
    -Query params => musite.com/users?nome=Henzo&age=17     //FILTROS
    -Route params => /users/2       //BUSCAR,DELETAR OU ATUALIZAR ALGO ESPECÍFICO
    -Request Body => {"name":"Henzo","age:"}

    -GET         =>Buscar informação no back-end
    -POST        =>Criar informação no back-end
    -PUT / PATCH =>Alterar/Atualizar informação no back-end
    -DELETE      =>Deletar informação bo back-end

    -Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/

const users =[]

const checkUserId = (request,response,next) => {
    const {id} = request.params
    const index =users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error:"User not found"})
    }

    request.userIndex = index
    request.userId =id

    next()
}

app.get('/users', (request, response) => {
    return response.json({users})
})

app.post('/users', (request, response) => {
    const {name,age} = request.body
    const user = {id:uuid.v4(), name,age}
    users.push(user)

    return response.status(201).json({user})
})

app.put('/users/:id',checkUserId, (request, response) => {
        const {name,age} = request.body
        const index = request.userIndex
        const id = request.userId
        const updateUser = {id, name, age}

        users[index] = updateUser

    return response.json({updateUser })
})


app.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json({users})
})

app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})




/* 
app.get('/users/:id', (request, response) => {
    const {id} = request.params

    console.log(request)

    return response.json({id})
})


app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})

app.get('/users', (request, response) => {
    const {name, age} = request.query

    return response.json({name,age})
})

app.get('/users', (request,response) => {
    return response.send('Hello express')
})

const users =[]

app.get('/users', (request, response) => {
    return response.json({users})
})

app.post('/users', (request, response) => {
    const {name,age} = request.body
    const user = {id:uuid.v4(), name,age}
    users.push(user)

    return response.status(201).json({user})
})














app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})const users =[]

app.get('/users', (request, response) => {
    return response.json({users})
})

app.post('/users', (request, response) => {
    const {name,age} = request.body
    const user = {id:uuid.v4(), name,age}
    users.push(user)

    return response.status(201).json({user})
})

app.listen(port, () =>{
    console.log(`Server started on port ${port}`)
})
*/