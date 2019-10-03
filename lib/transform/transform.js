module.exports = {
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
}