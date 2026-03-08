<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class TrackLastSeen
{
    public function handle(Request $request, Closure $next)
    {
        if ($user = $request->user()) {
            // Throttle DB writes with Redis — update DB only once per 5 mins
            $cacheKey = "user:last_seen:{$user->id}";

            if (!Cache::has($cacheKey)) {
                $user->updateQuietly(['last_seen_at' => now()]);
                Cache::put($cacheKey, true, now()->addMinutes(5));
            }
        }

        return $next($request);
    }
}