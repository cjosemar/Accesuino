<?php

namespace App\Http\Controllers\Api;

use App\Entities\PermisoTrabajo;
use App\Http\Controllers\Controller;
use App\Transformers\PermisoTrabajoTransformers;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermisosTrabajoController extends Controller
{

    use Helpers;

    protected $model;

    public function __construct(PermisoTrabajo $model)
    {
        $this->model = $model;
        $this->middleware('permission:List permisosTrabajo')->only('index');
        $this->middleware('permission:List permisosTrabajo')->only('show');
        $this->middleware('permission:Create permisosTrabajo')->only('store');
        $this->middleware('permission:Update permisosTrabajo')->only('update');
        $this->middleware('permission:Delete permisosTrabajo')->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $paginator = $this->model->with('empleado', 'tipopermisotrabajo')->paginate($request->get('limit', config('app.pagination_limit', 20)));
        if ($request->has('limit')) {
            $paginator->appends('limit', $request->get('limit'));
        }

        return $this->response->paginator($paginator, new PermisoTrabajoTransformers());
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
                'observaciones' => 'string',
                'inicio' => 'required|date_format:Y-m-d',
                'fin' => 'required|date_format:Y-m-d',
                'empleado_uuid' => 'uuid | required',
                'tipopermisotrabajo_uuid' => 'uuid | required'
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
        $permisotrabajo = $this->model->create($request->all());

        return $this->show($permisotrabajo->uuid);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $uuid
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $permisotrabajo = $this->model->byUuid($uuid)->firstOrFail();
        return $this->response->item($permisotrabajo, new PermisoTrabajoTransformers());
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $uuid
     */
    public function update(Request $request, $uuid)
    {

        $permisotrabajo = $this->model->byUuid($uuid)->firstOrFail();

        $rules =
            [
                'observaciones' => 'string',
                'inicio' => 'required|date_format:Y-m-d',
                'fin' => 'required|date_format:Y-m-d',
                'empleado_uuid' => 'uuid | required',
                'tipopermisotrabajo_uuid' => 'uuid | required'
            ];

        if ($request->method() == 'PATCH')
        {
            [
                'observaciones' => 'sometimes |string',
                'inicio' => 'sometimes |required|date_format:Y-m-d',
                'fin' => 'sometimes |required|date_format:Y-m-d',
                'empleado_uuid' => 'uuid | required',
                'tipopermisotrabajo_uuid' => 'uuid | required'
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

        $permisotrabajo->update(
            [
                'observaciones' => isset($request['observaciones']) ? $request['observaciones'] : $permisotrabajo->observaciones,
                'inicio' => isset($request['inicio']) ? $request['inicio'] : $permisotrabajo->inicio,
                'fin' => isset($request['fin']) ? $request['fin'] : $permisotrabajo->fin,
                'empleado_uuid' => isset($request['empleado_uuid']) ? $request['empleado_uuid'] : $permisotrabajo->empleado_uuid,
                'tipopermisotrabajo_uuid' => isset($request['tipopermisotrabajo_uuid']) ? $request['tipopermisotrabajo_uuid'] : $permisotrabajo->tipopermisotrabajo_uuid,
            ]
        );

        return $this->response->item($permisotrabajo->fresh(), new PermisoTrabajoTransformers());

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $uuid
     * @return \Illuminate\Http\Response
     */
    public function destroy($uuid)
    {
        $permisotrabajo = $this->model->byUuid($uuid)->firstOrFail();
        $permisotrabajo->delete();

        return $this->response->accepted('Eliminado Permiso de Trabajo con uuid: '.$uuid);

    }
}
