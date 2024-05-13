<?php


namespace App\Transformers;


use App\Entities\Datos;
use App\Transformers\Assets\AssetTransformer;
use League\Fractal\TransformerAbstract;

class DatosTransformers extends TransformerAbstract
{
    protected $defaultIncludes= ['asset'];

    public function transform(Datos $model)
    {
        return [
            'id' => $model->uuid,
            'nombre' => $model->nombre,
            'direccion' => $model->direccion,
            'poblacion' => $model->poblacion,
            'codigopostal' => $model->codigopostal,
            'provincia' => $model->provincia,
            'email' => $model->email,
            'telefono' => $model->telefono,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String(),
        ];
    }

    public function includeAsset(Datos $model)
    {
        return $this->item($model->asset, new AssetTransformer());
    }

}