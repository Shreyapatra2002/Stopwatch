// Create starry background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        const duration = 2 + Math.random() * 8;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `-${Math.random() * duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// Stopwatch functionality
const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 1;

// Buttons
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

// Add event listeners
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

// Touch events for mobile
startBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    start();
});

stopBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    stop();
});

resetBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    reset();
});

lapBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    recordLap();
});

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(update, 10);
        isRunning = true;
        
        // GSAP animation for start
        gsap.to("#display", {
            duration: 0.5,
            scale: 1.05,
            rotationX: 5,
            boxShadow: "0 0 25px rgba(0, 255, 255, 0.8)",
            ease: "power2.out"
        });
        
        gsap.to(startBtn, {
            duration: 0.3,
            scale: 0.95,
            boxShadow: "0 0 20px rgba(0, 208, 170, 0.8)",
            ease: "power2.out"
        });
    }
}

function stop(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        
        // GSAP animation for stop
        gsap.to("#display", {
            duration: 0.5,
            scale: 1,
            rotationX: 0,
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
            ease: "power2.out"
        });
        
        gsap.to(stopBtn, {
            duration: 0.3,
            scale: 0.95,
            boxShadow: "0 0 20px rgba(255, 91, 127, 0.8)",
            ease: "power2.out"
        });
    }
}

function reset(){
    clearInterval(timer); 
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00:00";
    lapCount = 1;
    
    // Clear lap times
    while (lapsContainer.childNodes.length > 1) {
        lapsContainer.removeChild(lapsContainer.lastChild);
    }
    
    // GSAP animation for reset
    gsap.fromTo("#display", 
        { rotationX: 360, scale: 0.8 },
        { duration: 0.8, rotationX: 0, scale: 1, ease: "back.out(1.7)" }
    );
    
    gsap.to(resetBtn, {
        duration: 0.3,
        scale: 0.95,
        boxShadow: "0 0 20px rgba(95, 100, 217, 0.8)",
        ease: "power2.out"
    });
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('div');
        lapItem.classList.add('lap-item');
        lapItem.textContent = `Lap ${lapCount++}: ${lapTime}`;
        
        // Add animation to lap item
        gsap.from(lapItem, {
            duration: 0.5,
            opacity: 0,
            y: -20,
            ease: "back.out(1.7)"
        });
        
        lapsContainer.appendChild(lapItem);
        lapsContainer.scrollTop = lapsContainer.scrollHeight;
        
        // GSAP animation for lap button
        gsap.to(lapBtn, {
            duration: 0.3,
            scale: 0.95,
            boxShadow: "0 0 20px rgba(255, 163, 63, 0.8)",
            ease: "power2.out"
        });
    }
}

function update(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
     
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);
    
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// Initialize
createStars();

// Add initial animation
gsap.from("#container", {
    duration: 1,
    scale: 0.8,
    rotationY: 180,
    opacity: 0,
    ease: "power3.out"
});

gsap.from("h1", {
    duration: 1,
    y: -50,
    opacity: 0,
    ease: "bounce.out",
    delay: 0.2
});

gsap.from(".button-box", {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 0.5
});