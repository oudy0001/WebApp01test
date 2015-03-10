var contactOutput, error1output, error2output, error3output, error4output;

var onReady(){
    alert("contacts.js linked")
    contactOutput = document.getElementById("contactOutput");
    error1output = document.getElementById("error1output");
    error2output = document.getElementById("error2output");
    error3output = document.getElementById("error3output");
    error4output = document.getElementById("error4output");
    
    try{
    var person = new Contact( );
    
    var num1 = new ContactField('mobile', '613-747-4723', true);
phonenumbers = [ 1 ];
person.phoneNumbers = phonenumbers;
    }catch ( error){
        error1output.innerHTML = "hlkjlk";
    }
    
    try{
        var options = new ContactFindOptions( );
    options.filter = "";  //leaving this empty will find return all contacts
    options.multiple = true;  //return multiple results
    var filter = ["displayName"];    //an array of fields to compare against the options.filter 
    navigator.contacts.find(filter, successFunc, errFunc, options);
    }catch ( error ){
        error2output.innerHTML = error;
    }
    
    try{
    function successFunc( matches ){
  for( var i=0; i<matches.length; i++){
    console.log( matches[i].displayName );
  }
}
    }catch ( error){
        error3output.innerHTML = error;
    }
    
    try{
    var person = navigator.contacts.create( { "displayName": "Bob Smith", "name":{"givenName": "Cordova", "familyName":"Contact"} } ); 
person.save( successFunc, errFunc );                     
                                             
    person.birthday = new Date('1980/07/08');
person.save( successFunc, errFunc );
        
        }catch ( error){
        error3output.innerHTML = error;
    }
    
    
    /*end of init*/
}



document.addEventListener("onDeviceReady", onReady);