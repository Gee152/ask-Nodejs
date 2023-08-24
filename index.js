const express = require("express"); //importantando express
const app = express(); // chamando express
const bodyParser = require("body-parser");
const con = require("./db/con");
const quest = require("./models/Quests.js");
const Answers = require("./models/Answers.js");

app.use(express.static("public"));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//criando rota - Rota Home
app.get("/", (req, res) => {
  quest.findAll(
    { 
      raw: true, 
      order: [
        ["id", "DESC"]
      ] 
    })
    .then((quests) => {
      res.render("index", {
      //teste console.log(quests)
      quests: quests,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvar", (req, res) => {
  //recebendo variavel
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  //Comando Insert
  quest
    .create({
      titulo: titulo,
      descricao: descricao,
    })
    .then(() => {
      res.redirect("/");
    });
});

app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  quest.findOne({
      where: { id: id },
    }).then((quests) => {
      if (quests != undefined) { 
        
        Answers.findAll({
          where: {answersId: quests.id},
          order: [
            ['id', 'DESC']
          ]
        }).then(answers => {
          res.render("pergunta", {
            quests: quests,
            answers: answers
          })
        });
      } else {
        res.redirect("/");
      }
    });
});

app.post("/responder", (req,res) => {
  let body = req.body.body
  let answersId = req.body.quests;

  Answers.create({
    body: body,
    answersId: answersId
  }).then(() => {
    res.redirect("/pergunta/" + answersId);
  });
});

//conexão db
con
  .authenticate()
  .then(() => {
    console.log("Conectado com sucesso!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.set("view engine", "ejs"); //usando tamplate engene

app.listen(8000, () => {
  //rodando porta3
  console.log("App rodando");
});
