Ext.define('App.view.phone.login.Login', {
    extend: 'Ext.Container',
    xtype: 'login',
    requires: [
       'App.view.login.LoginController'
    ],
    controller: 'login',
    cls: 'auth-login',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    viewModel: {
        data: {
            ntid: null,
            password: null,
            language: 'en',
            map: 'apple'
        }
    },
    items: [{
        xtype: 'image',
        itemId: 'imgLogo',
        src: 'resources/images/OncoBot_Logo.png',
        alt: 'Pfizer Oncology',
        action: 'home',
        width: 260,
        height: 80
    }, {
        xtype: 'formpanel',
        reference: 'form',
        layout: 'vbox',
        ui: 'auth',

        items: [{
            xtype: 'textfield',
            name: 'ntid',
            placeholder: 'NTID',
            required: true,
            bind: {
                value: '{ntid}'
            }
        }, {
            xtype: 'passwordfield',
            name: 'password',
            placeholder: 'NTID PASSWORD',
            required: true,
            bind: {
                value: '{password}'
            }
        }, {
            xtype: 'combobox',
            name: 'language',
            placeholder: 'PERFERRED LANGUAGE',
            store: Ext.create('Ext.data.Store', {
                data: [
                    {
                        text: 'ENGLISH',
                        value: 'en'
                    },
                    {
                        text: 'FRAN\u00C7AIS',  // https://www.compart.com/en/unicode
                        value: 'fr'
                    }
                ]
            }),
            bind: {
                value: '{language}'
            },
            displayField: 'text',
            valueField: 'value'
        }, {
            xtype: 'combobox',
            name: 'map',
            placeholder: 'PERFERRED MAP',
            store: Ext.create('Ext.data.Store', {
                data: [
                    {
                        text: 'APPLE',
                        value: 'apple'
                    },
                    {
                        text: 'GOOGLE',  
                        value: 'google'
                    },
                    {
                        text: 'WAZE',
                        value: 'waze'
                    }
                ]
            }),
            bind: {
                value: '{map}'
            },
            displayField: 'text',
            valueField: 'value'
        }, {
            xtype: 'button',
            text: 'LOG IN',
            iconAlign: 'right',
            iconCls: 'x-fa fa-angle-right',
            handler: 'onLoginTap',
            ui: 'action'
        }]
    }
    ]

});
