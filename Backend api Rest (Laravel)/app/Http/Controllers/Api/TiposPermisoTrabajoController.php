<?php

namespace App\Http\Controllers\Api;

use App\Entities\TipoPermisoTrabajo;
use App\Http\Controllers\Controller;
use App\Transformers\TipoPermisoTrabajoTransformers;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TiposPermisoTrabajoController extends Controller
{
    use Helpers;

    protected $model;


    public function __construct(TipoPermisoTrabajo $model)
    {
        $this->model = $model;
        $this->middleware('permission:List tipoPermiso')->only('index');
        $this->middleware('permission:List tipoPermiso')->only('show');
        $this->middleware('permission:Create tipoPermiso')->only('store');
        $this->middleware('permission:Update tipoPermiso')->only('update');
        $this->middleware('permission:Delete tipoPermiso')->only('destroy');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginator = $this->model->paginate($request->get('limit', config('app.pagination_limit', 20)));
        if ($request->has('limit')) {
            $paginator->appends('limit', $request->get('limit'));
        }

        return $this->response->paginator($paginator, new TipoPermisoTrabajoTransformers());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Dingo\Api\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'nombre' => 'string | required',
            'descripcion' => 'string'
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

        $tipoPermiso = $this->model->create($request->all());


        return $this->response->item($tipoPermiso, new TipoPermisoTrabajoTransformers());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $uuid
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $tipoPermiso = $this->model->byUuid($uuid)->firstOrFail();
        return $this->response->item($tipoPermiso, new TipoPermisoTrabajoTransformers());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $uuid
     * @return array|\Illuminate\Http\Response
     */
    public function update(Request $request, $uuid)
    {
        $tipoPermiso = $this->model->byUuid($uuid)->firstOrFail();
        $rules =
            [
                'nombre' => 'string',
                'descripcion' => 'string'
            ];
        if ($request->method() == 'PATCH')
        {
            $rules =
                [
                    'nombre' => 'sometimes | string',
                    'descripcion' => 'sometimes | string'
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

        $tipoPermiso->update(
            [
                'nombre' => isset($request['nombre']) ? $request['nombre'] : $tipoPermiso->nombre,
                'descripcion' => isset($request['descripcion']) ? $request['descripcion'] : $tipoPermiso->descripcion,
            ]
        );

        return $this->response->item($tipoPermiso->fresh(), new TipoPermisoTrabajoTransformers());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $uuid
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($uuid)
    {
        $tipoPermiso = $this->model->byUuid($uuid)->firstOrFail();
        $tipoPermiso->delete();

        // return $this->response->accepted('Eliminado tipo de permiso de trabajo con uuid: '.$uuid);
        return response()->json(['message' => 'Eliminado tipo de permiso de trabajo', 'uuid' => $uuid]);
    }
}
