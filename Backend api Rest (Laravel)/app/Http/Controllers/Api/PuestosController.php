<?php

namespace App\Http\Controllers\Api;

use App\Entities\Puesto;
use App\Http\Controllers\Controller;
use App\Transformers\PuestoTransformers;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PuestosController extends Controller
{

    use Helpers;

    protected $model;

    public function __construct(Puesto $model)
    {
        $this->model = $model;
        $this->middleware('permission:List puestos')->only('index');
        $this->middleware('permission:List puestos')->only('show');
        $this->middleware('permission:Create puestos')->only('store');
        $this->middleware('permission:Update puestos')->only('update');
        $this->middleware('permission:Delete puestos')->only('destroy');
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

        return $this->response->paginator($paginator, new PuestoTransformers());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules =
            [
                'nombre' => 'string | required',
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

        $puesto = $this->model->create($request->all());

        return $this->response->item($puesto, new PuestoTransformers());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $uuid
     * @return \Illuminate\Http\Response
     */
    public function show($uuid)
    {
        $puesto = $this->model->byUuid($uuid)->firstOrFail();
        return $this->response->item($puesto, new PuestoTransformers());
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
        $puesto = $this->model->byUuid($uuid)->firstOrFail();
        $rules =
            [
                'nombre' => 'string',
            ];
        if ($request->method() == 'PATCH')
        {
            $rules =
                [
                    'nombre' => 'sometimes | string',
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

        $puesto->update(
            [
                'nombre' => isset($request['nombre']) ? $request['nombre'] : $puesto->nombre,
            ]
        );

        return $this->response->item($puesto->fresh(), new PuestoTransformers());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($uuid)
    {
        $puesto = $this->model->byUuid($uuid)->firstOrFail();
        $puesto->delete();

        // return $this->response->accepted('Eliminado tipo de permiso de trabajo con uuid: '.$uuid);
        return response()->json(['message' => 'Eliminado puesto de trabajo', 'uuid' => $uuid]);
    }
}
