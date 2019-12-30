Ext.define('App.view.glance.Glance', {
    extend: 'Ext.Panel',
    xtype: 'glance',
    requires: [
        'App.view.glance.sales.Sales',
        'App.view.glance.summary.Benchmarks',
        'App.view.glance.summary.Metrics'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    scrollable: true,
    height: '95%',

    initialize: function () {
        var me = this;


        me.setItems([{
            xtype: 'panel',
            ui: 'block summary',            
            margin: 5,
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            responsiveConfig: {
                'width < 400': {
                    height: 170
                },
                'width > 400': {
                    height: 180
                },
                'width > 600': {
                    height: 170
                }
            },
            items: [{
                xtype: 'glance-summary-metrics',
                title: App.locale.Language.dashboard.summary.title[App.app.currentLocale],
                iconCls: 'x-fa fa-signal',
                header: {
                    items: {
                        deletebenchmarks: {
                            xtype: 'button',
                            handler: 'ontapSummaryDelete',
                            iconCls: 'x-fa fa-minus-circle',
                            ui: 'block delete',
                            bind: {
                                hidden: '{isBenchmarksHidden}'
                            }
                        },
                        addbenchmarks: {
                            xtype: 'button',
                            handler: 'ontapSummaryAdd',
                            iconCls: 'x-fa fa-plus-square',
                            ui: 'block'
                        }
                    }
                }
            }, {
                xtype: 'component',
                margin: '0, 0, 0, 25',
                tpl: [
                     '<div><span class="x-fa fa-calendar"></span> {datamonth}</div>'
                ],
                bind: {
                    data: {
                        datamonth: '{datamonth}'
                    }
                }
            }]

        }, {
            xtype: 'glance-summary-benchmarks',
            bind: {
                hidden: '{isBenchmarksHidden}'
            }
        }, {
            title: App.locale.Language.dashboard.sales.title[App.app.currentLocale],
            iconCls: 'x-fa fa-line-chart',
            xtype: 'glance-sales-sales',
            header: {
                items: {
                    month: {
                        pressed: true,
                        xtype: 'button',
                        action: 'month',
                        iconCls: 'x-fa fa-area-chart',
                        handler: 'ontapSalesPeriod',
                        ui: 'block'
                    },
                    cumulative: {
                        xtype: 'button',
                        action: 'cumulative',
                        iconCls: 'x-fa fa-line-chart',
                        handler: 'ontapSalesPeriod',
                        ui: 'block'
                    }
                }
            }
        }]);

        me.callParent(arguments);
    }
});

