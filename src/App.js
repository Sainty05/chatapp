import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Component/Navbar";
import ChatBox from "./Component/ChatBox";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ChatBox/>
    </div>
  );
}

export default App;
