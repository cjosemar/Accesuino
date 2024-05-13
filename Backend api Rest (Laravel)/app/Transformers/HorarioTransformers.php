<?php


namespace App\Transformers;

use App\Entities\Empleado;
use App\Entities\Horario;
use League\Fractal\TransformerAbstract;

class HorarioTransformers extends TransformerAbstract
{

    // protected $defaultIncludes = ['empleado'];

    public function transform(Horario $model)
    {
        return [
            'id' => $model->uuid,
            'nombre' => $model->nombre,
            'hora_inicio' => $model->hora_inicio,
            'hora_salida' => $model->hora_salida,
            'horas_trabajo' => $model->horas_trabajo,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String()
        ];
    }


}