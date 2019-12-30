/// <reference path="Browse.js" />
Ext.define('App.view.hcp.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'contactshow',
    requires: [
     'App.view.hcp.Brand',
     'App.view.hcp.plpd.PLPD',
     'App.view.hcp.plpd.Carousel',
     'App.view.hcp.plpd.Panel',
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
                        search: {
                            hidden: true,
                            xtype: 'google-search'
                        },
                        brands: {
                            xtype: 'hcp-brand',
                            reference: 'brands'
                        },
                        plpd: {
                            xtype: 'hcp-plpd',
                            reference: 'plpd'
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
