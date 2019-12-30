
Ext.define('App.view.hco.Affiliate', {
    extend: 'Ext.Panel',
    xtype: 'hco-affiliate',
    controller: 'hcoshow',
    viewModel: {
        data: {
            title: ''
        }
    },
    bind: {
        title: '{title}'
    },
    iconCls: 'x-fa fa-users', 
    header: {
        items: [{
            xtype: 'button',
            userCls: 'x-item-no-tap',
            ui: 'block',
            bind: {
                text: '{affiliates.totalCount? affiliates.totalCount : "0"}'
            }
        }]
    },
    items: [{
        xtype: 'list',
        bind: '{affiliates}',
        ui: 'details',
        minHeight: 80,       
        itemTpl: [
            '<div class="item-details">',
                '<div class="item-title">{NAME_DISPLAY}</div> ',
                '<div class="item-caption">{SPECIALTY}</div>',
                '<div class="item-caption">{ADDRESS}, {CITY}</div>',
            '</div>'
        ],

        listeners: {
            childtap: 'onChildActivate'
        }

    }],
    initialize: function () {
        me = this;

        me.getViewModel().set({
            title: App.locale.Language.accounts.affiliates.title[App.app.currentLocale]
        });

        me.callParent(arguments);
    }
});
