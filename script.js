const fila = [];
const filaEntrega = []
let idPacote = 1;

const filaElement = document.getElementById("fila");
const historicoElement = document.getElementById("historico");

// Adicionar novo pacote à fila
async function adicionarPacote() {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const user = data.results[0];
  
    const pacote = {
        id: idPacote++,
        nome: `${user.name.first} ${user.name.last}`,
        cidade: user.location.city,
        pais: user.location.country
    };
  
    fila.push(pacote);
    atualizarFila();
}

async function entregarPacote() {
    botao = document.getElementById('entregar-pacote')
    botao.disabled = true
    botao.classList.add('ativado')
    if((fila.length) > 0){
        await simulaEntrega()
        filaEntrega.push(fila[0])
        fila.shift()
        atualizarHistorico()
        atualizarFila();
    }
    botao.classList.remove('ativado')
    botao.disabled = false
}

async function simulaEntrega() {
    await new Promise(resolve => {
        tempoEntrega = (Math.floor(Math.random() * 10) + 1) * 1000;
        console.log(tempoEntrega)
        setTimeout(resolve, tempoEntrega)      
        progrideBarra(tempoEntrega)
    })
}

function progrideBarra(tempoEntrega) {
    const progresso = document.getElementById('barra-progresso')
    const porcentagem = document.getElementById('porcentagem-progresso')
    let intervalo = setInterval(function() {
        progresso.value = progresso.value + 1;
        porcentagem.innerHTML = `${progresso.value}%`
    
        if (progresso.value == 100) {
          clearInterval(intervalo);
          progresso.value = 0
          porcentagem.innerHTML = '0%'
        }
      }, tempoEntrega/100);
}

// Atualiza visualmente a lista da fila
function atualizarFila() {
    filaElement.innerHTML = "";
    fila.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `#${p.id.toString().padStart(3, '0')} - ${p.nome} (${p.cidade}, ${p.pais})`;
      filaElement.appendChild(li);
    });
}

function atualizarHistorico() {
    historicoElement.innerHTML = "";
    filaEntrega.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `#${p.id.toString().padStart(3, '0')} - ${p.nome} (${p.cidade}, ${p.pais})`;
      historicoElement.appendChild(li);
    });
}
  
// Botões
document.getElementById("add-pacote").addEventListener("click", adicionarPacote);
document.getElementById("entregar-pacote").addEventListener("click", entregarPacote);
