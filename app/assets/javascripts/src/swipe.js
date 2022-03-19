/*global $*/
/*global location */
/*global Hammer */

if(location.pathname == "/users") {
  $(function () {
    let allCards = document.querySelectorAll('.swipe--card');
    let swipeContainer = document.querySelector('.swipe');

    function initCards() {
      let newCards = document.querySelectorAll('.swipe--card:not(.removed)');

      newCards.forEach(function (card, index) {
        card.style.zIndex = allCards.length - index;
        card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
        card.style.opacity = (10 - index) / 10;
      });
      if (newCards.length == 0) {
        $(".no-user").addClass("is-active");
      }
    }

    initCards();
    allCards.forEach(function (el) {
      let hammertime = new Hammer(el);

      hammertime.on('pan', function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;

        el.classList.add('moving');

        swipeContainer.classList.toggle('swipe_like', event.deltaX > 0);
        swipeContainer.classList.toggle('swipe_dislike', event.deltaX < 0);

        let xMulti = event.deltaX * 0.03;
        let yMulti = event.deltaY / 80;
        let rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
      });
      hammertime.on('panend', function (event) {
        el.classList.remove('moving');
        swipeContainer.classList.remove('swipe_like');
        swipeContainer.classList.remove('swipe_dislike');

        let moveOutWidth = document.body.clientWidth;

        let keep = Math.abs(event.deltaX) < 200;
        event.target.classList.toggle('removed', !keep);

        let reaction = event.deltaX > 0 ? "like" : "dislike";


        if (keep) {
          event.target.style.transform = '';
        } else {
          let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth) + 100;
          let toX = event.deltaX > 0 ? endX : -endX;
          let endY = Math.abs(event.velocityY) * moveOutWidth;
          let toY = event.deltaY > 0 ? endY : -endY;
          let xMulti = event.deltaX * 0.03;
          let yMulti = event.deltaY / 80;
          let rotate = xMulti * yMulti;

          postReaction(el.id, reaction);


          event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';

          initCards();
        }
      });
    });

    function postReaction(user_id, reaction) {
      $.ajax({
        url: "reactions.json",
        type: "POST",
        datatype: "json",
        data: {
          user_id: user_id,
          reaction: reaction,
        }
      })
      .done(function () {
        console.log("done!");
      });
    }
    function createButtonListener(reaction) {
      let cards = document.querySelectorAll('.swipe--card:not(.removed)');

      if (!cards.length) return false;

      let moveOutWidth = document.body.clientWidth * 2;

      let card = cards[0];
      card.classList.add('removed');
      
      let user_id = card.id;

      postReaction(user_id, reaction);

      if (reaction == "like") {
        card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
      } else {
        card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
      }

      initCards();
    }

    $('#like').on('click', function() {
      createButtonListener("like");
    });

    $('#dislike').on('click', function() {
      createButtonListener("dislike");
    });

  });

}
