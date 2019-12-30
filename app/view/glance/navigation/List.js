Ext.define('App.view.glance.navigation.List', {
    extend: 'Ext.dataview.List',
    xtype: 'glance-navigation-list',
    reference: 'navbrand',
    itemTpl: '{BRAND_CODE}',
    bind: '{navlist}'  //defined in navmodel    
    /*listeners: {
       select: 'ontapMenuDone'
    }*/
});
