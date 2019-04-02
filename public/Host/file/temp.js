
 var mainText= document.getElementById("mainText");
 var submitBtn= document.getElementById("submitBtn");
 var fireHeading = document.getElementById("fireHeading");

var firebaseHeadingRef = firebase.database().ref().child("add/temp/");
firebaseHeadingRef.on('value',function(datasnapshot){
    fireHeading.innerText = datasnapshot.val();
});
 
 function submitClick(){
 
 var firebaseRef = firebase.database().ref().child("add/");

 var messageText = mainText.value;

 firebaseRef.child("temp").set(messageText);
 
 }
 
 
 
 
 
    // var firebaseRef = firebase.database().ref();
 //firebaseRef.child("add").set(Date());
 //setTimeout(function(){
   //  window.location.reload(1);
  //},4000);