<?php

namespace App\Http\Controllers\Api;

use App\Entities\Datos;
use App\Http\Controllers\Controller;
use App\Transformers\DatosTransformers;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class DatosController extends Controller
{

    use Helpers;

    protected $model;


    public function __construct(Datos $model)
    {
        $this->model = $model;
        $this->middleware('permission:List datos')->only('index');
        $this->middleware('permission:List datos')->only('show');
        $this->middleware('permission:Create datos')->only('store');
        $this->middleware('permission:Update datos')->only('update');
        $this->middleware('permission:Delete datos')->only('destroy');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginator = $this->model->with('asset')->paginate($request->get('limit', config('app.pagination_limit', 20)));
        if ($request->has('limit')) {
            $paginator->appends('limit', $request->get('limit'));
        }

        return $this->response->paginator($paginator, new DatosTransformers());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function store(Request $request)
    {
        $rules = [
            'nombre' => 'string | required',
            'direccion' => 'string',
            'poblacion' => 'string',
            'codigopostal' => 'string',
            'provincia' => 'string',
            'email'  => 'required | string',
            'telefono' => 'string',
            'asset_uuid' => 'required | string'
        ];

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

        $datos = $this->model->create($request->all());


        return redirect()->route('/api/datos/'.$datos->uuid);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $datos = $this->model->byUuid($uuid)->firstOrFail();
        return $this->response->item($datos, new DatosTransformers());
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
        $datos = $this->model->byUuid($uuid)->firstOrFail();
        $rules = [
            'nombre' => 'required | string',
            'direccion' => 'string',
            'poblacion' => 'string',
            'codigoPostal' => 'string',
            'provincia' => 'string',
            'email'  => 'required | string',
            'telefono1' => 'string',
            'telefono2' => 'string',
            'asset_uuid' => 'required | uuid'
        ];
        if ($request->method() == 'PATCH')
        {
            $rules = [
                'nombre' => 'sometimes | string | required',
                'direccion' => 'sometimes | string',
                'poblacion' => 'sometimes | string',
                'codigopostal' => 'sometimes | string',
                'provincia' => 'sometimes | string',
                'email'  => 'sometimes | required | string',
                'telefono1' => 'sometimes | string',
                'telefono2' => 'sometimes | string',
                'asset_uuid' => 'sometimes | required | uuid'
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

        $datos->update(
            [
                'nombre' => isset($request['nombre']) ? $request['nombre'] : $datos->nombre,
                'direccion' => isset($request['direccion']) ? $request['direccion'] : $datos->direccion,
                'poblacion' => isset($request['poblacion']) ? $request['poblacion'] : $datos->poblacion,
                'codigopostal' => isset($request['codigopostal']) ? $request['codigopostal'] : $datos->codigopostal,
                'provincia' => isset($request['provincia']) ? $request['provincia'] : $datos->provincia,
                'email'  => isset($request['email']) ? $request['email'] : $datos->email,
                'telefono' => isset($request['telefono']) ? $request['telefono'] : $datos->telefono,
                'asset_uuid' => isset($request['asset_uuid']) ? $request['asset_uuid'] : $datos->asset_uuid
            ]
        );

        return $this->response->item($datos->fresh(), new DatosTransformers());
    }

}
