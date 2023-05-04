
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddCandidate from './pages/AddCandidate';
import ShowWithName from './pages/ShowWithName';
import ShowWithSkill from './pages/ShowWithSkill';
import ShowCandidate from './pages/ShowCandidate';
import AddSkill from './pages/AddSkill';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/addCandidate' element={<AddCandidate/>}/>
        <Route exact path='/withName' element={<ShowWithName/>}/>
        <Route exact path='/withSkill' element={<ShowWithSkill/>}/>
        <Route exact path='/show/:id' element={<ShowCandidate/>}/>
        <Route exact path='/addSkill' element={<AddSkill/>}/>
      </Routes>
      
      </Router>
     
    </div>
  );
}

export default App;
