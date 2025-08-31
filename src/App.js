import './App.css';
import Footer from './components/Footer';
import TTTGame from './tic-tac-toe/TTTGame';
import { Box, Theme } from '@radix-ui/themes';

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
        <Footer /> 
      </Box>
    </Theme>

  );
}

export default App;
