import React from 'react';

const WelcomePage = ({ onNavigate }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        backgroundImage: 'url("bg3.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
      }}></div>
      
      {/* Content container */}
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
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#ffffff',
            textShadow: '0 0 10px rgba(66, 153, 225, 0.8)',
          }}>NEXUS</h1>
          <p style={{
            fontSize: '1.25rem',
            color: '#22D3EE',
            marginBottom: '2rem',
            fontWeight: '300',
          }}>Enter the next level of gaming</p>
          
          <div style={{
            marginBottom: '2rem',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              inset: '-0.25rem',
              background: 'linear-gradient(to right, #22D3EE, #A855F7)',
              borderRadius: '50%',
              filter: 'blur(8px)',
              opacity: 0.4,
            }}></div>
            <img 
              src="/logo1.jpeg" 
              width={150}
              height={150}
              alt="Game Logo" 
              style={{
                margin: '0 auto',
                borderRadius: '50%',
                border: '2px solid rgba(147, 51, 234, 0.7)',
                position: 'relative',
                zIndex: 3,
              }}
            />
          </div>
          
          <div style={{
            marginBottom: '1.5rem',
          }}>
            <button 
              onClick={() => onNavigate('login')}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'linear-gradient(to right, #8B5CF6, #3B82F6)',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'all 0.3s',
                marginBottom: '1rem',
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(to right, #7C3AED, #2563EB)';
                e.target.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'linear-gradient(to right, #8B5CF6, #3B82F6)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              LOGIN
            </button>
            
            <button 
             onClick={() => onNavigate('signup')}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid #8B5CF6',
                borderRadius: '0.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                transition: 'all 0.3s',
                color: 'white',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
                e.target.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              CREATE ACCOUNT
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#8B5CF6',
              }}>500K+</div>
              <div style={{
                fontSize: '0.75rem',
                color: '#D1D5DB',
              }}>PLAYERS</div>
            </div>
            <div style={{
              height: '2.5rem',
              width: '1px',
              backgroundColor: '#4B5563',
            }}></div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#8B5CF6',
              }}>200+</div>
              <div style={{
                fontSize: '0.75rem',
                color: '#D1D5DB',
              }}>GAMES</div>
            </div>
            <div style={{
              height: '2.5rem',
              width: '1px',
              backgroundColor: '#4B5563',
            }}></div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#8B5CF6',
              }}>24/7</div>
              <div style={{
                fontSize: '0.75rem',
                color: '#D1D5DB',
              }}>SUPPORT</div>
            </div>
          </div>
          
          <p style={{
            fontSize: '0.75rem',
            color: '#9CA3AF',
          }}>
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default WelcomePage;