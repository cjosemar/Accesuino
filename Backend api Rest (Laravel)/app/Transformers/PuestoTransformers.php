<?php


namespace App\Transformers;


use App\Entities\Puesto;
use League\Fractal\TransformerAbstract;

class PuestoTransformers extends TransformerAbstract
{
    public function transform(Puesto $model)
    {
        return [
            'id' => $model->uuid,
            'nombre' => $model->nombre,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String()
        ];
    }

}