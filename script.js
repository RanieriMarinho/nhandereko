document.addEventListener('DOMContentLoaded', () => {
    // =================================================
    // 1. INJEÇÃO DO WIDGET HTML NO BODY
    // =================================================

    const widgetHTML = `
        <div id="guarani-chatbot-widget" style="display: none;">
            <div id="chat-header">
                <h2 id="widget-title">Nhandereko Chatbot 🌿</h2>
                <span id="close-chat-btn">X</span>
            </div>
            <div id="chat-box" class="chat-box">
                <div class="message bot-message">
                    <p>Mba'éichapa! Sou o Chat Nhandereko. Estou aqui para compartilhar o **modo de ser** do meu povo. Como posso te ajudar?</p>
                </div>
                 <div class="message bot-message">
                    <div class="suggestions">
                        <button class="suggestion-button" onclick="window.sendSuggestion('Como vivem as crianças indígenas?')">Crianças Indígenas?</button>
                        <button class="suggestion-button" onclick="window.sendSuggestion('O que é Tekoha?')">O que é Tekoha?</button>
                        <button class="suggestion-button" onclick="window.sendSuggestion('Qual a situação da saúde indígena?')">Saúde Indígena?</button>
                    </div>
                </div>
            </div>

            <div class="input-area">
                <input type="text" id="user-input" placeholder="Digite sua pergunta...">
                <button id="send-button"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>

        <button id="open-chat-btn" title="Abrir Chatbot Nhandereko">
            <i class="fas fa-comment-dots"></i>
        </button>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);


    // =================================================
    // 2. VARIÁVEIS E LÓGICA DE ABRIR/FECHAR
    // =================================================
    const chatWidget = document.getElementById('guarani-chatbot-widget');
    const openBtn = document.getElementById('open-chat-btn');
    const closeBtn = document.getElementById('close-chat-btn');
    
    // Funções de abrir e fechar
    openBtn.addEventListener('click', () => {
        chatWidget.style.display = 'flex';
        openBtn.style.display = 'none';
        document.getElementById('user-input').focus();
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    });

    closeBtn.addEventListener('click', () => {
        chatWidget.style.display = 'none';
        openBtn.style.display = 'block';
    });


    // =================================================
    // 3. LÓGICA DO CHATBOT (Conhecimento Base e Funções)
    // =================================================
    
    // As referências a elementos DOM devem ser feitas DEPOIS da injeção do HTML
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Informações de contato padronizadas
    const contactInfo = `
        <br><br>
        **Gostaria de um relato feito por indígenas da Aldeia Paranapuã de São Vicente – SP?**
        <br>
        Para fazer uma visitação ou conhecer esta ou outras aldeias, entre no site: 
        <a href="http://www.nhandereko.com.br" target="_blank">www.nhandereko.com.br</a>
    `;

    // Mapeamento de perguntas e respostas sobre os Guarani (Conhecimento Base Local)
    const knowledgeBase = {
        // PERGUNTAS INICIAIS
        "o que é tekoha": "Tekoha é o termo Guarani para 'o lugar onde se é'. É mais do que um espaço físico; é o território sagrado onde o modo de vida Guarani (o Mbya Reko, Kaiowa Reko, etc.) pode ser plenamente realizado, englobando a mata, a água e os seres espirituais.",
        "quem são os guarani": "Os Guarani são um dos maiores povos indígenas da América do Sul, divididos em subgrupos, principalmente os Mbya, os Kaiowá e os Ñandeva. Eles compartilham uma língua e uma cosmovisão rica.",
        "o que é a terra sem males": "A **Yvy Marãe'ỹ** (Terra Sem Males) é um conceito central na espiritualidade Guarani. É um lugar mítico onde não há sofrimento, doença ou maldade. A busca por este lugar motivou grandes migrações históricas.",
        
        // NOVAS PERGUNTAS SOBRE ALDEIAS E CULTURA
        "como vivem as crianças indígenas": "Segundo a Funai, as crianças indígenas aprendem os ofícios e os rituais do seu povo através da **observação e da imitação dos adultos**, participando ativamente da vida social e familiar." + contactInfo,
        
        "como é o trabalho de parto das mulheres indígenas": "O parto de uma mulher indígena frequentemente envolve **rituais ancestrais** e **apoio comunitário**. Posições verticais, como a de cócoras, são comuns para facilitar a saída do bebê. (Fonte: Terras Indígenas no Brasil)." + contactInfo,
        
        "como é a gravidez de mulheres indígenas": "A gravidez é vista como um estado de **saúde e vitalidade**, permitindo o envolvimento em atividades cotidianas. O parto é geralmente natural, e as fases da Lua podem ser usadas para marcar o calendário da gestante. (Fonte: Terras Indígenas no Brasil)." + contactInfo,
        
        "como as aldeias indígenas surgiram": "As primeiras aldeias surgiram a partir da descoberta da **agricultura e da domesticação de animais**, o que levou à sedentarização dos grupos humanos. Fixaram residência perto de fontes de água para cultivar alimentos. (Fonte: Mundo Educação)." + contactInfo,
        
        "como vivem as mulheres indígenas": "Segundo a Funai, as mulheres indígenas buscam o **protagonismo na luta por direitos** e na preservação de seus territórios, embora enfrentem desafios de violência e problemas de acesso a saúde, especialmente o pré-natal." + contactInfo,
        
        "qual a situação da saúde indígena": "A situação é complexa e delicada. A Funai aponta que a situação sanitária nunca foi satisfatória, com alta mortalidade infantil e desnutrição crônica. A Funai atua no fortalecimento da rede de saúde indígena." + contactInfo,
        
        "como os indígenas participam da política brasileira": "Sua participação ocorre através do **protagonismo na gestão da FUNAI**, com indígenas em cargos de liderança, e pelo engajamento nas políticas de demarcação de terras, etnodesenvolvimento e educação. (Fonte: Funai)." + contactInfo,
        
        "quais alimentos de origem indígena são consumidos hoje": "Alimentos como **mandioca**, **milho** e frutas como **açaí**, **guaraná** e **pinhão** estão 100% ligados aos povos originários e presentes no dia a dia do brasileiro. (Fonte: Funai)." + contactInfo,
        
        "como são os rituais indígenas": "São celebrações diversas que marcam **ritos de passagem** (nascimento, vida adulta), práticas espirituais e reforçam laços comunitários através de danças, cantos, pinturas corporais e o uso de adornos. (Fonte: Funai)." + contactInfo,
        
        "o que é xamã": "O **Xamã** ou **Pajé** é o líder espiritual dos povos originários, considerado um mensageiro entre o mundo terreno e o espiritual. O termo Xamã é usado para líderes espirituais no mundo todo. (Fonte: Terra + Portal Amazônia)." + contactInfo,
        
        // PERGUNTAS GERAIS E BOAS VINDAS
        "mba'éichapa": "Mba'éichapa! (Tudo bem?)",
        "olá": "Olá! Seja bem-vindo(a) ao Nhandereko. Posso te contar mais sobre o modo de ser do povo Guarani.",
        "bom dia": "Bom dia! Que Nhanderu (Nosso Grande Pai) ilumine seu dia. Mba'éichapa!",
        
        // RESPOSTA PADRÃO
        "default": "Não tenho informações específicas sobre isso. Você poderia tentar perguntar sobre **crianças indígenas**, **Tekoha**, ou **saúde indígena**? Digite 'ajuda' para ver mais sugestões."
    };

    /** Adiciona uma nova mensagem à caixa de chat. */
    function appendMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = `<p>${text}</p>`; 
        chatBox.appendChild(messageDiv);
        
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    /** Processa a entrada do usuário e gera a resposta do bot. */
    function getBotResponse(input) {
        const normalizedInput = input.toLowerCase().trim();
        
        if (knowledgeBase[normalizedInput]) {
            return knowledgeBase[normalizedInput];
        }
        
        for (const key in knowledgeBase) {
            if (normalizedInput.includes(key) && key !== "default") {
                return knowledgeBase[key];
            }
        }
        
        if (normalizedInput.includes("ajuda") || normalizedInput.includes("sugestoes")) {
             return "Aqui estão algumas sugestões de perguntas que você pode fazer sobre a cultura Guarani e a vida nas aldeias:";
        }

        return knowledgeBase["default"];
    }
    
    /** Lida com o envio da mensagem do usuário. */
    function sendMessage() {
        const input = userInput.value.trim();
        if (input === '') return;

        appendMessage(input, 'user');
        userInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(input);
            appendMessage(botResponse, 'bot');
            
            if (botResponse === knowledgeBase["default"] || botResponse.includes("sugestões")) {
                addSuggestions();
            }
        }, 800);
    }
    
    /** Adiciona botões de sugestão à caixa de chat. */
    function addSuggestions() {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.classList.add('message', 'bot-message');
        
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('suggestions');
        
        const suggestions = [
            "Como vivem as crianças indígenas?",
            "O que é Xamã?",
            "Como os indígenas participam da política brasileira?",
            "Quais alimentos de origem indígena são consumidos hoje?"
        ];
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.classList.add('suggestion-button');
            button.textContent = suggestion;
            button.onclick = () => window.sendSuggestion(suggestion);
            suggestionsContainer.appendChild(button);
        });
        
        suggestionsDiv.appendChild(suggestionsContainer);
        chatBox.appendChild(suggestionsDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Função global para ser usada pelos botões de sugestão do HTML
    window.sendSuggestion = function(text) {
        userInput.value = text;
        sendMessage();
    };

    // Event Listeners (associados aos elementos injetados)
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});