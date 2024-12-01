const signature = document.getElementById('my-signature');
const signatureWidthOG = signature.offsetWidth;
let mouseSignature = false;
let rings = 0;

const image = document.getElementById('image');
const imageBG = document.getElementById('bg-image');
var imageWidth = image.offsetWidth;
var imageHeight = image.offsetHeight;
var imageBGW = imageBG.offsetWidth;
var imageBGH = imageBG.offsetHeight;

const ringElement = document.getElementById('rings');
const ringWidth = ringElement.offsetWidth;
let signature_interval = null;
let ytVideo_interval = null;
let images_interval = new Map();
let contents_interval = null;
let image_interval = null;
let rings_interval = null;

const images = document.getElementsByClassName('image-sel');
const contents = document.getElementsByClassName('all-contents');

ringElement.style.left = `calc(100% - ${ringWidth}px - 25px)`;
image.style.left = `calc(50% - ${(imageWidth / 2)}px)`;
image.style.top = `calc(50% - ${(imageHeight / 2)}px)`;
imageBG.style.left = `calc(50% - ${(imageBGW / 2)}px)`;
imageBG.style.top = `calc(50% - ${(imageBGH / 2)}px)`;

ringElement.style.opacity = 0;

signature.style.transform = `scale(1)`;

var channelID = "UCDj81omvan8taVYgl7w0ZZQ";
var reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

try
{
    $.getJSON("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(reqURL)+channelID, function(data) {
        var link = data.items[0].link;
        document.getElementById("youtube_vid_information").innerHTML = 
            "<a> Last video uploaded <br /> <br />" + 
            "<span style=\"color: white\"> Title: <span style=\"color: rgb(153, 130, 170);\">" + data.items[0].title + "<br /> <br />" +
            "<span style=\"color: white\"> Date: <span style=\"color: rgb(153, 130, 170);\">" + data.items[0].pubDate.split(" ")[0] + "<br /> <br />" +
            "<a />";

        var id = link.substr(link.indexOf("=")+1);
        $("#youtube_video").attr("src","https://youtube.com/embed/"+id + "?controls=0&showinfo=0&rel=0");

        const ytVid = document.getElementById("youtube_video");
        ytVid.addEventListener("mouseover", function(_) 
        {
            var scaleX = ytVid.getBoundingClientRect().width / ytVid.offsetWidth;
            var width = parseFloat(scaleX);
    
            clearInterval(ytVideo_interval);
            ytVideo_interval = setInterval(frame, 10);
    
            function frame() 
            {
                if (width.toFixed(2) == 1.05) 
                {
                    clearInterval(ytVideo_interval);
                } 
                else 
                {
                    width += (1.05 - width) * 0.2;
                    ytVid.style.transform = `scale(${width})`;
                    ytVid.style.transformOrigin = "center center";
                }
            }
        });
    
        ytVid.addEventListener("mouseout", function(_) 
        {
            var scaleX = ytVid.getBoundingClientRect().width / ytVid.offsetWidth;
            var width = parseFloat(scaleX);
    
            clearInterval(ytVideo_interval);
            ytVideo_interval = setInterval(frame, 10);
    
            function frame() 
            {
                if (width.toFixed(2) == 1) 
                {
                    clearInterval(ytVideo_interval);
                } 
                else 
                {
                    width += (1 - width) * 0.2;
                    ytVid.style.transform = `scale(${width})`;
                    ytVid.style.transformOrigin = "center center";
                }
            }
        });
    });
}
catch(_)
{
    console.warn("no internet connection");
    document.getElementById("media-content").outerHTML = "";
}

