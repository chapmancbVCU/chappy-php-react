<?php
namespace App\Controllers;
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
}
