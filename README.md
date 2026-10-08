# 🏆 TierCraft — Criador e Apresentador de Tier Lists

> **Crie, organize e compartilhe suas classificações favoritas com facilidade, estilo e zero complicação!** ✨

---

## 🌟 O que é o TierCraft?

O **TierCraft** é um aplicativo moderno e interativo para você criar as famosas **Tier Lists** — aquelas tabelas onde você classifica qualquer coisa do melhor ao pior (como *"Obra-prima"*, *"Excelente"*, *"Bom"*, *"Mais ou menos"* e *"Ruim"*).

Você pode classificar absolutamente qualquer assunto:
* 🎮 Melhores jogos de todos os tempos
* 🎬 Filmes e séries que você já assistiu
* 🍕 Comidas e lanches favoritos
* 🎵 Músicas, cantores e álbuns
* 🦸‍♂️ Personagens de animes e quadrinhos

O grande diferencial do TierCraft é ser **100% visual, leve e divertido**: você pode arrastar itens com o mouse ou com o dedo no celular, ouvir efeitos sonoros ao soltar cada card, mudar as cores e até exportar uma foto prontinha em alta qualidade para postar nas redes sociais! 📸

---

## 💡 Simplicidade Máxima: Sem Servidor e Sem Mensalidades!

Muitos sites de tier list hoje em dia são cheios de anúncios pesados, exigem criar contas ou cobram mensalidades. O **TierCraft** foi pensado para ser o mais simples e livre possível:

* 🟢 **Sem pagar nada por servidor:** O projeto é uma página web estática (feita puramente com HTML, CSS e JavaScript). Isso significa que ele não precisa de um computador potente ligado na nuvem consumindo dinheiro.
* 🟢 **Funciona 100% no seu navegador:** Suas fotos, textos e listas ficam guardados com total privacidade no próprio armazenamento do seu navegador (`localStorage`). Nada é enviado para servidores externos.
* 🟢 **Hospedagem gratuita em qualquer lugar:** Você pode colocar o TierCraft no ar para seus amigos acessarem usando serviços gratuitos como **GitHub Pages**, **Vercel**, **Netlify** ou **Cloudflare Pages**, com custo **R$ 0,00** para sempre.
* 🟢 **Funciona offline:** Depois de abrir uma vez, graças à tecnologia PWA (Progressive Web App), você pode continuar usando mesmo se a internet cair! 🔌

---

## 🚀 Como Abrir e Rodar o TierCraft

Você não precisa ser programador para usar ou testar o TierCraft no seu computador. Escolha a forma que achar mais fácil:

