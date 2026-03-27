// ============================================================
// app.js — integração front-end com a API back-end
// Cada função faz um fetch para um endpoint e atualiza o HTML
// ============================================================

// ============================================================
// NAVEGAÇÃO POR ABAS
// Captura todos os botões e painéis, controla qual está ativo
// ============================================================
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    // Remove a classe active de todos os botões e painéis
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))

    // Ativa o botão clicado e o painel correspondente
    btn.classList.add('active')
    const tab = btn.dataset.tab
    document.getElementById(`tab-${tab}`).classList.add('active')

    // Se for a aba de capitais históricas, carrega automaticamente
    if (tab === 'capitais-pais') buscarCapitaisPais()
  })
})

// Permite buscar com a tecla Enter nos inputs
document.getElementById('inputEstado').addEventListener('keydown', e => {
  if (e.key === 'Enter') buscarDadosEstado()
})
document.getElementById('inputCapital').addEventListener('keydown', e => {
  if (e.key === 'Enter') buscarCapital()
})
document.getElementById('inputCidades').addEventListener('keydown', e => {
  if (e.key === 'Enter') buscarCidades()
})

// ============================================================
// FUNÇÃO AUXILIAR — exibe mensagem de erro no elemento alvo
// ============================================================
function mostrarErro(elementoId, mensagem) {
  document.getElementById(elementoId).innerHTML = `
    <div class="erro">${mensagem}</div>
  `
}

// ============================================================
// FUNÇÃO AUXILIAR — exibe loading no elemento alvo
// ============================================================
function mostrarLoading(elementoId) {
  document.getElementById(elementoId).innerHTML = `
    <div class="loading">Buscando...</div>
  `
}

// ============================================================
// 1. BUSCAR TODOS OS ESTADOS
// Endpoint: GET /api/estados
// Exibe: grade de siglas clicáveis
// Carrega automaticamente ao abrir a página
// ============================================================
async function buscarEstados() {
  try {
    // Faz a requisição para o back-end
    const response = await fetch('/api/estados')
    const dados = await response.json()

    // Atualiza o contador no header com a quantidade real
    document.getElementById('headerCounter').textContent = `${dados.quantidade} estados`

    // Monta o HTML com cada sigla como um item clicável
    const html = dados.uf.map(sigla => `
      <div class="sigla-item" onclick="irParaEstado('${sigla}')" title="Ver dados de ${sigla}">
        ${sigla}
      </div>
    `).join('')

    document.getElementById('siglasGrid').innerHTML = html

  } catch (erro) {
    document.getElementById('siglasGrid').innerHTML = `
      <div class="erro">Não foi possível carregar os estados. Verifique se o servidor está rodando.</div>
    `
  }
}

// Ao clicar numa sigla, navega para a aba "Dados do Estado" e já busca
function irParaEstado(sigla) {
  // Ativa a aba correta
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'))
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
  document.querySelector('[data-tab="estado"]').classList.add('active')
  document.getElementById('tab-estado').classList.add('active')

  // Preenche o input e dispara a busca
  document.getElementById('inputEstado').value = sigla
  buscarDadosEstado()
}

// ============================================================
// 2. BUSCAR DADOS DE UM ESTADO
// Endpoint: GET /api/estado/:uf
// Exibe: sigla, nome, capital e região
// ============================================================
async function buscarDadosEstado() {
  // Captura o valor digitado pelo usuário e converte para maiúsculo
  const uf = document.getElementById('inputEstado').value.trim().toUpperCase()

  if (!uf) return mostrarErro('resultadoEstado', 'Digite uma sigla para buscar.')

  mostrarLoading('resultadoEstado')

  try {
    // Monta a URL com o parâmetro — fetch envia GET /api/estado/SP (por exemplo)
    const response = await fetch(`/api/estado/${uf}`)

    // Se a resposta não for 200 OK, o estado não foi encontrado
    if (!response.ok) {
      return mostrarErro('resultadoEstado', `Estado "${uf}" não encontrado.`)
    }

    const dados = await response.json()

    // Monta o card com os dados recebidos do back-end
    document.getElementById('resultadoEstado').innerHTML = `
      <div class="card">
        <div class="card-title">
          ${dados.uf}
          <span class="badge">${dados.regiao}</span>
        </div>
        <div class="card-row">
          <span class="card-label">Nome</span>
          <span class="card-value">${dados.descricao}</span>
        </div>
        <div class="card-row">
          <span class="card-label">Capital</span>
          <span class="card-value destaque">${dados.capital}</span>
        </div>
        <div class="card-row">
          <span class="card-label">Região</span>
          <span class="card-value">${dados.regiao}</span>
        </div>
      </div>
    `
  } catch (erro) {
    mostrarErro('resultadoEstado', 'Erro ao conectar com o servidor.')
  }
}

