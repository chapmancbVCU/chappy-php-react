// Example component
import React from 'react';
import { apiGet, useAsync } from '@chappy/utils/api';

export default function WeatherCard({ city = 'Newport News, Virginia', units = 'imperial' }) {
  const { data, loading, error } = useAsync(({ signal }) =>
    apiGet('/weather/show', { query: { q: city, units }, signal }),
  [city, units]);

  if (loading) return <div>Loading…</div>;
  if (error)   return <div className="text-danger">{error.message}</div>;

  const d = data?.data || {};
  return (
    <div className="card p-3">
      <h5 className="mb-2">{d.name}</h5>
      <div>
        {Math.round(d.main?.temp)}°{units === 'metric' ? 'C' : 'F'} — {d.weather?.[0]?.description}
      </div>
    </div>
  );
}
