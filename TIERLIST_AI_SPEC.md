# 🤖 Especificação do Formato JSON para Criação de Tier Lists com IA (TierCraft)

O **TierCraft** permite importar Tier Lists completas geradas por qualquer Inteligência Artificial (ChatGPT, Claude, Gemini, DeepSeek, Copilot, etc.). 

A importação **não apaga nem substitui** as suas Tier Lists atuais — ela adiciona uma nova lista à sua coleção e a define como ativa instantaneamente.

---

## 📋 Modelo de Prompt Pronto para Copiar e Enviar à IA

Copie e cole o prompt abaixo no ChatGPT, Claude, Gemini ou qualquer outro assistente, substituindo `[SEU TEMA AQUI]` pelo assunto desejado:

```text
Atue como um especialista e crie uma Tier List completa em formato JSON válido para o aplicativo TierCraft sobre o seguinte tema: [SEU TEMA AQUI, ex: Melhores Jogos de RPG de Todos os Tempos].

Retorne EXCLUSIVAMENTE o bloco de código JSON puro (sem comentários, sem conversas e sem textos antes ou depois do bloco JSON), seguindo estritamente a estrutura abaixo:

{
  "title": "Nome da Tier List",
  "description": "Breve descrição contextualizando a classificação",
  "defaultSoundId": "achievement",
  "rows": [
    {
      "label": "S",
      "color": "#ff4757",
      "items": []
    },
    {
      "label": "A",
      "color": "#ffa502",
      "items": []
    },
    {
      "label": "B",
      "color": "#eccc68",
      "items": []
    },
    {
      "label": "C",
      "color": "#2ed573",
      "items": []
    },
    {
      "label": "D",
      "color": "#1e90ff",
      "items": []
    }
  ],
  "unrankedItems": [
    {
      "type": "image",
      "label": "Item com Foto Específica",
      "src": "https://url-publica-direta-e-especifica.jpg"
    },
    {
      "type": "text",
      "text": "🎮 Item com Emoji Representativo",
      "bgColor": "#2a2d3d",
      "textColor": "#ffffff"
    },
    {
      "type": "text",
      "text": "Item em Texto Puro",
      "bgColor": "#2a2d3d",
      "textColor": "#ffffff"
    }
  ]
}

Regras obrigatórias:
1. Fileiras (rows): Defina as fileiras e nomes mais adequados ao tema (ex: S, A, B, C, D ou "Obra-prima", "Excelente", "Bom", "Mediano", "Ruim"). Deixe o array "items" de cada fileira VAZIO ([]) e coloque todos os itens a serem classificados em "unrankedItems" para que o usuário possa jogar e classificar manualmente cada um.
2. Cores das fileiras: Cores hexadecimais sugeridas para as fileiras: #ff4757, #ffa502, #eccc68, #2ed573, #1e90ff, #9b59b6, #ec4899, #718093.
3. REGRA ANTI-SPOILER DE CORES (MUITO IMPORTANTE): A cor da fileira ("color") pertence EXCLUSIVAMENTE ao rótulo visual da fileira (o cabeçalho do tier). NUNCA defina o "bgColor" dos itens com a cor da fileira onde você classificaria o item! Se os itens forem pintados com a cor do tier, estragaria a brincadeira entregando antecipadamente o resultado. Todos os cards de texto DEVEM usar cor de fundo neutra e uniforme: "bgColor": "#2a2d3d" e "textColor": "#ffffff".
4. REGRA DE PRIORIDADE VISUAL DOS ITENS (Hierarquia obrigatória):
   - 1ª Opção (Imagem real e específica): Use {"type": "image", "src": "...", "label": "..."} SOMENTE se você tiver uma URL direta de imagem da web (HTTPS) que seja de alta qualidade e ESPECÍFICA e fiel ao item exato (ex: capa oficial, logo real, foto real do item/personagem). É TERMINANTEMENTE PROIBIDO usar fotos genéricas de bancos de imagens (ex: fotos de controles genéricos para jogos, computadores genéricos para software, pessoas aleatórias ou wallpapers abstratos). Se não houver uma URL direta e específica para o item, NÃO use imagem.
   - 2ª Opção (Ícone ou Emoji temático - Quando não houver imagem boa): Se não encontrar uma imagem direta, boa e específica para o item, crie o item como card de texto ("type": "text") incluindo um emoji ou ícone temático representativo no início do texto (ex: "☕ Café Expresso", "🏎️ Ferrari F40", "🐍 Python", "🍕 Pizza Margherita", "⚔️ The Witcher 3").
   - 3ª Opção (Texto puro): Se também não encontrar ou não fizer sentido nenhum emoji ou ícone para o item, use apenas o nome limpo do item em "text" (ex: "Nome do Item").
5. Efeitos sonoros suportados (soundId / defaultSoundId): "swoosh", "pop", "achievement", "sparkle", "impact", "fail", "applause", "none".
```

---

## 📐 Estrutura e Especificação do JSON

### 1. Objeto Raiz (Tier List)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Sim** | O título principal da Tier List (ex: `"Melhores Jogos da Década"`). |
| `description` | `string` | Não | Breve resumo ou descrição que aparece abaixo do título. |
| `defaultSoundId` | `string` | Não | Som tocado ao mover cards. Opções: `"swoosh"`, `"pop"`, `"achievement"`, `"sparkle"`, `"impact"`, `"fail"`, `"applause"`, `"none"`. (Padrão: `"achievement"`). |
| `rows` | `Array<Row>` | **Sim** | Lista de fileiras / categorias do ranking. |
| `unrankedItems` | `Array<Item>` | Não | Itens colocados no banco de cards não classificados (aguardando o usuário arrastar e classificar). |

