<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Applique CORS aux routes API et CSRF
    'allowed_methods' => ['*'], // Autorise toutes les méthodes
    'allowed_origins' => ['*'], // Origine du front-end exact
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Autorise tous les en-têtes
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // Active les credentials si nécessaire
];
