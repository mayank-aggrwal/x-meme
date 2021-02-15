$(document).ready(function() {
    // $(window).scroll(function() {
    //     if (this.scrollY > 20) {
    //         console.log("I'm in scrolling motion")
    //         $('.navbar').addClass('sticky');
    //     }
    //     else {
    //         $('.navbar').removeClass('sticky');
    //     }
    // })

    // toggle menu/navbar active state
    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    })

    





})


// timeAgo Function
function timeAgo(selector) {

    var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    };
    var template = function (t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function (time) {
        if (!time) return;
        time = time.replace(/\.\d+/, ""); // remove milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
        seconds < 45 && template('seconds', seconds) || seconds < 90 && template('minute', 1) || minutes < 45 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 42 && template('day', 1) || days < 30 && template('days', days) || days < 45 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;
    };

    var elements = document.getElementsByClassName('timeago');
    for (var i in elements) {
        var $this = elements[i];
        if (typeof $this === 'object') {
            $this.innerHTML = timer($this.getAttribute('title') || $this.getAttribute('datetime'));
        }
    }
    // update time every minute
    setTimeout(timeAgo, 60000);

}



posts = document.getElementById('posts')

serverUrl = "https://damp-ridge-18897.herokuapp.com/"

function func(obj) {
    // console.log(obj.name, obj.url, obj.caption)
    posts.innerHTML += getCard(obj.name, obj.caption, obj.url, obj.date, obj._id)
}

window.onload = async function() {
    // alert('Page loaded')
    let requestURL = serverUrl + "memes"
    await fetch(requestURL, {
        method: 'GET'
    }).then(response => response.json())
      .then(json => {
            console.log(json)
            
            json.forEach(func)
            timeAgo()
            
      })
      .catch(err => console.log(err));
}



button = document.getElementById('submit')
url = document.getElementById('url')
code = document.getElementById('code')
result = document.getElementById('result')
errors = document.getElementById('errors')
let form = document.getElementById('form')


async function addMeme(e) {
    e.preventDefault()
    // urlToShorten = url.value
    // customCode = code.value
    // if(customCode == '') {
    //     customCode = 'Not applicable'
    // }
    Name = creator.value
    Caption = caption.value
    Url = url.value
    console.log(Name, Caption, Url);

    // let shortenedURL = ':)'

    let requestURL = serverUrl + "memes"
    let requestBody = {
        name: Name,
        caption: Caption,
        url: Url
    }
    // if(customCode == '') {
    //     requestURL = "http://localhost:5000/api/short"
    //     requestBody = {
    //         longUrl: urlToShorten
    //     }
    // }
    // console.log(customCode)
    // Make an API call to the URL shortening service and get the json and display the shortened URL or errors(if any)
    // await fetch("", {
    await fetch(requestURL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
      .then(json => {
            console.log(json)
            window.location.replace('https://mayank-aggrwal.github.io/x-meme/')
            // if(json.hasOwnProperty('errors')) {
            //     let displayText = `Error: ${json.errors.message}`
            //     result.innerHTML = ''
            //     errors.innerHTML = displayText
            // }
            // else {
            //     shortenedURL = json.shortUrl;
            //     let displayText = 'Your shortened URL is : ' + shortenedURL
            //     errors.innerHTML = ''
            //     result.innerHTML = displayText
            // }
      })
      .catch(err => console.log(err));
}

form.addEventListener('submit', addMeme)















// button = document.getElementById('submit')
// url = document.getElementById('url')
// code = document.getElementById('code')
// result = document.getElementById('result')

// async function shortenURL() {
    
//     urlToShorten = url.value
//     customCode = code.value
//     console.log(`URL: ${urlToShorten}\nCode: ${customCode}`);
//     let shortenedURL = ':)'

//     let requestURL = "https://shortt-ly.herokuapp.com/api/custom"
//     // let requestURL = "http://localhost:5000/api/custom"
//     let requestBody = {
//         longUrl: urlToShorten,
//         urlCode: customCode
//     }
//     if(customCode == '') {
//         requestURL = "https://shortt-ly.herokuapp.com/api/short"
//         // requestURL = "http://localhost:5000/api/short"
//         requestBody = {
//             longUrl: urlToShorten
//         }
//     }
//     console.log(customCode)

//     // Make an API call to the URL shortening service and get the json and display the shortened URL or errors(if any)
//     // await fetch("https://shortt-ly.herokuapp.com/api/short", {
//     await fetch(requestURL, {
//         method: 'POST',
//         body: JSON.stringify(requestBody),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     }).then(response => response.json())
//       .then(json => {
//             console.log(json)
//             if(json.hasOwnProperty('errors')) {
//                 let displayText = `Error: ${json.errors.message}`
//                 result.innerHTML = displayText
//             }
//             else {
//                 shortenedURL = json.shortUrl;
//                 let displayText = shortenedURL
//                 result.innerHTML = displayText
//             }
//       })
//       .catch(err => console.log(err));
// }
function getCard(name, caption, Url, d, id) {
    creationDate = new Date(d)
    text = `
    <section class="about" id="` + id + `">
        <div class="max-width">
            <div class="container">
                <div class="about-content">
                    <div class="column left">
                        <img src="` + Url + `">
                    </div>
                    <div class="column right">
                        <div class="text">` + caption + `</div>
                        <p><span>Posted by : ` + name + `</span><time class="timeago" datetime="` + creationDate.toISOString() + `"></time></p>
                        <a href="edit.htm"><i class="fas fa-user-edit"></i><span>Edit</span></a>
                        <a href="#" id="` + id + `" onClick="deleteMeme(this.id)"><i class="fas fa-trash"></i><span>Delete</span></a>
                        
                    </div>
                </div>
            </div>
        </div>
    </section>
    `
    // <p><span>Posted by : Mayank</span><time class="timeago" datetime="2021-02-15T09:58:06.202Z"></time></p>
    return text
}
function deleteMeme(id) {
    
    console.log(id)
    const endpoint = serverUrl + "memes/" + id 
    fetch(endpoint, {
        method: 'DELETE'
    }).then(response => response.json())
      .then(json => {
            console.log(json)
            window.location.replace('https://mayank-aggrwal.github.io/x-meme/')
            // if(json.hasOwnProperty('errors')) {
            //     let displayText = `Error: ${json.errors.message}`
            //     result.innerHTML = ''
            //     errors.innerHTML = displayText
            // }
            // else {
            //     shortenedURL = json.shortUrl;
            //     let displayText = 'Your shortened URL is : ' + shortenedURL
            //     errors.innerHTML = ''
            //     result.innerHTML = displayText
            // }
      })
      .catch(err => console.log(err));
}


