<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Installation\AppInstallationService;

class InstallApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install Base Application';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $service = app(AppInstallationService::class);
        $this->info('Bienvenido al instalador de ACCESDUINO, proporcione la siguiente información');
        $name = $this->ask('Introduzca el nombre del administrador. (Administrator)');
        $email = $this->ask('Introduzca el email del administrador. (admin@admin.com)');
        $password = $this->ask('Introduzca password del administrador. Mínimo 8 caracteres.');
        if (strlen($password) < 8) {
            $this->error('Longitud de password no puede ser inferior a 8 caracteres');
            return false;
        }
        $this->info('Instalando aplicación.');
        $service->installApp([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);
        $this->info('Aplicación instalada correctamente');
        $this->info('####################################');
        $this->info('Nombre: ' . $name);
        $this->info('Email: ' . $email);
        $this->info('password: ' . $password);
        $this->info('####################################');
    }
}
