const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');
const blob = document.getElementById("blob");
const blur = document.getElementById("blur");

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function move_blob(event) {
    const { clientX, clientY } = event;

    blob.animate({
        left: clientX + 'px',
        top: clientY + 'px'
    }, { duration: 3000, fill: "forwards" });
}

function resize_blur(event) {
    blur.style.backdropFilter = `blur(79px)`;
    delay(10).then(() => {
        console.log("resized");
        blur.style.backdropFilter = `blur(80px)`;
    })


}

window.onresize = event => {
    resize_blur(event);
}


// document.body.onpointermove = event => {
//     const { clientX, clientY } = event;

//     blob.animate({
//         left: clientX + 'px',
//         top: clientY + 'px'
//     }, { duration: 3000, fill: "forwards"});

// }



document.body.onscroll = event => {
    move_blob(event)
}

document.body.onpointermove = event => {
    move_blob(event)
}


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav_link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

