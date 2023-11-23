var attempts = 3;
var retorno =  false;
function validateForm() {
    var x = document.forms["password-form"]["password"].value;
    console.log(attempts);
    console.log(x)
    if (x.toLowerCase() == "martha" && attempts > 0) {
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
                message = "Auto-destruição iniciada!";
                break;
        }
        document.getElementById("error-message").innerHTML = message;
        if (attempts == 0) {
            selfDestructAudio = document.getElementById("self-destruct");
            selfDestructAudio.play();
            setTimeout(selfDestruct, 17500);
        }
    }
    return x.toLowerCase() == "martha" && attempts > 0;
}

function selfDestruct() {
    alert("Você morreu. Reencarnando...");
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

//SEARCH

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    clearPreviousResults();
    
    let characterName = document.getElementById('search-field').value;

    fetch("db/csvjson.json")
    .then(response => response.json())
    .then(data => {
        found = false;
        for (const character of data) {
            if (character["INFO_01_NAME"].toUpperCase() === characterName.toUpperCase() || character["01_NICKNAME"].toUpperCase() === characterName.toUpperCase() || character["02_REALNAME"].toUpperCase() === characterName.toUpperCase()) {
                found = true;
                const divFlexMoreInfo = document.createElement('div');
                const divFlexImage = document.createElement('div');
                const divFlexInfoContainer = document.createElement('div');
                const divFlexInfo = document.createElement('div');
                const divButtonContainer = document.createElement('div');
                const button = document.createElement('button');
                const nameField = document.createElement('p');
                const nicknameField = document.createElement('p');
                const heightField = document.createElement('p');
                const weightField = document.createElement('p');
                const storyField = document.createElement('p');
                const locationField = document.createElement('p');
                const occupationField = document.createElement('p');
                const attributeOneField = document.createElement('p');
                const attribute2Field = document.createElement('p');
                const attribute3Field = document.createElement('p');
                const attribute4Field = document.createElement('p');
                const attribute5Field = document.createElement('p');
                const image = document.createElement('img');
                

                heightField.innerHTML ="<span style='color: #D5FDFF;'>Altura:</span> " + character["07_HEIGHT"];
                weightField.innerHTML = "<span style='color: #D5FDFF;'>Peso:</span> " + character["08_WEIGHT"];
                storyField.innerHTML = "<span style='color: #D5FDFF;'>História:</span> " + character["STORY"];
                locationField.innerHTML = "<span style='color: #D5FDFF;'>Atua em:</span> " + character["04_BASE"];
                occupationField.innerHTML = "<span style='color: #D5FDFF;'>Profissão:</span> " + character["03_OCCUPATION"];
                nicknameField.innerHTML = "<span style='color: #D5FDFF;'>Apelido:</span> " + character["INFO_01_NAME"];
                nameField.innerHTML = "<span style='color: #D5FDFF;'>Nome:</span> " + character["02_REALNAME"];
                attributeOneField.innerHTML = "<span style='color: #D5FDFF;'>Característica 1:</span> " + character["ATTRIB_01"];
                attribute2Field.innerHTML = "<span style='color: #D5FDFF;'>Característica 2:</span> " + character["ATTRIB_02"];
                attribute3Field.innerHTML = "<span style='color: #D5FDFF;'>Característica 3:</span> " + character["ATTRIB_03"];
                attribute4Field.innerHTML = "<span style='color: #D5FDFF;'>Característica 4:</span> " + character["ATTRIB_04"];
                attribute5Field.innerHTML = "<span style='color: #D5FDFF;'>Característica 5:</span> " + character["ATTRIB_05"];
                image.src = character["IMG"];
                button.type = "button";
                button.textContent = "Buscar novamente"
                button.onclick = function() {
                    window.history.back();
                };

                divFlexImage.classList.add("hidden");
                divFlexInfoContainer.classList.add("hidden");
                divFlexInfoContainer.classList.add("flex-container");
                divFlexInfo.classList.add("flex-container");
                divFlexMoreInfo.classList.add("flex-container");
                divFlexImage.classList.add("flex-container");
                divButtonContainer.classList.add("flex-container");
                document.getElementById("table-buceta").classList.add("flex-container");

                divFlexInfo.appendChild(nicknameField)
                divFlexInfo.appendChild(nameField);
                divFlexInfo.appendChild(heightField);
                divFlexInfo.appendChild(weightField);
                divFlexInfo.appendChild(storyField);
                divFlexInfo.appendChild(occupationField);
                divFlexInfo.appendChild(locationField);
                divFlexMoreInfo.appendChild(attributeOneField);
                divFlexMoreInfo.appendChild(attribute2Field);
                divFlexMoreInfo.appendChild(attribute3Field);
                divFlexMoreInfo.appendChild(attribute4Field);
                divFlexMoreInfo.appendChild(attribute5Field);
                divFlexImage.appendChild(image);
                divButtonContainer.appendChild(button);

                document.getElementById("menu").remove();
                document.getElementById("deleta-essa-merda").remove();
                document.getElementById("deleta-essa-merda-3").remove();

                divFlexMoreInfo.querySelectorAll('p').forEach(paragraph => {
                    paragraph.style.textAlign = 'start';
                });

                document.getElementById("table-buceta").appendChild(divFlexInfoContainer);
                divFlexInfoContainer.appendChild(divFlexInfo);
                divFlexInfoContainer.appendChild(divFlexMoreInfo);
                divFlexInfoContainer.appendChild(divButtonContainer);
                document.getElementById("table-buceta").appendChild(divFlexImage);
                
                setTimeout(function() {
                    divFlexImage.classList.add('visible');
                    divFlexInfoContainer.classList.add('visible');
                }, 300);

                break;
            }
        }

        if (!found) {
            const notFoundField = document.createElement('p');
            notFoundField.style.color = "red";
            notFoundField.innerText = "NÃO FOI ENCONTRADO! (Não se esqueça de hífens e acentos)"
            document.getElementById("table-buceta").appendChild(notFoundField);
        }
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});

function clearPreviousResults() {
    const table = document.getElementById("table-buceta");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}