import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './page/Dashboard/Dashboard';
import FilmDetails from './page/FilmDetails/FilmDetails';
import Sign from './page/Sign/Sign';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard onLogout={() => console.log('disconnect')} />} />
          <Route path="/films/:id" element={<FilmDetails />} />
          <Route path="/login" element={<Sign />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
