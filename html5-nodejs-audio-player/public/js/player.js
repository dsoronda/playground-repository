(function($) {
    "use strict";

    var player = $("#player"),
        songsList = $("#songs");

    function getFirstSong() {
        return songsList.find("li:first");
    }

    function getElementWhichIsPlayingNow() {
        return songsList.find("[data-playing=true]");
    }

    function playSong() {
        var element = $(this);

        player.attr("src", element.attr("data-src"));

        getElementWhichIsPlayingNow().removeAttr("data-playing");
        element.attr("data-playing", "true");
    }

    function playFirst() {
        getFirstSong().click();
    }

    function playNext() {
        var next = getElementWhichIsPlayingNow().next("li");
        if (next.length === 0) {
            getFirstSong().click();
        } else {
            next.click();
        }
    }

    function loadSongsOnStart() {
        $.get("/songs", function(songs) {
            JSON.parse(songs).forEach(function(song) {
                var newSongElement = $("<li></li>").text(song.name).attr("data-src", song.src);

                newSongElement.click(playSong);

                songsList.append(newSongElement);
            });

            playFirst();
        });
    }

    function prepareAutoplay() {
        player.bind("ended", playNext);
    }

    loadSongsOnStart();
    prepareAutoplay();

} (window.jQuery));