
Ext.define('App.view.hcp.plpd.Chart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'hcp-plpd-chart',
    ui: 'block',
    height: 340,
    margin: 10, 
    innerPadding: '10 10 0 0',
    bind: '{plpd}',
    legend: {
        type: 'sprite',
        docked: 'bottom'
    },
    axes: [{
        type: 'numeric',
        position: 'left',
        fields: []
    }, {
        type: 'category',
        position: 'bottom',
        fields: ['PLPD_PERIOD_CODE'],
        title: false,
        label: {
            rotate: {
                degrees: -90
            }
        }
    }],
    series: []


});
