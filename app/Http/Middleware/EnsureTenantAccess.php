<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureTenantAccess
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user || !$user->tenant_id) {
            abort(403, 'No tenant associated with this account.');
        }

        inertia()->share('tenant', [
            'id'   => $user->tenant->id,
            'name' => $user->tenant->name,
            'plan' => $user->tenant->plan,
        ]);

        return $next($request);
    }
}