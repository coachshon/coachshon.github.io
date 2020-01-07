Ext.define('App.view.glance.summary.SummaryController', {
    extend: 'App.view.main.MenuController',
    alias: 'controller.glance-summary',

    init: function (cmp) {
    
        var bbar = this.lookup('bbar'),
            card = cmp.getLayout(),
            // Lazily create the Indicator (wired to the card layout)
            indicator = card.getIndicator();
  
        // Render it into our bottom toolbar (bbar)
        bbar.insert(1, indicator);
    },

    bindButtons: function(){    
        var me = this,
            view = me.getView(),
            card = view.getLayout(),
            indicator = card.getIndicator(),
            activeIndex = indicator._activeIndex,
            count = indicator._count,
            previous = (activeIndex==0),
            next = (activeIndex == count - 1);
              
        view.lookupReference('btprevious').setDisabled(previous);
        view.lookupReference('btnext').setDisabled(next);
    },

    //on carousel card swipe 
    //set the title using the view model binding in DashboardToolbar  
    //load item stores
    onactiveItemchange: function (benchmarks, newActiveItem, oldActiveItem, eOpts) {
        if (newActiveItem) {
            var me = this,
                view = me.getView(),
                glance = view.up('glance'),
                carousel = glance.up('carousel'),
                cardCarousel = carousel.getActiveItem(),
                glanceID = glance.getItemId(),
                carouselID = cardCarousel.getItemId();

            if (glanceID === carouselID) {
                var benchmark = newActiveItem.down('list'),
                    benchmarkStore = benchmark.getStore(),
                    level = newActiveItem.code,
                    brand = glance.mybrand;

                if (!benchmarkStore) {
                    benchmarkStore = Ext.create('App.store.glance.Metrics');
            
                    benchmarkStore.load({ 
                        callback: function () {
                            benchmarkStore.filterBy(function(rec) {  
                                return rec.get('HIER_LEVEL_CODE') ==  level && rec.get('BRAND_CODE') ==  brand;                               
                            });     
                            benchmark.setStore(benchmarkStore);             
                        }
                    });
                }
            }

        }
    },



    onNext: function () {
        var me = this,
            card = me.getView().getLayout();

        card.next();
        me.bindButtons();
    },

    onPrevious: function () {
        var me = this,
            card = me.getView().getLayout();

        card.previous();
        me.bindButtons();

    },



    //delete summary benchmark card
    ontapSummaryDelete: function (button) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            card = view.getActiveItem(),
            cardIndex = view.items.indexOf(card),
            title= card.getTitle();
   

            // remove this card
            view.removeAt(cardIndex);

            // reset view model
            var benchmarks = vm.get('benchmarks'),
                filteredItems = benchmarks.filter(function (el) { return el.title != title; });
            vm.set({
                benchmarks: filteredItems
            });

            var len=view.query('glance-summary-metrics').length;
            if ( len=== 0) {  
                // no more metrics, hide benchmarks panel
                vm.set({
                    isBenchmarksHidden: true
                });
            } else {
                // reset the indicator (wonky after first item delete ext line 61113)
                view.getLayout().getIndicator().setActiveIndex(0);

            }
           

        me.fireEvent('buildbenchmarks', card.id);  // caught in dashboard controller

    }
});
