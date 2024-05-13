<?php

namespace App\Providers;

use App\Http\Controllers\Api\NoDataArraySerializer;
use Illuminate\Support\ServiceProvider;
use League\Fractal\Serializer\ArraySerializer;
use League\Fractal\Serializer\DataArraySerializer;
use League\Fractal\Serializer\JsonApiSerializer;

class DingoSerializerProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app['Dingo\Api\Transformer\Factory']->setAdapter(function ($app) {
            $fractal = new \League\Fractal\Manager;
            $fractal->setSerializer(new NoDataArraySerializer());
            return new \Dingo\Api\Transformer\Adapter\Fractal($fractal);
        });
    }
}
