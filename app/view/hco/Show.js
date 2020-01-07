Ext.define('App.view.hco.Show', {
    extend: 'App.view.widgets.Show',
    xtype: 'accountshow',
    requires: [
     'App.view.hco.ShowController',
     'App.view.hco.ShowModel',
     'App.view.hco.ShowTools',
     'App.view.hco.Affiliate',
     'App.view.hco.Brand', 
     'App.view.hco.sales.Sales', 'App.view.hco.sales.Chart'
    ],
    controller: 'hcoshow',
    viewModel: {
        type: 'hcoshow'
    },
    items: {
        header: {
            items: {
                title: { 
                    tpl: [
                    '<div>',
                        '<div class="icon x-fa fa-hospital-o"></div>',
                        '<div class="name">{NAME_DISPLAY}</div>',
                        '<div class="details">',
                            '<div class="desc"><tpl if="CCV_ID">{CCV_ID}</tpl></div> ',
                            '<div class="item-caption">{ADDRESS}, {CITY}</div>',
                        '</div>',
                    '</div>'
                    ]
                }
            }
        },
        tools: {
            xtype: 'hcoshowtools',
            weight: -5
        },
        content: {
            items: {
                left: {
                    items: {
                        affiliates: { 
                            hidden: true,
                            xtype: 'hco-affiliate',
                            reference: 'affiliates'
                        },
                       brands: {
                           xtype: 'hco-brand',
                           reference: 'brands'
                       },
                       sales: {
                           xtype: 'hco-sales',
                           reference: 'sales'
                       }
                    }
                }
            }
        }
    }
});
