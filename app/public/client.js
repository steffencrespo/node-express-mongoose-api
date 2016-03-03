$(function(){

    $.get('/places', appendToList);

    function appendToList(places){
        var list = [];
        for (var i in places){
            place = places[i];
            content = '<a href="/places/'+place+'">'+place.name+'</a> '+
                '<a href="#" place-block="'+place+'"><img src="delete.jpg" height="10" width="10"></a>';
            list.push($('<li>', {html: content}));
        }
        $('.place-list').append(list);
    }

    $('form').on('submit', function(event){
        event.preventDefault();
        var form = $(this);
        var placesData = form.serialize();

        $.ajax({
            type: "POST",
            url: '/places',
            data: placesData
        }).done(function(placeName){
            appendToList([placeName]);
            form.trigger('reset');
        });
    });

});