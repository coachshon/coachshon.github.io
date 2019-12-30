Ext.define('App.view.uat.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.uatbrowse',

    onChildActivate: function (dataview, location) {
        var me = this,
            record = location.record;
        if (record) {
            // this.redirectTo(record);
            me.redirectTo('uat/' + record.get('RECORD_ID') + '/edit');
        }
    },
    onCreate: function () {
        this.redirectTo('uat/create');
    }
});
