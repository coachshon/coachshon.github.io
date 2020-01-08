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
            storeBrands = vm.getStore('brands');

                panel.mask({ xtype: 'loadmask' })

                if (level !== levelUser) {
                    title = title + ' ' + ' (' + level + ')';
                }
                view.setTitle(title);

                vm.getStore('affiliates').removeAll();
                storeBrands.removeAll();

                //load the brands
                storeBrands.load({  // onLoadData listener will create carousel cards
                        callback: function () {
                            storeBrands.filterBy(function(rec) {  // apply level filter
                                return rec.get('HIER_LEVEL_CODE') == level  && rec.get('ACCT_KEY') == key;     
                            }); 
                                       
                        }
                    }); 

               
                    panel.unmask();    
        }
        //load the record in 'App.view.widgets.ShowController'
        this.callParent(arguments);
    }
});
