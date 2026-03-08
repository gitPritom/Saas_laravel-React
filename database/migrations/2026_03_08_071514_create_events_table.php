<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->string('type');             // page_view, click, signup ...
            $table->jsonb('payload')->default('{}');
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamp('occurred_at');
            $table->timestamps();

            // PostgreSQL composite + GIN indexes
            $table->index(['tenant_id', 'occurred_at']);
            $table->index(['tenant_id', 'type']);
            $table->index('occurred_at');
        });

        DB::statement('CREATE INDEX events_payload_gin ON events USING GIN (payload)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
