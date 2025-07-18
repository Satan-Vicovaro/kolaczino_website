import logo from './logo.svg';
import './App.css';
import MainContent from "./components/MainContent" 
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <MainContent />
      <NavBar />
      <Footer />
    </div>
  );
}

export default App;
