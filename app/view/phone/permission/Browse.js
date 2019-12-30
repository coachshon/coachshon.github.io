Ext.define('App.view.phone.permission.Browse', {
    extend: 'App.view.permission.Browse',
    // xtype: 'permissionbrowse', -- set by profile

    header: {
        items: {
            create: {
                xtype: 'button',
                iconCls: 'x-fa fa-plus',
                handler: 'onCreate',
                weight: 10
            }
        }
    },

    items: [{
        xtype: 'list',
        bind: '{permissions}',
        indexBar: true,
        striped: true,
        grouped: true,
        ui: 'listing',

        selectable: {
            disabled: true
        },
        /*
        plugins: [{
            type: 'listswiper',
            right: [{
                iconCls: 'x-fa fa-pencil',
                commit: 'onEditAction',
                text: 'Edit',
                ui: 'edit'
            }]
        }],*/

        itemTpl: [
           '<div class="item-details">',
               '<div class="item-title">{LOGIN_ID}</div>',
               '<div class="item-caption">{EMAIL}</div>',
               '<div class="item-caption">{GROUP_NAME}</div>',
           '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
