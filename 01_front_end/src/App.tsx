import './App.css';
import PublicRoutes from './routes/PublicRoutes';
// import { Navbar } from './components/navigationBar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Navbar /> */}
        <PublicRoutes />
      </header>
    </div>
  );
}

export default App;
