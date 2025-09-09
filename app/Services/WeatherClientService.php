<?php
declare(strict_types=1);

namespace App\Services;

use Core\Lib\Utilities\Env;

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
        return $this->get('/weather', ['lat' => $lat, 'lon' => $lon, 'units' => $units]);
    }

    private function get(string $path, array $params): array
    {
        $params['appid'] = $this->key;
        $url = $this->base . $path . '?' . http_build_query($params);

        $cacheKey = md5($url);
        $cacheFile = "{$this->cacheDir}/owm_{$cacheKey}.json";

        if(is_file($cacheFile) && (time() - filemtime($cacheFile) < $this->ttl)) {
            $json = file_get_contents($cacheFile);
            $data = json_decode((string)$json, true);
            if(is_array($data)) {
                return $data;  
            } 
        }

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT        => $this->timeout,
            CURLOPT_CONNECTTIMEOUT => $this->timeout,
            CURLOPT_HTTPHEADER     => ['Accept: application/json'],
        ]);
        $body = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $err = curl_error($ch);
        curl_close($ch);

        if($body === false) {
            throw new \RuntimeException("Upstream request failed: {$err}");
        }

        $data = json_decode((string)$body, true);
        if(!is_array($data)) {
            throw new \RuntimeException("Invalid JSON from upstream (HTTP {$code}).");
        }

        if($code >= 400) {
            $msg = $data['message'] ?? 'Upstream error';
            throw new \RuntimeException($msg, $code);
        }

        @file_put_contents($cacheFile, $body);
        return $data;
    }
}