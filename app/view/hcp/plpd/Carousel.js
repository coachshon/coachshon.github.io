
Ext.define('App.view.hcp.plpd.Carousel', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'hcp-plpd-carousel',
    reference: 'plpd-carousel',
    style: 'background-color: #5E99CC',
    listeners: {
        activeItemchange: 'onactiveItemchange'
    },
    height: 425,
    items: [] // carousel items are set in controller
});
