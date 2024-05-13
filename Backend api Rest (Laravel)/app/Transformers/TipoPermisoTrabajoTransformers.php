<?php


namespace App\Transformers;


use App\Entities\TipoPermisoTrabajo;
use League\Fractal\TransformerAbstract;

class TipoPermisoTrabajoTransformers extends TransformerAbstract
{
    public function transform(TipoPermisoTrabajo $model)
    {
        return [
            'id' => $model->uuid,
            'nombre' => $model->nombre,
            'descripcion' => $model->descripcion,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String(),
        ];
    }

}