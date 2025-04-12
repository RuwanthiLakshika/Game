import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import JoinGame from "./components/JoinGame";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import { Chat } from "stream-chat-react";

function App() {
  const api_key = process.env.REACT_APP_STREAM_API_KEY;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState("welcome");
  const [isLoading, setIsLoading] = useState(true);

  // Apply global styles to remove default margins and ensure full width
  useEffect(() => {
    // Reset margin and padding for html and body
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const connectUser = async () => {
      if (token) {
        try {
          await client.connectUser(
            {
              id: cookies.get("userId"),
              name: cookies.get("username"),
              firstName: cookies.get("firstName"),
              lastName: cookies.get("lastName"),
              hashedPassword: cookies.get("hashedPassword"),
            },
            token
          );
          setIsAuth(true);
        } catch (error) {
          console.error("Error connecting user:", error);
        }
      }
      setIsLoading(false);
    };

    connectUser();
  }, [token, client]);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
    setCurrentPage("welcome");
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Loading Game...</h2>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid rgba(255, 255, 255, 0.3)',
            borderTop: '5px solid white',
            borderRadius: '50%',
            margin: '0 auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              html, body, #root {
                width: 100%;
                height: 100%;
                overflow: hidden;
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      height: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      background: isAuth
        ? 'linear-gradient(135deg, #141e30, #243b55)'
        : 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)',
      color: 'white',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boxSizing: 'border-box'
    }}>
      {isAuth ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 25px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            width: '100%'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 'bold'
            }}>GameZone</h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                fontWeight: 'bold'
              }}>Welcome, {cookies.get("firstName")}</span>
              
              <button 
                onClick={logOut}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
              >
                Log Out
              </button>
            </div>
          </div>
          
          <div style={{
            flex: 1,
            padding: '20px',
            overflow: 'auto',
            width: '100%'
          }}>
            <Chat client={client} theme="messaging dark">
              <JoinGame />
            </Chat>
          </div>
          
          <div style={{
            padding: '15px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            textAlign: 'center',
            fontSize: '14px',
            width: '100%'
          }}>
            Game Session Active • © 2025 GameZone
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            padding: '30px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}>
            {currentPage === "welcome" && <WelcomePage onNavigate={setCurrentPage} />}
            {currentPage === "login" && <Login setIsAuth={setIsAuth} onNavigate={setCurrentPage} />}
            {currentPage === "signup" && <SignUp setIsAuth={setIsAuth} onNavigate={setCurrentPage} />}
          </div>
        </div>
      )}
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body, #root {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
}

export default App;