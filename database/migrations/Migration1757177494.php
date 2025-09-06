<?php
namespace Database\Migrations;

use Core\DB;
use Core\Lib\Database\Schema;
use Core\Lib\Database\Blueprint;
use Core\Lib\Database\Migration;

/**
 * Migration class for the options table.
 */
class Migration1757177494 extends Migration {
    /**
     * Performs a migration for a new table.
     *
     * @return void
     */
    public function up(): void {
        Schema::create('options', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        // $db = DB::getInstance();
        // $db->insert('options', ['name' => 'option1']);
        // $db->insert('options', ['name' => 'option2']);
        // $db->insert('options', ['name' => 'option3']);
        // $db->insert('options', ['name' => 'option4']);
    }

    /**
     * Undo a migration task.
     *
     * @return void
     */
    public function down(): void {
        Schema::dropIfExists('options');
    }
}
