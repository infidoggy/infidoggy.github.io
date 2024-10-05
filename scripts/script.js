let light = false;
/*
document.getElementById("turn_mode_light").onclick = (ev) => {
    console.log(light);
    light = !light;

    if (light) {
        // document.getElementById("background").style.background = "#d4c0e3";
        document.body.style.backgroundColor = "#453e55";
    } else {
        document.body.style.backgroundColor = "#d3d1d8";
    }
};
*/

// document.onkeydown((key) => 
// {

// });

var channelID = "UCDj81omvan8taVYgl7w0ZZQ";
var reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

$.getJSON("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(reqURL)+channelID, function(data) {
   var link = data.items[0].link;
   var id = link.substr(link.indexOf("=")+1);
$("#youtube_video").attr("src","https://youtube.com/embed/"+id + "?controls=0&showinfo=0&rel=0");
});