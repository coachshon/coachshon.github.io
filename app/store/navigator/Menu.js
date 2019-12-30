Ext.define('App.store.navigator.Menu', {  
    extend: 'Ext.data.Store',

    data: [{
        id: 'home',
        xtype: 'home',
        icon: 'home',
        text: ''
    }, {
        id: 'dashboard',
        xtype: 'dashboard',
        bgClr: '#8E44AD',
        icon: 'bar-chart',
        text: ''
    }, {
        id: 'accounts',
        xtype: 'hcobrowse',
        bgClr: '#02b685',
        icon: 'hospital-o',
        text: ''
    }, {
        id: 'contacts',
        xtype: 'hcpbrowse',
        bgClr: '#ef5d18',
        icon: 'user-md',
        text: ''
    }, {
        id: 'faq',
        xtype: 'faq',
        bgClr: '#a7fe33',
        icon: 'question',
        text: ''
    }]
});


