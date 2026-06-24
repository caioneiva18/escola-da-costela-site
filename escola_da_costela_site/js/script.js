// ==========================================
// 1. LÓGICA DO BOTÃO DE ENCOMENDA
// ==========================================

// Busca no documento HTML o elemento que possui a classe ".botao-encomenda"
// e o salva na constante 'botaoEncomenda'.
const botaoEncomenda = document.querySelector(".botao-encomenda");

// Busca no documento HTML o elemento que possui a classe ".orientacoes-encomenda"
// e o salva na constante 'orientacoesEncomenda'.
const orientacoesEncomenda = document.querySelector(".orientacoes-encomenda");

// Verifica se o botão e a área de orientações existem antes de aplicar o evento.
// Isso evita erro caso o HTML seja alterado no futuro.
if (botaoEncomenda && orientacoesEncomenda) {

    // Adiciona um "ouvinte de eventos" ao botão.
    botaoEncomenda.addEventListener("click", function () {

        // Alterna a presença da classe "oculto".
        orientacoesEncomenda.classList.toggle("oculto");

        // Verifica se as orientações estão escondidas.
        if (orientacoesEncomenda.classList.contains("oculto")) {

            // Se estiverem escondidas, o botão volta ao texto inicial.
            botaoEncomenda.textContent = "Solicitar encomenda";

        } else {

            // Se estiverem visíveis, o botão muda o texto para permitir ocultar.
            botaoEncomenda.textContent = "Ocultar orientações";

        } // Fim do if/else

    }); // Fim do evento de clique

} // Fim da verificação


// ==========================================
// 2. LÓGICA DAS MENSAGENS DOS PRATOS
// ==========================================

// Seleciona todos os cards que receberam a classe "card-interativo".
const cardsDestaque = document.querySelectorAll(".card-interativo");

// Seleciona o parágrafo que exibirá a mensagem dinâmica.
const mensagemDestaque = document.querySelector("#mensagem-destaque");

// Guarda a mensagem original que aparece antes de qualquer clique.
const mensagemOriginal = "Clique em um dos pratos para ver uma sugestão de consumo.";

// Guarda qual produto está selecionado no momento.
let produtoAtual = null;

// Cria uma função responsável por voltar a mensagem para o estado inicial.
function voltarMensagemOriginal() {
    mensagemDestaque.textContent = mensagemOriginal;
    produtoAtual = null;
}

// Cria uma função responsável por exibir a mensagem de acordo com o prato clicado.
function mostrarMensagem(produto) {

    // Verifica se o produto recebido é a costela.
    if (produto === "costela") {
        mensagemDestaque.textContent = "A costela bovina é a melhor escolha para quem quer conhecer o prato principal da casa e aproveitar uma refeição com sabor marcante.";
    }

    // Verifica se o produto recebido é o brisket.
    if (produto === "brisket") {
        mensagemDestaque.textContent = "O brisket fatiado combina com acompanhamentos simples e é indicado para quem gosta de carnes assadas lentamente.";
    }

    // Verifica se o produto recebido são os acompanhamentos.
    if (produto === "acompanhamentos") {
        mensagemDestaque.textContent = "Os acompanhamentos ajudam a equilibrar a refeição e tornam o churrasco mais completo para compartilhar.";
    }

    // Verifica se o produto recebido é encomenda.
    if (produto === "encomenda") {
        mensagemDestaque.textContent = "As porções para retirada são úteis para quem quer levar o churrasco para casa e organizar um almoço de fim de semana.";
    }
}

// Verifica se a área de mensagem existe antes de aplicar as interações.
if (mensagemDestaque) {

    // Percorre todos os cards interativos.
    cardsDestaque.forEach(function(card) {

        // Cria uma função reutilizável para ativar o card.
        function ativarCard(evento) {

            // Impede que o clique no card também seja interpretado como clique fora dele.
            evento.stopPropagation();

            // Lê o valor do atributo "data-produto".
            const produtoSelecionado = card.dataset.produto;

            // Se o usuário clicar novamente no mesmo produto, a mensagem volta ao texto original.
            if (produtoSelecionado === produtoAtual) {
                voltarMensagemOriginal();
                return;
            }

            // Exibe a mensagem do produto selecionado.
            mostrarMensagem(produtoSelecionado);

            // Atualiza o produto selecionado.
            produtoAtual = produtoSelecionado;
        }

        // Adiciona evento de clique ao card.
        card.addEventListener("click", ativarCard);

        // Permite ativar o card pelo teclado usando Enter ou Espaço.
        card.addEventListener("keydown", function(evento) {

            // Verifica se a tecla pressionada foi Enter ou Espaço.
            if (evento.key === "Enter" || evento.key === " ") {

                // Evita rolagem da página ao apertar Espaço.
                evento.preventDefault();

                // Ativa a mesma ação do clique.
                ativarCard(evento);
            }
        });
    });

    // Adiciona evento de clique no documento inteiro.
    document.addEventListener("click", function() {
        voltarMensagemOriginal();
    });

} // Fim da verificação da mensagem
