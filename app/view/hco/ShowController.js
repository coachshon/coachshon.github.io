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
            key = record.get('ACCT_KEY'),
            levelUser = App.app.loggedInUser.HIER_LEVEL_JOIN,
            title = App.locale.Language.accounts.show.title[App.app.currentLocale],
            storeAffiliates= vm.getStore('affiliates'),
            storeBrands = vm.getStore('brands'),
            storeSales = vm.getStore('sales');

                panel.mask({ xtype: 'loadmask' })

                if (level !== levelUser) {
                    title = title + ' ' + ' (' + level + ')';
                }
                view.setTitle(title);

                storeAffiliates.removeAll();
                storeBrands.removeAll();

                //load the brands
                storeBrands.load({  // onLoadData listener will create carousel cards
                        callback: function () {
                            storeBrands.filterBy(function(rec) {  // apply level filter
                                return rec.get('HIER_LEVEL_CODE') == level  && rec.get('ACCT_KEY') == key;     
                            }); 
                                       
                        }
                    }); 
                    storeSales.clearFilter(true);  // true to supress "datachanged"
                    storeSales.load({
                        callback: function () {
                            storeSales.filterBy(function(rec) {  // apply level filter
                                return rec.get('ACCT_KEY') == key;     
                            });
                            var r=storeSales.first();
                            debugger;
                            if (r) {                      
                                //dynamically create chart series based on data returned...
                                var data = r.data,
                                    fields = ['id', 'DATE_KEY'],
                                    colours = {                                
                                        BRAND_A:'#00a950',
                                        BRAND_B1: '#a30054',
                                        BRAND_B2:'#f8971d',
                                        BRAND_C:'#43278b',
                                        BRAND_D: '#c9cc31',
                                        BRAND_E: '#f8a300',
                                        BRAND_F: '#cc004d',
                                        BRAND_G: '#007ebb',
                                        BRAND_H: '#0093d0',
                                        BRAND_I:'#7dba00',
                                        BRAND_J: '#2d4765' //'#152f4d'
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
                    panel.unmask();    
        }
        //load the record in 'App.view.widgets.ShowController'
        this.callParent(arguments);
    }
});
