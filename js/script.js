window.onload = function(){
    // Variable declarations and initialization
    var startbtn = document.getElementById("start");
    var timer = document.getElementById("time");
    var gamefinish = document.getElementById("gameover");
    var score_card = document.getElementById("score_main");
    var currtime = 0; 
    var intervals
    var gametime = 10; //can increase the timer as per your requirements
    var score = 0 ;

      // Start button click event to start or restart the game and reset all the functionality
    startbtn.onclick = function(){
        score = 0 
        scoreout.innerHTML = score;
        timer.innerHTML = gametime;
        // Reset visuals for game elements
        var backg = document.getElementById("backg");
        score_card.classList.remove("bigg");
        backg.style.display = "block";
        startbtn.style.display = "none";
        gamefinish.style.display = "none";
        // Start the timer
        intervals = setInterval(timecounter, 1000);
        // Timer countdown logic 
        function timecounter(){
            gametime--;
            timer.innerHTML = gametime;
            // Check if the game time has ended
            if(gametime === currtime){
                gameover();
                clearInterval(intervals);
            }
             // Game over logic to show gameover screen and stop all game animations and points and timer...
            function gameover(){
                gamefinish.style.display = "block";
                startbtn.style.display = "block";
                startbtn.innerHTML = "Restart";
                backg.style.display = "none";
                score_card.classList.add("bigg");
                gametime = 10; //can increase the timer as per your requirements

            }   

        }
    }
    // Additional variables for game objects
    var broken = document.getElementsByClassName("piece");
    var scoreout = document.getElementById("score");
    var enemy = document.getElementById("obj");
    var locationxy;

    var randomx;
    var randomy;

    console.log(randomx);
    console.log(randomy);
    // Generate random positions for the enemy object
    function randomposx(){
        randomx = Math.round(Math.random() * 90);
        randomy = Math.round(Math.random() * 100);
        enemy.style.left = randomx + "%";
        
    }
    // Reset enemy object animation and position on each call
    function resetobj() {
        enemy.style.animation = "none"; 
        setTimeout(() => {
            enemy.style.animation = "";
        }, 10);
        randomposx(); 
    }
     // Enemy click event to handle scoring and explosion
    enemy.addEventListener("click", function(){
        score++;
        scoreout.style.animation = "none"; 
        setTimeout(() => {
            scoreout.style.animation = "score_update 500ms linear";
        }, 10);
        scoreout.innerHTML = score;
        
        enemy.style.background = "transparent";
        enemy.style.animationPlayState = "paused"; 
        locationxy = enemy.getBoundingClientRect();        
        // broken.style.top = Math.round((locationxy.top) + 45) + "px";
        // broken.style.left = Math.round(locationxy.left + 45) + "px";
        // Explosion effect logic for the enemy object with fragments like animation
        for(var i=0; i<4; i++){
            if(i==0){
            broken[i].style.display = "block";
            broken[i].style.animation = "p_up 1s linear";
            broken[i].style.top = Math.round((locationxy.top) + 40) + "px";
            broken[i].style.left = Math.round((locationxy.left) + 40) + "px";
            console.log(broken[i].getBoundingClientRect());
            }else if(i==1){
                broken[i].style.display = "block";
                broken[i].style.animation = "p_down 1s linear";
            broken[i].style.top = Math.round((locationxy.top) + 40) + "px";
            broken[i].style.left = Math.round(locationxy.left + 40) + "px";
            console.log(broken[i].getBoundingClientRect());

            }else if(i==2){
                broken[i].style.display = "block";
                broken[i].style.animation = "p_left 1s linear";
            broken[i].style.top = Math.round((locationxy.top) + 40) + "px";
            broken[i].style.left = Math.round((locationxy.left) + 40) + "px";
            console.log(broken[i].getBoundingClientRect());

            }else if(i==3){
                broken[i].style.display = "block";
                broken[i].style.animation = "p_right 1s linear";
            broken[i].style.top = Math.round((locationxy.top) + 40) + "px";
            broken[i].style.left = Math.round((locationxy.left) + 40) + "px";
            console.log(broken[i].getBoundingClientRect());

            }
            
        }

        
        setTimeout(() => {
            for(var i=0; i<4; i++){
                broken[i].style.display = "none";
                broken[i].style.top = "0%";
                broken[i].style.left = "0%";        
                
            }
            enemy.style.background = "radial-gradient(circle, red 20%, white 20%, white 40%, red 40%, red 60%, white 60%, white 80%, red 80% )";
            resetobj();
        }, 1000);
        
    });

    // Reset explosion pieces and enemy object after a delay to set it back to its original state
    document.onclick = function(e){
        if(!e.target.closest("#obj")){
            bullet.style.display="block";
        var xval = e.clientX - 5;
        var yval = e.clientY - 5;
        bullet.style.top = yval + "px";
        bullet.style.left = xval + "px";
        }
        setTimeout(() => {
            bullet.style.display="none";
            
        }, 900);

    }
    // Initialize the enemy with a random position
    randomposx(); 
}