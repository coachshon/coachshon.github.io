Ext.define('App.view.uat.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.uatwizard',
    data: {
        record: null,
        store: null
    },
    
    stores: {
        status: {
                type: 'uat-status'
            }
    }
});
