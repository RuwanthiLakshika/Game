import React, { useState, useEffect, useCallback } from 'react';
import { useChannelStateContext, useChatContext } from "stream-chat-react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const COUNTDOWN_SECONDS = 3; 

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

const EVENTS = {
  MOVE: 'game_move',
  FOOD: 'game_food',
  OVER: 'game_over',
  START_COUNTDOWN: 'game_start_countdown'
};

const styles = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  gameBoard: {
    position: 'relative',
    backgroundColor: '#333',
    border: '4px solid #222',
    borderRadius: '4px',
    margin: '20px 0'
  },
  cell: {
    position: 'absolute',
    borderRadius: '2px'
  },
  snake1: {
    backgroundColor: '#4CAF50',
    border: '1px solid #388E3C'
  },
  snake1Head: {
    backgroundColor: '#2E7D32',
    border: '1px solid #1B5E20'
  },
  snake2: {
    backgroundColor: '#2196F3',
    border: '1px solid #1976D2'
  },
  snake2Head: {
    backgroundColor: '#1565C0',
    border: '1px solid #0D47A1'
  },
  food: {
    backgroundColor: '#F44336',
    border: '1px solid #D32F2F',
    borderRadius: '50%'
  },
  scores: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '10px'
  },
  score: {
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '5px'
  },
  player1: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32'
  },
  player2: {
    backgroundColor: '#E3F2FD',
    color: '#1565C0'
  },
  playerLabel: {
    fontWeight: 'normal'
  },
  youLabel: {
    fontStyle: 'italic'
  },
  gameOver: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    marginTop: '20px'
  },
  gameOverHeading: {
    marginTop: '0'
  },
  waiting: {
    textAlign: 'center',
    margin: '20px 0',
    padding: '10px',
    backgroundColor: '#FFF9C4',
    borderRadius: '5px'
  },
  instructions: {
    textAlign: 'center',
    marginTop: '10px',
    fontSize: '14px',
    color: '#666'
  },
  countdown: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '72px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
    zIndex: 10
  }
};

