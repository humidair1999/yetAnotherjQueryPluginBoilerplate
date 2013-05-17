// yetAnotherjQueryPluginBoilerplate
//  by: J. Ky Marsh
//  jkymarsh.com
//
// sources of inspiration (and code) for this bad boy:
//  http://jqueryboilerplate.com/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {
    // name/version of the plugin (come on, bro)
    var pluginName = "testPlugin",
        pluginVersion = "0.1.0",
        // empty object for containing our new jquery selector ($(":pluginName")) key/value
        selectorObj = {},
        // default options for the plugin
        defaultOptions = {
            someDefaultValue: null,
            someOtherDefaultValue: "a string"
        },
        // plugin constructor using module design pattern
        Plugin = function(element, options, callback) {
            var base = {
                    $element: $(element),
                    options: options
                },
                _fireCallback = function(callback) {
                    if($.isFunction(callback)) {
                        /*
                        Calls the method passed in as a parameter and sets the context to
                        the `Plugin` object, which is stored in the jQuery `data()`
                        method.  This allows for the `this` context to reference the
                        Plugin API Methods in the callback function. The original element
                        that called the plugin(wrapped in a jQuery object) is the only
                        parameter passed back to the callback
                        */
                        callback.call(base.$element.data(pluginName), base.$element);
                    }
         
                    return this;
                },
                _initialize = (function(callback) {
                    // Put your initialization code here

                    //Provides callback function support
                    _fireCallback(callback);
                })(callback);

            console.log(options);

            return {
                destroy: function(callback) {
                    base.$element.removeData(pluginName);

                    _fireCallback(callback);
                       
                    // we don't chain 'this' here because why the hell would you call a plugin
                    //  method after destroying the instance?
                },
                option: function(key, value) {
                    if (value) {
                        base.options[key] = value;
                    }
                    else {
                        return base.options[key];
                    }

                    console.log(base.options);
                },
                someMethod: function() {
                    console.log("called someMethod");

                    return this;
                }
            }
        };

    if (!$.fn[pluginName]) {
        $.fn[pluginName] = function(options, callback) {
            // maintains chainability for all calling elements
            return this.each(function () {
                var $element = $(this);
         
                if (!$.data($element[0], pluginName)) { 
                    options = $.extend({}, defaultOptions, options);
             
                    $.data($element[0], pluginName, new Plugin(this, options, callback));
                }
                else {
                    console.warn("plugin with same name (" +
                        pluginName +
                        ") already exists on element: ",
                        $element);
                }
            });
        };
    }
    else {
        console.warn("jQuery plugin function with same name ($.fn." +
            pluginName +
            ") has already been loaded!");
    }

    selectorObj[pluginName] = function(elements) {
        // TODO: why in the fuck can I not consistently use .data methods?
        return $(elements).data(pluginName) !== undefined;
    };

    // adds custom jquery pseudo selector
    //  search for all DOM elements with plugin instances using:
    //      $(":pluginName").each(function() { });
    $.extend($.expr[":"], selectorObj);

})(jQuery, window, document);