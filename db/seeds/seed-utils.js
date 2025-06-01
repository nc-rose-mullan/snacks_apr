const createLookUp = (array, key, value) => { 
    const lookUpObj = {}
    array.forEach((element, index) => { 
        const lookupKey = array[index][key]
        const lookupValue = array[index][value]
        lookUpObj[lookupKey] = lookupValue
    })
    return lookUpObj   
}

module.exports = {createLookUp}