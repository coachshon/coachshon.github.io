Ext.define('App.view.widgets.Gsearch', {
    extend: 'Ext.Panel',
    xtype: 'google-search',
    reference: 'Gsearch',
    iconCls: 'x-fa fa-info',
    ui: 'block',
    height: 350,
    layout: 'fit',
    viewModel: {
        data: {
            title: ''
        }
    },
    bind: {
        title: '{title}'
    },
    items: [{
        xtype: 'iframe-container',
        responsiveConfig: {
            'width < 400': {
                padding: '0px 10px 0px 10px',
                tpl: [
                '<iframe src="https://www.google.com/search?igu=1&ei=&q={search}" width="340" height="260" scrolling="yes"></iframe>'
                ]
            },
            'width > 400': {
                padding: '0px 10px 0px 10px',
                tpl: [
                '<iframe src="https://www.google.com/search?igu=1&ei=&q={search}" width="340" height="260" scrolling="yes"></iframe>'
                ]
            },
            'width > 600': {
                padding: '0px 10px 0px 10px',
                tpl: [
                '<iframe src="https://www.google.com/search?igu=1&ei=&q={search}" width="650" height="260" scrolling="yes"></iframe>'
                ]
            }
        }
    }],
    initialize: function () {
        me = this;

        me.getViewModel().set({
            title: App.locale.Language.search.google[App.app.currentLocale]
        });

        me.callParent(arguments);
    }
});
