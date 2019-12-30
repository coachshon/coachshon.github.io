/**
 * This global controller is responsible for executing actions 
 * View controllers can interact with this controller by firing the 'actionlog' or
 * 'actionexec' event, for example:
 *
 *      this.fireEvent('actionlog', 'profile', record)
 */
Ext.define('App.controller.Action', {
    extend: 'Ext.app.Controller',

    listen: {
        controller: {
            '*': {
                authenticate: 'authenticate',
                actionlog: 'log',
                actionexec: 'exec',
                callservice: 'callservice'
            }
        }
    },

  
    authenticate: function (form) {
     
        var me = this,
            values = form.getValues(),
            ntid = values.ntid,
            password = values.password,
            language = values.language,
            map = values.map;

        language = (language) ? language : 'en';
        map = (map) ? map : 'google';

        form.clearErrors();        
        //AUTHENTICATE
         if (ntid && password) {
             Ext.Viewport.setMasked({ xtype: 'loadmask' });

             var user={"FIRST_NAME":"Shauna","GROUP_ID":"0","HIER_LEVEL_JOIN":"NATIONAL","LANGUAGE":"en","NTID":"HOGANS03","RESULT_STATUS":"1","USER_NAME":"Shauna Hogan"}             
                             
                     if (user) {
                         // set up user model...
                         App.app.loggedInUser = user;
                         session = App.model.login.Session.loadData(user);
                         session.set('password', password);
                         session.set('language', language);
                         session.set('map', map);
                         // set global refs
                         App.app.currentLocale = language;
                         // viewport routing...
                         me.fireEvent('login', session);
                     } else {
                         form.setErrors({
                             ntid: 'NTID failed server authentication.'
                         });
                         Ext.Msg.alert('LOGIN FAILURE', 'Your login credentials failed authentication.<br /><br />Ensure your NT ID and password are correct, or contact the tool owner to get access to the ONCO App.');
                     }
                
         } else {
             form.setErrors({
                 ntid: 'NTID required',
                 password: 'PASSWORD required'
             });
         }

    },
    

    /**
* Common way to call AJAX
* @param {String} url: webmethod function name
* @param {Object} jsonData: request payload
* @param {Object} params: query string params
* @param {function} callback: function called after request
*/
    callservice: function (url, jsonData, params, callback) {
       
        Ext.Ajax.request({
            url: url,
            method: 'POST',
            timeout: 36000000,
            jsonData: (jsonData) ? jsonData : {},
            params: (params) ? params : {},
            success: function (response, opts) {
            },  // eo success
            callback: function (opts, success, response) {
                if (typeof (callback) == 'function') callback(response, jsonData);
            }, // eo callback
            failure: function (response, opts) {
                // get the error message
                var json = JSON.parse(response.responseText);
                var msg = '.NET Error';
                if (json.hasOwnProperty('d')) {  // asp.net will return json format as {"d":""} - for security purposes 
                    msg = json.d;
                } else if (json.hasOwnProperty('Message')) {  // asp.net Oracle error json format
                    msg = json.Message;
                }

                if (Array.isArray(msg)) {
                    msg = msg.slice(-1)[0].ERROR_MSG;  // get the error message
                }
                Ext.Msg.alert('DATA EXCEPTION', msg);
               
            }  // eo failure
        });
    },


 /**
* Triggers action on a record
*/
    exec: function (action, record, cmp) {       
        var me = this,
            url;
       
        switch (action) {
            case 'fa-hospital-o':  // account affiliate
                if (record) {
                    me.redirectTo('account/' + record.get('ACCT_KEY') + '/affiliate');                   
                }
                break;
            case 'fa-info':                   
                   var view = cmp.up().up().up(),
                       item = view.lookupReference('Gsearch'),
                       panel = view.down('#ifrm'),
                       data = panel.getData(),
                       visibility = (item.isHidden()) ? 'show' : 'hide',
                       search = record.get('NAME_DISPLAY') + ',' + record.get('CITY') + ',' + record.get('PROVINCE');

                    item[visibility]();

                    if (visibility == 'show') {
                        if (!data.search) {
                            panel.updateData({ search: search });
                        }
                    }


                    break;
            case 'fa-users': //hcp affiliates 
                var view = cmp.up('accountshow'), 
                    store= view.getViewModel().getStore('affiliates'),
                    item=view.lookupReference('affiliates'),
                    visibility = (item.isHidden()) ? 'show' : 'hide';
                
                item[visibility]();

                if(visibility=='show' && store.count()==0){
                    store.load({
                        params: {
                            key: record.get('ACCT_KEY'),
                            level: record.get('HIER_LEVEL_CODE')
                        }
                    });
                }
               
                break;
            case 'fa-map-marker': // map
                var address = record.get('ADDRESS_FULL'),
                    session = App.util.State.get('session'),
                    map = 'google';


                if (!address) {
                    return false;
                }
                if (Ext.isEmpty(address.replace(/,/g, ''))) {
                    Ext.Msg.alert('NOT AVAILABLE', 'ADDRESS NOT AVAILABLE.');
                         return false;
                }


                if (session && session.data.map) {
                    map = session.data.map;
                }
               
                switch (map) {
                    case 'apple':
                        url = 'http://maps.apple.com/?address='
                        break;
                    case 'google':
                        url = 'https://maps.google.com/maps?q='
                        break;
                    case 'waze':
                        url = 'https://waze.com/ul?q='
                        break;
                }
                // url = 'https://maps.google.com/maps?q=' + encodeURIComponent(address);               
                // url = 'http://maps.apple.com/?address=' + encodeURIComponent(address);
                // url = 'https://waze.com/ul?q=' + encodeURIComponent(address) + '&navigate=yes';

                url = url + encodeURIComponent(address);
                me.openUrl(url, true);             
              
             break;
            case 'fa-phone':
                // @see https://tools.ietf.org/html/rfc3966              
                var num = record.get('PHONE'),
                       ext;

                if (Ext.isEmpty(num)) {
                    Ext.Msg.alert('NOT AVAILABLE', 'PHONE NUMBER NOT AVAILABLE.');
                    return false;
                }

                url = 'tel:' + num;
                ext = record.get('extension');
                if (!Ext.isEmpty(ext)) {
                    url += ';ext=' + ext;
                }
              
                me.openUrl(url);
                break;      
        default:
            //Ext.error('Unknown action: ' + action);
            me.redirectTo(action);
            return false;
        }

       // this.log(action, record);
        return true;
    },


    log: function (action, record, subject) {
        //save activity?
    },

    openUrl: function (url, browser) {
        return !!window.open(url, browser ? '_blank' : '_self');
       
    }

});
