/// <reference path="Browse.js" />
Ext.define('App.view.hcp.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'contactshow',
    requires: [
     'App.view.hcp.Brand',
    
     'App.view.hcp.ShowController',
     'App.view.hcp.ShowModel',
     'App.view.hcp.ShowTools'
    ],

    controller: 'hcpshow',
    viewModel: {
        type: 'hcpshow'
    },
    items: {
        header: {
            items: {
                title: {
                    tpl: [
                   '<div>',
                       '<div class="icon x-fa fa-user"></div>',
                       '<div class="name">{NAME_DISPLAY}</div>',
                       '<div class="details">',
                        '<div class="desc"><tpl if="CCV_ID">{CCV_ID}</tpl></div> ',
                        '<div class="desc">{SPECIALTY}</div>',
                        '<div class="desc">{ACCT_NAME_DISPLAY}</div>',
                        '<div class="item-caption">{ADDRESS}, {CITY}</div>',
                       '</div>',
                   '</div>'
                    ]
                }
            }
        },
        tools: {
            xtype: 'hcpshowtools',
            weight: -5
        },
        content: {
            items: {
                left: {
                    items: {
                        brands: {
                            xtype: 'hcp-brand',
                            reference: 'brands'
                        }
                    }
                }
            }
        }
    },
    initialize: function () {
        me = this;

        me.getViewModel().set({
            title: App.locale.Language.contacts.show.title[App.app.currentLocale]
        });
        
        me.callParent(arguments);
    }
});
