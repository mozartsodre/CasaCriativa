//Vamos falar de coisas básicas da programação em javascript

//Variáveis - coisas que vão variar ou não e guardo em memória para utilizar mais tarde.
//  String - Variáveis de texto, normalmente chamada de "cadeia de caracteres". Os valores desse tipo são atribuídos utilizando aspas duplas (") ou aspas simples (') como delimitador.
//  Number - Variáveis de números, seja eles integer, float, double etc.

// Usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste expedita, illo officiis laboriosam in consectetur! Delectus voluptatibus facere quasi culpa nihil nemo. Debitis nisi, corporis placeat tempora alias vitae tenetur?",
        url: "http://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste expedita, illo officiis laboriosam in consectetur! Delectus voluptatibus facere quasi culpa nihil nemo. Debitis nisi, corporis placeat tempora alias vitae tenetur?",
        url: "http://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste expedita, illo officiis laboriosam in consectetur! Delectus voluptatibus facere quasi culpa nihil nemo. Debitis nisi, corporis placeat tempora alias vitae tenetur?",
        url: "http://rocketseat.com.br"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste expedita, illo officiis laboriosam in consectetur! Delectus voluptatibus facere quasi culpa nihil nemo. Debitis nisi, corporis placeat tempora alias vitae tenetur?",
        url: "http://rocketseat.com.br"
    },
]

// Configurar arquivos estáticos (CSS, Scripts, Imagens)
server.use(express.static("public"))

// Configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express:server,
    noCache: true // Boolean - Variável de duas opções: true(verdadeiro) ou False(falso)
})

// Criei uma rota /
// E capturei o pedido do cliente(require) para responder(response)


server.get("/", function(require,response) {

    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas){
        if(lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    return response.render("index.html",{ideas:lastIdeas})
});

server.get("/ideias", function(require,response) {

    const reversedIdeas = [...ideas].reverse()

    return response.render("ideias.html", {ideas: reversedIdeas})
});
// Liguei meu servidor na porta 3000
server.listen(3000);
