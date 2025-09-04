<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;

/**
 * Implements support for our Home controller.  Functions found in this class 
 * will support tasks related to the home page.
 */
class HomeController extends Controller {
    /** 
     * The default action for this controller.  It performs rendering of this 
     * site's home page.
     * 
     * @return void
     */
    public function indexAction(): void {
        $user = AuthService::currentUser();
        $props = ['user' => $user ?? 'Guest'];
        $this->view->renderJSX('home.Index', $props);
    }

    public function testAction(): void {
        if($this->request->isPost()) {
            $this->request->csrfCheck();
            $vars = $this->request->get();
            // dd($vars['test1']);
        }

        $test1Var = $vars['test1'] == 'on';
        // dd($test1Var);
        $this->view->props = [
            'vars' => $vars,
            'test1Var' => $test1Var,
        ];
        $this->view->renderJsx('home.Test');
    }
}