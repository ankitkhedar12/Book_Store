import './App.css';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
// import { Navbar } from './components/navigationBar/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Navbar /> */}
        <PublicRoutes />
        <PrivateRoutes />
      </header>
    </div>
  );
}

export default App;
