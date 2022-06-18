<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class OnlyLoggedInMddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check()) return $next($request);
        throw new UnauthorizedHttpException('');
    }
}
