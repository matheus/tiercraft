# 🤖 Especificação do Formato JSON para Criação de Tier Lists com IA (TierCraft)

O **TierCraft** permite importar Tier Lists completas geradas por qualquer Inteligência Artificial (ChatGPT, Claude, Gemini, DeepSeek, Copilot, etc.). 

A importação **não apaga nem substitui** as suas Tier Lists atuais — ela adiciona uma nova lista à sua coleção e a define como ativa instantaneamente.

---

## 📋 Modelo de Prompt Pronto para Copiar e Enviar à IA

Copie e cole o prompt abaixo no ChatGPT, Claude, Gemini ou qualquer outro assistente, substituindo `[SEU TEMA AQUI]` pelo assunto desejado:

```text
Atue como um especialista e crie uma Tier List completa em formato JSON válido para o aplicativo TierCraft sobre o seguinte tema: [SEU TEMA AQUI, ex: Melhores Jogos de RPG de Todos os Tempos].

Retorne EXCLUSIVAMENTE o bloco de código JSON puro (sem comentários antes ou depois), estritamente de acordo com o esquema abaixo:

{
  "title": "Nome da Tier List",
  "description": "Breve descrição contextualizando a classificação",
  "defaultSoundId": "achievement",
  "rows": [
    {
      "label": "Obra-prima (S)",
      "color": "#ff4757",
      "items": [
        {
          "type": "image",
          "label": "Nome do Item",
          "src": "https://url-publica-da-imagem.jpg"
        },
        {
          "type": "text",
          "text": "Item em Card de Texto",
          "bgColor": "#ff4757",
          "textColor": "#ffffff"
        }
      ]
    },
    {
      "label": "Excelente (A)",
      "color": "#ffa502",
      "items": []
    },
    {
      "label": "Bom (B)",
      "color": "#eccc68",
      "items": []
    },
    {
      "label": "Mediano (C)",
      "color": "#2ed573",
      "items": []
    },
    {
      "label": "Ruim (D)",
      "color": "#1e90ff",
      "items": []
    }
  ],
  "unrankedItems": [
    {
      "type": "image",
      "label": "Item Pendente 1",
      "src": "https://url-publica-da-imagem.jpg"
    },
    {
      "type": "text",
      "text": "Item Pendente 2",
      "bgColor": "#6366f1",
      "textColor": "#ffffff"
    }
  ]
}

Regras:
1. Adapte a quantidade e os nomes das fileiras (rows) ao tema escolhido (ex: tiers convencionais S, A, B, C, D ou temáticos como "Essencial", "Recomendado", "Dispensável").
2. Cores sugeridas para as fileiras (hex): #ff4757 (vermelho), #ffa502 (laranja), #eccc68 (amarelo), #2ed573 (verde), #1e90ff (azul), #9b59b6 (roxo), #ec4899 (rosa), #718093 (cinza).
3. Efeitos sonoros suportados (defaultSoundId): "swoosh", "pop", "achievement", "sparkle", "impact", "fail", "applause", "none".
4. Cards do tipo "image": use "src" com URLs públicas e diretas de imagem da web (Unsplash, Wikimedia, CDNs estáveis) e forneça a legenda em "label".
5. Cards do tipo "text": defina o texto em "text" e opcionalmente as cores em "bgColor" e "textColor".
6. Você pode pré-classificar alguns itens colocando-os dentro do array "items" da respectiva fileira em "rows", e/ou disponibilizar itens no banco para classificação do usuário em "unrankedItems".
```

---

## 📐 Estrutura e Especificação do JSON

### 1. Objeto Raiz (Tier List)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Sim** | O título principal da Tier List (ex: `"Melhores Filmes de Ficção Científica"`). |
| `description` | `string` | Não | Breve resumo ou descrição que aparece abaixo do título. |
| `defaultSoundId` | `string` | Não | Som tocado ao mover cards. Opções: `"swoosh"`, `"pop"`, `"achievement"`, `"sparkle"`, `"impact"`, `"fail"`, `"applause"`, `"none"`. (Padrão: `"swoosh"`). |
| `rows` | `Array<Row>` | **Sim** | Lista de fileiras / categorias do ranking. |
| `unrankedItems` | `Array<Item>` | Não | Itens colocados no banco de cards não classificados (aguardando o usuário arrastar). |

