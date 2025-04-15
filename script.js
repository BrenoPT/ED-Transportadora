const fila = [];
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

// Atualiza visualmente a lista da fila
function atualizarFila() {
    filaElement.innerHTML = "";
    fila.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `#${p.id.toString().padStart(3, '0')} - ${p.nome} (${p.cidade}, ${p.pais})`;
      filaElement.appendChild(li);
    });
}
  

// Botões
document.getElementById("add-pacote").addEventListener("click", adicionarPacote);
