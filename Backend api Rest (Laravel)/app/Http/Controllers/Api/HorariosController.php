<?php

namespace App\Http\Controllers\Api;

use App\Entities\Horario;
use App\Http\Controllers\Controller;
use App\Transformers\HorarioTransformers;
use Carbon\Carbon;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HorariosController extends Controller
{

    use Helpers;

    protected $model;


    public function __construct(Horario $model)
    {
        $this->model = $model;
        $this->middleware('permission:List horarios')->only('index');
        $this->middleware('permission:List horarios')->only('show');
        $this->middleware('permission:Create horarios')->only('store');
        $this->middleware('permission:Update horarios')->only('update');
        $this->middleware('permission:Delete horarios')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginator = $this->model->with('empleados')->paginate($request->get('limit', config('app.pagination_limit', 20)));
        if ($request->has('limit')) {
            $paginator->appends('limit', $request->get('limit'));
        }

        return $this->response->paginator($paginator, new HorarioTransformers());
    }


    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(Request $request)
    {
        $rules =
            [
                'nombre' => 'string|required',
                'hora_inicio' => 'required|date_format:H:i:s',
                'hora_salida' => 'required_without:horas_trabajo|after:hora_inicio|date_format:H:i:s',
                'horas_trabajo' => 'required_without:hora_salida|integer'
            ];

        $validator = Validator::make($request->all(), $rules);;
        if($validator->fails())
        {
            return
                [
                    'created' => false,
                    'errores' => $validator->errors()->all(),
                    'datos' => $request->all()
                ];
        }

        $horario = $this->model->create($request->all());

        return $this->show($horario->uuid);
    }

    /**
     * Display the specified resource.
     *
     * @param int $uuid
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $horario = $this->model->byUuid($uuid)->firstOrFail();
        return $this->response->item($horario, new HorarioTransformers());
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     */
    public function update(Request $request, $uuid)
    {
        $horario = $this->model->byUuid($uuid)->firstOrFail();
        $rules =
            [
                'nombre' => 'string',
                'hora_inicio' => 'date_format:H:i:s',
                'hora_salida' => 'date_format:H:i:s',
                'horas_trabajo' => 'not_in: |integer'

            ];

        if ($request->method() == 'PATCH') {
            $rules =
                [
                    'nombre' => 'string',
                    'hora_inicio' => 'date_format:H:i:s',
                    'hora_salida' => 'date_format:H:i:s',
                    'horas_trabajo' => 'integer'
                ];
        }

        $validator = Validator::make($request->all(), $rules);;
        if($validator->fails())
        {
            return
                [
                    'updated' => false,
                    'errores' => $validator->errors()->all(),
                    'datos' => $request->all(),
                    'horario' => $horario
                ];
        }

        if ((isset($request['hora_salida']) && isset($request['horas_trabajo']) && !isset($request['hora_inicio']))) {
            $salida = Carbon::createFromTimeString($request['hora_salida']);
            $entrada = Carbon::createFromTimeString($horario['hora_inicio']);
            if ($salida->diff($entrada)->h <> $request['horas_trabajo']) {
                return [
                    'updated' => false,
                    'errores' => 'Horario no válido 1. No coinciden las horas de trabajo con la hora de entrada y salida',
                    'datos' => $request->all(),
                    'horario' => $horario
                ];
            }
        }

        if ((isset($request['hora_salida']) && isset($request['hora_inicio']) && isset($request['horas_trabajo']))) {
            $salida = Carbon::createFromTimeString($request['hora_salida']);
            $entrada = Carbon::createFromTimeString($request['hora_inicio']);
            if ($salida->diff($entrada)->h <> $request['horas_trabajo']) {
                return [
                    'updated' => false,
                    'errores' => 'Horario no válido 2. No coinciden las horas de trabajo con la hora de entrada y salida',
                    'datos' => $request->all(),
                    'horario' => $horario,
                    'resultado' => $salida->diff($entrada)->h
                ];
            }
        }

        if ((isset($request['hora_inicio']) && isset($request['horas_trabajo']) && !isset($request['hora_salida']))) {
            $salida = Carbon::createFromTimeString($horario['hora_salida']);
            $entrada = Carbon::createFromTimeString($request['hora_inicio']);
            if ($salida->diff($entrada)->h <> $request['horas_trabajo']) {
                return [
                    'updated' => false,
                    'errores' => 'Horario no valido 3. No coinciden las horas de trabajo con la hora de entrada y salida',
                    'datos' => $request->all(),
                    'horario' => $horario
                ];
            }
        }

        if ((isset($request['hora_inicio']) && isset($request['hora_salida']))) {
            $salida = Carbon::createFromTimeString($request['hora_salida']);
            $entrada = Carbon::createFromTimeString($request['hora_inicio']);
            $request['horas_trabajo'] = $salida->diff($entrada)->h;
        }

        if (!(isset($request['hora_inicio']) && isset($request['hora_salida'])) && isset($request['horas_trabajo'])) {
            return [
                'updated' => false,
                'errores' => 'Horario no válido 4. Es necesario especificar hora de salida o de entrada junto con horas de trabajo',
                'datos' => $request->all(),
                'horario' => $horario
            ];
        }

        $horario->update(
            [
                'nombre' => isset($request['nombre']) ? $request['nombre'] : $horario->nombre,
                'hora_inicio' => isset($request['hora_inicio']) ? $request['hora_inicio'] : $horario->hora_inicio,
                'hora_salida' => isset($request['hora_salida']) ? $request['hora_salida'] : $horario->hora_salida,
                'horas_trabajo' => isset($request['horas_trabajo']) ? $request['horas_trabajo'] : $horario->nombre,
            ]
        );


        return $this->response->item($horario->fresh(), new HorarioTransformers());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($uuid)
    {
        $horario = $this->model->byUuid($uuid)->firstOrFail();
        $horario->delete();

        // return $this->response->accepted('Eliminado tipo de permiso de trabajo con uuid: '.$uuid);
        return response()->json(['message' => 'Eliminado horario', 'uuid' => $uuid]);
    }
}