
Ext.define('App.view.glance.Carousel', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'glance-carousel',
    reference: 'dashboard-carousel',
    style: 'background-color: #5E99CC',
    listeners: {
        activeItemchange: 'onactiveItemchange'
    },
    items: [] // carousel items are set in controller
});
