Ext.define('App.view.hcp.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.hcpshow',

    
    onRecordChange: function (view, record) {       
        //load the bound stores       
        if (record) {           
            var me = this,
               view = me.getView(),
               vm = me.getViewModel(),
               storeBrands = vm.getStore('brands'),
               storePLPD = vm.getStore('brandsPLPD'),
               level = record.get('HIER_LEVEL_CODE'),
               key = record.get('CUST_KEY'),
               levelUser = App.app.loggedInUser.HIER_LEVEL_JOIN,
               title = App.locale.Language.contacts.show.title[App.app.currentLocale];
           
            if (level !='NATIONAL' && level !== levelUser) {
                title = title + ' ' + ' (' + level + ')';
            }
            view.setTitle(title);
            
            storeBrands.removeAll();
            storeBrands.load({
                    callback: function () {
                        this.filterBy(function(rec) { 
                            return rec.get('HIER_LEVEL_CODE') == level  && rec.get('CUST_KEY') == key;     
                        });                                        
                    }
                }); 
            
            storePLPD.removeAll();    
            storePLPD.load({
                callback: function () {
                    me.onLoadData(this);  // build carousel of brand PLPD data
                },
                params: {
                    key: key,
                    level: level,
                    plpd: 'Y'
                }
            });

        }
    
        //load the record in 'App.view.widgets.ShowController'
        this.callParent(arguments);
    },


    //on carousel card swipe 
    //set the title using the view model binding in DashboardToolbar  
    //load item stores
    onactiveItemchange: function (carousel, newActiveItem, oldActiveItem, eOpts) {
     
        if (newActiveItem && newActiveItem.down('hcp-plpd-chart')) {
            var me = this,
               chart = newActiveItem.down('hcp-plpd-chart'),
               chartStore = chart.getStore(),
               params = {
                     brand: newActiveItem.mybrand,
                     key: newActiveItem.mykey
                 };
            
            //set chart data
            if (!chartStore || chartStore.storeId === "ext-empty-store") {
                chartStore = Ext.create('App.store.hcp.PLPD');
                chart.setStore(chartStore);
                chartStore.load({
                    callback: function () {
                        me.setChartSeries(this, chart);
                    },
                    params: params
                });
            }
        }

    },

    //after brand store load configure the carousel cards...
    onLoadData: function (store) {       
        var me = this,
            references = me.getReferences(),
            panel = references.plpd;
            //add new carousel...
        if (panel) {
            var carousel = panel.down('carousel');
                // remove carousel...bug in carousel's remove items function
                if (carousel) {
                    panel.remove(carousel);
                }

                if (store.count() > 0) {
                    panel.mask({ xtype: 'loadmask' });
                    var key = store.first().get('CUST_KEY'),
                        brand,
                        items = [];

                // build cards...
                store.each(function (record) {
                    brand = record.get('BRAND_CODE');
                    items.push({
                        xtype: 'hcp-plpd-panel',
                        title: '<div class="' + brand + '">' + brand + '</div>',
                        mybrand: brand,
                        mykey: key
                    });
                });

                //add carousel
                panel.add({
                    xtype: 'hcp-plpd-carousel',
                    items: items
                });

                //load first chart data
               var carousel = panel.down('hcp-plpd-carousel'),
                   card = carousel.getActiveItem(),
                   brand = card.mybrand,
                   chart = card.down('hcp-plpd-chart'),
                   params = {
                       brand: brand,
                       key: key
                   },
                   chartStore = chartStore = Ext.create('App.store.hcp.PLPD');

                chart.setStore(chartStore);
                chartStore.load({
                    callback: function () {
                        me.setChartSeries(this, chart);
                        panel.unmask();
                    },
                    params: params
                });;

            }
        }
      
    },

    //add chart data
    setChartSeries: function (store, chart) {       
        if (store.count()>0) {
                //dynamically create chart series based on data returned...
            var data = store.first().data,
                fields=['id', 'CUST_KEY', 'PFIZER_BRAND_CODE', 'PLPD_PERIOD_CODE'],
                colours = {
                    AROMASIN: '#00a950',
                    BESPONSA: '#a30054',
                    BOSULIF: '#f8971d',
                    IBRANCE: '#43278b',
                    INLYTA: '#c9cc31',
                    LORBRENA: '#f8a300',
                    SUTENT: '#cc004d',
                    TALZENNA: '#007ebb',
                    TORISEL: '#0093d0',
                    VIZIMPRO: '#7dba00',
                    XALKORI: '#2d4765' //'#152f4d'
                },
                random=['#000', '#00003b', '#33003b', '#66003b', '#99003b'],
                myColours = [],
                myFields = [],
                mySeries = [],
                myRandom;
          
                // build new series
                for (var field in data) {
                    if (Ext.Array.indexOf(fields, field) === -1) {
                        //this is a brand field
                        myRandom=random.getRandomVal();
                        mySeries.push({
                            type: 'line',
                            axis: 'left',
                            xField: 'PLPD_PERIOD_CODE',
                            showInLegend: true,
                            marker: {
                                radius: 1,
                                lineWidth: 2,
                                stroke: (colours[field]) ? colours[field] : myRandom,
                                fill: (colours[field]) ? colours[field] : myRandom
                            },
                            style: {
                                stroke: (colours[field]) ? colours[field] : myRandom,
                                fill: (colours[field]) ? colours[field] : myRandom
                            },
                            yField: field,
                            title: field.split('_').join(' ')   //legend text
                        });
                        myColours.push((colours[field]) ? colours[field]: myRandom);
                        myFields.push(field);
                    }
                }

                chart.setSeries(mySeries);
                chart.setColors(myColours);
                chart.getAxes()[0].setFields(myFields);
                
            }        
    }


});
