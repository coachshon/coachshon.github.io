Ext.define('App.view.widgets.BrowseToolbar', {
    extend: 'Ext.Toolbar',
    xtype: 'browsetoolbar',
    requires: [
     'App.view.widgets.BrowseToolbarController'
    ],

    controller: 'browse-toolbar',   
    cls: 'browse-toolbar',
    weighted: true,
    ui: 'tools',

    defaults: {       
        ui: 'action'
    },
    initialize: function () {
        var me = this;
        
        me.setItems({            
            toggle: {
                iconCls: 'x-fa fa-user',
                scroll: true,
                menu: {
                    minWidth: 200,                   
                    maxHeight: 500,
                    scrollable: {  //For ExtJS 6 you can use Ext.panel.Panel.scrollable.  To enable vertical scroll you can set it as scrollable: 'vertical'.
                        y: 'scroll'
                    },
                    items: { xtype: 'glance-navigation-tree'}
                },
                listeners: {
                    tap: 'onTabNavigator'
                }
            },
            search: {
                xtype: 'textfield',
                reference: 'search',
                placeholder: App.locale.Language.search[App.app.currentLocale],  //App.app.getTranslation('quicksearch')
                bind: '{filters.search}',
                // userCls: 'expandable',
                flex: 1,
                weight: 0
            },
            filter: {
                iconCls: 'x-fa fa-filter',
                reference: 'btn-filters',
                weight: 20,
                handler: 'ontapFilters'
            },
            clear: {
                iconCls: 'x-fa fa-undo',
                handler: 'onTapFiltersClear',
                weight: 10
            }
    });

   me.callParent(arguments);
 }
});

