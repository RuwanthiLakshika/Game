import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';

function Login({ setIsAuth, onLoginSuccess, onNavigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const cookies = new Cookies();
  
  const login = () => {
    setIsLoading(true);
    setError("");
  
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    })
      .then((res) => {
        if(!res.data.token) {
          setError("Invalid username or password");
          return;
        }
        const { firstName, lastName, username, token, userId } = res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        setIsAuth(true);
  
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      })
      .catch((err) => {
        setError("Invalid username or password");
        console.error("Login error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
      backgroundImage: 'url(/bg1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
      }}></div>
      
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        padding: '2.5rem',
        backgroundColor: 'rgba(17, 24, 39, 0.85)',
        backdropFilter: 'blur(8px)',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(147, 51, 234, 0.3)',
        zIndex: 2,
        position: 'relative',
      }}>
        <div style={{
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#ffffff',
            textShadow: '0 0 10px rgba(66, 153, 225, 0.8)',
          }}>LOGIN</h1>
          <p style={{
            fontSize: '1rem',
            color: '#22D3EE',
            marginBottom: '2rem',
            fontWeight: '300',
          }}>Enter your credentials to continue</p>
          
          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              color: '#FCA5A5',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              fontSize: '0.875rem',
            }}>
              {error}
            </div>
          )}
          
          <div style={{
            marginBottom: '2rem',
          }}>
            <input
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '0.375rem',
                color: 'white',
                fontSize: '1rem',
                marginBottom: '1rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8B5CF6';
                e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(147, 51, 234, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
            
            <input
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '0.375rem',
                color: 'white',
                fontSize: '1rem',
                marginBottom: '1.5rem',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#8B5CF6';
                e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(147, 51, 234, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  login();
                }
              }}
            />
          </div>
          
          <button 
            onClick={login}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: isLoading ? '#4B5563' : 'linear-gradient(to right, #8B5CF6, #3B82F6)',
              borderRadius: '0.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              transition: 'all 0.3s',
              marginBottom: '1rem',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
              border: 'none',
              color: 'white',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(to right, #7C3AED, #2563EB)';
                e.target.style.transform = 'translateY(-4px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.background = 'linear-gradient(to right, #8B5CF6, #3B82F6)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isLoading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
          
          <div style={{
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#D1D5DB',
          }}>
            <span>Don't have an account? </span>
            <a 
              onClick={(e) => {
                e.preventDefault(); 
                onNavigate('signup');
              }}
              style={{
                color: '#8B5CF6',
                textDecoration: 'none',
                fontWeight: '500',
              }}
              onMouseOver={(e) => {
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
   
    </div>
  );
}

export default Login;