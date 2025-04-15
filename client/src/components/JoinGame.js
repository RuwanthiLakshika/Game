import React from 'react';
import { useState } from 'react';
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";

function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const createChannel = async () => {
    if (!rivalUsername.trim()) {
      setError("Please enter a username");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await client.queryUsers({ name: { $eq: rivalUsername } });

      if (response.users.length === 0) {
        setError("User not found. Please check the username and try again.");
        setIsLoading(false);
        return;
      }

      const newChannel = await client.channel("messaging", {
        members: [client.userID, response.users[0].id],
      });

      await newChannel.watch();
      setChannel(newChannel);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {channel ? (
         <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
          height: '100%',
          backgroundImage: 'radial-gradient(circle at center, rgba(30, 60, 114, 0.6) 0%, rgba(10, 20, 40, 0.8) 70%)',
          borderRadius: '10px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              marginBottom: '10px',
            }}>Start A New Game</h2>
            
            <p style={{
              fontSize: '16px',
              color: '#ccd',
              maxWidth: '450px',
              margin: '0 auto',
            }}>
              Enter your opponent's username to create a new game session
            </p>
          </div>

          <div style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'rgba(15, 30, 60, 0.6)',
            borderRadius: '8px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.2)',
          }}>
            <div style={{
              marginBottom: '25px',
            }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#aab',
                marginBottom: '8px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                Opponent Username
              </label>
              
              <input
                placeholder="Enter username..."
                onChange={(event) => {
                  setRivalUsername(event.target.value);
                  setError("");
                }}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '4px',
                  border: '2px solid rgba(100, 140, 230, 0.3)',
                  backgroundColor: 'rgba(0, 10, 30, 0.6)',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(100, 140, 230, 0.8)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(100, 140, 230, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(100, 140, 230, 0.3)';
                  e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                }}
              />
              
              {error && (
                <div style={{
                  color: '#ff4d4d',
                  fontSize: '14px',
                  marginTop: '8px',
                  padding: '6px 10px',
                  backgroundColor: 'rgba(255, 50, 50, 0.1)',
                  borderRadius: '4px',
                  borderLeft: '3px solid #ff4d4d',
                }}>
                  {error}
                </div>
              )}
            </div>

            <button 
              onClick={createChannel}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'rgba(50, 120, 220, 0.9)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(50, 120, 220, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = 'rgba(70, 140, 240, 0.9)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 14px rgba(50, 120, 220, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = 'rgba(50, 120, 220, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(50, 120, 220, 0.3)';
                }
              }}
            >
              {isLoading ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '3px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '10px',
                  }}></div>
                  Searching...
                  <style>
                    {`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}
                  </style>
                </div>
              ) : (
                "Find Opponent & Start Game"
              )}
            </button>
          </div>
          
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            color: '#aac',
            fontSize: '14px',
          }}>
            Game matches are created instantly when your opponent is found
          </div>
        </div>
      )}
    </>
  );
}

export default JoinGame;