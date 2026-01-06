/**
 * Tic-Tac-Toe Game with AI
 * Clean architecture with separation of concerns
 */

// ===== Game Configuration =====
class GameConfig {
  constructor() {
    this.mode = "player"; // 'player' or 'ai'
    this.playerNames = {
      X: "Jogador X",
      O: "Jogador O",
    };
    this.aiPlayer = "O"; // AI always plays as O
    this.humanPlayer = "X"; // Human always plays as X
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === "ai") {
      this.playerNames.O = "IA";
    }
  }

  setPlayerName(player, name) {
    this.playerNames[player] = name || `Jogador ${player}`;
  }

  isAITurn(currentPlayer) {
    return this.mode === "ai" && currentPlayer === this.aiPlayer;
  }
}

// ===== AI Logic with Minimax Algorithm =====
class AIPlayer {
  constructor(aiSymbol, humanSymbol) {
    this.aiSymbol = aiSymbol;
    this.humanSymbol = humanSymbol;
  }

  // Find the best move using Minimax algorithm
  findBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = null;

    // Try all empty cells
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        // Make the move
        board[i] = this.aiSymbol;

        // Calculate score for this move
        let score = this.minimax(board, 0, false);

        // Undo the move
        board[i] = null;

        // Update best move if this move is better
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  }

  // Minimax algorithm with depth
  minimax(board, depth, isMaximizing) {
    // Check terminal states
    const result = this.checkGameState(board);

    if (result !== null) {
      if (result === this.aiSymbol) return 10 - depth;
      if (result === this.humanSymbol) return depth - 10;
      if (result === "draw") return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = this.aiSymbol;
          let score = this.minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = this.humanSymbol;
          let score = this.minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  // Check game state for minimax
  checkGameState(board) {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for winner
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    // Check for draw
    if (board.every((cell) => cell !== null)) {
      return "draw";
    }

    // Game still in progress
    return null;
  }
}

// ===== Game State Management =====
class GameState {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.gameActive = true;
    this.scores = {
      X: 0,
      O: 0,
      draw: 0,
    };
    this.loadScores();
  }

  reset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.gameActive = true;
  }

  resetScores() {
    this.scores = { X: 0, O: 0, draw: 0 };
    this.saveScores();
  }

  makeMove(index) {
    if (this.board[index] || !this.gameActive) {
      return false;
    }
    this.board[index] = this.currentPlayer;
    return true;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
  }

  updateScore(winner) {
    if (winner === "draw") {
      this.scores.draw++;
    } else {
      this.scores[winner]++;
    }
    this.saveScores();
  }

  saveScores() {
    try {
      localStorage.setItem("ticTacToeScores", JSON.stringify(this.scores));
    } catch (e) {
      console.warn("Could not save scores to localStorage:", e);
    }
  }

  loadScores() {
    try {
      const saved = localStorage.getItem("ticTacToeScores");
      if (saved) {
        this.scores = JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load scores from localStorage:", e);
    }
  }
}

// ===== Game Logic =====
class GameLogic {
  constructor() {
    this.winningCombinations = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal top-left to bottom-right
      [2, 4, 6], // Diagonal top-right to bottom-left
    ];
  }

  checkWinner(board) {
    for (const combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return {
          winner: board[a],
          combination: combination,
        };
      }
    }
    return null;
  }

  checkDraw(board) {
    return board.every((cell) => cell !== null);
  }

  getGameResult(board) {
    const winResult = this.checkWinner(board);
    if (winResult) {
      return winResult;
    }
    if (this.checkDraw(board)) {
      return { winner: "draw", combination: [] };
    }
    return null;
  }
}

// ===== UI Controller =====
class UIController {
  constructor() {
    // Setup screen elements
    this.setupScreen = document.getElementById("setupScreen");
    this.gameScreen = document.getElementById("gameScreen");
    this.modePlayerBtn = document.getElementById("modePlayer");
    this.modeAIBtn = document.getElementById("modeAI");
    this.playerXNameInput = document.getElementById("playerXName");
    this.playerONameInput = document.getElementById("playerOName");
    this.playerOGroup = document.getElementById("playerOGroup");
    this.startGameBtn = document.getElementById("startGameBtn");

    // Game screen elements
    this.board = document.getElementById("board");
    this.cells = document.querySelectorAll(".cell");
    this.currentPlayerDisplay = document.getElementById("currentPlayerDisplay");
    this.scoreXDisplay = document.getElementById("scoreX");
    this.scoreODisplay = document.getElementById("scoreO");
    this.scoreDrawDisplay = document.getElementById("scoreDraw");
    this.scoreLabelX = document.getElementById("scoreLabelX");
    this.scoreLabelO = document.getElementById("scoreLabelO");
    this.modal = document.getElementById("modal");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalMessage = document.getElementById("modalMessage");
    this.resetBtn = document.getElementById("resetBtn");
    this.resetScoreBtn = document.getElementById("resetScoreBtn");
    this.backToSetupBtn = document.getElementById("backToSetupBtn");
    this.modalBtn = document.getElementById("modalBtn");
  }

