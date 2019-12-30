Ext.define('App.view.widgets.Browse', {
    extend: 'Ext.Panel',
    xtype: 'browse',
    layout: 'fit',
    requires: [
       'App.view.widgets.BrowseController',
       'App.view.widgets.BrowseToolbar'
    ],
    config: {
        route: null,
        store: null,
        fields: {
            search: {
                property: '#search',
                defaultValue: null
            }
        }
    },

    eventedConfig: {
        /**
         * Make the config trigger an event on change to allow the controller to monitor it.
         * https://www.sencha.com/blog/using-sencha-ext-config/
         */
        route: null,
        store: null
    },

    controller: 'browse',
    viewModel: {
        data: {
            filters: null
        }
    }
});