---

### 2. Objeto de Fileira (`Row`)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Não | Identificador único (se omitido, o TierCraft gera automaticamente). |
| `label` | `string` | **Sim** | Nome da fileira (ex: `"S"`, `"A"`, `"Obra-Prima"`, `"Favoritos"`). |
| `color` | `string` | Não | Cor de destaque em formato hexadecimal (ex: `"#ff4757"`). Se omitido, aplica a paleta padrão. |
| `soundId` | `string` | Não | Som específico ao soltar nesta fileira (`"default"` para usar o padrão da lista). |
| `items` | `Array<Item>` | Não | Cards já classificados dentro desta fileira. *Para listas prontas para jogar, mantenha vazio (`[]`) e coloque os itens em `unrankedItems`.* |

---

### 3. Objeto de Card / Item (`Item`) e Hierarquia Visual

O TierCraft oferece suporte inteligente para exibição de itens seguindo uma hierarquia de 3 níveis:

#### 1ª Prioridade: Item do tipo Imagem (`"type": "image"`)
*Use SOMENTE quando possuir URL direta de alta qualidade e realmente específica do item.*

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Sim** | Valor fixo `"image"`. |
| `src` | `string` | **Sim** | URL direta da imagem (HTTPS). Aceita formatos `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`. *Sinônimos aceitos: `url`, `image`.* |
| `label` | `string` | Não | Legenda do card (exibida em overlay na parte inferior da imagem). *Sinônimos aceitos: `name`, `title`.* |

> **Nota de Resiliência:** Se a URL de uma imagem falhar (link quebrado ou bloqueado por CORS), o TierCraft converte automaticamente o card para um badge textual elegante com o valor de `label`, garantindo que a lista nunca quebre.

#### 2ª Prioridade: Card com Ícone ou Emoji (`"type": "text"`)
*Quando não houver imagem direta específica, utilize um emoji ou ícone temático representativo no início do nome.*

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Sim** | Valor fixo `"text"`. |
| `text` | `string` | **Sim** | Texto do card contendo o emoji/ícone e o nome (ex: `"🍕 Pizza Margherita"`, `"🏎️ Ferrari F40"`, `"🐍 Python"`). |
| `bgColor` | `string` | Não | Cor de fundo em hexadecimal (**Anti-spoiler:** use sempre o padrão neutro `"#2a2d3d"`). |
| `textColor` | `string` | Não | Cor do texto em hexadecimal (padrão: `"#ffffff"`). |

#### 3ª Prioridade: Card de Texto Puro (`"type": "text"`)
*Quando não houver imagem nem emoji representativo.*

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Sim** | Valor fixo `"text"`. |
| `text` | `string` | **Sim** | Nome do item em texto limpo (ex: `"Item Simples"`). |
| `bgColor` | `string` | Não | Padrão neutro `"#2a2d3d"`. |
| `textColor` | `string` | Não | Padrão `"#ffffff"`. |

> 🛡️ **Regra Anti-Spoiler:** O TierCraft neutraliza automaticamente cores de fundo de cards que correspondam às cores das fileiras, garantindo que o usuário nunca receba spoilers de classificação antes de jogar!

---

## 💡 Exemplo Completo Válido

```json
{
  "title": "Melhores Jogos da Década",
  "description": "Classifique os maiores lançamentos dos videogames dos últimos anos.",
  "defaultSoundId": "achievement",
  "rows": [
    {
      "label": "Obra-Prima (S)",
      "color": "#ff4757",
      "items": []
    },
    {
      "label": "Excelente (A)",
      "color": "#ffa502",
      "items": []
    },
    {
      "label": "Muito Bom (B)",
      "color": "#eccc68",
      "items": []
    },
    {
      "label": "Bom (C)",
      "color": "#2ed573",
      "items": []
    },
    {
      "label": "Mediano (D)",
      "color": "#1e90ff",
      "items": []
    }
  ],
  "unrankedItems": [
    {
      "type": "image",
      "label": "The Witcher 3",
      "src": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300"
    },
    {
      "type": "text",
      "text": "⚔️ Chrono Trigger",
      "bgColor": "#2a2d3d",
      "textColor": "#ffffff"
    },
    {
      "type": "text",
      "text": "🤠 Red Dead Redemption 2",
      "bgColor": "#2a2d3d",
      "textColor": "#ffffff"
    },
    {
      "type": "text",
      "text": "💍 Elden Ring",
      "bgColor": "#2a2d3d",
      "textColor": "#ffffff"
    },
    {
      "type": "text",
      "text": "Cyberpunk 2077",
      "bgColor": "#2a2d3d",
      "textColor": "#ffffff"
    }
  ]
}
```

---

## 🚀 Como Usar no Aplicativo

1. Abra o **TierCraft**.
2. Clique no botão **✨ Criar com IA** no cabeçalho (ou no ícone de estrela ✨ no seletor de listas).
3. Na janela que se abre:
   - Se você copiou o código da IA, cole na caixa de texto e clique em **✨ Importar Tier List**.
   - Se salvou como arquivo `.json`, clique em **Escolher Arquivo .JSON** que ele carrega e importa automaticamente.
4. Sua nova Tier List será aberta imediatamente com os itens prontos no banco para você classificar, sem dar spoilers das notas e sem apagar nenhuma de suas listas anteriores!
