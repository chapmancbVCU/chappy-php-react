<?php
namespace App\Models;
use Core\Model;
use Core\Validators\{
    RequiredValidator as Required,
    NumericValidator as Numeric
};
/**
 * Implements features of the Products class.
 */
class Products extends Model {

    // Fields you don't want saved on form submit
    // public const blackList = [];

    // Set to name of database table.
    protected static $_table = 'products';

    // Soft delete
    protected static $_softDelete = true;
    
    // Fields from your database
    public $id;
    public $created_at;
    public $updated_at;
    public $name;
    public $price;
    public $shipping;
    public $description;
    public $inventory = 0;

    public function beforeSave(): void {
        $this->timeStamps();
    }

    /**
     * Performs validation for the Products model.
     *
     * @return void
     */
    public function validator(): void {
        $requiredFields =  ['name' => "Name", 'price' => 'Price', 'list' => 'List Price', 'shipping' => 'Shipping', 'description' => 'Description'];
        foreach($requiredFields as $field => $display) {
            $this->runValidation(new Required($this,['field'=>$field,'message'=>$display." is required."]));
        }
        $this->runValidation(new Numeric($this, ['field' => 'price', 'message' => 'Price must be a number']));
        $this->runValidation(new Numeric($this, ['field' => 'list', 'message' => 'List Price must be a number']));
        $this->runValidation(new Numeric($this, ['field' => 'shipping', 'message' => 'Shipping must be a number']));
    }
}