const Board = () => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  
  const [playerId, setPlayerId] = useState(null);
  const [isPlayer1, setIsPlayer1] = useState(false);

  const [playersReady, setPlayersReady] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [countdownActive, setCountdownActive] = useState(false);
 
  const [snake1, setSnake1] = useState([
    { x: 3, y: 10 },
    { x: 2, y: 10 },
    { x: 1, y: 10 }
  ]);
  const [direction1, setDirection1] = useState(DIRECTIONS.RIGHT);
  const [score1, setScore1] = useState(0);

  const [snake2, setSnake2] = useState([
    { x: 16, y: 10 },
    { x: 17, y: 10 },
    { x: 18, y: 10 }
  ]);
  const [direction2, setDirection2] = useState(DIRECTIONS.LEFT);
  const [score2, setScore2] = useState(0);
  
  const [food, setFood] = useState({ x: 10, y: 10 });

  useEffect(() => {
    const initializePlayer = async () => {
      const userId = client.userID;
      setPlayerId(userId);
      
      const { members } = channel.state;
      const memberIds = Object.keys(members);
      setIsPlayer1(memberIds[0] === userId);
      
      setPlayersReady(channel.state.watcher_count === 2);
    };
    
    if (client && channel) {
      initializePlayer();
    }
    
  }, [client, channel]);

  useEffect(() => {
    if (playersReady && isPlayer1 && !countdownActive && !gameStarted) {
      setCountdownActive(true);
      channel.sendEvent({
        type: EVENTS.START_COUNTDOWN,
        data: { startTime: Date.now() }
      });
    }
  }, [playersReady, isPlayer1, countdownActive, gameStarted, channel]);

  useEffect(() => {
    if (!countdownActive) return;

    const countdownInterval = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval);
          setGameStarted(true);
          setCountdownActive(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [countdownActive]);

  useEffect(() => {
    if (!channel) return;
    
    const handleOpponentMove = (event) => {
      const { player, snake, direction, score } = event.data;
      
      if (player !== playerId) {
        if (isPlayer1) {
          setSnake2(snake);
          setDirection2(direction);
          setScore2(score);
        } else {
          setSnake1(snake);
          setDirection1(direction);
          setScore1(score);
        }
      }
    };
    
    const handleFoodUpdate = (event) => {
      setFood(event.data.food);
    };
    
    const handleGameOver = (event) => {
      setGameOver(true);
      setWinner(event.data.winner);
    };

    const handleCountdownStart = (event) => {
      if (!isPlayer1) {
        setCountdownActive(true);
      }
    };
    
    channel.on(EVENTS.MOVE, handleOpponentMove);
    channel.on(EVENTS.FOOD, handleFoodUpdate);
    channel.on(EVENTS.OVER, handleGameOver);
    channel.on(EVENTS.START_COUNTDOWN, handleCountdownStart);
    
    channel.on("user.watching.start", (event) => {
      setPlayersReady(event.watcher_count === 2);
    });
    
    return () => {
      channel.off(EVENTS.MOVE, handleOpponentMove);
      channel.off(EVENTS.FOOD, handleFoodUpdate);
      channel.off(EVENTS.OVER, handleGameOver);
      channel.off(EVENTS.START_COUNTDOWN, handleCountdownStart);
      channel.off('user.watching.start');
    };
  }, [channel, playerId, isPlayer1]);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    if (channel) {
      channel.sendEvent({
        type: EVENTS.FOOD,
        data: { food: newFood }
      });
    }
    
    return newFood;
  }, [channel]);

  const checkCollision = (pos, snake) => {
    return snake.some(segment => segment.x === pos.x && segment.y === pos.y);
  };

  const isOutOfBounds = (pos) => {
    return pos.x < 0 || pos.x >= GRID_SIZE || pos.y < 0 || pos.y >= GRID_SIZE;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameStarted || !channel) return;
    
    const mySnake = isPlayer1 ? snake1 : snake2;
    const myDirection = isPlayer1 ? direction1 : direction2;
    const myScore = isPlayer1 ? score1 : score2;
    
    const head = { ...mySnake[0] };
    head.x += myDirection.x;
    head.y += myDirection.y;
    
    if (
      isOutOfBounds(head) || 
      checkCollision(head, mySnake) ||
      checkCollision(head, isPlayer1 ? snake2 : snake1)
    ) {
      channel.sendEvent({
        type: EVENTS.OVER,
        data: { winner: isPlayer1 ? 'player2' : 'player1' }
      });
      setGameOver(true);
      setWinner(isPlayer1 ? 'Player 2' : 'Player 1');
      return;
    }
    
    const newSnake = [head, ...mySnake];
    
    let newScore = myScore;
    let newFood = food;
    
    if (head.x === food.x && head.y === food.y) {
      newScore += 1;
      newFood = generateFood();
      setFood(newFood);
      

      if (isPlayer1) {
        setScore1(newScore);
      } else {
        setScore2(newScore);
      }
    } else {
      newSnake.pop();
    }
    
    if (isPlayer1) {
      setSnake1(newSnake);
    } else {
      setSnake2(newSnake);
    }
    
    channel.sendEvent({
      type: EVENTS.MOVE,
      data: {
        player: playerId,
        snake: newSnake,
        direction: myDirection,
        score: newScore
      }
    });
    
  }, [
    gameOver, gameStarted, isPlayer1, 
    snake1, snake2, direction1, direction2, 
    score1, score2, food, playerId, channel, generateFood
  ]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameInterval = setInterval(() => {
      moveSnake();
    }, INITIAL_SPEED);
    
    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;
      
      const currentDirection = isPlayer1 ? direction1 : direction2;
      let newDirection = currentDirection;
      
      switch (e.key) {
        case 'ArrowUp':
          if (currentDirection !== DIRECTIONS.DOWN) {
            newDirection = DIRECTIONS.UP;
          }
          break;
        case 'ArrowDown':
          if (currentDirection !== DIRECTIONS.UP) {
            newDirection = DIRECTIONS.DOWN;
          }
          break;
        case 'ArrowLeft':
          if (currentDirection !== DIRECTIONS.RIGHT) {
            newDirection = DIRECTIONS.LEFT;
          }
          break;
        case 'ArrowRight':
          if (currentDirection !== DIRECTIONS.LEFT) {
            newDirection = DIRECTIONS.RIGHT;
          }
          break;
        default:
          return;
      }
      
      if (isPlayer1) {
        setDirection1(newDirection);
      } else {
        setDirection2(newDirection);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, isPlayer1, direction1, direction2]);

  const renderGrid = () => {
    const cells = [];
    
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const pos = { x, y };
        const isSnake1Cell = checkCollision(pos, snake1);
        const isSnake2Cell = checkCollision(pos, snake2);
        const isSnake1Head = snake1[0].x === x && snake1[0].y === y;
        const isSnake2Head = snake2[0].x === x && snake2[0].y === y;
        const isFoodCell = food.x === x && food.y === y;
        
        const cellStyle = {
          ...styles.cell,
          width: CELL_SIZE,
          height: CELL_SIZE,
          left: x * CELL_SIZE,
          top: y * CELL_SIZE
        };
        
        if (isSnake1Cell) Object.assign(cellStyle, styles.snake1);
        if (isSnake2Cell) Object.assign(cellStyle, styles.snake2);
        if (isSnake1Head) Object.assign(cellStyle, styles.snake1Head);
        if (isSnake2Head) Object.assign(cellStyle, styles.snake2Head);
        if (isFoodCell) Object.assign(cellStyle, styles.food);
        
        cells.push(
          <div 
            key={`${x}-${y}`} 
            style={cellStyle}
          />
        );
      }
    }
    
    return cells;
  };

  const player1ScoreStyle = { ...styles.score, ...styles.player1 };
  const player2ScoreStyle = { ...styles.score, ...styles.player2 };

  if (!channel) {
    return <div style={styles.waiting}>Loading game...</div>;
  }

  return (
    <div style={styles.boardContainer}>
      <div style={styles.scores}>
        <div style={player1ScoreStyle}>
          <span style={styles.playerLabel}>Player 1:</span> {score1}
          {isPlayer1 && <span style={styles.youLabel}> (You)</span>}
        </div>
        <div style={player2ScoreStyle}>
          <span style={styles.playerLabel}>Player 2:</span> {score2}
          {!isPlayer1 && <span style={styles.youLabel}> (You)</span>}
        </div>
      </div>
      
      <div 
        style={{
          ...styles.gameBoard,
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE
        }}
      >
        {(gameStarted || countdownActive) && renderGrid()}
        {countdownActive && (
          <div style={styles.countdown}>
            {countdown}
          </div>
        )}
      </div>
      
      {gameOver && (
        <div style={styles.gameOver}>
          <h2 style={styles.gameOverHeading}>Game Over!</h2>
          <p>{winner} wins with a score of {winner === 'Player 1' ? score1 : score2}!</p>
        </div>
      )}
      
      {!playersReady && (
        <div style={styles.waiting}>
          <p>Waiting for other player to join...</p>
        </div>
      )}
      
      {playersReady && !gameStarted && !countdownActive && (
        <div style={styles.waiting}>
          <p>Both players connected. Starting countdown...</p>
        </div>
      )}
      
      {gameStarted && !gameOver && (
        <div style={styles.instructions}>
          <p>Use arrow keys to control your snake</p>
        </div>
      )}
    </div>
  );
};

export default Board;