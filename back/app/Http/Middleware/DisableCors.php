<?php

namespace App\Http\Middleware;

use Closure;

class DisableCors
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Désactiver toutes les restrictions CORS
        $response->headers->set('Access-Control-Allow-Origin', $request->headers->get('Origin'));
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', '*');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
