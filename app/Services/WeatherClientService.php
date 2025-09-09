<?php
declare(strict_types=1);

namespace App\Services;

use Core\Lib\Utilities\Env;

/**
 * Service that supports the WeatherClient model.
 */
class WeatherClientService {
    private string $base;
    private string $key;
    private int $timeout;
    private int $ttl;
    private string $cacheDir;

    public function __construct()
    {
        $this->base = rtrim((string)Env::get('OWM_BASE', 'https://api.openweathermap.org/data/2.5'), '/');
        $this->key = (string) Env::get('OWM_API_KEY');
        $this->timeout = (int) Env::get('OWM_TIMEOUT', 6);
        $this->ttl = (int) Env::get('OWM_CACHE_TTL', 300);
        $this->cacheDir = CHAPPY_BASE_PATH . DS . 'storage' . DS . 'cache';
        if (!is_dir($this->cacheDir)) @mkdir($this->cacheDir, 0775, true);
    }

    public function currentByCity(string $q, string $units = 'imperial'): array {
        return $this->get('/weather', ['q' => $q, 'units' => $units]);
    }

    public function currentByCoords(float $lat, float $lon, string $units = 'imperial'): array {
        return $this->get(
            '/weather',
            ['lat' => $lat, 'lon' => 'lon', 'units' => $units]
        );
    }
}