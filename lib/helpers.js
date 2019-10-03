const _ = require('lodash');

module.exports = {
    sanitize: function (input){
        return input.replace(/\n/g,'');
    },
    
    ucFirst: function jsUcfirst(string)
    {
        if(!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    
    isFunction: function isFunction(functionToCheck) {
        var getType = {};
        if (functionToCheck) return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    },
    
    isArray: function isArray(arrayToCheck) {
        var getType = {};
        if(arrayToCheck) return arrayToCheck && getType.toString.call(arrayToCheck) === '[object Array]';
    },
    
    requiredFields: function requiredFields(object, requiredFieldsArray, callback) {
        if (!callback) callback = function () {
        };
        if (isArray(requiredFieldsArray)) {
            var foundFields = new Array();
            for (var i in object) {
                for (var j in requiredFieldsArray) {
                    if (i == requiredFieldsArray[j]) {
                        foundFields.push(requiredFieldsArray[j]);
                    }
                }
            }
            if (foundFields.length == requiredFieldsArray.length) {
                callback(null);
                return null;
            } else {
                //var diff = _.difference(object, requiredFieldsArray);
                var error = "Missing one of the required fields(" + requiredFieldsArray.toString() + ")\n Fields Found: (" + foundFields.toString() + ")";
                callback(error);
                return error;
            }
        } else {
            var error = "requireFields param 2 is not an Array";
            if (isFunction(callback)) callback(error);
            return error;
        }
        
    },
    
    objectValue: function valueFromObject(object, field){
        if(object){
            if(object.hasOwnProperty(field)){
                return object[field];
            }else{
                return false;
            }
        }else{
            return false;
        }
    },
    
    isEmpty: function(obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)) return false;
        }
        return true;
    },
    
    isJson: function(str) {
        try {
            //console.error(str);
            JSON.parse(str);
        } catch (e) {
            console.log('<' + str + '> : Is not JsonString');
            return false;
        }
        return true;
    },
    
    jsonToObject: function (str) {
        var object={};
        try {
            object = JSON.parse(str);
        } catch (e) {
            console.error(e);
            return false;
        }
        return object;
    },
    
    transform: function(objectToTransform, dataTransformationMap = {"fromName": "toName"}){
        /**
         * Transforms data from the fromName to the toName
         */
        for(let attr in objectToTransform){
            for(let key in dataTransformationMap){
                if(attr === key) objectToTransform[dataTransformationMap[key]] = objectToTransform[attr]
            }
        }
        return objectToTransform;
    },
    transformChild: function(objectToTransform, childObjectToTransform, dataTransformationMap = {"fromName": "toName"}){
        /**
         * Transforms data from the fromName to the toName
         */
        for(let attr in childObjectToTransform){
            for(let key in dataTransformationMap){
                if(attr === key) objectToTransform[dataTransformationMap[key]] = childObjectToTransform[attr]
            }
        }
        return objectToTransform;
    },
    
    dataTransmissionObject: function (object, allowAttributesArray) {
        return _.pick(object, allowAttributesArray)
    }
};