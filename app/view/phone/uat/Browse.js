Ext.define('App.view.phone.uat.Browse', {
    extend: 'App.view.uat.Browse',
    // xtype: 'uatbrowse', -- set by profile

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
        bind: '{uats}',
        indexBar: true,
        striped: true,
        grouped: true,
        ui: 'listing',

        selectable: {
            disabled: true
        },
        itemTpl: [
           '<div class="item-details">',
           '<div class="item-title">{CREATION_USER}</div>',
               '<div class="item-caption">{STATUS}</div>',
               '<div class="item-caption">{ISSUE}</div>',
               '<div class="item-caption">{STEPS}</div>',
           '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }
    }]
});
