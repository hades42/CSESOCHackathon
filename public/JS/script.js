function splitHash(hash) {
  const regex = "#!/([^/]*)/?(.*)?";
  const match = hash.match(regex);
  if (match) {
    return {
      path: match[1],
      id: match[2],
    };
  } else {
    return { path: "" };
  }
}
function welcomePage(target){
    let container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `<div class="mainbar">
            <div id = 'main-box'>
                <div>
                    <h1>Welcome</h1>
                </div>
                <div id='my-units'>
                    <h2>My units</h2>
                    <a class="btn__unit" href="/#!/unit/comp9990">COMP9990</a> <br>
                    <a class="btn__unit" href="/#!/unit/comp7380">COMP7380</a> <br>
                    <a class="btn__unit mb" href="/#!/unit/comp4200">COMP4200</a>
                </div>
                <div id='calendar'> 
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Australia%2FSydney&amp;src=NzFrZXJ2ZWw0YjFiOWVubHNwazlqbXViaWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23616161"
                    style="border:solid 1px #777" width="100%" height="600" frameborder="0" scrolling="no"></iframe></div>
            </div>
            </div>
        <div class="rightBar">
            <!-- Anouncement on top -->
            <div class="rightBar__anouncement">
                <h2> University Announcements </h2>
                <p> Lastest Post</p>
            </div>
            <!-- Middle part -->
            <ul class="rightBar__content">
                <li>Welcome to octomester 8 of 2024!</li>
            </ul>
            <!-- Time Table -->
            <div class="rightBar__timeTable">
                <h2>Class Timetable</h2>
                <ul class="rightBar__listTable">
                    <li>
                        <div class="listTable__list">
                            <p class="listTable__unit">COMP9999</p>
                            <p class="listTable__time">THURS 1AM</p>
                            <p class="listTable__status">Next Class</p>
                        </div>
                    </li>
                    <li>
                        <div class="listTable__list">
                            <p class="listTable__unit">COMP1212</p>
                            <p class="listTable__time">THURS 2AM</p>
                            <p class="listTable__status">Cancelled</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>`;
    target.appendChild(container);
}
function unitPage(target, unitCode){
    let container = document.createElement("div");
    container.className = "container";
    container.innerHTML = `
    <div class = "container2">
        <div class="leftBar-classpage">
            <div class="leftBar__session">

        <widgetbot
        server="299881420891881473"
        channel="355719584830980096"
        width="800"
        height="600"
        ></widgetbot>
        </div>
    </div>
    <div class = "mainbar-classpage">
        <h1>${unitCode}</h1>
        <iframe src="https://127.0.0.1/" title="ilearn" width="100%" height="700" style="border:none;"></iframe>
    </div>
`

    target.appendChild(container);
}
function redraw(){
    let path = splitHash(window.location.hash);
    // target the main contain
    let contain = document.querySelector(".content");

    contain.innerHTML = "";
    console.log(path);
    if(path.path === ""){
        welcomePage(contain);
    } else if(path.path === "unit"){
        unitPage(contain,path.id);
    }
}

// Redraw thing
window.onload = function() {
    redraw();
}

window.onhashchange = redraw;