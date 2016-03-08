$(function(){

    $.get('/places', appendToList);

    function appendToList(places){
        var list = [];
        for (var i in places){
            place = places[i];
            content = '<a href="/places/'+place._id+'">'+place.name+'</a> '+
                '<a href="#" place-block="'+place._id+'"><img src="delete.jpg" height="10" width="10"></a>';
            list.push($('<li>', {html: content}));
        }
        $('.place-list').append(list);
    }

    $('.place-list').on('click', 'a[place-block]', function(event){
        if (!confirm("Do you want to delete the place?")){
            return false;
        }

        var target = $(event.currentTarget);
        var request = target.attr('place-block');
        $.ajax({
            type: 'DELETE',
            url: '/places/'+request
        }).done(function(){
            target.parents('li').remove();
        });

    });

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