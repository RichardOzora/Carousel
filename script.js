const track = document.getElementById("image-container");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    const clampedPercentage = Math.min(Math.max(nextPercentage, -100), 0);

    track.dataset.percentage = clampedPercentage;

    track.animate({
        transform: `translate(${clampedPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("img")) {
        image.style.objectPosition = '${nextPercentage + 100}% 50%'
        
        image.animate({
            objectPosition: `${clampedPercentage + 100}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}


