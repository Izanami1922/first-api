const express = require('express');
const app = express();
const data = require("./data.json");



//Verbos HTTP
//GET: Receber dados de um Resource(Cliente)
//POST: Enviar dados ou informações para serem processados por um Resource
//PUT: Atualizar dados de um Resource
//DELETE: Deletar um Resource


/*Não utilizar uma barra(/) no final do endpoint */
//"req" -> request
//"res" -> response



app.use(express.json());

app.get("/clients", function(req, res){
    res.json(data);
});

app.get("/clients/:id", function(req, res){
    const { id } = req.params
    //parseInt -> converter o id de string para número
    const client = data.find(cli => cli.id === parseInt(id));

    if(!client) return res.status(404).json({message: "Client not found."});

    res.json(client);
});

app.post("/clients", function(req, res){
    const {name, email} = req.body;

    //salvar
    res.json({name, email});
});

app.put("/clients/:id", function(req, res){
    const { id } = req.params
    const client = data.find(cli => cli.id === parseInt(id));

    if(!client) return res.status(404).json({message: "Client not found."});

    const {name, email} = req.body;

    client.name = name
    client.email = email;

    res.json(client);
});

app.delete("/clients/:id", function(req, res){
    const { id } = req.params
    const clientsFiltered = data.filter(client => client.id != id);

    res.json(clientsFiltered)
});



app.listen(3000, function() {
    console.log("Server is running");

});