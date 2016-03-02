$(function(){

    $.get('/places', appendToList);

    function appendToList(places){
        var list = [];
        for (var i in places){
            list.push($('<li>', {text: places[i]}));
        }
        $('.place-list').append(list);
    }

});