  showSetupScreen() {
    this.setupScreen.style.display = "flex";
    this.gameScreen.style.display = "none";
  }

  showGameScreen() {
    this.setupScreen.style.display = "none";
    this.gameScreen.style.display = "block";
  }

  setModeActive(mode) {
    this.modePlayerBtn.classList.toggle("active", mode === "player");
    this.modeAIBtn.classList.toggle("active", mode === "ai");

    // Hide/show player O name input based on mode
    if (mode === "ai") {
      this.playerOGroup.style.display = "none";
    } else {
      this.playerOGroup.style.display = "flex";
    }
  }

  getSetupData() {
    return {
      mode: this.modeAIBtn.classList.contains("active") ? "ai" : "player",
      playerXName: this.playerXNameInput.value.trim(),
      playerOName: this.playerONameInput.value.trim(),
    };
  }

  updatePlayerLabels(playerNames) {
    this.scoreLabelX.textContent = playerNames.X;
    this.scoreLabelO.textContent = playerNames.O;
  }

  updateCell(index, player) {
    const cell = this.cells[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());
    cell.classList.add("disabled");
  }

  updateCurrentPlayer(player, playerName) {
    this.currentPlayerDisplay.textContent = `${playerName} (${player})`;
    this.currentPlayerDisplay.classList.remove("player-x", "player-o");
    this.currentPlayerDisplay.classList.add(`player-${player.toLowerCase()}`);
  }

  updateScores(scores) {
    this.scoreXDisplay.textContent = scores.X;
    this.scoreODisplay.textContent = scores.O;
    this.scoreDrawDisplay.textContent = scores.draw;
  }

  highlightWinningCells(combination) {
    combination.forEach((index) => {
      this.cells[index].classList.add("winner");
    });
  }

  disableBoard() {
    this.cells.forEach((cell) => {
      cell.classList.add("disabled");
    });
  }

  enableBoard() {
    this.cells.forEach((cell) => {
      if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
        cell.classList.remove("disabled");
      }
    });
  }

  resetBoard() {
    this.cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("x", "o", "disabled", "winner");
    });
  }

  showModal(result, playerNames) {
    if (result.winner === "draw") {
      this.modalTitle.textContent = "Empate!";
      this.modalMessage.innerHTML =
        '<span class="draw-text">Ninguém venceu desta vez!</span>';
    } else {
      const winnerName = playerNames[result.winner];
      this.modalTitle.textContent = "Vitória!";
      this.modalMessage.innerHTML = `
                <div>O vencedor foi:</div>
                <span class="winner-text ${result.winner.toLowerCase()}">${winnerName} (${
        result.winner
      })</span>
            `;
    }
    this.modal.classList.add("show");
  }

  hideModal() {
    this.modal.classList.remove("show");
  }

  addModeButtonListener(callback) {
    this.modePlayerBtn.addEventListener("click", () => callback("player"));
    this.modeAIBtn.addEventListener("click", () => callback("ai"));
  }

  addStartGameListener(callback) {
    this.startGameBtn.addEventListener("click", callback);
  }

  addCellClickListener(callback) {
    this.cells.forEach((cell, index) => {
      cell.addEventListener("click", () => callback(index));
    });
  }

  addResetListener(callback) {
    this.resetBtn.addEventListener("click", callback);
    this.modalBtn.addEventListener("click", callback);
  }

  addResetScoreListener(callback) {
    this.resetScoreBtn.addEventListener("click", callback);
  }

  addBackToSetupListener(callback) {
    this.backToSetupBtn.addEventListener("click", callback);
  }

  addModalClickOutsideListener(callback) {
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        callback();
      }
    });
  }
}

// ===== Game Controller (Main App) =====
class TicTacToeGame {
  constructor() {
    this.config = new GameConfig();
    this.state = new GameState();
    this.logic = new GameLogic();
    this.ui = new UIController();
    this.ai = null;
    this.init();
  }

