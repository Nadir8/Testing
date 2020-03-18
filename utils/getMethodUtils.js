const expect = require("chai").expect;

function hasResourcesAllProperties(actualTab, expectedElements){
    for(i=0; i <= (actualTab.length)-1; i++){
        expect(actualTab[i]).to.have.all.keys(expectedElements);
    }
    return true;
}

function hasResourcesSpecificProperty(actualTab, expectedElement){
    for(i=0; i <= (actualTab.length)-1; i++){
        expect(actualTab[i]).to.contain.keys(expectedElement);
    }
    return true;
}

function hasPropertyAllInformations(actualTab, property, expectedElements){
    for(i=0; i <= (actualTab.length)-1; i++){
        expect(actualTab[i][property]).to.have.all.keys(expectedElements);
    }
    return true;
}

function isValueMatchWithItsProperty(actualTab, property, value){
    expect(actualTab[property]).to.be.equal(value);
    return true;
}

module.exports = {
    hasResourcesAllProperties : hasResourcesAllProperties,
    hasResourcesSpecificProperty : hasResourcesSpecificProperty,
    hasPropertyAllInformations : hasPropertyAllInformations,
    isValueMatchWithItsProperty : isValueMatchWithItsProperty
};