<?php


namespace App\Transformers;

use App\Entities\Empleado;
use App\Transformers\Assets\AssetTransformer;
use League\Fractal\TransformerAbstract;

class EmpleadoTransformers extends TransformerAbstract
{
    protected $defaultIncludes=
        [
            'asset',
            'horario',
            'puesto'
        ];

    public function transform(Empleado $model)
    {
        return [
            'id' => $model->uuid,
            'nombre' => $model->nombre,
            'apellidos' => $model->apellidos,
            'nif' => $model->nif,
            'direccion' => $model->direccion,
            'poblacion' => $model->poblacion,
            'codigopostal' => $model->codigopostal,
            'provincia' => $model->provincia,
            'email' => $model->email,
            'telefono' => $model->telefono,
            'coste_hora' => $model->coste_hora,
            'coste_hora_extra' => $model->coste_hora_extra,
            'uid_tarjeta' => $model->uid_tarjeta,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String()
        ];
    }

    public function includeAsset(Empleado $model)
    {
        return $this->item($model->asset, new AssetTransformer());
    }

   public function includePuesto(Empleado $model)
    {
        return $this->item($model->puesto, new PuestoTransformers());
    }

    public function includeHorario(Empleado $model)
    {
        return $this->item($model->horario, new HorarioTransformers());
    }

}