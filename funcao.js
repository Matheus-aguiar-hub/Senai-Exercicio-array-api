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
const importandoEstados = require('./estados_cidades.js')

//Função que retorna as siglas e o total de quantidade de estados
function getListaDeEstados () {

    //Criando uma variavel para um array vazio que vai ser usado para colocar as siglas
    let arraySiglaEstado = []
    
    //Estrutura de repetição das siglas que vai mostrar todas as siglas que está dentro do objeto 
    importandoEstados.listaDeEstados.estados.forEach(function(retornoSiglaEstado) {

        //Fazendo com que as siglas retorne para a variável que está vazia
        //unshift retorna as siglas sempre para o começo do array, também pode ser usado o .push
        arraySiglaEstado.unshift(retornoSiglaEstado.sigla) 

    })

    //Retornando as estruturas formatadas. 
    return {
        //Fazendo o return da vairavel siglaUF, que já vai está com as siglas dentro
        uf: arraySiglaEstado,
        //Retornando a quantidade de siglas que tem dentro do array siglasUF
        quantidade: arraySiglaEstado.length
    }
} 

/*
Criando uma função que pega os dados dos estados
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a repetição com a função para pegar o array que está vazio e formata em linhas
Criando outra decisão caso o item informado não é encontrado fora da repetição
Fazendo o retorno da função principal
*/

//Adicionando função para pegar estados com um parametro que vai ser definido 
function getDadosEstado (uf) {

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

    //Definindo como falso caso não encontre o item informado 
    if(!status){
        console.log('item não foi encontrado.')
    }

    //Fazendo o retorno do objeto.
    return arrayEstado

}

/*
Criando uma função que pega os dados dos estados
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a repetição com a função para pegar o array que está vazio e formata em uma só linha
Criando outra decisão caso o item informado não é encontrado fora da repetição 
Fazendo o retorno da função principal
*/

//Criando função que vai encontrar e tratar os estados que o usuario quer 
function getCapitalEstado (uf) {

    //Array vazio para ser definido depois com os estados
    let arrayEstadoBrasil = []

    //Definindo caso o usuario digitar algo que não foi encontrado
    let status = false

    //Estrutura de repetição para informar as informações do estado completo em uma só linha
    importandoEstados.listaDeEstados.estados.forEach(function(repeticaoEstado){

        //Defindo decisão para que encontre o array do estado e formatar em uma só linha
        if(repeticaoEstado.sigla.toUpperCase() == uf.toUpperCase()){
            arrayEstadoBrasil = {uf: repeticaoEstado.sigla, descricao: repeticaoEstado.nome, capital: repeticaoEstado.capital}
        }

        //Defindo como verdadeiro caso ele encontre o item informado
        status = true
    })

    //Definindo como falso caso não encontre o item informado 
    if(!status){
        console.log('item não foi encontrado.')
    }

    //Fazendo o retorno para o objeto.
    return arrayEstadoBrasil

}

/*
Criando uma função que pega os dados da região
Adicionando parâmetros para encontrar o array vazio
Criando a estrutura de repetição que percorre o objeto dos estados
Criando uma estrutura de decisão que iguala a repetição com a função para pegar o array que está vazio e formata em uma só linha
Criando outra decisão caso o item informado não é encontrado fora da repetição 
Fazendo o retorno da função principal
*/

//Função que pega os dados da região e defini um parâmetro de região que é usada após.
function getEstadosRegiao (regiao) {
    

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
                uf: repeticaoRegiao.nome,
                //Capital estado
                descricao: repeticaoRegiao.capital

            })
        }
    })

    //Definindo como falso caso não encontre o item informado 
    if(!status){
        console.log('item não foi encontrado.')
    }
    
    //Retornando o objeto.
    return jsonRegiaoEstados 

}

// function getCapitalPais (capital){

//     let jsonCapital = {
//         capitais: []
//     }

//     let status = false

//     importandoEstados.listaDeEstados.estados.forEach(function(repeticaoCapital){

//         //Fazendo com que ele encontre o objeto array
//         if(repeticaoCapital.toUpperCase() == capital.toUpperCase()){
//             status = true

            

//         }

//     })

// }

// //Mostrando no terminal a lista dos estados, as siglas e quantidade
console.log(getListaDeEstados())

//Mostrando no terminal a descrição do estado em linhas
console.log(getDadosEstado('SP'))

//Mostrando no terminal a descrição do estado em uma única linha
console.log(getCapitalEstado('RJ'))

//Mostrando no terminal a regiao, os estados delas e a capital
console.log(getEstadosRegiao('Sul'))

// console.log(getCapitalPais('capitais'))