<?php

namespace App\Services\Installation;

use App\Entities\Assets\Asset;
use Closure;
use App\Entities\Role;
use App\Entities\User;
use App\Entities\Permission;
use App\Entities\Datos;
use Illuminate\Validation\ValidationException;
use App\Services\Installation\Events\ApplicationWasInstalled;
use Ramsey\Uuid\Uuid;

/**
 * Class InstallAppHandler.
 */
class InstallAppHandler
{
    /**
     * @var array|\Illuminate\Support\Collection
     */
    public $roles = [
        [
            'name' => 'Administrator'
        ],
    ];

    /**
     * @var array|\Illuminate\Support\Collection
     */
    public $permissions = [
        'users' => [
            ['name' => 'List users'],
            ['name' => 'Create users'],
            ['name' => 'Delete users'],
            ['name' => 'Update users'],
        ],
        'roles' => [
            ['name' => 'List roles'],
            ['name' => 'Create roles'],
            ['name' => 'Delete roles'],
            ['name' => 'Update roles'],
        ],
        'permissions' => [
            ['name' => 'List permissions'],
            ['name' => 'Assign permissions'],
            ['name' => 'Revoke permissions'],
        ],
        'datos' => [
            ['name' => 'List datos'],
            ['name' => 'Create datos'],
            ['name' => 'Delete datos'],
            ['name' => 'Update datos'],
        ],
        'puestos' => [
            ['name' => 'List puestos'],
            ['name' => 'Create puestos'],
            ['name' => 'Delete puestos'],
            ['name' => 'Update puestos'],
        ],
        'horarios' => [
            ['name' => 'List horarios'],
            ['name' => 'Create horarios'],
            ['name' => 'Delete horarios'],
            ['name' => 'Update horarios'],
        ],
        'tipospermisotrabajo' => [
            ['name' => 'List tipoPermiso'],
            ['name' => 'Create tipoPermiso'],
            ['name' => 'Delete tipoPermiso'],
            ['name' => 'Update tipoPermiso'],
        ],
        'permisostrabajo' => [
            ['name' => 'List permisosTrabajo'],
            ['name' => 'Create permisosTrabajo'],
            ['name' => 'Delete permisosTrabajo'],
            ['name' => 'Update permisosTrabajo'],
        ],
        'registros' => [
            ['name' => 'List registros'],
            ['name' => 'Create registros'],
            ['name' => 'Delete registros'],
            ['name' => 'Update registros'],
        ],
        'empleados' => [
            ['name' => 'List empleados'],
            ['name' => 'Create empleados'],
            ['name' => 'Delete empleados'],
            ['name' => 'Update empleados'],
        ],
        'reportes' => [
            ['name' => 'Run reportes']
        ]
    ];

    /**
     * @var
     */
    public $adminUser;

    /**
     * InstallAppHandler constructor.
     */
    public function __construct()
    {
        $this->roles = collect($this->roles);
        $this->permissions = collect($this->permissions);
    }

    /**
     * @param $installationData
     * @param \Closure $next
     * @return mixed
     */
    public function handle($installationData, Closure $next)
    {
        $this->createRoles()->createPermissions()->createAdminUser((array) $installationData)->assignAdminRoleToAdminUser()
            ->assignAllPermissionsToAdminRole();
        event(new ApplicationWasInstalled($this->adminUser, $this->roles, $this->permissions));

        return $next($installationData);
    }

    /**
     * @return $this
     */
    public function createRoles()
    {
        $this->roles = $this->roles->map(function ($role) {
            return Role::create($role);
        });

        return $this;
    }

    /**
     * @return $this
     */
    public function createPermissions()
    {
        $this->permissions = $this->permissions->map(function ($group) {
            return collect($group)->map(function ($permission) {
                return Permission::create($permission);
            });
        });

        return $this;
    }

    /**
     * @param array $attributes
     * @return $this
     * @throws ValidationException
     */
    public function createAdminUser(array $attributes = [])
    {
        $validator = validator($attributes, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);
        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
        $this->adminUser = User::create([
            'uuid' => Uuid::fromString('cfe59746-669d-42d7-a868-0ad257cf9b4a'),
            'name' => $attributes['name'],
            'email' => $attributes['email'],
            'password' => $attributes['password'],
        ]);

        $this->image = Asset::create([
            'user_id' => $this->adminUser['id'],
            'uuid' => Uuid::fromString('577b9518-fc37-4d61-91b4-77ad9b635097'),
            'type' => 'image',
            'path' => '466746b85e06aff739190a689dc809ce.png',
            'mime' => 'image/png'
        ]);

        $this->datosEmpresa = Datos::create([
            'uuid' => Uuid::fromString('6eda4847-591f-485b-bf9c-58d3b7b50a93'),
            'nombre' => 'Nombre empresa',
            'email' => 'email@empresa.com',
            'asset_uuid' => $this->image['uuid']

        ]);


        return $this;
    }



    /**
     * @return $this
     */
    public function assignAdminRoleToAdminUser()
    {
        $this->adminUser->assignRole('Administrator');

        return $this;
    }

    /**
     * @return $this
     */
    public function assignAllPermissionsToAdminRole()
    {
        $role = Role::where('name', 'Administrator')->firstOrFail();
        $this->permissions->flatten()->each(function ($permission) use ($role) {
            $role->givePermissionTo($permission);
        });

        return $this;
    }



}
