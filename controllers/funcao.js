/* 
Autor: Matheus Aguiar
Objetivo: Criar funções para as respectivas chamadas.
Deve retornar duas tratativas se for true retorna os dados ou se não retornar deve criar uma tratativa para false.
App.js deve estar vazio, sem nenhum conteúdo.
Data: 18/03/2026
Versão 1.1
*/

/*
Cria uma variavél que vai ter a importação aonde está o objeto das cidades estados
Cria uma função aonde vai fazer a formatação e encontrar os dados destino chamado getListaEstados
Criando um array vazio que vai está os dados das siglas.
Criando uma estrura de repetição que vai percorrer todo o objeto dos dados e vai colocar dentro do array que está vazio.
Retorna formatado o objeto array que já está todos as siglas dentro junto com a quantidade. 
*/

//Importando o objeto do estado
const importandoEstados = require('../estados_cidades.js')

//Fazendo as requisições para pegar os dados dos estados, como sigla, nome, capital e região
                            //Fazendo os endpoints de requisição e de resposta o que o servidor tudo que o cliente enviou para o servidor
                                //Resposta do servidor para o usuário, ou seja, o que o servidor vai devolver para o usuário
//Ou seja, o que o cliente pediu para o servidor e o que o servidor vai devolver para o cliente
function getListaDeEstados (req, res) {
    //Criando uma variavel para um array vazio que vai ser usado para colocar as siglas
    let arraySiglaEstado = []

    let status = false
    
    //Estrutura de repetição das siglas que vai mostrar todas as siglas que está dentro do objeto 
    importandoEstados.listaDeEstados.estados.forEach(function(retornoSiglaEstado) {
        status = true
        //Fazendo com que as siglas retorne para a variável que está vazia
        //unshift retorna as siglas sempre para o começo do array, também pode ser usado o .push
        arraySiglaEstado.unshift(retornoSiglaEstado.sigla) 

    })
    
    //Retornando as estruturas formatadas. 
    res.json ({  
        //Fazendo o return da vairavel siglaUF, que já vai está com as siglas dentro
        uf: arraySiglaEstado,
        //Retornando a quantidade de siglas que tem dentro do array siglasUF
        quantidade: arraySiglaEstado.length
    })

       if(!status){
        return res.status(404).json({message: 'Estado não encontrado.'})   
    }

    res.json(arraySiglaEstado)

} 

/*
Criando uma função que pega os dados dos estados
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a repetição com a função para pegar o array que está vazio e formata em linhas
Criando outra decisão caso o item informado não é encontrado fora da repetição
Retornando o objeto principal
*/

//
function getDadosEstado (req, res) {

    const uf = req.params.uf

    //Criando um Json vazio, que vai ter a estrutura do estado informado dentro dela
    let arrayEstado = []

    //Defindo se caso não for encontrado vai ser como false
    let status = false

    //Fazendo uma estrutura de repetição do Json 'estado' com função de callback
    importandoEstados.listaDeEstados.estados.forEach(function (repeticaoEstrutura){

        //criando uma variável caso a repetição for igual a função vai retornar a estrutura 
        //completa do estado, sendo assim colocando no array vazio
        if(repeticaoEstrutura.sigla.toUpperCase() == uf.toUpperCase()){

        //Array do Json Estados sendo definida e formatada dentro da decisão 
        arrayEstado = {
            uf: repeticaoEstrutura.sigla,
            descricao: repeticaoEstrutura.nome, 
            capital: repeticaoEstrutura.capital,
            regiao: repeticaoEstrutura.regiao
            
        }
        //Defindo como verdadeiro caso ele encontre o item informado
        status = true
    }
    })

    //Definindo como falso caso não encontre o estado informado 
    if(!status){
        return res.status(404).json({message: 'Estado não encontrado.'})   
    }

    //
    res.json(arrayEstado)

}

