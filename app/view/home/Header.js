Ext.define('App.view.home.Header', {
    extend: 'Ext.Container',
    xtype: 'homeheader',
    cls: 'home-header',
    //layout: 'vbox',
   
    layout: {
        // don't specify vbox or hbox but instead just 'box'
        type: 'vbox'
    },
    responsiveConfig: {
        'width < 400': {
            padding: '200px 0px 0px 0px',
            layout: {
                align: 'start',
                pack: 'start'
            }
        },
        'width > 400': {
            padding: '200px 0px 0px 0px',
            layout: {
                align: 'start',
                pack: 'start'
            }
        },
        'width > 600': {
            padding: '20px 0px 0px 120px',
            layout: {
                align: 'middle',
                pack: 'start'
            }
        }
    },
    items: [{
        xtype: 'component',
        responsiveConfig: {
            'width < 400': {
                width: 350,
                padding: '10px 0px 0px 30px'
            },
            'width > 400': {
                width: 350,
                padding: '10px 0px 0px 30px'
            },
            'width > 600': {
                width: 400,
                padding: '10px 0px 0px 0px'
            }
        },
        tpl: [
                '<div class="greeting">{greeting}, {firstname}.</div>',
                '<div class="message">{message}</div>'
        ],
        bind: {
            data: {
                firstname: '{user.FIRST_NAME}',
                greeting: '{greeting}',
                message: '{message}'
            }
        }
    },
    {
        xtype: 'component',
        reference: 'dashboardnote',
        responsiveConfig: {
            'width < 400': {
                width: 350,
                padding: '10px 0px 0px 30px'
            },
            'width > 400': {
                width: 350,
                padding: '10px 0px 0px 30px'
            },
            'width > 600': {
                width: 400,
                padding: '10px 0px 0px 0px'
            }
        },
        html: ''
    }]
});
