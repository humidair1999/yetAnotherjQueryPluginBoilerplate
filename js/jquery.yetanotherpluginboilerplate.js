// yetAnotherjQueryPluginBoilerplate
//  by: J. Ky Marsh
//  jkymarsh.com
//
// sources of inspiration (and code) for this bad boy:
//  http://jqueryboilerplate.com/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {
        // namespace will generally be the name of author/company/organization
    var pluginNamespace = "JKYMARSH",
        // name/version of the plugin (come on, bro)
        pluginName = "testPlugin",
        pluginVersion = "0.1.0";

    console.log(pluginNamespace);
    console.log($[pluginNamespace]);

    if (!$[pluginNamespace]) {
        $[pluginNamespace] = {};
    }

    console.log($.JKYMARSH);
    console.log($[pluginNamespace]);

    $[pluginNamespace][pluginName] = function(element, options, pluginName) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(element);

        // Add a reverse reference to the DOM object
        base.$el.data("myNamespace.myPluginName", base);

        var _callbackSupport = function(callback) {
            //Checks to make sure the parameter passed in is a function
            if($.isFunction(callback)) {
 
                /*
                Calls the method passed in as a parameter and sets the context to 
                the `Plugin` object, which is stored in the jQuery `data()`
                method.  This allows for the `this` context to reference the 
                Plugin API Methods in the callback function. The original element 
                that called the plugin(wrapped in a jQuery object) is the only 
                parameter passed back to the callback
                */
                callback.call(self.$element.data(dataName), self.$element);
            }
 
            //Maintains chainability
            return this;
        };

        var create = function(callback) {
            // Put your initialization code here

            //Provides callback function support
            _callbackSupport(callback);
               
            //Maintains chainability
            return this;
        };

        return {
            create: create
        }
    };

    $[pluginNamespace][pluginName].defaultOptions = {
        myDefaultValue: ""
    };

    if (!$.fn[pluginNamespace + "_" + pluginName]) {
        // $.fn[pluginNamespace + "_" + pluginName] = function(myFunctionParam, options) {
        //     return this.each(function () {
        //         new $[pluginNamespace][pluginName](this, myFunctionParam, options);
        //     });
        // };

        $.fn[pluginNamespace + "_" + pluginName] = function(options) {
         
            // maintains chainability for all calling elements
            return this.each(function () {
                var element = $(this),
                    plugin,
                    dataName = pluginName,
                    obj = {};
         
                if ($.data(element[0], dataName)) { 
                    return;
                }
         
                options = $.extend({}, $[pluginNamespace][pluginName].defaultOptions, options);
             
                // Instantiates a new `Plugin` object and creates the plugin
                plugin = new $[pluginNamespace][pluginName](this, options).create();
             
                /*
                Stores the new `Plugin` object in the calling element's 
                jQuery `data` method
                */
                $.data(element[0], dataName, plugin);
 
                /*
                Uses the name of the plugin to create a dynamic property 
                of an empty object literal
                */
                obj[pluginName] = function(elem) {
                    /*
                    Returns all DOM elements that have jQuery `data()`
                    created by the plugin
                    */
                    return $(elem).data(dataName) !== undefined;
                };
 
                //Adds custom jQuery pseudo selectors
                $.extend($.expr[":"], obj); 
                //end extending jQuery pseudo selectors
         
            }); //end return statement
 
        };  //end plugin
    }
    else {
        console.warn("plugin with same name (" +
            [pluginNamespace + "_" + pluginName] +
            ") already exists!");
    }

})(jQuery, window, document);