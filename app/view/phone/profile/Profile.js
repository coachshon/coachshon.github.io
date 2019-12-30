Ext.define('App.view.phone.profile.Profile', {
    extend: 'Ext.Panel',  
    xtype: 'profile',
    requires: [
      'App.view.profile.Activity',
      'App.view.profile.Events',
      'App.view.profile.Header',
      'App.view.profile.ProfileController',
      'App.view.profile.ProfileModel'
    ],
    controller: 'profile',
    viewModel: {
        type: 'profile'
    },

    cls: 'profile',
    scrollable: 'y',

    header: {
        items: {
            create: {
                xtype: 'button',
                bind: '{language}',
                iconCls: 'x-fa fa-comment-o',
                menu: {
                    defaults: {
                        handler: 'onSwitchLanguage'
                    },
                    items: [{
                        text: 'ENGLISH',
                        value: 'en'
                    },
                    {
                        text: 'FRAN\u00C7AIS',  // https://www.compart.com/en/unicode
                        value: 'fr'
                    }]
                }
            }
        }
    },
    items: [{
        xtype : 'profileheader'
    }, {
        xtype: 'container',
        userCls: [
            'page-constrained',
            'blocks'
        ],

        items: [{
            xtype: 'panel',
            cls: 'share-panel',
            layout: 'fit',
            padding: 10,
            bbar: [ '->', {
                text: 'Share',
                ui: 'soft-blue'
            }],
            items: [{
                xtype: 'textareafield',
                placeholder: 'What\'s on your mind?'
            }]
        }, {
            xtype: 'container',
            userCls: 'blocks-column',
            items: [{
                xtype: 'profileevents',
                ui: 'block flat'
            }]
        }, {
            xtype: 'container',
            userCls: 'blocks-column',
            items: [{
                xtype: 'profileactivity',
                bind: '{history}',
                ui: 'block flat',
                header: {
                    items: {
                        showall: {
                            ui: 'block flat'
                        }
                    }
                },
                listeners: {
                    childtap: 'onHistoryChildTap'
                }
            }]
        }]
    }],

    reset: function () {
        this.fireEvent('reset');
        return this;
    }
});

