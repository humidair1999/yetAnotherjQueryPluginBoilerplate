// yetAnotherjQueryPluginBoilerplate
//  by: J. Ky Marsh
//  jkymarsh.com
//
// sources of inspiration (and code) for this bad boy:
//  http://jqueryboilerplate.com/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {
    var pluginNamespace = "JKYMARSH",
        pluginName = "testPlugin",
        pluginVersion = "0.1.0";

    console.log(pluginNamespace);
    console.log($[pluginNamespace]);

    if (!$[pluginNamespace]) {
        $[pluginNamespace] = {};
    }

    console.log($.JKYMARSH);
    console.log($[pluginNamespace]);

    $[pluginNamespace][pluginName] = function ( el, myFunctionParam, options ) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data( "myNamespace.myPluginName" , base );

        base.init = function () {
            base.myFunctionParam = myFunctionParam;

            base.options = $.extend({},
            $[pluginNamespace][pluginName].defaultOptions, options);

            // Put your initialization code here
        };

        // Sample Function, Uncomment to use
        // base.functionName = function( paramaters ){
        //
        // };
        // Run initializer
        base.init();
    };

    $[pluginNamespace][pluginName].defaultOptions = {
        myDefaultValue: ""
    };

    $.fn[pluginNamespace + "_" + pluginName] = function
        ( myFunctionParam, options ) {
        return this.each(function () {
            (new $[pluginNamespace][pluginName](this,
            myFunctionParam, options));
        });
    };

})(jQuery, window, document);