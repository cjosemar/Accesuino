<?php

namespace App\Http\Controllers\Api\Users;

use App\Entities\Permission;
use App\Entities\Role;
use Illuminate\Http\Request;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use App\Transformers\Users\PermissionTransformer;
use Illuminate\Validation\ValidationException;

/**
 * Class PermissionsController.
 */
class PermissionsController extends Controller
{
    use Helpers;

    /**
     * @var
     */
    protected $model;

    /**
     * PermissionsController constructor.
     *
     * @param Permission $model
     */
    public function __construct(Permission $model)
    {
        $this->model = $model;
        $this->model = $model;
        $this->middleware('permission:List permissions')->only('index');
        $this->middleware('permission:List permissions')->only('show');
        $this->middleware('permission:Assign permissions')->only('assign');
        $this->middleware('permission:Revoke permissions')->only('revoke');
    }

    /**
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function index(Request $request)
    {
        $paginator = $this->model->paginate($request->get('limit', config('app.pagination_limit')));
        if ($request->has('limit')) {
            $paginator->appends('limit', $request->get('limit'));
        }

        $a = Permission::all();

        return $this->response->paginator($paginator, new PermissionTransformer());
    }

    public function show($id) {
        $permission = $this->model->byUuid($id)->firstOrFail();
        return $this->response->item($permission, new PermissionTransformer());
    }

    public function assign(Request $request) {
        try {
            $this->validate($request, [
                'rol' => 'required | string',
                'permission' => 'required | string'
            ]);
        } catch (ValidationException $e) {
            return $e;
        }

        $role = Role::where('name', $request['rol'])->firstOrFail();

        return $role->givePermissionTo($request->permission);

    }

    public function revoke(Request $request) {
        try {
            $this->validate($request, [
                'rol' => 'required | string',
                'permission' => 'required | string'
            ]);
        } catch (ValidationException $e) {
            return $e;
        }

        $role = Role::where('name', $request['rol'])->firstOrFail();

        return $role->revokePermissionTo($request->permission);
    }
}
