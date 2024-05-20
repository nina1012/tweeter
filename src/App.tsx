import { AppProvider } from './app/main-provider';
import { Button } from './components/ui/button';

function App() {
  return (
    <AppProvider>
      <h1 className="text-red-400">Hello World</h1>
      <Button>Click me</Button>
    </AppProvider>
  );
}

export default App;
