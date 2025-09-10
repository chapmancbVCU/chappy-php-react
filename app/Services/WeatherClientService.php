<?php
declare(strict_types=1);

namespace App\Services;

use Core\Lib\Utilities\Env;
use Core\Lib\Http\Api;
class WeatherClientService extends Api {
    public function __construct()
    {
        parent::__construct(
            baseUrl: (string) Env::get('OWM_BASE', 'https://api.openweathermap.org/data/2.5'),
            cacheNamespace: 'owm',
            defaultHeaders: ['Accept' => 'application/json'],
            // Inject your API key once; every call gets it automatically
            defaultQuery: ['appid' => (string) Env::get('OWM_API_KEY')],
            defaultTtl: (int) Env::get('OWM_CACHE_TTL', 300),
            timeout: (int) Env::get('OWM_TIMEOUT', 6)
        );
    }

    public function currentByCity(string $q, string $units = 'imperial'): array {
        return $this->get('/weather', ['q' => $q, 'units' => $units]);
    }

    public function currentByCoords(float $lat, float $lon, string $units = 'imperial'): array {
        return $this->get('/weather', ['lat' => $lat, 'lon' => $lon, 'units' => $units]);
    }
}