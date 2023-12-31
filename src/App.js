import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import './global.scss'
function App() {
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/chats" element={<ChatPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