---

### 2. Objeto de Fileira (`Row`)

| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Não | Identificador único (se omitido, o TierCraft gera automaticamente). |
| `label` | `string` | **Sim** | Nome da fileira (ex: `"S"`, `"A"`, `"Obra-Prima"`, `"Favoritos"`). |
| `color` | `string` | Não | Cor de destaque em formato hexadecimal (ex: `"#ff4757"`). Se omitido, aplica a paleta padrão. |
| `soundId` | `string` | Não | Som específico ao soltar nesta fileira (`"default"` para usar o padrão da lista). |
| `items` | `Array<Item>` | Não | Cards já classificados dentro desta fileira. |

---

### 3. Objeto de Card / Item (`Item`)

O TierCraft suporta dois tipos de itens: **Imagens da Web** e **Cards de Texto**.

#### A. Item do tipo Imagem (`"type": "image"`)
| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Sim** | Valor fixo `"image"`. |
| `src` | `string` | **Sim** | URL direta da imagem (HTTPS). Aceita formatos `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`. *Sinônimos aceitos: `url`, `image`.* |
| `label` | `string` | Não | Legenda do card (exibida em overlay na parte inferior da imagem). *Sinônimos aceitos: `name`, `title`.* |

> **Nota de Resiliência:** Se a URL de uma imagem falhar (ex: link quebrado ou bloqueado por CORS), o TierCraft converte automaticamente o card para um badge textual elegante com o valor de `label`, garantindo que a lista nunca quebre.

#### B. Item do tipo Card de Texto (`"type": "text"`)
| Campo | Tipo | Obrigatório | Descrição |
| :--- | :--- | :--- | :--- |
| `type` | `string` | **Sim** | Valor fixo `"text"`. |
| `text` | `string` | **Sim** | Texto exibido centralizado no card. *Sinônimos aceitos: `name`, `label`.* |
| `bgColor` | `string` | Não | Cor de fundo em hexadecimal (padrão: `"#2a2d3d"`). |
| `textColor` | `string` | Não | Cor do texto em hexadecimal (padrão: `"#ffffff"`). |

---

## 💡 Exemplo Completo Válido

```json
{
  "title": "Melhores Linguagens de Programação",
  "description": "Classificação para desenvolvimento web, mobile e backend moderno.",
  "defaultSoundId": "pop",
  "rows": [
    {
      "label": "Essenciais (S)",
      "color": "#ff4757",
      "items": [
        {
          "type": "text",
          "text": "TypeScript",
          "bgColor": "#3178c6",
          "textColor": "#ffffff"
        },
        {
          "type": "text",
          "text": "Python",
          "bgColor": "#3776ab",
          "textColor": "#ffffff"
        }
      ]
    },
    {
      "label": "Muito Fortes (A)",
      "color": "#ffa502",
      "items": [
        {
          "type": "text",
          "text": "Rust",
          "bgColor": "#dea584",
          "textColor": "#000000"
        },
        {
          "type": "text",
          "text": "Go",
          "bgColor": "#00add8",
          "textColor": "#ffffff"
        }
      ]
    },
    {
      "label": "Consolidadas (B)",
      "color": "#eccc68",
      "items": [
        {
          "type": "text",
          "text": "Java",
          "bgColor": "#b07219",
          "textColor": "#ffffff"
        },
        {
          "type": "text",
          "text": "C#",
          "bgColor": "#178600",
          "textColor": "#ffffff"
        }
      ]
    },
    {
      "label": "Legado / Nicho (C)",
      "color": "#2ed573",
      "items": []
    }
  ],
  "unrankedItems": [
    {
      "type": "text",
      "text": "PHP",
      "bgColor": "#4f5d95",
      "textColor": "#ffffff"
    },
    {
      "type": "text",
      "text": "Ruby",
      "bgColor": "#701516",
      "textColor": "#ffffff"
    },
    {
      "type": "text",
      "text": "C++",
      "bgColor": "#f34b7d",
      "textColor": "#ffffff"
    },
    {
      "type": "text",
      "text": "Kotlin",
      "bgColor": "#a97bff",
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
4. Sua nova Tier List será aberta imediatamente, sem apagar nenhuma de suas listas anteriores!
