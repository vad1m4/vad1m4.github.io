// yes i'm gross. cry about it
function print(text) {
    console.log(text)
}

function addEvent(element, evnt, funct) {
    if (element.attachEvent)
        return element.attachEvent('on' + evnt, funct);
    else
        return element.addEventListener(evnt, funct, false);
}

// stylish navbar

function hideNavMenu() {
    if (!(window.scrollY > 50)) {
        navMenu.classList.remove("active")
        hamburger.classList.remove("active")
    }
}

window.addEventListener("scroll", function () {
    const header = document.querySelector(".navbar");
    header.classList.toggle("sticky", window.scrollY > 0)
    hamburger.classList.toggle("on", window.scrollY > 50)
    hideNavMenu()
})

// fixes vh for mobile
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
function changeVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
addEvent(
    window,
    "scroll",
    changeVh())

addEvent(
    window,
    "resize",
    changeVh())

addEvent(
    window,
    "load",
    changeVh)

// adds delay, i needed that to make the resize_blur work. if not for the delay, it would simply not work
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
// moves the blurred blob in the background
const blob = document.getElementById("blob");

function move_blob(event, speed) {
    const { clientX, clientY } = event;

    blob.animate({
        left: clientX + 'px',
        top: clientY + 'px'
    }, { duration: speed, fill: "forwards" });
}
// added onclick for mobile devices
document.body.onclick = event => {
    move_blob(event, 1000)
}

document.body.onpointermove = event => {
    move_blob(event, 8000)
}
// needed this because the blur layer stayed the same size as the window size when the site was loaded, exposing the raw blob when the window resized again
const blur = document.getElementById("blur");

function resize_blur(event) {
    blur.style.backdropFilter = `blur(79px)`;
    delay(10).then(() => {
        blur.style.backdropFilter = `blur(80px)`;
    })


}

window.addEventListener("resize", function (event) {
    resize_blur(event)
})
// stuff for hamburger menu (yes it's called a hamburger menu fuck off)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

addEvent(
    hamburger,
    "click",
    function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        hideNavMenu()
    }
)

document.querySelectorAll(".nav_link").forEach(n => addEvent(
    n,
    "click",
    function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hideNavMenu()
    }
))

// changes blob's color when hovered over a clickable object
const a = document.querySelector("a")

document.querySelectorAll("a").forEach(n => addEvent(
    n,
    "mouseover",
    function () {
        blob.classList.toggle("active");
    }
))

document.querySelectorAll("a").forEach(n => addEvent(
    n,
    "mouseout",
    function () {
        blob.classList.toggle("active");
    }
))

// observerfor on-scroll animation of projects text
var returnArr = Array
const observed = new Event("Observed")
const observeranim = new IntersectionObserver((entries) => {
    returnArr = { key: Boolean };
    entries.forEach((entry) => {
        const target = entry.target.classList.value;
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            returnArr[target] = true;
            dispatchEvent(observed)
        }
    });
    return returnArr
});


const projects_text = document.querySelector(".projects_text")

function anim_projects() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const target = document.querySelector(".projects_text")
    let iterations = 0;
    const interval = setInterval(() => {
        target.innerText = target.innerText.split("")
            .map((letter, index) => {
                if (index == 2 || index == 9) {
                    return " "
                }
                if (index < iterations - 1) {
                    return target.dataset.value[index]
                }
                return letters[Math.round((Math.random() * 25))]
            })
            .join("")

        if (iterations >= target.dataset.value.length) clearInterval(interval)

        iterations += 1 / 3
    }, 30)
}

observeranim.observe(projects_text)
window.addEventListener(
    "Observed",
    (e) => {
        if (returnArr["projects_text"]) {
            anim_projects()
        } else { };
    },
    false
);

addEvent(
    document.querySelector(".projects_text"),
    "mouseover",
    anim_projects
)

addEvent(
    document.querySelector(".projects_text"),
    "click",
    anim_projects
)

// glowing shit for projects
addEvent(
    document.getElementById("projects"),
    "mousemove",
    function (e) {
        for (const project of document.querySelectorAll(".project")) {
            const rect = project.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            project.style.setProperty("--mouse-x", `${x}px`);
            project.style.setProperty("--mouse-y", `${y}px`);
        };
    }
)

// animations for projects (cards)
const projects = document.querySelectorAll(".project")
print(projects)
const observer = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if (element.isIntersecting) {
            element.target.classList.add("visible");
        };
    });
});
projects.forEach(project => {
    observer.observe(project);
});

const projectS = document.getElementById('project-s');
const changeWidthElements = document.querySelectorAll('.width-dynamic-projects');
function calcRowItem() {
    const height = projectS.offsetHeight;
    changeWidthElements.forEach(element => {
        if (height == 620) {
            element.style.setProperty('max-width', '940px');
            element.classList.remove('mbl-hdr')
        } else if (height == 940) {
            element.style.setProperty('max-width', '620px');
            element.classList.remove('mbl-hdr')
        } else {
            element.style.setProperty('max-width', null);
            element.classList.add('mbl-hdr');
        };
    });
};

addEvent(
    window,
    "load",
    calcRowItem
);

addEvent(
    window,
    "resize",
    calcRowItem
);

const animated = document.querySelectorAll('.animated');
animated.forEach(element => {
    observer.observe(element)
});


const footer = document.querySelector('.footer_main');
const hovered = document.querySelectorAll('.hover');

function changeHovered() {
    hovered.forEach(element => {
        element.classList.toggle('hovered')
    });
};

addEvent(
    footer,
    "mouseover",
    changeHovered
);

addEvent(
    footer,
    "mouseout",
    changeHovered
);

const footerBg = document.querySelector('.footer_background');
function fixHeight() {
    print("resized")
    footerBg.style.height = `${footer.offsetHeight + 1}px`;
};

addEvent(
    window,
    "resize",
    fixHeight
);

addEvent(
    window,
    "load",
    fixHeight
);
