function print(text) {
    console.log(text)
}

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
function changeVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('scroll', () => {
    changeVh()
});

window.addEventListener('resize', () => {
    changeVh()
});

window.onload = () => changeVh()

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
    move_blob(event, 3000)
}
// needed this because the blur layer stayed the same size as the window size when the site was loaded, exposing the raw blob when the window resized again
const blur = document.getElementById("blur");

function resize_blur(event) {
    blur.style.backdropFilter = `blur(79px)`;
    delay(10).then(() => {
        blur.style.backdropFilter = `blur(80px)`;
    })


}

window.onresize = event => {
    resize_blur(event);
}
// stuff for hamburger menu (yes it's called a hamburger menu fuck off)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav_menu');

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav_link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

// changes blob's color when hovered over a clickable object
const a = document.querySelector("a")

document.querySelectorAll("a").forEach(n => n.addEventListener("mouseover", () => {
    blob.classList.toggle("active");
}, false))
document.querySelectorAll("a").forEach(n => n.addEventListener("mouseout", () => {
    blob.classList.remove("active");
}, false))

// observerfor on-scroll animation of projects text
var returnArr = Array
const observed = new Event("Observed")
const observer_prjanim = new IntersectionObserver((entries) => {
    returnArr = { key: Boolean };
    entries.forEach((entry) => {
        const target = entry.target.classList.value;
        if (entry.isIntersecting) {
            entry.target.classList.toggle("visible");
            returnArr[target] = true;
            dispatchEvent(observed)
        } else {
            entry.target.classList.remove("visible");
            returnArr[target] = false;
            dispatchEvent(observed)
        }
    });
    return returnArr
});


const projects_text = document.querySelector(".projects_text")

function anim_projects() {
    console.log(returnArr)
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

observer_prjanim.observe(projects_text)
window.addEventListener(
    "Observed",
    (e) => {
        if (returnArr["projects_text"]) {
            anim_projects()
        } else { };
    },
    false
);
document.querySelector(".projects_text").onmouseover = event => {
    anim_projects()
}
document.querySelector(".projects_text").onclick = event => {
    anim_projects()
}

// glowing shit for projects
document.getElementById("projects").onmousemove = e => {
    for (const project of document.querySelectorAll(".project")) {
        const rect = project.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        project.style.setProperty("--mouse-x", `${x}px`);
        project.style.setProperty("--mouse-y", `${y}px`);
    };
};

// animations for projects (cards)
const projects = document.querySelectorAll(".project")
const observer_prj = new IntersectionObserver((elements) => {
    print(elements)
    elements.forEach((element) => {
        if (element.isVisible) {
            element.target.classList.toggle("visible");
        } else {
            element.target.classList.remove("visible");
        }
    });
});
projects.forEach(project => {
    observer_prj.observe(project)
});

