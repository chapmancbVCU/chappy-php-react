<?php
namespace App\Controllers;
use Throwable;
use Core\Controller;
use App\Services\WeatherService;

class WeatherController extends Controller
{
    public function showAction()
    {
        try {
            $q    = $_GET['q']   ?? null;
            $lat  = $_GET['lat'] ?? null;
            $lon  = $_GET['lon'] ?? null;

            if (!$q && !($lat && $lon)) {
                return $this->jsonError('Provide ?q=City or ?lat=&lon=', 422);
            }

            $svc  = new WeatherService();
            $data = $svc->current($_GET);

            $this->jsonResponse(['success' => true, 'data' => $data]);
        } catch (Throwable $e) {
            $this->jsonError('Upstream error', 502, ['detail' => $e->getMessage()]);
        }
    }

    // OPTIONS /api/weather/* (CORS)
    public function preflightAction(): void
    {
        $this->preflight();
    }
}
