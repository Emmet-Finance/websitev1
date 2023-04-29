import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import Header from './HeaderFooter/Header';
import Footer from './HeaderFooter/Footer';
import Homepage from './Homepage/Homepage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Homepage/>
      <Footer/>
    </div>
  );
}

export default App;