  init() {
    this.ui.showSetupScreen();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Setup screen events
    this.ui.addModeButtonListener((mode) => this.handleModeChange(mode));
    this.ui.addStartGameListener(() => this.startGame());

    // Game screen events
    this.ui.addCellClickListener((index) => this.handleCellClick(index));
    this.ui.addResetListener(() => this.resetGame());
    this.ui.addResetScoreListener(() => this.resetScores());
    this.ui.addBackToSetupListener(() => this.backToSetup());
    this.ui.addModalClickOutsideListener(() => this.ui.hideModal());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.ui.hideModal();
      }
    });
  }

  handleModeChange(mode) {
    this.ui.setModeActive(mode);
  }

  startGame() {
    const setupData = this.ui.getSetupData();

    // Configure game
    this.config.setMode(setupData.mode);
    this.config.setPlayerName("X", setupData.playerXName);

    if (setupData.mode === "ai") {
      this.config.setPlayerName("O", "IA 🤖");
      this.ai = new AIPlayer(this.config.aiPlayer, this.config.humanPlayer);
    } else {
      this.config.setPlayerName("O", setupData.playerOName);
      this.ai = null;
    }

    // Update UI
    this.ui.updatePlayerLabels(this.config.playerNames);
    this.ui.updateScores(this.state.scores);
    this.ui.updateCurrentPlayer(
      this.state.currentPlayer,
      this.config.playerNames[this.state.currentPlayer],
    );
    this.ui.showGameScreen();
  }

  handleCellClick(index) {
    // Ignore clicks if it's AI's turn
    if (this.config.isAITurn(this.state.currentPlayer)) {
      return;
    }

    if (!this.state.makeMove(index)) {
      return;
    }

    this.ui.updateCell(index, this.state.currentPlayer);

    const result = this.logic.getGameResult(this.state.board);

    if (result) {
      this.handleGameEnd(result);
    } else {
      this.state.switchPlayer();
      this.ui.updateCurrentPlayer(
        this.state.currentPlayer,
        this.config.playerNames[this.state.currentPlayer],
      );

      // If AI's turn, make AI move
      if (this.config.isAITurn(this.state.currentPlayer)) {
        this.makeAIMove();
      }
    }
  }

  makeAIMove() {
    // Disable board temporarily
    this.ui.disableBoard();

    // Add a small delay to make it feel more natural
    setTimeout(() => {
      const bestMove = this.ai.findBestMove([...this.state.board]);

      if (bestMove !== null && this.state.makeMove(bestMove)) {
        this.ui.updateCell(bestMove, this.state.currentPlayer);

        const result = this.logic.getGameResult(this.state.board);

        if (result) {
          this.handleGameEnd(result);
        } else {
          this.state.switchPlayer();
          this.ui.updateCurrentPlayer(
            this.state.currentPlayer,
            this.config.playerNames[this.state.currentPlayer],
          );
          this.ui.enableBoard();
        }
      }
    }, 500); // 500ms delay for AI thinking
  }

  handleGameEnd(result) {
    this.state.gameActive = false;
    this.ui.disableBoard();

    if (result.winner !== "draw") {
      this.ui.highlightWinningCells(result.combination);
    }

    this.state.updateScore(result.winner);
    this.ui.updateScores(this.state.scores);

    // Show modal after a short delay for better UX
    setTimeout(() => {
      this.ui.showModal(result, this.config.playerNames);
    }, 800);
  }

  resetGame() {
    this.state.reset();
    this.ui.resetBoard();
    this.ui.hideModal();
    this.ui.updateCurrentPlayer(
      this.state.currentPlayer,
      this.config.playerNames[this.state.currentPlayer],
    );

    // If AI starts and it's O (shouldn't happen, but just in case)
    if (this.config.isAITurn(this.state.currentPlayer)) {
      this.makeAIMove();
    }
  }

  resetScores() {
    if (confirm("Tem certeza que deseja zerar o placar?")) {
      this.state.resetScores();
      this.ui.updateScores(this.state.scores);
    }
  }

  backToSetup() {
    if (
      confirm("Deseja voltar para a tela inicial? O jogo atual será perdido.")
    ) {
      this.state.reset();
      this.ui.resetBoard();
      this.ui.hideModal();
      this.ui.showSetupScreen();
    }
  }
}

// ===== Initialize Game =====
document.addEventListener("DOMContentLoaded", () => {
  new TicTacToeGame();
});

// ===== Service Worker Registration (Optional - for PWA) =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment if you want to add PWA support
    // navigator.serviceWorker.register('/sw.js');
  });
}
