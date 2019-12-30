Ext.define('App.view.widgets.Show', {
    extend: 'Ext.Panel',
    requires: [
     'App.view.widgets.ShowController',
     'App.view.widgets.ShowHeader'
    ],

    controller: {
        type: 'show'
    },

    viewModel: {
        data: {
            record: null,
            title: null
        }
    },
    eventedConfig: {
        /**
         * Make the config trigger an event on change to allow the controller to monitor it.
         * https://www.sencha.com/blog/using-sencha-ext-config/
         */
        record: null
    },


    scrollable: {
        y: 'scroll'
    },

    weighted: true,

    defaults: {
        userCls: 'page-constrained'
    },

    items: {
        header: {
            xtype: 'showheader',
            weight: -10
        },

        content: {
            weighted: true,
            userCls: [
                'page-constrained',
                'blocks'
            ],

            defaults: {
                userCls: 'blocks-column',
                weighted: true,

                defaults: {
                    ui: 'block'
                }
            },

            items: {
                left: {
                    weighted: true,
                    reference: 'showleft'
                }
            }
        }
    }
});
