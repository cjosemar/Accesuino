<?php


namespace App\Transformers;


use App\Entities\PermisoTrabajo;
use App\Entities\TipoPermisoTrabajo;
use League\Fractal\TransformerAbstract;

class PermisoTrabajoTransformers extends TransformerAbstract
{

    protected $defaultIncludes=
        [
            'empleado',
            'tipopermisotrabajo'
        ];

    public function transform(PermisoTrabajo $model)
    {
        return [
            'id' => $model->uuid,
            'observaciones' => $model->observaciones,
            'inicio' => $model->inicio->toIso8601String(),
            'fin' => $model->fin->toIso8601String(),
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String(),
        ];
    }

    public function includeEmpleado(PermisoTrabajo $model)
    {
        return $this->item($model->empleado, new EmpleadoTransformers());
    }

    public function includeTipoPermisoTrabajo(PermisoTrabajo $model)
    {
        return $this->item($model->tipopermisotrabajo, new TipoPermisoTrabajoTransformers());
    }

}