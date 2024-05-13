<?php


namespace App\Transformers;


use App\Entities\Registro;
use League\Fractal\TransformerAbstract;

class RegistroTransformers extends TransformerAbstract
{

    protected $defaultIncludes=
        [
            'empleado'
        ];

    public function transform(Registro $model)
    {
        return [
            'id' => $model->uuid,
            'inicio' => $model->inicio->toIso8601String(),
            'fin' => $model-> fin == null ? null : $model->fin->toIso8601String(),
            'duracion' => $model->duracion,
            'control_terminado' => $model->control_terminado,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String(),
        ];
    }

    public function includeEmpleado(Registro $model)
    {
        return $this->item($model->empleado, new EmpleadoTransformers());
    }

}
/*
 * 'uuid',
            'empleado_uuid',
            'inicio',
            'fin',
            'duracion',
            'control_terminado'
 */