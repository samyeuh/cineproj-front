import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { searchFilms, FilmPayload, Film } from '../../api/films.ts';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.tsx';

const Dashboard: React.FC<{}> = ({}) => {
  const [query, setQuery] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [results, setResults] = useState<Film[]>([]);
  const navigate = useNavigate();
  const {user, logout} = useUser();

  useEffect(() => {
      setUserEmail(user?.username ?? null);
  }, [user]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const payload: FilmPayload = {
        id: undefined,
        titre: query,
        lang: undefined,
        realisateur: undefined,
        ageMin: undefined,
        ageMax: undefined,
        soustitres: undefined,
        dureeMin: undefined,
        dureeMax: undefined,
      };
  
      const response = await searchFilms(payload);
      console.log(response)
      setResults(response.results);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const handleClickFilm = (r: Film) => {
    navigate(`/films/${r.id}`);
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Bienvenue sur CineProj 🎬</h1>
      <p className="dashboard-subtitle">
        {userEmail ? `Connecté en tant que ${userEmail}` : 'Non connecté'}
      </p>

      <div className="search-container">
        <h2 className="search-title">Rechercher un film</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Nom du film"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>

        {results.length > 0 && (
          <ul className="search-results">
            {results.map((r, i) => (
              <li key={i} className="film-item" onClick={() => handleClickFilm(r)}>
                <div className="film-info">
                  {r.titre} <span className="film-realisateur">({r.realisateur})</span>
                </div>
                <div className="film-duree">
                  {r.dureeEnMinute} min
                </div>
            </li>
            ))}
          </ul>
        )}
      </div>
      {userEmail ? 
        (<button className="logout-btn" onClick={logout}>
          Se déconnecter
        </button>)
      :
        (<button className="login-btn" onClick={() => navigate('/login')}>
          Se connecter
        </button>)
      }
    </div>
  );
};

export default Dashboard;