Ext.define('App.view.main.Menu', {
    extend: 'App.view.widgets.Sidebar',
    xtype: 'mainmenu',

    requires: [
       'App.view.main.MenuController'
    ],
    config: {
        selection: null
    },

    controller: 'mainmenu',
    viewModel: {
        data: {
            logout: 'LOG OUT'
        }
    },
    cls: 'main-menu',
    layout: 'vbox',
    weighted: true,

    items: {
        trigger: {
            xtype: 'button',
            handler: 'onTriggerTap',
            iconCls: 'x-fa fa-bars',
            ui: 'dark large flat',
            docked: 'top'
        },
        logo: {
            xtype: 'container',
            weight: 0,
            style: 'background-color: #fff',
            padding: 10,
            items:[{
            xtype: 'image',
            src: 'resources/images/OncoBot_Logo.png',
            height: 44,
            minWidth: 180
            }]
        },
        navigator: {
            xtype: 'dataview',
            scrollable: 'y',
            store: 'navigator.Menu',
            weight: 1,
            flex: 1,
            ui: 'large white',
            selectable: {
                deselectable: false
            },
            itemTpl: [
                '<span class="icon x-fa fa-{icon} fa-lg"></span>'
            ],
            listeners: {
                childtap: 'onMenuChildTap'
            }
        },       
        logout: {
            xtype: 'button',
            handler: 'onLogoutTap',
            iconCls: 'x-fa fa-power-off',
            bind: '{logout}',
            textAlign: 'left',
            ui: 'large',  // flat is transparent
            weight: 20
        }
    },


    initialize: function () {
        var me = this,
            vm = me.getViewModel(),
            navigator = me.child('#navigator'),
            store = navigator.getStore(),
            groupID = App.app.loggedInUser.GROUP_ID,
            lang = App.app.currentLocale;

        //add bug report

        if ((window.location.toString().toLowerCase().search('dev') != -1) || (window.location.toString().toLowerCase().search('test') != -1)) {
            store.add({
                id: 'uats',
                xtype: 'uatbrowse',
                bgClr: '#a7fe33',
                icon: 'bug',
                text: ''
            })
        }

        if (groupID === '0') {  // ADMIN, add permissions
            store.add({
                id: 'permissions',
                xtype: 'permissionbrowse',
                bgClr: '#ef5d18',
                icon: 'user-secret',
                text:''
            })
        };

        
        //set text language for the menu items
         var data = store.data.items;
        Ext.Array.forEach(data, function (d) {     
            d.set('text', App.locale.Language.menu[d.id][App.app.currentLocale]);
        });
       
        //set language for the log out
        vm.set({
            logout: App.locale.Language.menu.logout[lang]
        });
       
        me.callParent(arguments);
    },

    updateSelection: function (value) {
        if (this.child('#navigator')) {
            this.child('#navigator').setSelection(value);
        }    
    }
});