### 1️⃣ Método Mais Fácil do Mundo: Abrir Direto no Navegador 🖱️
1. Baixe ou abra a pasta do projeto no seu computador.
2. Dê **dois cliques** no arquivo [`index.html`](file:///home/ma/code/tiercraft/index.html).
3. Pronto! Ele abrirá instantaneamente no seu Google Chrome, Firefox, Edge, Safari ou Brave.

---

### 2️⃣ Método Recomendado: Rodar Localmente com `npx` ⚡
Se você tem o [Node.js](https://nodejs.org/) instalado no computador, você pode rodar um servidorzinho local super leve usando o comando `npx`. A vantagem do `npx` é que você **não precisa instalar nada pesado**: ele baixa temporariamente apenas o necessário para abrir uma página na sua rede local.

Abra o terminal (ou Prompt de Comando) dentro da pasta do projeto e digite:

```bash
npx serve .
```

> 💡 **Dica:** O terminal vai mostrar um endereço parecido com `http://localhost:3000`. Basta clicar nele ou colar no seu navegador para usar!
>
> *Outras alternativas equivalentes com npx:*
> ```bash
> npx http-server -p 8080
> ```

---

### 3️⃣ Método Alternativo: Usando Python 🐍
Se você já tem o Python instalado, basta digitar no terminal:

```bash
python3 -m http.server 8000
```
E acessar `http://localhost:8000` no navegador.

---

### 4️⃣ Como Hospedar na Internet Gratuitamente (Passo a Passo) 🌐

Quer compartilhar o TierCraft com seus amigos ou com o público sem gastar um centavo? É muito fácil:

#### Pelo GitHub Pages (Gratuito e Eterno):
1. Crie um repositório no seu [GitHub](https://github.com) e envie os arquivos do projeto.
2. Acesse a aba **Settings** (Configurações) do repositório.
3. No menu lateral, clique em **Pages**.
4. Em **Branch**, selecione a branch principal (ex: `main`) e clique em **Save**.
5. Em instantes, o GitHub gera um link público (ex: `https://seu-usuario.github.io/tiercraft/`) para o mundo inteiro acessar!

#### Pela Vercel ou Netlify:
1. Conecte sua conta do GitHub na [Vercel](https://vercel.com) ou no [Netlify](https://netlify.com).
2. Selecione o repositório do TierCraft e clique em **Deploy**.
3. Em menos de 30 segundos sua página estará online com certificado de segurança (HTTPS) grátis.

---

## 🎯 Todas as Funcionalidades do TierCraft

O TierCraft foi construído pensando na melhor experiência possível, tanto para quem está só se divertindo quanto para streamers e criadores de conteúdo:

### 🗂️ 1. Gerenciador de Múltiplas Tier Lists
* Crie quantas listas diferentes quiser (uma para animes, outra para jogos, outra para restaurantes).
* Alterne entre suas listas com um clique através do seletor no topo da tela.
* Modelos iniciais prontos ao criar uma nova lista:
  * **Padrão:** fileiras tradicionais `S`, `A`, `B`, `C`, `D`.
  * **Gaming:** fileiras `God Tier (SSS)`, `S`, `A`, `B`, `C`, `F`.
  * **Simples:** fileiras `Excelente`, `Bom`, `Neutro`, `Ruim`.
  * **Vazia:** para você começar do zero como preferir.
* Renomeie ou exclua listas antigas quando quiser.

### ✏️ 2. Edição Direta e Descomplicada
* **Edite na hora:** Basta clicar em cima do título da Tier List ou da descrição para digitar o texto que quiser. Sem janelas complicadas!

### 🎨 3. Fileiras (Tiers) 100% Customizáveis
* **Mude o nome:** Chame de "S", "Tier Deus", "Top 10" ou o que a sua imaginação mandar.
* **Cores vibrantes:** Escolha uma das cores da paleta rápida ou use o seletor livre para escolher qualquer cor do arco-íris.
* **Organização flexível:** Mova fileiras para cima ou para baixo com os botões de seta.
* **Adicione ou remova:** Crie quantas fileiras precisar com o botão **Nova Fileira**.

### 🖼️ 4. Cards de Fotos e Cards de Texto
* **Fotos do computador ou celular:**
  * Envie várias fotos de uma vez só!
  * Arraste as imagens do seu computador e solte direto no banco de itens.
  * Cole links de imagens direto da internet.
* **Cards de Texto:**
  * Não quer procurar fotos? Crie cartões bonitos apenas com texto.
  * Escolha a cor do fundo e a cor da letra com pré-visualização em tempo real.
* **Busca e filtro:** Tem muitos itens no banco? Use a caixinha de pesquisa para encontrar rapidamente qualquer card pelo nome.

### 🖱️ 5. Arrastar e Soltar no PC e Toque no Celular / Tablet
* **No computador:** Arraste qualquer item com o mouse e solte na fileira desejada.
* **No celular/tablet:** Além do toque suave, você pode dar um toque em qualquer card para abrir o **Menu Rápido**, escolhendo diretamente para qual fileira deseja enviá-lo.

### 🔊 6. Efeitos Sonoros Divertidos
* Cada vez que você encaixa um item em uma fileira, um efeito sonoro toca!
* Efeitos disponíveis:
  * 💨 **Swoosh** (arrasto clássico)
  * 🎈 **Pop** (estalo suave)
  * 🏆 **Achievement** (som de conquista épica)
  * ✨ **Sparkle** (brilho mágico)
  * 💥 **Impact** (batida marcante)
  * ❌ **Fail** (som de erro cômico)
  * 👏 **Applause** (palmas para os melhores itens)
* Você pode definir um som padrão para a lista inteira ou colocar um som personalizado para cada fileira (por exemplo: *Achievement* no Tier S e *Fail* no Tier D!).

### 📺 7. Modo Foco / Apresentação (Tecla `F`)
* Vai fazer uma live na Twitch, gravar um vídeo pro YouTube ou apresentar para amigos no Discord?
* Clique em **Modo Foco** ou aperte a tecla `F` no teclado:
  * A tela fica limpa, escondendo barras de ferramentas e distrações.
  * Para sair, basta apertar `ESC` ou clicar no aviso no topo da tela.

### 📸 8. Exportar como Imagem (PNG)
* Terminou de montar o seu ranking? Clique em **Exportar Imagem**.
* O TierCraft desenha a sua lista inteira em uma imagem nítida com título, subtítulo e todas as fileiras organizadas, pronta para baixar e postar no Instagram, X (Twitter), WhatsApp ou Reddit.

### 🎨 9. Temas Visuais e Tipografia Estilosa (Tecla `T`)
Deixe o aplicativo com a sua cara escolhendo temas e fontes:
* **Temas inclusos:**
  * 🌙 **Escuro (Dark):** O visual clássico confortável para os olhos.
  * ☀️ **Claro (Light):** Limpo, brilhante e minimalista.
  * ⚡ **Cyberpunk:** Estilo futurista com tons neon e magenta.
  * 🕹️ **Retro Arcade:** Visual nostálgico com pegada de fliperama dos anos 80/90.
  * 🌌 **Midnight:** Fundo preto puro, perfeito para telas OLED.
  * 🌲 **Floresta:** Tons sofisticados de verde esmeralda.
  * 🎨 **Personalizado:** Escolha você mesmo as cores do fundo, dos cards, dos botões e do texto!
* **Fontes disponíveis:** Outfit, Plus Jakarta Sans, Inter, Space Grotesk, Fredoka e Press Start 2P (Pixel art 8-bit).

---

## 🤖 Criar Tier Lists com Inteligência Artificial (✨)

O TierCraft vem integrado com uma funcionalidade mágica de IA: você pode pedir para o **ChatGPT**, **Claude**, **Gemini**, **DeepSeek** ou **Copilot** montar uma Tier List inteira para você!

### Como funciona:
1. Abra o TierCraft e clique no botão **✨ Criar com IA** no topo da página.
2. Na aba **Prompt & Formato para IA**, clique em **Copiar Prompt**.
3. Abra a IA da sua preferência, cole o prompt e diga qual tema você quer (ex: *"Melhores filmes da Marvel"*, *"Linguagens de programação mais amadas"*, *"Personagens de Naruto"*).
4. A IA vai te responder com um código estruturado (JSON).
5. Copie a resposta da IA, volte para o TierCraft e cole no campo de importação (ou envie o arquivo `.json`).
6. Clique em **✨ Importar Tier List**:
   * Uma nova lista aparecerá prontinha na sua tela!
   * **Sem spoilers:** Os itens chegam no banco de itens com cores neutras para você mesmo classificar e se divertir descobrindo o ranking.
   * **Hierarquia visual:** Prioriza imagens oficiais e específicas; se não houver boa imagem, usa emojis e ícones temáticos ou cards de texto limpos, evitando fotos genéricas desconexas.
   * **Seus dados antigos não são apagados:** a nova lista é adicionada como mais uma opção na sua coleção.
   * Se algum link de imagem falhar, o TierCraft converte o card automaticamente em um emblema de texto para que nada fique quebrado.

> 📖 Para ver a documentação técnica detalhada do formato de JSON aceito pela IA, confira o arquivo [`TIERLIST_AI_SPEC.md`](file:///home/ma/code/tiercraft/TIERLIST_AI_SPEC.md).

---

## 💾 Backup Seguro dos Seus Dados

Seus dados são seus! Você nunca fica preso:
* **Salvar Backup:** Clique em **Backup JSON** e depois em **Download Arquivo JSON** para guardar um arquivo no seu computador com todas as suas listas e configurações.
* **Restaurar Backup:** Trocou de computador ou limpou o histórico do navegador? Basta clicar em **Backup JSON** e enviar o seu arquivo salvo para ter tudo de volta em um segundo.

---

## 📱 Instalação como Aplicativo no Celular ou PC (PWA)

O TierCraft é um **Progressive Web App (PWA)**, o que significa que ele pode se comportar exatamente como um aplicativo nativo instalado:

* **No Computador (Chrome/Edge):** Um botão **Instalar App** aparece no topo da barra. Clicando nele, o TierCraft ganha um ícone na sua área de trabalho e abre em uma janela própria sem barra de endereços.
* **No Celular Android:** O navegador exibirá um convite para adicionar o app à sua tela inicial.
* **No iPhone e iPad (Safari):**
  1. Toque no botão **Compartilhar** (o ícone de quadrado com a seta para cima).
  2. Role a lista e selecione **"Adicionar à Tela de Início"**.
  3. Toque em **Adicionar**. O ícone do TierCraft estará disponível junto com seus outros apps!

---

## ⌨️ Atalhos de Teclado Úteis

Para quem gosta de agilidade, o TierCraft possui atalhos práticos:

| Tecla | Ação |
| :---: | :--- |
| <kbd>F</kbd> | Ativa ou desativa o **Modo Foco / Apresentação** 📺 |
| <kbd>T</kbd> | Abre o painel de **Temas e Fontes** 🎨 |
| <kbd>ESC</kbd> | Sai do Modo Foco ou fecha qualquer janela aberta ❌ |

*(Os atalhos não interferem quando você estiver digitando um texto ou título!)*

---

## 📁 Estrutura dos Arquivos do Projeto

Se você quiser dar uma espiada no código, tudo é muito direto e bem organizado:

```text
tiercraft/
├── index.html            # Estrutura visual da página, modais e elementos
├── style.css             # Estilos visuais, animações, temas e responsividade
├── app.js                # Lógica interativa: arrastar, soltar, sons, exportação e salvamento
├── sw.js                 # Service Worker (responsável por fazer o app funcionar offline)
├── manifest.webmanifest  # Configurações do aplicativo PWA para celulares e computadores
├── TIERLIST_AI_SPEC.md   # Manual de instruções do formato JSON para geração por IA
├── assets/
│   ├── icons/            # Ícones em vários tamanhos para celular e navegadores
│   └── sounds/           # Arquivos de efeitos sonoros locais
└── README.md             # Esta documentação que você está lendo!
```

---

## ❓ Perguntas Frequentes (FAQ)

### 1. Eu preciso pagar para usar ou hospedar o TierCraft?
**Não, nunca!** O projeto é totalmente gratuito e de código aberto. Como não utiliza banco de dados complexo nem backend em servidor, você pode hospedá-lo de graça para sempre no GitHub Pages, Vercel ou Netlify.

### 2. Minhas fotos pessoais vão para a internet?
**Não.** Quando você adiciona fotos do seu computador, elas são processadas diretamente no seu navegador e salvas na memória local da sua máquina. Nenhuma foto é enviada para servidores de terceiros.

### 3. Se eu fechar a página ou reiniciar o computador, perco o que fiz?
**Não!** O TierCraft salva suas listas automaticamente conforme você mexe. Quando você abrir o site novamente no mesmo navegador, tudo estará exatamente do jeito que você deixou. Para maior segurança, você também pode exportar um arquivo de backup em JSON a qualquer momento.

### 4. Funciona no celular?
**Sim, perfeitamente!** O layout é totalmente responsivo e foi adaptado com controles de toque pensados especialmente para telas menores de smartphones e tablets.

---

## 📄 Licença

Distribuído livremente para você usar, modificar, aprender e se divertir! Feito com carinho para a comunidade criadora de conteúdo e entusiastas de listas. 💖
