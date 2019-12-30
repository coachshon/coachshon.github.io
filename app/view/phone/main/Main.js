Ext.define('App.view.phone.main.Main', {
    extend: 'Ext.Panel',
    // xtype: 'main', -- set by profile
    requires: [
       'App.view.main.Menu',
       'App.view.phone.main.MainController'
    ],
    controller: 'phone-main',
    cls: 'phone-profile',
    layout: 'card',  
    
    items: [{
        xtype: 'panel',
        layout: 'card',
        reference: 'views',
        defaults: {
            header: {
                ui: 'dark',
                defaults: {
                    ui: 'dark flat large'
                },
                items: {
                    menu: {
                        xtype: 'button',
                        iconCls: 'x-fa fa-bars',
                        weight: -10,
                        handler: function () {
                            Ext.fireEvent('togglemainmenu');
                        }
                    }
                }
            }
        }
    }, {
        xtype: 'container',
        reference: 'navigation',
        layout: 'card',
        defaults: {
            header: {
                ui: 'dark',
                defaults: {
                    ui: 'dark flat large'
                },
                items: {
                    menu: {
                    xtype: 'button',
                    iconCls: 'x-fa fa-bars',
                    weight: -10,
                    handler: function () {
                        Ext.fireEvent('togglemainmenu');
                    }
                },
                    back: {
                        xtype: 'button',
                        iconCls: 'x-fa fa-chevron-left',
                        iconAlign: 'right',
                        weight: 10,
                        handler: function () {
                            Ext.fireEvent('navigationback')
                        }
                    }
                }
            }
        }
    }],
    lbar: {
        xtype: 'mainmenu',
        reference: 'mainmenu',
        ui: 'dark slide',
        zIndex: 11,
        items: {
            trigger: !1
        }
    }
});
