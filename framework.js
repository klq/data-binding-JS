(function(){
    window.initDogeFramework = function(models) {
        window.bindings = {};
        // window.bindings['name'][0][0] = p.use-name object
        // window.bindings['name'][0][1] = 'Hello, I am {{name}}.'
        // window.bindings['name'][1][0] = p.use-name object
        // window.bindings['name'][1][1] = '{{name}} loves {{love}}!'
        // window.bindings['love'][0][0] = p.use-love object
        // window.bindings['love'][0][1] = '{{name}} loves {{love}}!'
        window.inputs = {};

        for (var i=0; i<models.length; i++){
            setWindowBindings(models[i]);
            setListenerForModel(models[i]);
        }   
    };

    var setWindowBindings = function (modelKey){
        var elements = $('.use-' + modelKey);
        
        window.bindings[modelKey] = [];
        for (var j=0; j<elements.length; j++){
            var elem = elements[j];
            window.bindings[modelKey].push([elem, elem.innerHTML]);
        }   
    };

    var setListenerForModel = function(modelKey){
        $('.model-' + modelKey).on('change',function(){
            changeModelHTML(modelKey,this.value);
        })  
    };

    var changeModelHTML = function(modelKey, inputValue){
        window.inputs[modelKey] = inputValue;

        for (var i =0; i<window.bindings[modelKey].length; i++) {
            var element = window.bindings[modelKey][i][0];
            var template = window.bindings[modelKey][i][1];

            var newHTML = replaceTemplate(template);
            element.innerHTML = newHTML;
        }    
    };

    var replaceTemplate = function(template){
        for (key in window.inputs) {    
            var value = window.inputs[key];
            var origRegex = new RegExp("{{" + key +"}}","g");
            var template= template.replace(origRegex, value);
        }
        return template;
    };
})();
