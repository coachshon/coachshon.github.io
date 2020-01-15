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
            brands = references.brands,
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
                if (chart) {
                    panel.remove(chart);
                }
                //storeAffiliates.removeAll();
                //storeBrands.removeAll();

                //load the brands
                storeBrands.clearFilter(true);  // true to supress "datachanged"
                storeBrands.load({  
                    callback: function () {
                        this.filterBy(function(rec) {  // apply level filter
                            return rec.get('HIER_LEVEL_CODE') == level  && rec.get('ACCT_KEY') == key;     
                        });   
                       // brands.down('dataview').setStore(this);                                     
                    }
                });
                   
                panel.unmask();    
        }
        //load the record in 'App.view.widgets.ShowController'
        this.callParent(arguments);
    }
});
