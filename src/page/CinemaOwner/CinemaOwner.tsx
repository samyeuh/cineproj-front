import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { searchCinemas, Cinema, CinemaPayload } from '../../api/cinemas';
import '../CinemaDetails/Cinema.css'; 

const CinemaOwner: React.FC = () => {
  const { user, logout } = useUser();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(true); // ← Nouveau
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    } else if (!user.isCinema) {
      navigate('/');
      return;
    } else {
        setLoading(false); // ← Nouveau
    }
  }, [user, navigate]);


  useEffect(() => {
    const fetchCinemas = async () => {
      if (!user) return;
      try {
        const payload: CinemaPayload = {
          id: undefined,
          name: undefined,
          address: undefined,
          city: undefined,
          owner_id: user.id
        };
        const response = await searchCinemas(payload);
        setCinemas(response.results);
      } catch (error) {
        console.error('Erreur chargement cinémas:', error);
      }
    };

    fetchCinemas();
  }, [user]);

if (loading) {
    return <p>Chargement...</p>;
  }

  const handleCinemaClick = (cinemaId: string) => {
    navigate(`/cinemas/${cinemaId}`);
  };

  return (
    <div className="owner-cinemas-page">
      <h1>Mes cinémas</h1>
      {cinemas.length === 0 ? (
        <p>Aucun cinéma trouvé.</p>
      ) : (
        <ul className="cinema-list">
          {cinemas.map((cinema) => (
            <li
              key={cinema.id}
              onClick={() => handleCinemaClick(cinema.id)}
              className="cinema-item"
              style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}
            >
              <strong>{cinema.name}</strong> - {cinema.city}
            </li>
          ))}
        </ul>
      )}

        <button className="logout-btn" onClick={logout}>
            Se déconnecter
        </button>
    </div>
  );
};

export default CinemaOwner;