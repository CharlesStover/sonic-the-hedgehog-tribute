var audio  = document.getElementsByTagName("audio"),
  audioCur = 0,
  far      = document.getElementById("sonic-far"),
	farPos   = 0,
	// konami   = new Konami(),
  near     = document.getElementById("sonic-near"),
  nearPos  = 0,
  speed    = 0.25,
  sprite   = function(loc) {
    var bg = document.createElement("div");
    if (loc == "far")
      bg.style.backgroundPosition = "0 -" + 112 * Math.floor(Math.random() * 7) + "px";
    else
      bg.className = "sonic-near" + Math.ceil(Math.random() * 7);
    window[loc].appendChild(bg);
  },
  water    = document.getElementById("sonic-water"),
  waterPos = 0,
  x;

document.getElementById("sonic-box").addEventListener(
  "click",
  function() {
    var sonic = document.createElement("div");
    sonic.setAttribute("id", "sonic-hedgehog");
    this.removeChild(document.getElementById("sonic-hedgehog"));
    this.insertBefore(sonic, this.firstChild);
  }
);

document.getElementById("sonic-volume").addEventListener(
  "click",
  function() {
    if (
      audio[audioCur].currentTime == 0 ||
      audio[audioCur].paused
    )
      audio[audioCur].play();
    else
      audio[audioCur].pause();
  }
);

var resize = function() {

    // Remove all current sprites.
    while (far.firstChild)
      far.removeChild(far.firstChild);
    while (near.firstChild)
      near.removeChild(near.firstChild);

    // Populate with sprites.
    for (x = 0; x <= water.offsetWidth + 256; x += 256) {
      sprite("far");
      sprite("near");
    }
  },
  scroll = function() {

    requestAnimationFrame(scroll);

    // Scroll farby land 1px per 3 iterations.
    farPos += 1 * speed;
    if (farPos >= 256) {
      farPos = 0;
      sprite("far");
      far.removeChild(far.firstChild);
    }
    far.scrollLeft = farPos;

    // Scroll nearby land 1px per 2 iterations.
    nearPos += 2 * speed;
    if (nearPos >= 256) {
      nearPos = 0;
      sprite("near");
      near.removeChild(near.firstChild);
    }
    near.scrollLeft = nearPos;

    // Scroll water 1px per iteration.
    waterPos -= 4 * speed;
    if (waterPos <= -256)
      waterPos = 0;
    water.style.backgroundPosition = waterPos + "px 150px";
  };

window.addEventListener("load",   resize);
window.addEventListener("load",   scroll);
window.addEventListener("resize", resize);

// After the Konami library has loaded,
/*
window.addEventListener(
  "load",
  function() {
    konami.add(function() {
      audio[audioCur].pause();
      audioCur = (audioCur + 1) % 2;
      audio[audioCur].load();
      audio[audioCur].play();
    });
  }
);
*/
