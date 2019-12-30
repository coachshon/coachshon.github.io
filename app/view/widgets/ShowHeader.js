Ext.define('App.view.widgets.ShowHeader', {
    extend: 'Ext.Container',
    xtype: 'showheader',

    cls: 'show-header',
    weighted: true,

    layout: {
        type: 'hbox',
        align: 'end'
    },

    items: {
        title: {
            xtype: 'component',
            userCls: 'header-title',
            flex: 1,
            bind: {
                record: '{record}'
            }
        }
    }
});
