<?php
namespace App\Controllers;
use Core\Controller;
use App\Services\WeatherClientService;
use Core\Lib\Utilities\Env;

class ApiController extends Controller
{
    public function weatherAction(): void
    {
        // CORS preflight for the same path with OPTIONS
        if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
            $this->preflight();
        }

        $q     = trim((string)($this->request->get('q') ?? ''));
        $lat   = $this->request->get('lat');
        $lon   = $this->request->get('lon');
        $units = (string)($this->request->get('units') ?? 'imperial');

        if (!$q && ($lat === null || $lon === null)) {
            $this->jsonError('Provide ?q=city or &lat=..&lon=..', 422, ['query' => ['Missing location parameters']]);
        }

        try {
            $client = new WeatherClientService();
            $data = $q
                ? $client->currentByCity($q, $units)
                : $client->currentByCoords((float)$lat, (float)$lon, $units);

            // Optional client cache hints
            $ttl  = (int) Env::get('OWM_CACHE_TTL', 300);
            $etag = '"' . md5(json_encode($data)) . '"';
            header('Cache-Control: public, max-age=' . $ttl);
            header('ETag: ' . $etag);
            if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
                http_response_code(304);
                exit;
            }

            $this->jsonResponse($data, 200);
        } catch (\RuntimeException $e) {
            $status = $e->getCode() >= 400 ? $e->getCode() : 502;
            $this->jsonError($e->getMessage(), $status);
        } catch (\Throwable $e) {
            $this->jsonError('Unexpected server error', 500);
        }
    }
}
