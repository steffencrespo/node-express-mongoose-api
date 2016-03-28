$(function(){

    $.get('/places', appendToList);

    function appendToList(places){
        var list = [];
        for (var i in places){
            place = places[i];
            placeBlockAnchor = '<a href="#" place-block="'+place._id+'"><img src="delete.jpg" alt="delete this place"></a> ';
            placeNameAnchor = '<a href="/places/'+place._id+'">'+place.name+'</a>';
            paragraph = '<div class="place-details">' + placeBlockAnchor + placeNameAnchor + '<div class="place-details-bar"> </div></div>';
            list.push($('<li>', {html: paragraph}));
        }
        $('.place-list').append(list);
    }

//  this event is going to be trigger the new block with the place details instead of opening new page
//  also need to change the elements, don't think it I want the places to be links anymore
    $('.place-list').on('click', '.place-details', function(event) {
      event.preventDefault();
      var target = $(event.currentTarget);
      var request = target.attr('href');
      $.ajax({
        type: 'GET',
        url: request
      }).done(function() {
        alert("clicked" + request);
      });
    })

    $('.place-list').on('click', 'a[place-block]', function(event) {
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

    $('.place-list').on('mouseenter', 'a[place-block]', function(){
      $(this).find('img').animate({'width':'20px'}, 'fast');
    });

    $('.place-list').on('mouseleave', 'a[place-block]', function(){
      $(this).find('img').animate({'width':'10px'}, 'slow');
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
