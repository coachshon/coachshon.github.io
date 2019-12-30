Ext.define('App.view.permission.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.permissionwizard',

    data: {
        record: null,
        store: null
    },
    
    stores: {
        groups: {
            type: 'permission-groups'
        }
    }
});