/*
Criando uma função que pega os dados dos estados
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a repetição com a função para pegar o array que está vazio e formata em uma só linha
Criando outra decisão caso o item informado não é encontrado fora da repetição 
Retornando o objeto principal
*/

//
function getCapitalEstado (req, res) {

    const uf = req.params.uf

    //Array vazio para ser definido depois com os estados
    let arrayEstadoBrasil = []

    //Definindo caso o usuario digitar algo que não foi encontrado
    let status = false

    //Estrutura de repetição para informar as informações do estado completo em uma só linha
    importandoEstados.listaDeEstados.estados.forEach(function(repeticaoEstado){

        //Defindo decisão para que encontre o array do estado e formatar em uma só linha
        if(repeticaoEstado.sigla.toUpperCase() == uf.toUpperCase()){
            arrayEstadoBrasil = {uf: repeticaoEstado.sigla, descricao: repeticaoEstado.nome, capital: repeticaoEstado.capital}

        //Defindo como verdadeiro caso ele encontre o item informado
        status = true
        }

    })

    //Definindo como falso caso não encontre o estado informado
    if(!status){
        return res.status(404).json({message: 'Estado não encontrado.'})   
    }

    //
    res.json(arrayEstadoBrasil)

}

/*
Criando uma função que pega os dados da região
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a repetição com a função para pegar o array que está vazio e formata em uma só linha
Criando outra decisão caso o item informado não é encontrado fora da repetição 
Retornando o objeto principal
*/

//
function getEstadosRegiao (req, res) {
    
    const regiao = req.params.regiao

    //Definindo se o usuario digitar algo incorreto
    let status = false

    //Json que vai pegar o que o usuário digitar e pegar todos os estados da região que foi digitada
    let jsonRegiaoEstados = {
        //Usuario digita a região
        regiao: '',
        //Aparece no array os estados
        estados: []
    }

    //Estrutura de repetição para informar a regiao de acordo com que o usuario digitar, consequentemente os estados,
    //nome e capital informado no unshift que sempre irá listar em primeiro
    importandoEstados.listaDeEstados.estados.forEach(function(repeticaoRegiao){
        
            //Fazendo a estrutura de decisão que irá chamar o json posteriormente 
            if(repeticaoRegiao.regiao.toUpperCase() == regiao.toUpperCase()){

                //Caso o usuario digitar o que é certo ele vai retornar verdadeiro
                status = true

                //Igualando caso a região que o estado informar e percorre o objeto mostrando a regiao 
                jsonRegiaoEstados.regiao = repeticaoRegiao.regiao

                //Adiciona os valores nome e capital no array e mostra eles formatados
                jsonRegiaoEstados.estados.unshift({
                //Nome do estado
                nome: repeticaoRegiao.nome,
                //Capital estado
                descricao: repeticaoRegiao.capital

            })
        }
    })

    //Definindo como falso caso não encontre o estado informado 
    if(!status){
        console.log('Estado não foi encontrado.')
    }
    
    //Retornando o objeto.
    res.json(jsonRegiaoEstados)

}

/*
Criando uma função que pega os dados da capital do país 
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a repetição com a capital do pais e o inicio do ano que foi a capital do país sendo assim quem tiver esses
dois itens vai mostrar os dados da capital do país, como nome, capital, região e o ano que foi a capital do país
Criando outra decisão caso o item informado não é encontrado fora da repetição 
Retornando o objeto principal
*/


