var fs = require("fs"),
    path = require("path"),
    util = require("util"),

    express = require("express"),

    application = express();

application.use(express.static(path.join(__dirname, "public")));

function onlyMusicFiles(file) {
    return file.indexOf(".mp3") !== -1;
}

application.get("/songs", function(request, response) {
    fs.readdir("./public/music", function(error, files) {
        if (error) {
            response.writeHead(500);
            response.end(error);

            return;
        }

        var songs = files.filter(onlyMusicFiles).map(function(element) {
            return {
                name: path.basename(element, ".mp3"),
                src: util.format("/music/%s", element)
            };
        });

        response.writeHead(200);
        response.end(JSON.stringify(songs));
    });
});

application.listen(8080);