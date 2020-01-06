Ext.define('App.view.glance.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',
    listen: {
        controller: {
            '*': {  // listen to any fired event from any controller
                adddone: 'ontapSummaryAddDone',
                buildbenchmarks: 'buildBenchmarks',
                menudone: 'ontapMenuDone'
            }
        }
    },
    
    //load the dashboard brand store based on user default level value
    init: function (cmp) {        
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('brands'),
            params = { level: App.app.loggedInUser.HIER_LEVEL_JOIN };
        
        cmp.mask({ xtype: 'loadmask' });
        //load the brands
        store.load({  // onLoadData listener will create carousel cards
            callback: function () {
                store.filterBy(function(rec) {  // apply level filter
                    return rec.get('LEVEL_CODE') ==  App.app.loggedInUser.HIER_LEVEL_JOIN;  
                    //LEVEL_CODE: "NATIONAL",                  
                }); 
                cmp.unmask();
                me.onLoadData(store);                
            }
        });

    },

    // builds the summary benchmark items per glance card, and binds card indicatore navigation buttons
    buildBenchmarks: function(cardId){
        var me = this,
           vm = me.getViewModel(),
           isBenchmarksHidden = vm.get('isBenchmarksHidden');
      
            var carousel = me.getView().lookupReference('dashboard-carousel'),
                cards = carousel.query('glance-summary-benchmarks'),
                benchmarks = vm.get('benchmarks'), //set in ontapSummaryAddDone  
                count = benchmarks.length, 
                activeIndex, previous, next;

            if (count > 0) {//manage each benchmark panel
                cards.forEach(function (card) {
                    if (!cardId || card.id !== cardId) {  // delete me check...card is already configured
                        card.removeAll();
                        if (benchmarks) {
                            card.add(benchmarks);
                        }
                    }
                    // bind the buttons
                    activeIndex = card.getLayout().getIndicator()._activeIndex;
                    previous = (activeIndex == 0);
                    next = (activeIndex == count - 1);
                    
                    card.lookupReference('btprevious').setDisabled(previous);
                    card.lookupReference('btnext').setDisabled(next);
                });
            }
            
    },


    //set the viewmodel datamonth
    callbackDataMonth: function (response) {
        var me = this,
            json = JSON.parse(response.responseText),
            msg = json.d,                
            vm = me.getViewModel();
       
        vm.set({
            datamonth: msg
        });
    },



    //on carousel card swipe 
    //set the title using the view model binding in DashboardToolbar  
    //load item stores
    onactiveItemchange: function (carousel, newActiveItem, oldActiveItem, eOpts) {
        if (newActiveItem) {
            var summary = newActiveItem.down('glance-summary-metrics');
            if (summary) {               
                var me = this,
                    vm = me.getViewModel(),
                    brand= newActiveItem.mybrand,
                    level= newActiveItem.mylevel,
                    title= newActiveItem.mytitle
                             
                //set selected navigation...used in onLoadData
                vm.set({
                    title: title,
                    level: level,
                    brand: brand
                });               

                me.setGlanceDetails();
            }
        }

    },
    
    //after brand store load configure the dashboard's carousel cards...listener defined in viewmodel   
    onLoadData: function (store) {
        var me = this,
            view = me.getView(),
            carousel = view.down('carousel'),
            vm = me.getViewModel(),
            brand = vm.get('brand'),  // set from navigation brand list selection
            level = vm.get('level'),
            title = vm.get('title'),
            first = store.first(),
            items = [],
            ref, title;
        
        // remove items from dashboard...bug in carousel's remove items function
        if (carousel) {
            view.remove(carousel);
            //gets reset incorrectly on carousel remove..activeitemchange
            vm.set({
                title: title,
                level: level,
                brand: brand
            });
        }

        if (first) {   // add the at a glance cards, 1 card per brand           

            // build cards....
            store.each(function (record) {
                ref = record.get('LEVEL_CODE') + '-' + record.get('BRAND_CODE');    // used in navigation after nav\brand selection           
                items.push({
                    itemId: ref,  
                    mybrand: record.get('BRAND_CODE'),
                    mylevel: record.get('LEVEL_CODE'),
                    mytitle: record.get('LEVEL_NAME'),
                    xtype: 'glance'
                });
            });

            //add new carousel...
            view.add({
                xtype: 'glance-carousel',
                items: items
            });

            if (brand) {
                // try to navigate to selected/default brand...it may not be in the reloaded list
                me.setGlanceActiveItem(level + '-' + brand);
               
            } else {
                //default load
                title = first.get('LEVEL_NAME');
                level = first.get('LEVEL_CODE');
                brand = first.get('BRAND_CODE');

                //set selected navigation.
                vm.set({
                    title: title,
                    level: level,
                    brand: brand
                });
               
            }


            //set the active details...               
            me.setGlanceDetails();
            //and metric summary bench marks
            me.buildBenchmarks();
        }  // eo if(first)

    },    

    //loads the brand store after a navigation selection 
    onLoadGlance: function (title, level, brand) {       
        var me = this,
           vm = me.getViewModel(),
           store = vm.getStore('brands'),
           params = {
               level: level,
               brand: brand
           };


        //set selected navigation...used in onLoadData
        vm.set({
            title: title,
            level: level,
            brand: brand
        });
       

        store.getProxy().abort(); //stop any previous calls     
        // load store
        store.load({  // load listener in viewmodel - onLoadData
            params: params
        });
    },

    //display navigation tabpanel   
    ontapMenu: function (button) {       
        var me = this,
            menu = me.getView().down('glance-navigation-menu'),
            expand = !menu.getExpanded();
       
        if (expand) {
            button.setIconCls('x-fa fa-times');
            button.addCls('x-pressed');

        } else {
            button.setIconCls('x-fa fa-ellipsis-h');
            button.removeCls('x-pressed');
        }

        menu.setExpanded(expand);
        
    },

    // reload the carousel if level selection has changed
    // navigate to the brand if brand has changed  
    ontapMenuDone: function (mytitle, mylevel, mybrand) {       
        var me = this,
            view = me.getView(),
            menu = view.down('glance-navigation-menu'),
            tabpanel = menu.down('glance-navigation-tabpanel'),
            list = tabpanel.down('glance-navigation-list'),
            vm = me.getViewModel(),
            level = vm.get('level'),
            brand = vm.get('brand'),
            params = {
                level: mylevel,  
                brand: mybrand
            },
            button = view.lookupReference('btn-navigation-menu');
        
        button.setIconCls('x-fa fa-ellipsis-h');
        button.removeCls('x-pressed');
        //close menu
        list.deselectAll();  // so the nav menu will display the swiped brand level
        menu.setExpanded(false);
        if (level !== mylevel) {  //if level has changed then reload dashboard brands            
           me.onLoadGlance(mytitle, mylevel, mybrand);
        } else if (brand !== mybrand) { // if only brand has changed navigate to selected brand  
          me.setGlanceActiveItem( mylevel + '-' + mybrand);  
        }

    },


    //load the sales based on selected period: month; cumulative
    ontapSalesPeriod: function (button) {

        var me = this,
            vm = me.getViewModel(),
            container = button.up('glance-sales-sales'),
            buttons = container.query('button'),
            sales = container.down('cartesian');
            store = sales.getStore(),
            level = vm.get('level'),
            brand = vm.get('brand'),
            action = button.action,
            params = {
                level: level,
                brand: brand,
                action: action
            }, 
            sprite = sales.getSprites()[0];

            sprite.text = App.locale.Language.dashboard.sales.sprite[action][App.app.currentLocale];

     Ext.Array.forEach(buttons, function (b) {
         b.setPressed(false);
     });
     button.setPressed(true);
  
     store.load({
         callback: function(){
             sales.setSprites(sprite);
             sales.redraw();
        },
        params: params
    });

    },

    //display benchmark selection panel  
    ontapSummaryAdd: function (button) {
        var me = this,
            menu = me.getView().down('glance-benchmark-menu'),
            panel = menu.down('glance-benchmark-panel'),
            tree = panel.down('glance-benchmark-tree'),
            store = tree.getStore(),
            expand = !menu.getExpanded();
            
        if (expand) {
            button.setIconCls('x-fa fa-times');
            button.addCls('x-pressed');
            
        } else {
            button.setIconCls('x-fa fa-plus-square');
            button.removeCls('x-pressed');            
        }
        menu.setExpanded(expand);     
      
    },

     // add benchmark selections...
    // builds array of benchmark objects 
    // stored in viewmodel
    // rebuild benchmark cards thru the carousel
    ontapSummaryAddDone: function (benchmarks)
    {
        var me = this,
            view=  me.getView(),
            menu = view.down('glance-benchmark-menu'),
            carousel = view.lookupReference('dashboard-carousel'),
            card = carousel.getActiveItem(),
            summary = card.down('glance-summary-metrics'),
            button = summary.down('#addbenchmarks');
       
        //close menu       
        menu.setExpanded(false);
        button.setIconCls('x-fa fa-plus-square');
        button.removeCls('x-pressed');
                
        if (benchmarks.length > 0) {
            var me = this,
                vm = me.getViewModel(),
                items = vm.get('benchmarks');

            //add selected benchmarks to viewmodel benchmarks array
            benchmarks.forEach(function (b) {
                var item = {
                    xtype: 'glance-summary-metrics',
                    iconCls: 'x-fa fa-signal',
                    title: b.get('text'),
                    code: b.get('code'),
                    header: {
                        items: {
                            deleteme: {
                                xtype: 'button',
                                handler: 'ontapSummaryDelete',
                                iconCls: 'x-fa fa-minus-circle',
                                ui: 'block delete'
                            }
                        }
                    }
                };
                items.push(item);
            });

            //get unique object array of benchmark items   
            var uniqueItems = items.unique('code');

            uniqueItems.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            });

            // set view model data
            vm.set({
                benchmarks: uniqueItems,  // used in buildBenchmarks
                isBenchmarksHidden: false
            });
            //add summary benchmark cards to at a glance
            me.buildBenchmarks();
        }      
    },
       
    //delete all summary benchmarks
    ontapSummaryDelete: function (button) {
        var me = this,
            vm = me.getViewModel();
   
        //reset view model
        vm.set({
            benchmarks: [],
            isBenchmarksHidden: true
        });

        me.buildBenchmarks();
    },
   
    //navigate to a specific brand card
    setGlanceActiveItem: function (ref) {
        try {
            var me = this,
               carousel = me.getView().lookupReference('dashboard-carousel');       
               ref = ref.replace(/\s/g, '');        
              
            carousel.setActiveItem(carousel.down('#' + ref))   
        }catch(e){
            //not found...reset the viewmodel brand     
            carousel.setActiveItem(0);         
        }      
    },

    //set the glance data details
    setGlanceDetails: function () {
        var me = this,
            vm = me.getViewModel(),
            level = vm.get('level'),
            brand = vm.get('brand'),
            params = {
                level: level,
                brand: brand
            },
            carousel = me.getView().lookupReference('dashboard-carousel'),
            card = carousel.getActiveItem(),
            summary = card.down('glance-summary-metrics').down('list'),
            summaryStore = summary.getStore(),
            benchmarks = card.down('glance-summary-benchmarks'),
            cardBenchmark = benchmarks.getActiveItem(),
            benchmark = (cardBenchmark != 0) ? cardBenchmark.down('list') : null,
            benchmarkStore = (benchmark) ? benchmark.getStore() : null,
            sales = card.down('glance-sales-sales').down('cartesian'),
            sprite = {
                    type: 'text',
                    text: App.locale.Language.dashboard.sales.sprite.month[App.app.currentLocale],
                    fontSize: 16,
                    fontWeight: 'bold',
                    fillStyle: 'rgb(97, 157, 201)',
                    width: 100,
                    height: 30,
                    x: 60, // the sprite x position
                    y: 20  // the sprite y position
                };
        


        if (!summaryStore) {           
            //set chart data
            var salesStore = Ext.create('App.store.glance.Sales');
            salesStore.filterBy(function(rec) {  // apply level filter
                return rec.get('HIER_LEVEL_JOIN') ==  App.app.loggedInUser.HIER_LEVEL_JOIN;                               
            });
            sales.setStore(salesStore);
           
            //set metric list summary data
            summaryStore = Ext.create('App.store.glance.Metrics');
            summaryStore.filterBy(function(rec) {  // apply level filter
                return rec.get('HIER_LEVEL_JOIN') ==  App.app.loggedInUser.HIER_LEVEL_JOIN;                               
            });
            summary.setStore(summaryStore);
            
          
        }

                    
        //set any benchmark summary data
        if (benchmark && !benchmarkStore) {        
            benchmarkStore = Ext.create('App.store.glance.Metrics');
            benchmark.setStore(benchmarkStore);            
            benchmarkStore.load({
                params: {
                    level: cardBenchmark.code,
                    brand: brand
                }
            });
        }
    },

    //if tree has one root expanded needs to be false to autoload=false...therefore, expnad on display
    setTreeNodes: function (tree) {        
        //manage nodes       
        var root = tree.getStore().getRoot(),
            rootNode = (root) ? root.firstChild : null;
        if (rootNode) {
            rootNode.collapseChildren(true);
            rootNode.expand(false);  // false to recursive
        }
    }



});
