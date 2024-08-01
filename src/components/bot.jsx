import { useState } from 'react'
import './Chatbot.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "sk-proj-Q5MLuvms5tK9M2GvqRPrT3BlbkFJxV0sus6a6eXYh2chizz4";
const systemMessage = {
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function App({onclose}) {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    try {
      const response = await fetch("https://api.openai.com/v1/completions", { // Removed extra space at the end of the URL
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
      } else {
        console.error("No response from OpenAI API");
      }
      setIsTyping(false);
    } catch (error) {
      console.error("Error processing message to ChatGPT:", error);
      setIsTyping(false);
    }
  }

  return (
    <div className="App">
      <div className='bot-header'>
        <button variant='primary' onClick={onclose} style={{width:'100px',marginLeft:'50px'}}>Close</button>
        <h1>EVESPARK-EMS BOT</h1>
      </div>
      <br />
      <br />
      <div style={{ position:"relative", height: "800px", width: "700px" ,marginLeft:'32%' }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App;
