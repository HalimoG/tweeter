$(document).ready(function() {

    $('textarea').keyup(function(){
        
        var numofletters = $(this).val().length
        var max = 140 
        var characterCount= max - numofletters
        if (characterCount < 0){
            $(this).siblings( ".counter").text(characterCount)
            $(this).siblings( ".counter").css ({"color": "red"})
        }
        else{
            $(this).siblings( ".counter").text(characterCount)

        }
    })

  });