# Jogo da Velha (Tic-Tac-Toe) 🎮

Um jogo da velha moderno e elegante desenvolvido com JavaScript puro, HTML5 e CSS3, seguindo os melhores padrões de arquitetura e design.

![Game Screenshot](./screenshot.png)

## ✨ Características

### Funcionalidades
- ✅ Jogo completamente funcional para 2 jogadores
- ✅ Detecção automática de vitória e empate
- ✅ Sistema de pontuação persistente (localStorage)
- ✅ Indicador visual do jogador atual
- ✅ Animações suaves e feedback visual
- ✅ Modal de vitória com animações
- ✅ Destacamento das células vencedoras
- ✅ Botão de reiniciar jogo
- ✅ Botão para zerar placar
- ✅ Design responsivo para mobile e desktop
- ✅ Acessibilidade com suporte a teclado

### Tecnologias
- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com variáveis CSS, gradientes, animações e grid
- **JavaScript ES6+** - Lógica do jogo com arquitetura orientada a objetos

## 🏗️ Arquitetura

O código segue princípios de **Clean Architecture** e **Separation of Concerns**:

### Classes Principais

#### 1. `GameState`
Gerencia o estado do jogo:
- Tabuleiro atual
- Jogador ativo
- Pontuações
- Persistência de dados (localStorage)

#### 2. `GameLogic`
Contém a lógica pura do jogo:
- Verificação de vitória
- Verificação de empate
- Combinações vencedoras
- Cálculo de resultados

#### 3. `UIController`
Gerencia toda a interface do usuário:
- Atualização visual das células
- Controle do modal
- Atualização do placar
- Gerenciamento de eventos DOM

#### 4. `TicTacToeGame`
Controlador principal que orquestra:
- Inicialização do jogo
- Coordenação entre estado, lógica e UI
- Gerenciamento de eventos
- Fluxo do jogo

## 🚀 Como Usar

### Opção 1: Abrir Diretamente no Navegador
```bash
# Simplesmente abra o arquivo index.html no seu navegador preferido
open index.html
```

### Opção 2: Servidor HTTP Local

#### Com Python 3:
```bash
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

#### Com Python 2:
```bash
python -m SimpleHTTPServer 8000
# Acesse: http://localhost:8000
```

#### Com Node.js (http-server):
```bash
npx http-server -p 8000
# Acesse: http://localhost:8000
```

#### Com PHP:
```bash
php -S localhost:8000
# Acesse: http://localhost:8000
```

## 🎯 Como Jogar

1. **Objetivo**: Formar uma linha de três símbolos iguais (X ou O)
2. **Jogadores**: Dois jogadores se alternam entre X e O
3. **Turnos**: Clique em uma célula vazia para fazer sua jogada
4. **Vitória**: Complete uma linha horizontal, vertical ou diagonal
5. **Empate**: Se todas as células forem preenchidas sem vencedor

### Controles
- **Clique** nas células vazias para jogar
- **Novo Jogo** - Reinicia a partida atual
- **Zerar Placar** - Reseta todas as pontuações
- **ESC** - Fecha o modal de vitória

## 📁 Estrutura de Arquivos

```
tic-tac-toe/
│
├── index.html          # Estrutura HTML do jogo
├── style.css           # Estilos e animações
├── script.js           # Lógica do jogo
└── README.md           # Documentação
```

## 🎨 Design Features

### Visual
- Gradientes modernos e cores vibrantes
- Animações de entrada (fade-in, slide-up)
- Efeito de "pop" ao marcar células
- Pulsação nas células vencedoras
- Sombras e efeitos de profundidade
- Hover effects suaves

### Responsividade
- Layout adaptável para mobile
- Grid flexível
- Breakpoints em 640px e 480px
- Touch-friendly em dispositivos móveis

### Acessibilidade
- Cores de alto contraste
- Foco visível em elementos interativos
- Suporte a `prefers-reduced-motion`
- Estrutura semântica HTML5
- Navegação por teclado

## 🔧 Personalização

### Cores
Edite as variáveis CSS em `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --player-x: #ec4899;
    --player-o: #06b6d4;
    --draw-color: #f59e0b;
    --win-highlight: #10b981;
    /* ... outras cores */
}
```

### Animações
Ajuste a velocidade das transições:

```css
:root {
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

## 📊 Sistema de Pontuação

O jogo mantém automaticamente o placar de:
- Vitórias do Jogador X
- Vitórias do Jogador O
- Número de empates

As pontuações são salvas no `localStorage` do navegador e persistem entre sessões.

## 🐛 Debugging

Para ver mensagens de debug, abra o Console do navegador (F12):
- Warnings sobre localStorage
- Erros de execução
- Estado do jogo

## 🌟 Melhores Práticas Implementadas

### JavaScript
- ✅ Classes ES6+ com encapsulamento
- ✅ Separação de responsabilidades
- ✅ Nomes descritivos e auto-explicativos
- ✅ Comentários úteis
- ✅ Tratamento de erros (try-catch)
- ✅ Event delegation
- ✅ DOMContentLoaded para inicialização

### CSS
- ✅ Variáveis CSS (Custom Properties)
- ✅ Mobile-first approach
- ✅ BEM-like naming convention
- ✅ Animações com performance (transform/opacity)
- ✅ Flexbox e Grid modernos
- ✅ Media queries organizadas

### HTML
- ✅ Estrutura semântica
- ✅ Atributos de acessibilidade
- ✅ Meta tags apropriadas
- ✅ Links externos no final do body

## 🚀 Possíveis Melhorias Futuras

- [ ] Modo single-player com IA (Minimax algorithm)
- [ ] Diferentes níveis de dificuldade
- [ ] Temas personalizáveis
- [ ] Sons e efeitos sonoros
- [ ] Multiplayer online
- [ ] PWA (Progressive Web App)
- [ ] Histórico de partidas
- [ ] Estatísticas avançadas
- [ ] Diferentes tamanhos de tabuleiro (4x4, 5x5)
- [ ] Internacionalização (i18n)

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Desenvolvimento

Desenvolvido seguindo os melhores padrões de:
- Clean Code
- SOLID Principles
- Separation of Concerns
- DRY (Don't Repeat Yourself)
- Mobile-First Design
- Progressive Enhancement

----

**Divirta-se jogando! 🎮✨**

