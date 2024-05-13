<?php

namespace App\Http\Controllers\Api;

use App\Entities\Empleado;
use App\Http\Controllers\Controller;
use App\Transformers\EmpleadoTransformers;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmpleadosController extends Controller
{
    use Helpers;

    protected $model;

    public function __construct(Empleado $model)
    {
        $this->model = $model;
        $this->middleware('permission:List empleados')->only('index');
        $this->middleware('permission:List empleados')->only('show');
        $this->middleware('permission:List empleados')->only('showByRfid');
        $this->middleware('permission:Create empleados')->only('store');
        $this->middleware('permission:Update empleados')->only('update');
        $this->middleware('permission:Delete empleados')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginator = $this->model->orderBy('nombre', 'ASC')->with('asset', 'puesto', 'horario')->paginate($request->get('limit', config('app.pagination_limit', 20)));
        if ($request->has('limit')) {
            $paginator->appends('limit', $request->get('limit'));
        }

        return $this->response->paginator($paginator, new EmpleadoTransformers());
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
                'nombre' => 'string | required',
                'apellido' => 'string',
                'nif' => 'string | required',
                'direccion' => 'string',
                'poblacion' => 'string',
                'provincia' => 'string',
                'email' => 'string | email | required',
                'telefono' => 'string',
                'password' => 'string | confirmed | required',
                'password_confirmation' => 'string | required',
                'coste_hora' => 'numeric',
                'coste_hora_extra' => 'numeric',
                'uid_tarjeta' => 'string',
                'puesto_uuid' => 'uuid | required' ,
                'horario_uuid' => 'uuid | required',
                'asset_uuid' => 'uuid'
            ];

        $validator = Validator::make($request->all(), $rules);;
        if($validator->fails())
        {
            return
                [
                    'created' => false,
                    'errores' => $validator->errors()->getMessages(),
                    'datos' => $request->all()
                ];
        }

        $empleado = $this->model->create($request->all());

        return $this->show($empleado->uuid);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $empleado = $this->model->byUuid($uuid)->firstOrFail();
        return $this->response->item($empleado, new EmpleadoTransformers());
    }

    public function showByRfid(Request $request) {
        $empleado = $this->model->where('uid_tarjeta', $request->get('rfid_uuid'))->firstOrFail();
        return $empleado;
    }

    public function showByPassword(Request $request) {
        $empleado = $this->model->where('email', $request->get('email'))->firstOrFail();

        if (\Illuminate\Support\Facades\Hash::check($request->get('password'),$empleado->password)) {
            return $empleado;
        } else {
            return response()->json('Password o email error',400);
        }


    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return array|\Illuminate\Http\Response
     */
    public function update(Request $request, $uuid)
    {
        $empleado = $this->model->byUuid($uuid)->firstOrFail();
        $rules =
            [
                'nombre' => 'string | required',
                'apellido' => 'string',
                'nif' => 'string | required',
                'direccion' => 'string',
                'poblacion' => 'string',
                'provincia' => 'string',
                'email' => 'string | email ',
                'telefono' => 'string',
                'coste_hora' => 'numeric',
                'coste_hora_extra' => 'numeric',
                'uid_tarjeta' => 'string',
                'puesto_uuid' => 'uuid' ,
                'horario_uuid' => 'uuid',
                'asset_uuid' => 'uuid'
            ];
        if ($request->method() == 'PATCH')
        {
            $rules =
                [
                    'nombre' => 'sometimes | string',
                    'apellido' => 'sometimes | string',
                    'nif' => 'sometimes | string',
                    'direccion' => 'sometimes | string',
                    'poblacion' => 'sometimes | string',
                    'provincia' => 'sometimes | string',
                    'email' => 'sometimes | string | email',
                    'telefono' => 'sometimes | string',
                    'coste_hora' => 'sometimes | numeric',
                    'coste_hora_extra' => 'sometimes | numeric',
                    'uid_tarjeta' => 'sometimes | string',
                    'puesto_uuid' => 'sometimes | uuid | required' ,
                    'horario_uuid' => 'sometimes | uuid | required',
                    'asset_uuid' => 'sometimes | uuid'
                ];
        }

        $validator = Validator::make($request->all(), $rules);;
        if($validator->fails())
        {
            return
                [
                    'updated' => false,
                    'errores' => $validator->errors()->all(),
                    'datos' => $request->all()
                ];
        }

        $empleado->update(
            [
                'nombre' => isset($request['nombre']) ? $request['nombre'] : $empleado->nombre,
                'apellidos' => isset($request['apellidos']) ? $request['apellidos'] : $empleado->apellidos,
                'nif' => isset($request['nif']) ? $request['nif'] : $empleado->nif,
                'direccion' => isset($request['direccion']) ? $request['direccion'] : $empleado->direccion,
                'poblacion' => isset($request['poblacion']) ? $request['poblacion'] : $empleado->poblacion,
                'provincia' => isset($request['provincia']) ? $request['provincia'] : $empleado->provincia,
                'email' => isset($request['email']) ? $request['email'] : $empleado->email,
                'telefono' => isset($request['telefono']) ? $request['telefono'] : $empleado->telefono,
                'coste_hora' => isset($request['coste_hora']) ? $request['coste_hora'] : $empleado->coste_hora,
                'coste_hora_extra' => isset($request['coste_hora_extra']) ? $request['coste_hora_extra'] : $empleado->coste_hora_extra,
                'uid_tarjeta' => isset($request['uid_tarjeta']) ? $request['uid_tarjeta'] : $empleado->uid_tarjeta,
                'puesto_uuid' => isset($request['puesto_uuid']) ? $request['puesto_uuid'] : $empleado->puesto_id,
                'horario_uuid' => isset($request['horario_uuid']) ? $request['horario_uuid'] : $empleado->horario_id,
                'asset_uuid' => isset($request['asset_uuid']) ? $request['asset_uuid'] : $empleado->asset_uuid,
            ]
        );
        if ($request['password']) {
            $empleado->update(
                [
                    'password' => \Illuminate\Support\Facades\Hash::make($request['password'])
                ]
            );
        }

        return $this->response->item($empleado->fresh(), new EmpleadoTransformers());

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($uuid)
    {
        $empleado = $this->model->byUuid($uuid)->firstOrFail();
        $empleado->delete();

        return $this->response->accepted('Eliminado empleado con uuid: '.$uuid);
    }
}
