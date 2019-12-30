Ext.define('App.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
    
    //load the welcome message
    init: function (cmp) {
        var me = this,
            params = { NTID: App.app.loggedInUser.NTID };

        me.fireEvent('callservice', 'Default.aspx/WelcomeMessage', null, params, function (response) { me.callbackWelcomeMessage(response) });

               
    },

    initViewModel: function (vm) {        
        var me = this,
            now = new Date(),
            hours = now.getHours(),
            greeting =
                Ext.Date.isWeekend(now) ? App.locale.Language.home.greeting.weekend[App.app.currentLocale] :
                hours < 12 ? App.locale.Language.home.greeting.morning[App.app.currentLocale] :
                hours < 17 ? App.locale.Language.home.greeting.afternoon[App.app.currentLocale] :
                App.locale.Language.home.greeting.evening[App.app.currentLocale],
           greetings = [greeting, App.locale.Language.home.greeting.one[App.app.currentLocale], App.locale.Language.home.greeting.two[App.app.currentLocale], App.locale.Language.home.greeting.three[App.app.currentLocale]],
           messages = [App.locale.Language.home.message.one[App.app.currentLocale], App.locale.Language.home.message.two[App.app.currentLocale], App.locale.Language.home.message.three[App.app.currentLocale], App.locale.Language.home.message.four[App.app.currentLocale], App.locale.Language.home.message.five[App.app.currentLocale]];
       
        vm.set({
            time: now,
            greeting: greetings.getRandomVal(),
            message: messages.getRandomVal()
        });


    },

    callbackWelcomeMessage: function (response) {
        var me = this,
            json = JSON.parse(response.responseText),
            msg = json.d,
            comp = me.lookupReference('dashboardnote'),
            icons = ['fa fa-hand-o-up fa-4x', 'fa fa-bolt fa-4x', 'fa fa-heart fa-4x', 'fa fa-thumbs-up fa-4x', 'fa fa-smile-o fa-4x', 'fa fa-magic fa-3x', 'fa fa-star fa-4x'],
            animations = ['faa-wrench animated', 'faa-ring animated', 'faa-horizontal animated', 'faa-pulse animated', 'faa-shake animated', 'faa-burst animated', 'faa-tada animated'],
            wow1 = '<i class="pfizer ' + icons.getRandomVal() + ' ' + animations.getRandomVal() + '"></i>',
            wow2= '<div class="container">'+  //http://cssdeck.com/labs/css3-animated-smileys;
                '<div class="one">:)</div>'+
                '</div><!-- .container -->'+
                '<div class="container">'+
                  '<div class="two">:D</div>'+
                '</div><!-- .container -->'+
                '<div class="container">'+
                  '<div class="three">;)</div>'+
                '</div><!-- .container -->'+
                '<div class="container">',
            wows = [wow1, wow2];  //wows.getRandomVal()
        // https://html-css-js.com/html/character-codes/icons/
        if (comp) {
           // comp.setHtml('<div><div class="message">' + msg + '</div>' + wow1 + '</div>');
            comp.setHtml('<div class="dashboardnote">' + msg + '</div>');
        }
   },

    onHomeIconTap: function (button, event) {
        var id = button.getId();

            if(id=='logout'){
                this.fireEvent('logout')
            } else {
                this.redirectTo(id);
            }
    }

});