signature.addEventListener("mouseover", function(_) 
{
    signature.style.cursor = "pointer"; 
    mouseSignature = true;

    // signature.style.transform = "scale(1.1)";
    // signature.style.transformOrigin = "center center";

    // var scale = window.getComputedStyle(signature).transform.match(/scale\((\d+(\.\d+)?),\s*\d+(\.\d+)?\)/);
    // scale = 1;
    var scaleX = signature.getBoundingClientRect().width / signature.offsetWidth;
    var width = parseFloat(scaleX);

    clearInterval(signature_interval);
    signature_interval = setInterval(frame, 10);

    function frame() 
    {
        if (width.toFixed(2) == 1.1) 
        {
            clearInterval(signature_interval);
        } 
        else 
        {
            width += (1.1 - width) * 0.2;
            // signature.style.width = width + 'px';
            signature.style.transform = `scale(${width})`;
            signature.style.transformOrigin = "center center";
        }
    }
});

signature.addEventListener("click", function() 
{
    document.getElementById("sonic-ring").currentTime = 0;
    document.getElementById("sonic-ring").play();
    ++rings;

    ringElement.innerHTML = 'Rings: <span style="color: white;"> ' + rings;
    ringElement.style.left = `calc(100% - ${ringWidth}px - 25px)`;
    ringElement.style.opacity = 1;
});

signature.addEventListener("mouseout", function(_) 
{
    mouseSignature = false;

    var scaleX = signature.getBoundingClientRect().width / signature.offsetWidth;
    var width = parseFloat(scaleX);

    console.trace(width);
    clearInterval(signature_interval);
    signature_interval = setInterval(frame, 10);

    function frame() 
    {
        if (width.toFixed(2) == 1) 
        {
            clearInterval(signature_interval);
        } 
        else 
        {
            width += (1 - width) * 0.2;
            // signature.style.width = width + 'px';
            signature.style.transform = `scale(${width})`;
            signature.style.transformOrigin = "center center";
        }
    }
});

imageBG.addEventListener("click", function() 
{
    // const link = socialLinks[element.id]
    // window.open(link, (String(link).endsWith(".html")) ? "_self" : "_newtab");

    const imageStyle = window.getComputedStyle(image);

    var scaleX = image.getBoundingClientRect().width / image.offsetWidth;
    var width =  parseFloat(scaleX);
    var opacity = parseFloat(imageStyle.opacity);

    clearInterval(image_interval);
    image_interval = setInterval(frame, 10);

    function frame() 
    {
        if (opacity.toFixed(2) == 0) 
        {
            clearInterval(image_interval);
            image.style.visibility = imageBG.style.visibility = "hidden";
        } 
        else 
        {
            width += (1.8 - width) * 0.05;
            opacity += (0 - opacity) * 0.1;
            image.style.opacity = `${opacity}`;
            imageBG.style.opacity = `${opacity * 0.5}`;
            image.style.transform = `scale(${width})`;
            image.style.transformOrigin = "center center";
        }
    }
});

