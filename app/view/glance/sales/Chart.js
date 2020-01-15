Ext.define('App.view.glance.sales.Chart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'glance-sales-chart',
    hidden: true,
    ui: 'block summary',
    height: 340,
    margin: 10,
    innerPadding: '10 0 0 0',
    /*
   // https://fiddle.sencha.com/#fiddle/2bsj&view/editor
    interactions: ['crosszoom', {
        type: 'iteminfo',
        listeners: {
            show: function (me, item, panel) {
                panel.setHtml('Data: ' + item.record.get('ATTAINMENT'))
            }
        }
    }],
    
    
     chart.setColors(['red','blue','green']);
                chart.redraw();
                
                legend: {
                            xtype: 'legend',
                            docked: 'bottom',
                            itemId: 'pie_legend',
                            itemTpl: [
                                '<span class="x-legend-item-marker {[values.disabled?\'x-legend-inactive\':\'\']}" style="background:{mark};"></span>{name}'
                            ],
                            maxItemCache: 100,
                            store: 'element'
                        }
                    }
                */
    legend: {
        type: 'dom',
        docked: 'top',
        itemTpl: [
            '<span class="',
            Ext.baseCSSPrefix,
            'legend-item-marker " style="background:{mark};"></span>{name}'
        ]
    },
    colors: ['#0c93b5', '#0cbf87', '#000'], //, '#175f6b'
    axes: [{
        type: 'numeric',
        position: 'left',
        minimum: 0,
        title: false,
        fields: ['SALES', 'QUOTA'],
        renderer: function (axis, value) {
            var val = Math.abs(value);
            var d = val > 999999 ? 1000000 : val > 999 ? 1000 : 1,
                s = val > 999999 ? 'M' : val > 999 ? 'K' : '$';

            //return Ext.util.Format.number(String(value / d), '0,000.00') + s;
            return (value / d).toString() + s;
            
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
    series: [
    {
        type: 'bar',
        axis: 'left',
        xField: 'DATE_KEY',
        yField: 'SALES',
        showInLegend: true,
        title: 'SALES',  //legend text
        style: {
            stroke: '#0c93b5',
            fill: '#0c93b5'
        },
        label: {
            display: 'insideStart',
            field: ['ATTAINMENT'],
            orientation: 'vertical',
            font: 'bold 14px/150% helvetica, arial, sans-serif',
            fill: '#000',
           // 'text-anchor': 'middle',
            renderer: function (value) {
                if (value) {
                    return value +'%'; 
                } else {
                    return value;
                }
               
            }
        }
    },
    {
        type: 'line',
        axis: 'left',
        xField: 'DATE_KEY',
        yField: 'QUOTA',
        showInLegend: true,
        title: 'QUOTA',  //legend text
        marker: {
            radius: 1,
            lineWidth: 5
        },
        style: {
            stroke: '#0cbf87',
            fill: '#0cbf87'
        }
    },{ hidden: true,
        type: 'line',
        axis: 'left',
        xField: 'DATE_KEY',
        yField: 'ATTAINMENT',
        showInLegend: true,
        title: 'ATTAINMENT'  //legend text       
    }]

});


