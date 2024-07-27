let search = document.getElementById("search");
search.addEventListener("click" , async function fetchData(){
    try{
         let home = document.getElementById("home");
         home.innerText = "";
         let word = input.value;
         console.log(word);
         let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,{
            method : 'GET'
        });
        let result = await data.json();
        console.log(result);
        let content = result[0];

        let card = document.createElement("div");
        card.setAttribute("class" , "card");
        card.setAttribute("style" , "width : 80%");
        home.appendChild(card);

        let head = document.createElement("h1");
        head.setAttribute("class" , "card-header");
        head.setAttribute("style" , "background-image: linear-gradient(#6bb3b0 ,#e6f5f4);");
        head.innerText = content.word;
        card.appendChild(head);

        let link = document.createElement("a");
        link.setAttribute("href" , "#");
        head.appendChild(link);
        let img = document.createElement("img");
        img.setAttribute("src" , "play-button.svg");
        img.setAttribute("style", "width : 40px ; height : 40px; position : relative ; left:70%");
        head.appendChild(img);
        
        

        img.addEventListener("click" , function playAudio(){
            if ((content.phonetics).length == 0){
                alert("Sorry, No sound found for this word!");
            }
            else{
            let audio = document.createElement("audio");
            audio.setAttribute("src" , content.phonetics[0].audio);
            audio.setAttribute("type" , "audio");
            link.appendChild(audio);
            audio.play();
            }
            
        });
        
        

        let body = document.createElement("div");
        body.setAttribute("class" , "card-body");
        card.appendChild(body);
        content.meanings.forEach(element => {
            let part = element.partOfSpeech;
            element.definitions.forEach(element => {
                let def = element.definition;
                console.log(def);
                let definition = document.createElement("p");
                definition.innerHTML = part + " : " + def;
                body.appendChild(definition);
            })
        });

    }
    catch(error){
        console.log(error);
    }
});
