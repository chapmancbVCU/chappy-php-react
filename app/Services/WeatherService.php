<?php
declare(strict_types=1);

namespace App\Services;

use Core\Lib\Utilities\Env;
use Core\Lib\Http\Api;
class WeatherService extends Api {
    public function __construct()
    {
        parent::__construct(
            baseUrl: 'https://api.openweathermap.org/data/2.5',
            cacheNamespace: 'owm',
            defaultHeaders: ['Accept' => 'application/json'],
            defaultQuery: [
                'appid' => Env::get('OWM_API_KEY'),
                // Set a default; client can override via ?units=metric|imperial
                'units' => 'imperial',
            ],
            defaultTtl: 120,  // seconds to cache GETs
            timeout: 6
        );
    }

    /**
     * Current conditions by free-form query 'q' (e.g., city,country).
     * Supports 'q', 'units', 'lang', or lat/lon parameters.
     */
    public function current(array $query): array
    {
        // Allow q=, zip=, or lat/lon; pass through units/lang if present
        $allowed = ['q', 'zip', 'lat', 'lon', 'units', 'lang'];
        $params  = array_intersect_key($query, array_flip($allowed));

        return $this->get('/weather', $params); // cached via Api::get
    }
}