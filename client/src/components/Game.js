import React from 'react';
import { useState, useEffect } from 'react';
import { Window, MessageList, MessageInput } from "stream-chat-react";
import Board from './Board';
import "./Chat.css";

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  const toggleChat = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  const waitingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    color: '#ffffff',
    fontFamily: '"Segoe UI", Roboto, Arial, sans-serif',
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
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

  const mainContainerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#1a1a2e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    overflow: 'hidden'
  };

  const gameWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
    maxWidth: '1400px', 
    height: '95vh',
    position: 'relative'
  };

  const boardContainerStyle = {
    flex: '1',
    backgroundColor: '#16213e',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    borderRadius: '12px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  };

  const chatButtonStyle = {
    position: 'absolute',
    right: '20px',
    top: '80px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
    zIndex: 100,
  };

  const chatContainerStyle = {
    position: 'absolute',
    right: isMobile ? '0' : '20px',
    top: isMobile ? '0' : '80px',
    backgroundColor: '#444444',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    borderRadius: isMobile ? '0' : '12px',
    overflow: 'hidden',
    display: isChatExpanded ? 'flex' : 'none',
    flexDirection: 'column',
    height: isMobile ? '100%' : '70vh',
    width: isMobile ? '100%' : '300px',
    zIndex: 200,
  };

  const boardHeaderStyle = {
    width: '100%',
    padding: '10px 15px',
    backgroundColor: '#0f3460',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '22px'
  };

  const chatHeaderStyle = {
    width: '100%',
    padding: '10px 15px',
    backgroundColor: '#333333',
    color: 'white',
    borderBottom: '1px solid #555555',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const boardContentStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    paddingBottom: '10px'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0 5px'
  };

  if (!playersJoined) {
    return (
      <div style={waitingContainerStyle}>
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          <div style={waitingTextStyle}>Waiting for opponent to join...</div>
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
    <div style={mainContainerStyle}>
      <div style={gameWrapperStyle} className="gameContainer">
        <button style={chatButtonStyle} onClick={toggleChat}>
          💬
        </button>
        
        <div style={boardContainerStyle}>
          <div style={boardHeaderStyle}>Snake Battle</div>
          <div style={boardContentStyle}>
            <Board />
          </div>
        </div>
        
        <div style={chatContainerStyle}>
          <div style={chatHeaderStyle}>
            <span>Game Chat</span>
            <button style={closeButtonStyle} onClick={toggleChat}>✕</button>
          </div>
          <Window>
            <MessageList
              disableDateSeparator
              closeReactionSelectorOnClick
              hideDeletedMessages
              messageActions={["react"]}
            />
            <MessageInput noFiles />
          </Window>
        </div>
      </div>
      
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        
        /* Make sure Board component is fully visible */
        .gameContainer > div:first-child {
          overflow: visible !important;
        }
        
        /* Ensure board is fully visible */
        #board-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        /* Chat customization */
        .str-chat__list {
          background-color: #444444 !important;
          height: 100% !important;
          width: 100% !important;
        }
        
        .str-chat__list ul {
          background-color: #444444 !important;
        }
        
        .str-chat__list li {
          background-color: #555555 !important;
          margin-bottom: 6px !important;
        }
        
        .str-chat__message-text-inner {
          color: white !important;
          font-size: 14px !important;
        }
        
        .str-chat__message-data {
          color: #cccccc !important;
          font-size: 12px !important;
        }
        
        .str-chat__input-flat {
          background-color: #333333 !important;
          border-top: 1px solid #555555 !important;
          width: 100% !important;
          height: auto !important;
          min-height: 60px !important;
          max-height: 120px !important;
        }
        
        .str-chat__input-flat-wrapper textarea {
          background-color: #555555 !important;
          color: white !important;
          box-shadow: none !important;
          border: 1px solid #666666 !important;
          width: 90% !important;
          height: 50px !important;
          margin: 5px auto !important;
          border-radius: 20px !important;
          padding: 8px 15px !important;
        }
        
        .str-chat__input-flat-wrapper textarea::placeholder {
          color: #aaaaaa !important;
        }
        
        .str-chat__send-button {
          background-color: #4CAF50 !important;
          color: white !important;
          border-radius: 50% !important;
          width: 36px !important;
          height: 36px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        
        /* Fix layout */
        .str-chat, .str-chat-channel {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .str-chat__container {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .str-chat__main-panel {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        .str-chat-channel.messaging, .str-chat__container {
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
        }
        
        /* Make sure reaction buttons are visible on dark background */
        .str-chat__message-simple__actions__action--reactions {
          background-color: #666666 !important;
          border: 1px solid #777777 !important;
        }
        
        .str-chat__message-reactions-list-item {
          background-color: #666666 !important;
        }
      `}</style>
    </div>
  );
}

export default Game;