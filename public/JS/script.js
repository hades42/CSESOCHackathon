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
                    <a class="btn__unit" href="/#!/unit">COMP9990</a> <br>
                    <a class="btn__unit" href="/#!/unit">COMP7380</a> <br>
                    <a class="btn__unit mb" href="/#!/unit">COMP4200</a>
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
function unitPage(target){
    let container = document.createElement("div");
    container.className = "container2";
    container.innerHTML = `
       <div class="leftBar-classpage">
                <div class="leftBar__session">
                </div>
                <div class="mainbar-classpage">
                    <iframe src="https://127.0.0.1/" title="ilearn" width="100%" height="910" style="border:none;"></iframe>
                </div>
            </div>
            <div class="rightBar-classpage">

                <div class="rightBar-firstBox">
                    <div class="firstBox-title">
                        <h2>Announcements</h2>
                        <p>Latest post</p>
                    </div>
                    <ul class="firstBox__list">
                        <li>
                            <p>Apologies for the last announcement</p>
                            <p>20/7</p>
                        </li>
                        <li>
                            <p>Uni is cancelled forever lol</p>
                            <p>19/7</p>
                        </li>
                    </ul>
                </div>

                <div class="rightBar-secondBox">
                    <div class="secondBox-title">
                        <h2>General Forum</h2>
                        <p>Latest post</p>
                    </div>
                    <ul class="secondBox__list">
                        <li>
                            <p>I need help</p>
                            <p>14/7</p>
                        </li>
                    </ul>
                </div>
            </div>
`;
console.log("page2");
    target.appendChild(container);
}
function redraw(){
    let path = splitHash(window.location.hash);
    // target the main contain
    let contain = document.querySelector(".content");
    // target discord
    let discordWidge = document.querySelector(".discord__bot");

    contain.innerHTML = "";
    console.log(path);
    if(path.path === ""){
        welcomePage(contain);
        discordWidge.className = "discord__bot hidden";
    } else if(path.path === "unit"){
        discordWidge.className = "discord__bot";
        unitPage(contain,path.id);
    }
}

// Redraw thing
window.onload = function() {
    redraw();
}

window.onhashchange = redraw;