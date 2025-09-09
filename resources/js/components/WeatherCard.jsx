// Example component
import React, { useEffect, useState } from 'react';
import { apiGet } from '@chappy/utils/api';

export default function WeatherCard({ city = 'Newport News, Virginia', units = 'imperial' }) {
  const [state, set] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    set({ data: null, loading: true, error: null });
    apiGet('/api/weather', { query: { q: city, units } })
      .then(d => alive && set({ data: d, loading: false, error: null }))
      .catch(e => alive && set({ data: null, loading: false, error: e }));
    return () => { alive = false; };
  }, [city, units]);

  if (state.loading) return <div>Loading…</div>;
  if (state.error)   return <div className="text-danger">{state.error.message}</div>;

  const d = state.data;
  return (
    <div className="card p-3">
      <h5 className="mb-2">{d.name}</h5>
      <div>{Math.round(d.main?.temp)}°{units === 'metric' ? 'C' : 'F'} — {d.weather?.[0]?.description}</div>
    </div>
  );
}
