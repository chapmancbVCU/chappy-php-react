<?php
namespace App\Controllers;

use App\Models\Options;
use Core\Controller;
use Core\Services\AuthService;
use Core\DB;

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
        // $db = DB::getInstance();
        // $db->insert('options', ['name' => 'option1']);
        // $db->insert('options', ['name' => 'option2']);
        // $db->insert('options', ['name' => 'option3']);
        // $db->insert('options', ['name' => 'option4']);
        $options = Options::find();
        // dd($options);
        if($this->request->isPost()) {
            $this->request->csrfCheck();
            $vars = $this->request->get();
            $test1Var = $vars['fav_language'] == 'HTML' ? true : false;
            $test2Var = $vars['fav_language'] == 'CSS' ? true : false; 
        }

        $this->view->props = [
            'vars' => $vars,
            'test1Var' => $test1Var,
            'test2Var' => $test2Var,
            'cellNumber' => $vars['cell'],
            'options' => $options
        ];
        $this->view->renderJsx('home.Test');
    }
}