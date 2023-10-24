var attempts = 3;
var retorno =  false;
function validateForm() {
    var x = document.forms["password-form"]["password"].value;
    console.log(attempts);
    console.log(x)
    if (x.toLowerCase() == "kronos" && attempts > 0) {
        changeTo("white");
    } else {
        if (attempts > 0) {
            attempts -= 1;
        }
        colors = ["red", "black"];
        var gap = 250;
        for (i = 0; i <= 2; i++) {
            setTimeout(function() {
                changeTo(colors[0]);
            }, 2 * gap * i);
        }
        for (i = 0; i <= 2; i++) {
            setTimeout(function() {
                changeTo(colors[1]);
            }, gap * (1 + 2 * i));
        }

        var message = `Aviso: ${attempts} tentativas restantes antes da auto-destruição.`
        switch (attempts) {
            case 1: 
                message = "Aviso: 1 tentativa restante antes da auto-destruição.";
                break;
            case 0:
                message = "Auto-destruição iniciado.";
                break;
        }
        document.getElementById("error-message").innerHTML = message;
        if (attempts == 0) {
            selfDestructAudio = document.getElementById("self-destruct");
            selfDestructAudio.play();
            setTimeout(selfDestruct, 17500);
        }
    }
    return x.toLowerCase() == "kronos" && attempts > 0;
}

function selfDestruct() {
    alert("Você morreu. Reincarnando...");
    location.reload();
}

function changeTo(c) {
    document.getElementById("password").style.color = c;
}

var i=0;
function toggle() {
  var doc = document.getElementById("password");
  var color = ["black","red"];
  doc.style.color = color[i];
  i = 1 - i;
}

function mouseOver(c) {
    var all = document.getElementsByClassName(c);
    for (var i = 0; i < all.length; i++) {
        all[i].style.color = "white";
        all[i].style.backgroundColor = "#97ADAE";
    }
    
}

function mouseOut(c) {

    var all = document.getElementsByClassName(c);
    for (var i = 0; i < all.length; i++) {
        all[i].style.color = 'black';
        all[i].style.backgroundColor = "transparent";
    }
}

function mouseOverInvert(c) {
    var images = document.getElementById("icon"+c.slice(-1));
    images.style.filter = "invert(1)";
}

function mouseOutInvert(c) {
    var images = document.getElementById("icon"+c.slice(-1));
    images.style.filter = "invert(0)";
}