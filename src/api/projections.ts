import { Film } from './films';
import { Cinema } from './cinemas';

const BASE_URL = import.meta.env.VITE_API_URL;

export interface searchResponse {
    count: number;
    results: Projection[];
}

export interface Projection {
  id: string;
  film: Film;
  cinema: Cinema;
  dateDebut: string;
  dateFin: string;
  calendrier: Record<string, string[]>;
}

export interface ProjectionPayload {
    id: string | undefined;
    film: string | undefined;
    cinema: string | undefined;
    dateDebut: string | undefined;
    dateFin: string | undefined;
    daysOfWeek: [] | undefined;
    hour: string | undefined;
}

export const searchProjections = async (credentials: ProjectionPayload): Promise<searchResponse> => {
  const res = await fetch(`${BASE_URL}/projections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok || data?.error === 'No projections found') {
    // 👇 déclenche une erreur capturable
    throw new Error('No projections found');
  }

  return data;
};



