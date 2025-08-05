import logo from './logo.svg';
import './App.css';
import MainContent from "./components/MainContent" 
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TTTGame from './tic-tac-toe/TTTGame';
import { Theme } from '@radix-ui/themes';

function App() {
  return (
    <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
      <div className="App">
        <TTTGame />
      </div>
      <MainContent/>
    </Theme>

  );
}

export default App;
