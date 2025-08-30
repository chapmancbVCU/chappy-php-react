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
        $myInput = '';

        if($this->request->isPost()) {
            $this->request->csrfCheck();
            $myInput = $this->request->get('myInput');
            flashMessage('info', "You entered: {$myInput}");
        }

        $props = [
            'action' => route('home.index'),
            'user' => $user ?? 'Guest',
            'myInput' => $myInput
        ];

        // Set $props to view->props works as well.
        //$this->view->props = $props;
        //$this->view->renderJSX('home.Index');
        $this->view->renderJSX('home.Index', $props);
    }
}