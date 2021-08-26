<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

return [
    // Global settings
    'aliases' => [
        '@basePath' => getenv('CRAFTENV_BASE_PATH'),
        '@baseUrl' => getenv('CRAFTENV_BASE_URL'),
        '@defaultSiteUrl' => getenv('DEFAULT_SITE_URL'),
        '@baseUploadsUrl' => getenv('BASE_UPLOADS_URL'),
    ],
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 0,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => App::env('SECURITY_KEY'),

        // Personal Preferences
        'useProjectConfigFile' => true,
        'sendPoweredByHeader' => false,
        'enableCsrfProtection' => true,
    ],

    // Dev environment settings
    'dev' => [
        // Dev Mode (see https://craftcms.com/guides/what-dev-mode-does)
        'devMode' => true,

        // Prevent crawlers from indexing pages and following links
        'disallowRobots' => true,

        // Disable {% cache %} tags
        'enableTemplateCaching' => false,
    ],

    // Staging environment settings
    'staging' => [
        // Set this to `false` to prevent administrative changes from being made on Staging
        'allowAdminChanges' => true,

        // Don’t allow updates on Staging
        'allowUpdates' => false,

        // Prevent crawlers from indexing pages and following links
        'disallowRobots' => true,
    ],

    // Production environment settings
    'production' => [
        // Set this to `false` to prevent administrative changes from being made on Production
        'allowAdminChanges' => true,

        // Don’t allow updates on Production
        'allowUpdates' => false,
    ],
];
