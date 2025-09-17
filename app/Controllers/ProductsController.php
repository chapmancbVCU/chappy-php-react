<?php
namespace App\Controllers;
use Throwable;
use Core\Controller;
use App\Models\Products;

/**
 * Undocumented class
 */
class ProductsController extends Controller {
    /**
     * Runs when the object is constructed.
     *
     * @return void
     */
    public function onConstruct(): void {
        $this->view->setLayout('default');
    }

    public function indexAction(): void {
        $this->view->renderJsx('products.Index');
    }

    public function listAction(): void {
        $page = max(1, (int)($_GET['page'] ?? 1));
        $per  = min(100, max(1, (int)($_GET['per_page'] ?? 20)));
        $rows = Products::find([ 'limit' => $per, 'offset' => ($page-1)*$per, 'order' => 'id DESC' ]);
        $total = Products::findTotal([], true);

        $this->jsonResponse([
            'success' => true,
            'data'    => $rows,
            'meta'    => ['page' => $page, 'per_page' => $per, 'total' => $total],
        ]);
    }

    // GET /api/products/show/123
    public function showAction(int $id)
    {
        $row = Products::findById($id);
        if (!$row) return $this->jsonError('Not found', 404);
        $this->jsonResponse(['success' => true, 'data' => $row]);
    }

    // POST /api/products/store   (JSON body)
    public function storeAction()
    {
        $this->request->csrfCheck(); // if you require CSRF for same-origin JSON
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        try {
            $p = new Products();
            $p->assign($data);
            $p->save();
            if (!$p->validationPassed()) {
                return $this->jsonError('Validation failed', 422, $p->getErrorMessages());
            }
            $this->jsonResponse(['success' => true, 'data' => $p], 201);
        } catch (Throwable $e) {
            $this->jsonError('Server error', 500);
        }
    }

    // PUT/PATCH /api/products/update/123
    public function updateAction(int $id)
    {
        $this->request->csrfCheck();
        $row = Products::findById($id);
        if (!$row) return $this->jsonError('Not found', 404);

        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        $row->assign($data);
        $row->save();

        if (!$row->validationPassed()) {
            return $this->jsonError('Validation failed', 422, $row->getErrorMessages());
        }
        $this->jsonResponse(['success' => true, 'data' => $row]);
    }

    // DELETE /api/products/destroy/123
    public function destroyAction(int $id)
    {
        $this->request->csrfCheck();
        $row = Products::findById($id);
        if (!$row) return $this->jsonError('Not found', 404);
        $row->delete();
        $this->jsonResponse(['success' => true], 204);
    }

    // OPTIONS /api/products/*  (CORS preflight)
    public function preflightAction(): void
    {
        $this->preflight(); // from your base controller
    }
}
