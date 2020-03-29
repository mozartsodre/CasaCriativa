//Vamos falar de coisas básicas da programação em javascript

//Variáveis - coisas que vão variar ou não e guardo em memória para utilizar mais tarde.
//  String - Variáveis de texto, normalmente chamada de "cadeia de caracteres". Os valores desse tipo são atribuídos utilizando aspas duplas (") ou aspas simples (') como delimitador.
//  Number - Variáveis de números, seja eles integer, float, double etc.

// Usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require("./db")

// Configurar arquivos estáticos (CSS, Scripts, Imagens)
server.use(express.static("public"))

// Habilitar uso do req.body
server.use(express.urlencoded ({extended:true}))

// Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express:server,
    noCache: true // Boolean - Variável de duas opções: true(verdadeiro) ou False(falso)
})

// Criei uma rota /
// E capturei o pedido do cliente(require) para responder(response)


server.get("/", function(require,response) {

    db.all(`SELECT * FROM ideas`, function(err,rows){
        if(err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

    const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas){
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return response.render("index.html",{ideas:lastIdeas})
    })

});

server.get("/ideias", function(require,response) {

    require.query

    db.all(`SELECT * FROM ideas`, function(err,rows){
        if(err) {
            console.log(err)
            return response.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return response.render("ideias.html", {ideas: reversedIdeas})
    })

});

server.post("/", function(req, res){
    // Inserir dados na tabela
        const query = `
            INSERT INTO ideas(
                image,
                title,
                category,
                description,
                link
        ) VALUES (?,?,?,?,?);
        `

        const values = [
            req.body.image,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link
        ]

        db.run(query, values, function(err){
            if(err) {
                console.log(err)
                return response.send("Erro no banco de dados!")
            }
            return res.redirect("/ideias")
        })
})

// Liguei meu servidor na porta 3000
server.listen(3000);
