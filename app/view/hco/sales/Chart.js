
Ext.define('App.view.hco.sales.Chart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'hco-sales-chart',
    reference: 'saleschart',
    ui: 'block summary',
    height: 340,
    margin: 10,
    innerPadding: '10 10 0 0',
    bind: '{sales}',
    legend: {
        type: 'sprite',
        docked: 'bottom'
    },
    axes: [{
        type: 'numeric',
        position: 'left',
        minimum: 0,
        fields: [],
        renderer: function (axis, value) {
            var val = Math.abs(value);
            var d = val > 999999 ? 1000000 : val > 999 ? 1000 : 1,
                s = val > 999999 ? 'M' : val > 999 ? 'K' : '$';

            return Ext.util.Format.number(String(value / d), '0,000') + s;
        }
    }, {
        type: 'category',
        position: 'bottom',
        fields: ['DATE_KEY'],
        title: false,
        label: {
            rotate: {
                degrees: -90
            }
        }
    }],
    series: []
 


});
