//Importando as bibliotecas necessárias para o servidor
                        //Express é um framework para Node.js que facilita a criação de servidores web e APIs
const express = require('express')
                    //Cors é um middleware que permite que recursos de um servidor sejam acessados por páginas web de outros domínios, 
                    // ou seja, ele habilita o compartilhamento de recursos entre diferentes origens
const cors = require('cors')
                    //Path é um módulo do Node.js que fornece utilitários para trabalhar com caminhos de arquivos e diretórios,
                    // ou seja, ele ajuda a manipular e resolver caminhos de arquivos de forma eficiente e segura
const path = require('path')

//Importando as funções do controller para o servidor
const {
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCapitalPais,
    getCidades
        //Essas funções são responsáveis por lidar com as requisições e respostas do servidor, ou seja, elas processam os dados e retornam as informações solicitadas pelo cliente
} = require('./controllers/funcao')

//Criando o servidor usando o Express, ou seja, ele é a base para criar rotas e lidar com as requisições e respostas do cliente
const app = express()

//Configurando o servidor para usar o CORS e para aceitar requisições com corpo em formato JSON, 
// ou seja, ele permite que o servidor aceite requisições de outros domínios e que os dados enviados pelo cliente sejam interpretados como JSON
app.use(cors())

//Configura o servidor para aceitar requisições com corpo em formato JSON, ou seja, ele permite que os dados enviados pelo cliente sejam interpretados como JSON
app.use(express.json())

//Configura o servidor para servir arquivos estáticos da pasta 'front-end', ou seja, ele permite que os arquivos HTML, CSS e JavaScript da pasta 'front-end' 
// sejam acessados pelo cliente quando ele fizer uma requisição para o servidor, ou seja, ele torna os arquivos da pasta 'front-end' acessíveis para o cliente
                //express.static é um middleware do Express que serve arquivos estáticos, ou seja, ele permite que os arquivos da pasta 'front-end' sejam acessados pelo cliente
                        //path.join(__dirname, 'front-end') é usado para construir o caminho para a pasta 'front-end' de forma segura e eficiente, ou seja, ele garante que o
                        // caminho seja construído corretamente independentemente do sistema operacional ou do ambiente em que o servidor esteja rodando
                            //join é um método do módulo path que junta os segmentos de um caminho de arquivo em 
                            // um caminho completo, ou seja, ele constrói o caminho para a pasta 'front-end' de forma segura e eficiente
                                    //__dirname é uma variável global do Node.js que contém o caminho do diretório atual do arquivo, ou seja, ele 
                                    // representa o caminho do diretório onde o arquivo server.js está localizado
                                            //font-end é a pasta onde estão os arquivos HTML, CSS e JavaScript 
app.use(express.static(path.join(__dirname, 'front-end')))

//Definindo as rotas para a API, ou seja, ele define os endpoints que o cliente pode acessar para obter as informações sobre os estados, capitais e cidades do Brasil
app.get('/api/estados',           getListaDeEstados)  // lista todas as siglas
app.get('/api/estado/:uf',        getDadosEstado)      // dados de um estado
app.get('/api/capital/:uf',       getCapitalEstado)    // capital de um estado
app.get('/api/regiao/:regiao',    getEstadosRegiao)    // estados de uma região
app.get('/api/capitais-pais',     getCapitalPais)      // capitais históricas do país
app.get('/api/cidades/:uf',       getCidades)          // cidades de um estado

//Rota para servir o arquivo index.html para qualquer rota que não seja uma rota de API,
//  ou seja, ele garante que quando o cliente acessar uma rota que não seja uma rota de API, o servidor vai responder com o arquivo index.html, 
// permitindo que o cliente veja a interface do usuário mesmo quando acessar rotas que não sejam de API
app.get('/{*splat}', (req, res) => {
    //Enviando o arquivo index.html para o cliente, ou seja, ele responde com o arquivo index.html quando o cliente acessar uma rota que não seja de API
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

//Iniciando o servidor na porta 3000, ou seja, ele começa a ouvir as requisições do cliente na porta 3000 e exibe uma mensagem no console indicando que o servidor está rodando
const PORT = process.env.PORT || 3000

//Iniciando o servidor e exibindo uma mensagem no console indicando que o servidor está rodando, ou seja, ele começa a ouvir as requisições do cliente na porta definida e exibe uma mensagem no console para informar que o servidor está ativo
app.listen(PORT, () => {
    //Exibindo uma mensagem no console indicando que o servidor está rodando, ou seja, ele informa ao desenvolvedor que o servidor está ativo e pronto para receber requisições do cliente
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})