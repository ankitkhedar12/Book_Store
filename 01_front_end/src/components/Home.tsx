import '../App.css';
import logo from '../logo.svg';
import { Navbar } from './navigationBar/Navbar';
// import Layout from './Layout';
// import Menu from './Menu';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <h2 className='baskerville'>Home Page</h2>
      {/* <header className="App-header"> */}
        <img src={ logo } className="App-logo" alt="logo" />
      {/* </header> */}
    </div>
  );
}

export default Home;