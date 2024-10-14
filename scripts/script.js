var channelID = "UCDj81omvan8taVYgl7w0ZZQ";
var reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

try
{
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
}
catch(_)
{
    console.warn("no internet connection");
    document.getElementById("media-content").outerHTML = "";
}

// fetch("/scripts/socialLinks.json", function(data) 
// {
//     console.log(data);    
// }); 

var socialLinks = {};

fetch("/scripts/socialLinks.json")
 .then(a => a.json())
 .then(b => socialLinks = b)
 .catch(error => console.error(error));

var navBarButtons = document.getElementsByClassName("nav-bar-element");

let interval;

for (let i = 0; i < navBarButtons.length; ++i)
{
    const element = navBarButtons.item(i);
    const elementByID = document.getElementById(element.id);
    element.addEventListener("click", function() 
    {
        const link = socialLinks[element.id]
        window.open(link, (String(link).endsWith(".html")) ? "_self" : "_newtab"); 
    });
    elementByID.addEventListener("mouseover", function(_) 
    {
        elementByID.style.opacity = "1";
        interval = setInterval(() => {
            console.log(element.id);
            
            const elementPositionXY = element.style.backgroundPositionX.replace("px", "");

            let newElementPos = elementPositionXY - speed;

            if (newElementPos < -imageWidth) {
                newElementPos = 0;
            }
        
            element.style.backgroundPositionX = `${newElementPos}px`;
            element.style.backgroundPositionY = `${newElementPos}px`;
        }, 40);
    });
    elementByID.addEventListener("mouseout", function(_) 
    {
        clearInterval(interval);
        elementByID.style.opacity = "0.7";
    });
}

// document.getElementById("my-signature").style.cursor = "pointer";
// document.getElementById("youtube_vid_information").textContent += "<br />" + "Hello";

if (document.getElementById("media-content") !== null)
{
    document.getElementById("youtube_vid_information").style.color = "white";
    document.getElementById("youtube_vid_information").style.marginLeft = "5px";
    document.getElementById("youtube_vid_information").style.marginTop = "5px";
}

const body = document.body;
const elements = document.getElementsByClassName("content-basic");

var speed = 2;

const imageWidth = 100;

function BGAnimation()
{
    const bodyPositionXY = body.style.backgroundPositionX.replace("px", "");

	let newBodyPos = bodyPositionXY - speed;

	if (newBodyPos < -imageWidth) {
		newBodyPos = 0;
	}

    body.style.backgroundPositionX = `${newBodyPos}px`;
    body.style.backgroundPositionY = `${newBodyPos}px`;

    // elements.item();

    for (let i = 0; i < elements.length; ++i)
    {
        let element = elements.item(i);

        const elementPositionXY = element.style.backgroundPositionX.replace("px", "");

        let newElementPos = elementPositionXY - speed;

        if (newElementPos < -imageWidth) {
            newElementPos = 0;
        }
    
        element.style.backgroundPositionX = `${newElementPos}px`;
        element.style.backgroundPositionY = `${newElementPos}px`;
    }

    // body.style.backgroundAttachment = "fixed";

	// Repite la animación
	requestAnimationFrame(BGAnimation);
}

BGAnimation();