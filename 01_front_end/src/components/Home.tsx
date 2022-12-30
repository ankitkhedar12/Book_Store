import '../App.css';
import logo from '../logo.svg';
import { Navbar } from './navigationBar/Navbar';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <h2 className='baskerville'>Home Page</h2>
        <img src={ logo } className="App-logo" alt="logo" />
    </div>
  );
}

export default Home;