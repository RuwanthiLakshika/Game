import React from 'react';
import { useState } from 'react';
import Board from './Board';

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  const waitingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '78vh',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundImage: 'url("bg5.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2
  };

  const waitingTextStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '25px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
  };

  const loaderStyle = {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '80px'
  };

  const loaderDotStyle = {
    position: 'absolute',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    animation: 'pulse 1.2s infinite ease-in-out',
    animationFillMode: 'both'
  };

  const gameContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    height: '100vh',
    backgroundImage: 'url("https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  };

  const gameOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 1
  };

  const gameContentStyle = {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  if (!playersJoined) {
    return (
      <div style={waitingContainerStyle}>
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <div style={waitingTextStyle}>Waiting for other player to join...</div>
          <div style={loaderStyle}>
            <div style={{
              ...loaderDotStyle,
              left: '8px',
              animationDelay: '-0.32s'
            }}></div>
            <div style={{
              ...loaderDotStyle,
              left: '32px',
              animationDelay: '-0.16s'
            }}></div>
            <div style={{
              ...loaderDotStyle,
              left: '56px',
              animationDelay: '0s'
            }}></div>
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0%, 80%, 100% { 
              transform: scale(0);
              opacity: 0;
            }
            40% { 
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={gameContainerStyle} className="gameContainer">
      <div style={gameOverlayStyle}></div>
      <div style={gameContentStyle}>
        <Board />
        {/* chat */}
        {/* leave */}
      </div>
    </div>
  );
}

export default Game;