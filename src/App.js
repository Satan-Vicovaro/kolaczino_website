import logo from './logo.svg';
import './App.css';
import MainContent from "./components/MainContent" 
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TTTGame from './tic-tac-toe/TTTGame';

function App() {
  return (
    <div className = "App">
      <TTTGame/>
    </div>
  );
}

export default App;
