import StockProvider from './context/StockContext';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <StockProvider>
      <Dashboard />
    </StockProvider>
  );
}

export default App;
