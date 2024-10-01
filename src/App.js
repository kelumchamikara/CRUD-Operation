import './App.css';
import { ProductProvider } from './Context';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Home />
      <ProductProvider>
        
        {/* Other components that consume the context can be placed here */}
      </ProductProvider>
    </div>
  );
}

export default App;
