Ext.define('App.view.hcp.plpd.PLPD', {
    extend: 'Ext.Panel',
    xtype: 'hcp-plpd',
    iconCls: 'x-fa fa-pencil-square-o',
    ui: 'block',
    minHeight: 150,
    layout: 'fit',
    items: [],
    initialize: function () {
        var me = this;

        me.setTitle(App.locale.Language.contacts.plpd.title[App.app.currentLocale]);

        me.callParent(arguments);
    }

});
