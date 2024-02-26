import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatButton.css'; 


function Chat() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBotResponding, setIsBotResponding] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Estado para controlar si la IA está "escribiendo"
  const chatBodyRef = useRef(null); // Referencia al elemento del cuerpo del chat

  useEffect(() => {
    // Desplazar el chat hacia abajo cuando se actualice la historia
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [history]);

  const sendMessage = async () => {
    const requestBody = {
      history: history,
      question: message,
    };

    // Añadir el mensaje del usuario a la historia
    setHistory([...history, { role: 'user', parts: message }]);
    setMessage(''); // Limpiar el input

    try {
      setIsTyping(true); // La IA está "escribiendo"
      const response = await axios.post('http://localhost:5000/api/chat', requestBody);
      const updatedHistory = response.data.history;
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsBotResponding(false); // La IA ha dejado de responder
      setIsTyping(false); // Los puntos de "escribiendo" se detienen
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    console.log("entro");
    
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("no entro");
    
  };

  return (  
    <>
      <div>
        <button onClick={openModal}>
        <img id="img-chat" src='/public/img/logo.png' alt='chatBot' />
        </button>
      </div>
      {isModalOpen && (
        <div className='modal-container'>
          <div className='modal'>
            <div className='chat-container'>
              <div className='modal-header'>
                <h1>Soporte MULTISERVICIOS</h1>
                <div className='close-button' onClick={closeModal}>
                  &times;
                </div>
              </div>
              <div className='chat-body-container' ref={chatBodyRef}>
                {history.map((item, index) => (
                  <div key={index} className={`chat-message ${item.role === 'user' ? 'user-message' : 'bot-message'}`}>
                    {item.parts}
                  </div>
                ))}
                {/* Puntos que parpadean solo cuando la IA está "escribiendo" */}
                {isTyping && (
                  <span className="typing-dots">...</span>
                )}
              </div>
              <div className='input-container'>
                <input
                  type='text'
                  placeholder='Escribe tu mensaje...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage(); // Enviar mensaje al presionar Enter
                    }
                  }}
                />
                <button onClick={sendMessage}>Enviar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;