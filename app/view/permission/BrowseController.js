Ext.define('App.view.permission.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.permissionbrowse',

    onChildActivate: function (dataview, location) {
        var me = this,
            record = location.record;
        if (record) {
            // this.redirectTo(record);
            me.redirectTo('permission/' + record.get('FI_GUI_KEY') + '/edit');
        }
    },
    onCreate: function () {
        this.redirectTo('permission/create');
    }
});
