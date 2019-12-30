
Ext.define('App.view.glance.summary.Metrics', {
    extend: 'Ext.Panel',
    xtype: 'glance-summary-metrics',
    ui: 'block summary',
    responsiveConfig: {
        'width < 400': {
            height: 150
        },
        'width > 400': {   //iphone 8 plus
            height: 160
        },
        'width > 600': {
            height: 150
        }
    },
    scrollable: false,
    initialize: function () {
        var me = this;
        //note: store will be set and loaded when this list is the active card...onactiveItemchange
        me.setItems([{
            xtype: 'list',
            width: '100%',
            ui: 'summary',
            itemTpl: [
                   '<div class="show-container">',
                     '<div class="show-item">',
                        '<div>' + App.locale.Language.dashboard.metrics.salesmat[App.app.currentLocale] + '{SALES_MAT}</div>',
                        '<div>' + App.locale.Language.dashboard.metrics.sales[App.app.currentLocale] + '{SALES}</div>',
                        '<div>' + App.locale.Language.dashboard.metrics.attainment[App.app.currentLocale] + '{ATTAINMENT}</div>',
                        '<div>' + App.locale.Language.dashboard.metrics.growth[App.app.currentLocale] + '{SALES_GROWTH}</div>',
                    '</div>',
                     '<div class="show-item">',
                        '<div>' + App.locale.Language.dashboard.metrics.callreach[App.app.currentLocale] + '{CALL_REACH}</div>',
                        '<div>' + App.locale.Language.dashboard.metrics.callfreq[App.app.currentLocale] + '{CALL_FREQ}</div>',
                        '<div>' + App.locale.Language.dashboard.metrics.percplan[App.app.currentLocale] + '{PERCENT_PLAN}</div>',
                        '<div>' + App.locale.Language.dashboard.metrics.growthreq[App.app.currentLocale] + '{REQ_GROWTH}</div>',
                     '</div>',
                   '</div>'                
            ]
        }]);

        me.callParent(arguments);
    }
});