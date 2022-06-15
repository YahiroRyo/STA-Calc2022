<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('calc_histories', function (Blueprint $table) {
            $table->id('calc_history_id');

            $table->foreignId('user_id');
            $table->string('calc', 500);

            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down()
    {
        Schema::dropIfExists('calc_histories');
    }
};
