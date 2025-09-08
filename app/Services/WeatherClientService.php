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
}