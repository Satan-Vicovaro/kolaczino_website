import logo from './logo.svg';
import './App.css';
import MainContent from "./components/MainContent" 
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import TTTGame from './tic-tac-toe/TTTGame';
import { Box, Theme } from '@radix-ui/themes';
import ZoomTest from './components/ZoomTest';

function App() {
  return (
    <Theme
      accentColor="orange"
      grayColor="gray"
      panelBackground="translucent"
      scaling="100%"
      radius="full"
      appearance="dark"
    >
      <Box className="App">
        <TTTGame />
        {/* <ZoomTest /> */}
      </Box>
      {/* <MainContent /> */}
    </Theme>

  );
}

export default App;
