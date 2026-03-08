<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // ── Permissions ──────────────────────────────────────────
        $permissions = [
            // Dashboard
            'view dashboard',

            // Analytics
            'view analytics',
            'export analytics',

            // Reports
            'view reports',
            'create reports',
            'delete reports',

            // Users (tenant admin only)
            'view users',
            'invite users',
            'remove users',
            'assign roles',

            // Settings
            'view settings',
            'edit settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ── Roles ─────────────────────────────────────────────────

        // Viewer — read only
        $viewer = Role::firstOrCreate(['name' => 'viewer']);
        $viewer->syncPermissions([
            'view dashboard',
            'view analytics',
            'view reports',
        ]);

        // Analyst — can generate reports
        $analyst = Role::firstOrCreate(['name' => 'analyst']);
        $analyst->syncPermissions([
            'view dashboard',
            'view analytics',
            'export analytics',
            'view reports',
            'create reports',
        ]);

        // Admin — manages team
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(Permission::all());

        // Super Admin — god mode (cross-tenant)
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdmin->syncPermissions(Permission::all());

        // ── Demo Tenant + Users ────────────────────────────────────
        $tenant = Tenant::firstOrCreate(
            ['slug' => 'demo'],
            ['name' => 'Demo Company', 'plan' => 'pro']
        );

        $superAdminUser = User::firstOrCreate(
            ['email' => 'superadmin@insightflow.test'],
            [
                'tenant_id' => $tenant->id,
                'name'      => 'Super Admin',
                'password'  => \Hash::make('1111'),
            ]
        );
        $superAdminUser->assignRole('super-admin');

        $adminUser = User::firstOrCreate(
            ['email' => 'admin@insightflow.test'],
            [
                'tenant_id' => $tenant->id,
                'name'      => 'Tenant Admin',
                'password'  => \Hash::make('1212'),
            ]
        );
        $adminUser->assignRole('admin');

        $analystUser = User::firstOrCreate(
            ['email' => 'analyst@insightflow.test'],
            [
                'tenant_id' => $tenant->id,
                'name'      => 'Data Analyst',
                'password'  => \Hash::make('1234'),
            ]
        );
        $analystUser->assignRole('analyst');

        $viewerUser = User::firstOrCreate(
            ['email' => 'viewer@insightflow.test'],
            [
                'tenant_id' => $tenant->id,
                'name'      => 'Viewer User',
                'password'  => \Hash::make('12345'),
            ]
        );
        $viewerUser->assignRole('viewer');

        $this->command->info('✅ Roles, permissions and demo users seeded!');
    }
}