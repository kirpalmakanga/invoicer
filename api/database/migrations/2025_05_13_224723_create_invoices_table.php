<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table
                ->foreignUuid('customerId')
                ->constrained(table: 'customers', indexName: 'id');
            $table
                ->foreignUuid('userId')
                ->constrained(table: 'users', indexName: 'id');
            $table->string('reference');
            $table->string('paymentMethod');
            $table->string('status');
            $table->json('items');
            $table->date('datePaid')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
