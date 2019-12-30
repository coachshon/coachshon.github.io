Ext.define('App.view.hco.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.hcoshow',


    // tap on affiliate list item
    onChildActivate: function (dataview, location) {
        var record = location.record;  
        if (record) {
            this.redirectTo('contact/' + record.get('CUST_KEY') + '/affiliate');
           // this.redirectTo(record);
        }
    },
    
    onRecordChange: function (view, record) {        
       
        //load the bound stores        
        if (record) {
            var me = this,
           view = me.getView(),
           vm = me.getViewModel(),
           references = me.getReferences(),
           panel = references.sales,
           chart = references.saleschart,
           level = record.get('HIER_LEVEL_CODE'),
           levelUser = App.app.loggedInUser.HIER_LEVEL_JOIN,
           params = {
               key: record.get('ACCT_KEY'),
               level: level
           },
           title = App.locale.Language.accounts.show.title[App.app.currentLocale];


            panel.mask({ xtype: 'loadmask' })

            vm.getStore('brands').removeAll();
            vm.getStore('affiliates').removeAll();
            if (chart) {
                panel.remove(chart);
            }

            if (level !== levelUser) {
                title = title + ' ' + ' (' + level + ')';
            }
            view.setTitle(title);

            vm.getStore('brands').load({
                params: params
            });
            vm.getStore('sales').load({
                params: params,       
                callback: function (response) {

                    //console.log(response)
                    if (response[0]) {                      
                        //dynamically create chart series based on data returned...
                        var data = response[0].data,
                            fields = ['id', 'DATE_KEY'],
                            colours = {                                
                                AROMASIN:'#00a950',
                                BESPONSA: '#a30054',
                                BOSULIF:'#f8971d',
                                IBRANCE:'#43278b',
                                INLYTA: '#c9cc31',
                                LORBRENA: '#f8a300',
                                SUTENT: '#cc004d',
                                TALZENNA: '#007ebb',
                                TORISEL: '#0093d0',
                                VIZIMPRO:'#7dba00',
                                XALKORI: '#2d4765' //'#152f4d'
                            },
                            myColours = [],
                            myFields = [],
                            mySeries = [];

                        // build new series
                        for (var field in data) {
                            if (Ext.Array.indexOf(fields, field) === -1){  
                                //this is a brand field
                                mySeries.push({
                                    type: 'line',
                                    axis: 'left',
                                    xField: 'DATE_KEY',
                                    showInLegend: true,
                                    marker: {
                                        radius: 1,
                                        lineWidth: 2,
                                        stroke: (colours[field]) ? colours[field] : '#000',
                                        fill: (colours[field]) ? colours[field] : '#000'
                                    },
                                    style: {
                                        stroke: (colours[field]) ? colours[field] : '#000',
                                        fill: (colours[field]) ? colours[field] : '#000'
                                    },
                                    yField: field,
                                    title: field   //legend text
                                });
                                myColours.push(colours[field]);
                                myFields.push(field);
                            }
                        }

                        chart = Ext.create('App.view.hco.sales.Chart');                        
                        chart.setSeries(mySeries);
                        chart.setColors(myColours);
                        chart.getAxes()[0].setFields(myFields);
                        panel.add(chart);
                    }

                    panel.unmask();
                }
            });

        }
        //load the record in 'App.view.widgets.ShowController'
        this.callParent(arguments);
    }
});
