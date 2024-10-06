var channelID = "UCDj81omvan8taVYgl7w0ZZQ";
var reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

$.getJSON("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(reqURL)+channelID, function(data) {
    var link = data.items[0].link;
    document.getElementById("youtube_vid_information").innerHTML = 
        "<a> Last video uploaded <br /> <br />" + 
        data.items[0].title + "<br /> <br />" +
        data.items[0].pubDate.split(" ")[0] + "<br /> <br />" +
        "<a />";
    var id = link.substr(link.indexOf("=")+1);
$("#youtube_video").attr("src","https://youtube.com/embed/"+id + "?controls=0&showinfo=0&rel=0");
});


// document.getElementById("youtube_vid_information").textContent += "<br />" + "Hello";

document.getElementById("youtube_vid_information").style.color = "white";
document.getElementById("youtube_vid_information").style.marginLeft = "5px";
document.getElementById("youtube_vid_information").style.marginTop = "5px";