function getCapitalPais (req, res){

    //Json que vai pegar o que o usuário digitar e pegar a capital do país, nome, região, ano que foi a capital do país e o ano que deixou de ser a capital do país
    let jsonCapital = {
    //Aparece no array os estados
    capitais: []
    }

    //Definindo se o usuario digitar algo incorreto
    let status = false

    //Estrutura de repetição para informar a capital do país, nome, região, ano que foi a capital do país e o ano que deixou de ser a capital do país
    importandoEstados.listaDeEstados.estados.forEach(function(repeticaoCapital){
        
        //Fazendo com que ele encontre o objeto array capital do pais e o ano que foi a capital do país, caso encontre ele vai retornar os dados da capital do país
        if(repeticaoCapital.capital_pais && repeticaoCapital.capital_pais.ano_inicio){ 
            //Caso o usuario digitar o que é certo ele vai retornar verdadeiro
            status = true

            //Adiciona os valores nome, capital, região e o ano que foi a capital do país no array e mostra eles formatados
            jsonCapital.capitais.unshift({
                //Nome do estado
                uf: repeticaoCapital.sigla,
                //Capital estado
                descricao: repeticaoCapital.nome,
                //Capital do país
                capital: repeticaoCapital.capital,
                //Região do estado
                regiao: repeticaoCapital.regiao,
                //Ano que foi a capital do país
                capita_pais_ano_inicio: repeticaoCapital.capital_pais.ano_inicio,
                //Ano que deixou de ser a capital do país
                capita_pais_ano_fim: repeticaoCapital.capital_pais.ano_fim
            })
        }   
    })

    //Definindo como falso caso não encontre o item informado 
    if(!status){
        return res.status(404).json({message: 'Capital não foi encontrada.'})
    }
    
    //
    res.json(jsonCapital)

}

/*
Fazendo uma função que vai mostrar as cidades de um estado a partir da sigla do estado mostrando a descrição do estado, a quantidade de cidades e o nome das cidades
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a sigla do estado como o que o estado que o usuário digitar, consequentemente a descrição do estado, como nome e sigla, e a quantidade de cidades
Criando outra decisão percorrendo o array cidades do estado e mostrando o nome das cidades
Retornando o objeto principal
*/


function getCidades(req, res) {

    const uf = req.params.uf

    //Json que vai pegar o que o usuário digitar e pegar a sigla, descrição do estado, a quantidade de cidades e o nome das cidades
    let jsonCidades = {
        //Usuario digita a sigla do estado
        uf: '',
        //Aparece no array a descrição do estado, como nome e sigla, e a quantidade de cidades
        descricao: {},
        //Percorre no array estados e mostra o nome das cidades
        cidades: []
    }

    //Definindo caso o usuario digitar algo que não foi encontrado
    let status = false

    //Estrutura de repetição para informar as cidades de acordo com que o usuario digitar a sigla do estado, consequentemente a descrição do estado, como nome e sigla, e a quantidade de cidades
    importandoEstados.listaDeEstados.estados.forEach(function(repeticaoCidades){

        //Fazendo a estrutura de decisão que irá chamar o json posteriormente
        if(repeticaoCidades.sigla.toUpperCase() === uf.toUpperCase()){

        //Caso o usuario digitar o que é certo ele vai retornar verdadeiro
        status = true

        //Igualando caso a sigla do estado que o usuário informar e percorre o objeto mostrando a sigla do estado
        jsonCidades.uf = repeticaoCidades.sigla

        //Adiciona os valores nome, sigla e a quantidade de cidades no array e mostra eles formatados
        jsonCidades.descricao = {
            //Sigla do estado
            uf: repeticaoCidades.sigla,
            //Nome do estado
            descricao: repeticaoCidades.nome,
            //quantidade de cidades
            quantidade_cidades: repeticaoCidades.cidades.length
            
        }

        //Percorre o array cidades do estado e mostra o nome das cidades
        repeticaoCidades.cidades.forEach(function(repeticaoCidades2){
            //Adiciona os valores nome das cidades no array e mostra eles formatados
            jsonCidades.cidades.unshift({
                //Nome da cidade
                nome: repeticaoCidades2.nome
            })
        })  
    }
    })

    //Definindo como falso caso não encontre o item informado 
    if(!status){
        return res.status(404).json({message: 'Estado não encontrado.'})    
    }
    
    //
    res.json(jsonCidades) 

}

module.exports = {  
getListaDeEstados,
getDadosEstado,
getCapitalEstado,
getEstadosRegiao,
getCapitalPais,
getCidades
}