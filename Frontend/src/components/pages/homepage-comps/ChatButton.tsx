import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import './ChatButton.css';
import React from 'react';
import { API_URL } from '../../../Autentication/constanst';

interface Message {
  role: string;
  parts: string;
}

function Chat(): JSX.Element {
  const [history, setHistory] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setIsBotResponding] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [history]);

  const sendMessage = async (): Promise<void> => {
    const requestBody = {
      history: history,
      question: message,
    };

    setHistory([...history, { role: 'user', parts: message }]);
    setMessage('');

    try {
      setIsTyping(true);
      const response = await axios.post(`${API_URL}/chat`, requestBody);
      console.log('este es el chatBot', response);

      const updatedHistory: Message[] = response.data.history;
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsBotResponding(false);
      setIsTyping(false);
    }
  };

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <button onClick={openModal} id="img-chat" className='botImage' >

        </button>
      </div>
      {isModalOpen && (
        <div className='modal-container'>
          <div className='modal1'>
            <div className='chat-container'>
              <div className='modal-header'>
                <h1>Soporte MULTISERVICIOS</h1>
                <div className='close-button' onClick={closeModal}>
                  &times;
                </div>
              </div>
              <div className='chat-body-container' ref={chatBodyRef}>
                <div
                  style={{marginRight: "5rem"}}
                  className='MensajePredetarminado'>
                  <p>¡Hola!  Te doy la bienvenida al chat de Multiservicios.
                    ¿En qué te puedo ayudar hoy? Puedes elegir una de las siguientes opciones:</p>
                  <p> 1. Hablar sobre Multiservicios.</p>
                  <p>2. Quienes crearon Multiservicios.</p>
                  <p>3. ¿Qué es Multiservicios? </p>
                  <p></p>
                </div>
                {history.map((item: Message, index: number) => (
                  <div key={index} className={`chat-message ${item.role === 'user' ? 'user-message' : 'bot-message'}`}>
                    {item.parts}
                  </div>
                ))}
                {isTyping && (
                  <span className="typing-dots">...</span>
                )}
              </div>
              <div className='input-container'>
                <input
                  type='text'
                  style={{ background: "black", color: "white", border: "2px solid #005aa9", borderRadius: "15px" }}
                  placeholder='Escribe tu mensaje...'
                  value={message}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      sendMessage();
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
