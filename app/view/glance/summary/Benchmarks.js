Ext.define('App.view.glance.summary.Benchmarks', {
    extend: 'Ext.Panel',
    xtype: 'glance-summary-benchmarks',
    requires: [
    'App.view.glance.summary.SummaryController'
    ],
    controller: 'glance-summary',
    ui: 'block summary',
    height: 215,
    margin: 5,
    layout: {
        type: 'card',
        // The controller inserts this indicator in our bbar
        // and we publish the active index and card count
        // so we can easily disable Next/Prev buttons.
        indicator: {
            // reference: 'indicator',
            maxWidth: '160px',
            tapMode: 'item',
            publishes: [
                'activeIndex',
                'count'
            ]
        }
    },
    listeners: {
        activeItemchange: 'onactiveItemchange'
    },
     bbar: {
            reference: 'bbar',
            items: [{
                reference: 'btprevious',
                text: '&laquo; Previous',
                handler: 'onPrevious',
                disabled: true
            },
                // the indicator is inserted here
                    {
                        reference: 'btnext',
                        text: 'Next &raquo;',
                        handler: 'onNext'
                    }]
        }

    });