// ============================================================
// 3. BUSCAR CAPITAL DE UM ESTADO
// Endpoint: GET /api/capital/:uf
// Exibe: sigla, nome e capital
// ============================================================
async function buscarCapital() {
  const uf = document.getElementById('inputCapital').value.trim().toUpperCase()

  if (!uf) return mostrarErro('resultadoCapital', 'Digite uma sigla para buscar.')

  mostrarLoading('resultadoCapital')

  try {
    const response = await fetch(`/api/capital/${uf}`)

    if (!response.ok) {
      return mostrarErro('resultadoCapital', `Estado "${uf}" não encontrado.`)
    }

    const dados = await response.json()

    document.getElementById('resultadoCapital').innerHTML = `
      <div class="card">
        <div class="card-title">${dados.uf}</div>
        <div class="card-row">
          <span class="card-label">Estado</span>
          <span class="card-value">${dados.descricao}</span>
        </div>
        <div class="card-row">
          <span class="card-label">Capital</span>
          <span class="card-value destaque">${dados.capital}</span>
        </div>
      </div>
    `
  } catch (erro) {
    mostrarErro('resultadoCapital', 'Erro ao conectar com o servidor.')
  }
}

// ============================================================
// 4. BUSCAR ESTADOS DE UMA REGIÃO
// Endpoint: GET /api/regiao/:regiao
// Exibe: nome da região e lista de estados com sua capital
// ============================================================
async function buscarRegiao(regiao) {
  // Marca o botão da região como ativo visualmente
  document.querySelectorAll('.btn-regiao').forEach(b => b.classList.remove('ativo'))
  event.target.classList.add('ativo')

  mostrarLoading('resultadoRegiao')

  try {
    const response = await fetch(`/api/regiao/${regiao}`)

    if (!response.ok) {
      return mostrarErro('resultadoRegiao', `Região "${regiao}" não encontrada.`)
    }

    const dados = await response.json()

    // Monta a grade com todos os estados da região
    const estadosHtml = dados.estados.map(estado => `
      <div class="estado-regiao-item">
        <div class="estado-regiao-nome">${estado.nome}</div>
        <div class="estado-regiao-capital">${estado.descricao}</div>
      </div>
    `).join('')

    document.getElementById('resultadoRegiao').innerHTML = `
      <div class="card">
        <div class="card-title">
          ${dados.regiao}
          <span class="badge">${dados.estados.length} estados</span>
        </div>
        <div class="estados-regiao-grid">
          ${estadosHtml}
        </div>
      </div>
    `
  } catch (erro) {
    mostrarErro('resultadoRegiao', 'Erro ao conectar com o servidor.')
  }
}

// ============================================================
// 5. BUSCAR CIDADES DE UM ESTADO
// Endpoint: GET /api/cidades/:uf
// Exibe: informações do estado + lista scrollável de cidades
// ============================================================
async function buscarCidades() {
  const uf = document.getElementById('inputCidades').value.trim().toUpperCase()

  if (!uf) return mostrarErro('resultadoCidades', 'Digite uma sigla para buscar.')

  mostrarLoading('resultadoCidades')

  try {
    const response = await fetch(`/api/cidades/${uf}`)

    if (!response.ok) {
      return mostrarErro('resultadoCidades', `Estado "${uf}" não encontrado.`)
    }

    const dados = await response.json()

    // Monta a lista de cidades — cada cidade como um item da grade
    const cidadesHtml = dados.cidades.map(c => `
      <div class="cidade-item">${c.nome}</div>
    `).join('')

    document.getElementById('resultadoCidades').innerHTML = `
      <div class="card">
        <div class="cidades-header">
          <div>
            <div class="card-title" style="margin-bottom:4px">
              ${dados.descricao.descricao}
              <span class="badge">${dados.descricao.uf}</span>
            </div>
          </div>
          <div class="cidades-count">
            ${dados.descricao.quantidade_cidades}
            <span>cidades</span>
          </div>
        </div>
        <div class="cidades-lista">
          ${cidadesHtml}
        </div>
      </div>
    `
  } catch (erro) {
    mostrarErro('resultadoCidades', 'Erro ao conectar com o servidor.')
  }
}

// ============================================================
// 6. BUSCAR CAPITAIS HISTÓRICAS DO PAÍS
// Endpoint: GET /api/capitais-pais
// Exibe: lista de cidades que já foram capital do Brasil
// ============================================================
async function buscarCapitaisPais() {
  mostrarLoading('resultadoCapitaisPais')

  try {
    const response = await fetch('/api/capitais-pais')

    if (!response.ok) {
      return mostrarErro('resultadoCapitaisPais', 'Não foi possível carregar as capitais históricas.')
    }

    const dados = await response.json()

    // Para cada capital, calcula quantos anos ela foi capital do país
    const capitaisHtml = dados.capitais.map(capital => {
      const anoFim = capital.capita_pais_ano_fim || 'atual'
      const duracao = capital.capita_pais_ano_fim
        ? `${capital.capita_pais_ano_fim - capital.capita_pais_ano_inicio} anos`
        : 'Capital atual'

      return `
        <div class="capital-historica">
          <div class="capital-historica-info">
            <h3>${capital.capital} — ${capital.descricao}</h3>
            <p>${capital.uf} · Região ${capital.regiao}</p>
          </div>
          <div class="capital-historica-periodo">
            <div class="anos">${capital.capita_pais_ano_inicio} — ${anoFim}</div>
            <div class="duracao">${duracao}</div>
          </div>
        </div>
      `
    }).join('')

    document.getElementById('resultadoCapitaisPais').innerHTML = `
      <div class="capitais-lista">${capitaisHtml}</div>
    `
  } catch (erro) {
    mostrarErro('resultadoCapitaisPais', 'Erro ao conectar com o servidor.')
  }
}

// ============================================================
// INICIALIZAÇÃO — carrega os estados ao abrir a página
// ============================================================
buscarEstados()
