<?php

namespace App\Http\Controllers\Api;

use App\Entities\Empleado;
use App\Entities\Registro;
use App\Http\Controllers\Controller;
use App\Transformers\RegistroTransformers;
use Carbon\Carbon;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DateTime;

class RegistrosController extends Controller
{

    use Helpers;

    protected $model;
    protected $modelEmpleado;

    public function __construct(Registro $model)
    {
        $this->model = $model;
        $this->middleware('permission:List registros')->only('index');
        $this->middleware('permission:List registros')->only('show');
        $this->middleware('permission:Create registros')->only('store');
        $this->middleware('permission:Update registros')->only('update');
        $this->middleware('permission:Delete registros')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginator = $this->model::orderBy('inicio', 'DESC')->with('empleado')->paginate($request->get('limit', config('app.pagination_limit', 20)));
        if ($request->has('empleado_uuid')) {
            $paginator = $this->model::where('empleado_uuid', $request->get('empleado_uuid'))->orderBy('inicio', 'DESC')->with('empleado')->paginate($request->get('limit', config('app.pagination_limit', 20)));
        }
        if ($request->has('limit')) {
            $paginator->appends('limit', $request->get('limit'));
        }


        return $this->response->paginator($paginator, new RegistroTransformers());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $rules =
            [
                'inicio' => 'required|date_format:H:i:s',
                'fin' => 'date_format:H:i:s',
                'duracion' => 'integer',
                'control_terminado' => 'boolean|required',
                'empleado_uuid' => 'uuid | required'
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
        $registro = $this->model->create($request->all());

        return $this->show($registro->uuid);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $uuid
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $registro = $this->model->byUuid($uuid)->firstOrFail();
        return $this->response->item($registro, new RegistroTransformers());
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $uuid
     */
    public function update(Request $request, $uuid)
    {
        $registro = $this->model->byUuid($uuid)->firstOrFail();

        $rules =
            [
                'inicio' => 'required | date_format:Y-m-d H:i:s',
                'fin' => 'date_format:Y-m-d H:i:s',
                'duracion' => 'integer',
                'control_terminado' => 'boolean',
                'empleado_uuid' => 'uuid | required'
            ];

        if ($request->method() == 'PATCH') {
            [
                'inicio' => 'sometimes |date_format:Y-m-d H:i:s',
                'fin' => 'sometimes |date_format:Y-m-d H:i:s',
                'duracion' => 'sometimes |integer',
                'control_terminado' => 'sometimes | boolean',
                'empleado_uuid' => 'uuid | required'
            ];
        }

        $validator = Validator::make($request->all(), $rules);;

        if ($validator->fails()) {
            return
                [
                    'updated' => false,
                    'errores' => $validator->errors()->getMessages(),
                    'datos' => $request->all()
                ];
        }

        $registro->update(
            [
                'inicio' => isset($request['inicio']) ? $request['inicio'] : $registro->inicio,
                'fin' => isset($request['fin']) ? $request['fin'] : $registro->fin,
                'duracion' => isset($request['duracion']) ? $request['duracion'] : $registro->duracion,
                'control_terminado' => isset($request['control_terminado']) ? $request['control_terminado'] : $registro->control_terminado,
                'empleado_uuid' => isset($request['empleado_uuid']) ? $request['empleado_uuid'] : $registro->empleado_id,
            ]
        );

        return $this->response->item($registro->fresh(), new RegistroTransformers());

    }

    public function registroLogin(Request $request) {
        $rules =
            [
                'email' => 'required | string |email',
                'password' => 'required | string'
            ];
        $validator = Validator::make($request->all(), $rules);;

        if ($validator->fails()) {
            return
                [
                    'registrado' => false,
                    'errores' => $validator->errors()->getMessages(),
                    'datos' => $request->all()
                ];
        }

        $empleado = new Empleado();
        $c = new EmpleadosController($empleado);
        $empleado = $c->showByPassword($request);

        $registro = $this->model->where('empleado_uuid', $empleado->uuid)
            ->where('control_terminado', 0)->first();

        if ($registro == null) {
            $registro = new Registro();
            $registro = $registro->create(
                [
                    'inicio' => new Carbon(),
                    'control_terminado' => 0,
                    'empleado_uuid' => $empleado->uuid,
                ]
            );

            return $this->show($registro->uuid);

        }else {

            $duracion = (new Carbon($registro->inicio))->diffInMinutes(new Carbon());

            $registro->update(
                [
                    'fin' => new Carbon(),
                    'duracion' => $duracion /60,
                    'control_terminado' => 1
                ]
            );
            return $this->response->item($registro->fresh(), new RegistroTransformers());
        }

    }

    public function registroRfid(Request $request) {
        $rules =
            [
                'rfid_uuid' => 'required | string',
            ];
        $validator = Validator::make($request->all(), $rules);;

        if ($validator->fails()) {
            return
                [
                    'registrado' => false,
                    'errores' => $validator->errors()->getMessages(),
                    'datos' => $request->all()
                ];
        }

        $empleado = new Empleado();
        $c = new EmpleadosController($empleado);
        $empleado = $c->showByRfid($request);

        $registro = $this->model->where('empleado_uuid', $empleado->uuid)
            ->where('control_terminado', 0)->first();

        if ($registro == null) {
            $registro = new Registro();
            $time = time();
            $registro->create(
                [
                    'inicio' => new Carbon(),
                    'control_terminado' => 0,
                    'empleado_uuid' => $empleado->uuid,
                ]
            );

        }else {

            $duracion = (new Carbon($registro->inicio))->diffInMinutes(new Carbon());

            $registro->update(
                [
                    'fin' => new Carbon(),
                    'duracion' => $duracion /60,
                    'control_terminado' => 1
                ]
            );
        }
        return "";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $uuid
     * @return \Illuminate\Http\Response
     */
    public function destroy($uuid)
    {
        $registro = $this->model->byUuid($uuid)->firstOrFail();
        $registro->delete();

        return $this->response->accepted('Eliminado registro con uuid: '.$uuid);

    }
}
