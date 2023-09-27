import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import HomeBanner from './pages/HomeBanner';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <HomeBanner/>
      <Home/>
    </div>
  );
}

export default App;