Ext.define('App.view.glance.navigation.NavModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.glance-navigation',
    data: {
        brand: null,
        level: null,
        title: null
    },
    formulas: {
        selectionTree: function (get) {
            var selection = get('navlevel.selection'),  //'App.view.glance.navigation.Tree'
                path;
            if (selection) {
                path = selection.getPath('text');
                path = path.replace(/^\/Root/, '');
                return path.substring(path.lastIndexOf("/") + 1, path.length);
            } else {
                return get('title');
            }
        },
        selectionList: function (get) {            
            var selection = get('navbrand.selection'),  //'App.view.glance.navigation.List' 
                brand;
            
            if (selection) {
                brand = selection.get('BRAND_CODE');
            } else {
                brand = get('brand');
                var store=this.get('navlist'),
                    record = store.findRecord('BRAND_CODE', brand);               
                if (!record) {
                    record = store.first();
                    if (record) {
                        brand = record.get('BRAND_CODE');
                    }                   
                } 
            brand = (brand) ? brand : this.get('brand');
               
            }
            return  brand;
        }
    },
    stores: {
        navlist: {
            type: 'glance-brands'
        },
        navtree: {
            type: 'glance-levels',
            autoLoad: false
         }        
    }
});