for (let i = 0; i < images.length; ++i)
{
    const element = images.item(i);
    const elementByID = document.getElementById(element.id);

    const element2 = window.getComputedStyle(element);

    element.addEventListener("click", function() 
    {
        // const link = socialLinks[element.id]
        // window.open(link, (String(link).endsWith(".html")) ? "_self" : "_newtab");

        image.setAttribute('src', elementByID.getAttribute('src'));

        const imageStyle = window.getComputedStyle(image);

        image.style.transform = "scale(0.5)";

        var scaleX = image.getBoundingClientRect().width / image.offsetWidth;
        var width =  parseFloat(scaleX);

        image.style.visibility = "visible";
        imageBG.style.visibility = "visible";
        image.style.opacity = 0;
        imageBG.style.opacity = 0;

        imageWidth = image.offsetWidth;
        imageHeight = image.offsetHeight;
        imageBGW = imageBG.offsetWidth;
        imageBGH = imageBG.offsetHeight;

        image.style.left = `calc(50% - ${(imageWidth / 2)}px)`;
        image.style.top = `calc(50% - ${(imageHeight / 2)}px)`;
        imageBG.style.left = `calc(50% - ${(imageBGW / 2)}px)`;
        imageBG.style.top = `calc(50% - ${(imageBGH / 2)}px)`;

        var opacity = parseFloat(imageStyle.opacity);

        clearInterval(image_interval);
        image_interval = setInterval(frame, 10);
    
        function frame() 
        {
            if (opacity.toFixed(2) == 1) 
            {
                clearInterval(image_interval);
            } 
            else 
            {
                width += (1 - width) * 0.2;
                opacity += (1 - opacity) * 0.1;
                image.style.opacity = `${opacity}`;
                imageBG.style.opacity = `${opacity / 2}`;
                image.style.transform = `scale(${width})`;
                image.style.transformOrigin = "center center";
            }
        }
    });

    elementByID.addEventListener("mouseover", function(_) 
    {
        element.style.cursor = "pointer";
        // element.style.opacity = "1";

        var scaleX = elementByID.getBoundingClientRect().width / elementByID.offsetWidth;
        var width = parseFloat(scaleX);
        var opacity = parseFloat(element2.opacity);

        clearInterval(images_interval[elementByID.id]);
        images_interval.set(elementByID.id, setInterval(frame, 10));
    
        function frame() 
        {
            if (opacity.toFixed(2) == 1) 
            {
                clearInterval(images_interval[elementByID.id]);
            } 
            else 
            {
                opacity += (1 - opacity) * 0.2;
                width += (1.05 - width) * 0.2;
                elementByID.style.opacity = `${opacity.toFixed(1)}`;
                elementByID.style.transform = `scale(${width})`;
                elementByID.style.transformOrigin = "center center";
            }
        }
    });
    elementByID.addEventListener("mouseout", function(_) 
    {
        var scaleX = elementByID.getBoundingClientRect().width / elementByID.offsetWidth;
        var width = parseFloat(scaleX);
        var opacity = parseFloat(element2.opacity);

        clearInterval(images_interval[elementByID.id]);
        images_interval.set(elementByID.id, setInterval(frame, 10));
    
        function frame() 
        {
            if (opacity.toFixed(2) == 0.7) 
            {
                clearInterval(images_interval[elementByID.id]);
            } 
            else 
            {
                opacity += (0.7 - opacity) * 0.2;
                width += (1 - width) * 0.2;
                elementByID.style.opacity = `${opacity.toFixed(1)}`;
                elementByID.style.transform = `scale(${width})`;
                elementByID.style.transformOrigin = "center center";
            }
        }
    });
}

for (let i = 0; i < contents.length; ++i)
{
    const element = contents.item(i);
    const elementByID = document.getElementById(element.id);

    const element2 = window.getComputedStyle(element);

    elementByID.addEventListener("mouseover", function(_) 
    {
        var opacity = parseFloat(element2.opacity);

        clearInterval(contents_interval);
        contents_interval = setInterval(frame, 10);
    
        function frame() 
        {
            if (opacity.toFixed(2) == 1) 
            {
                clearInterval(contents_interval);
            } 
            else 
            {
                opacity += (1 - opacity) * 0.2;
                elementByID.style.opacity = `${opacity.toFixed(1)}`;
            }
        }
    });
    elementByID.addEventListener("mouseout", function(_) 
    {
        var opacity = parseFloat(element2.opacity);

        clearInterval(contents_interval);
        contents_interval = setInterval(frame, 10);
    
        function frame() 
        {
            if (opacity.toFixed(2) == 0.7) 
            {
                clearInterval(contents_interval);
            } 
            else 
            {
                opacity += (0.7 - opacity) * 0.2;
                elementByID.style.opacity = `${opacity}`;
            }
        }
    });
}

// elementByID.addEventListener("mouseover", function(_) 
// {
//     element.style.cursor = "pointer";
//     element.style.opacity = "1";

//     var opacity = parseFloat(element2.opacity);

//     clearInterval(images_interval);
//     images_interval = setInterval(frame, 10);

//     function frame() 
//     {
//         if (opacity.toFixed(2) == 1) 
//         {
//             clearInterval(images_interval);
//         } 
//         else 
//         {
//             opacity += (1 - opacity) * 0.2;
//             elementByID.style.opacity = `${opacity.toFixed(1)}`;
//         }
//     }
// });

// var id = null;
// function myMove() 
// {

// }
