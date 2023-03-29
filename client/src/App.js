import './normal.css';
import './App.css';
import { useState, useEffect } from 'react';
import SideMenu from './SideMenu'
import ChatBox from './ChatBox'

function App() {

  useEffect(() => {
    getEngines();
  }, [])

  const [chatInput, setChatInput] = useState("");
  const [models, setModels] = useState([]);
  const [temperature, setTemperature] = useState(0.5);
  const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How can I help you today?"
  }]);

  // clear chats
  function clearChat() {
    setChatLog([]);
  }

  function getEngines() {
    fetch("http://localhost:3080/models")
      .then(res => res.json())
      .then(data => {
        console.log(data.models.data)
        // set models in order alpahbetically
        data.models.data.sort((a, b) => {
          if (a.id < b.id) { return -1; }
          if (a.id > b.id) { return 1; }
          return 0;
        })
        setModels(data.models.data)
      })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${chatInput}` }]
    setChatInput("");
    setChatLog(chatLogNew)
    // fetch response to the api combining the chat log array of messages and seinding it as a message to localhost:3000 as a post
    const messages = chatLogNew.map((message) => message.message).join("\n")

    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
    var scrollToTheBottomChatLog = document.getElementsByClassName("chat-log")[0];
    scrollToTheBottomChatLog.scrollTop = scrollToTheBottomChatLog.scrollHeight;
  }

  function handleTemp(temp) {
    if (temp > 1) {
      setTemperature(1)
    } else if (temp < 0) {
      setTemperature(0)
    } else {
      setTemperature(temp)
    }

  }

  return (

    <div className="App">

      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-800">
    
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Important Notes</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">This app relies on a paid API and thefore has some limits:</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Prompts are limited to 100 tokens.</p>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">The API has a hard spending cap of $10 USD per month, after which it will stop responding to requests.</p>
        <a href="https://platform.openai.com/docs/introduction" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Read more about the API here
          <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
      </div>

      <ChatBox
        chatInput={chatInput}
        chatLog={chatLog}
        setChatInput={setChatInput}
        handleSubmit={handleSubmit} />

      <SideMenu
        currentModel={currentModel}
        setCurrentModel={setCurrentModel}
        models={models}
        setTemperature={handleTemp}
        temperature={temperature}
        clearChat={clearChat}
      />
    </div>
  );
}


export default App;
