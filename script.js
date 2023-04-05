        /*visa sidmeny*/
        function toggleMenu(){
           
            var x = document.getElementById("menu");
            if(x.style.display === "none"){
                x.style.display ="block";

                    //Ikoner bytas
                var menuIcon = document.getElementById("menu-icon");
                var icon = document.createElement("i");
                icon.setAttribute("class", "fa-solid fa-angle-down")
                menuIcon.appendChild(icon);
                
                document.getElementById("menu").style.left="0px";   
                document.getElementById("menu").style.transform='scaleX(3)';    
                document.getElementById("menu").style.transform='scaleY(1)';     
                document.getElementById("menu").style.fontSize="x-large";  
                
                //hamburagaren bort
                var iconElement = menuIcon.getElementsByTagName("i")
                menuIcon.removeChild(iconElement[0]);
                  
            }
            else {
                x.style.display ="none";
                document.getElementById("menu").style.transform='scaleX(0)';     
                document.getElementById("menu").style.left="0px"; 
                   
            }
            
                
        }

      
        
        //tar data från JSON
        function getData(url, showAll) {
            document.getElementById("js-schedule").innerHTML = '';
            var imgLoading = document.getElementById("js-loading");
            imgLoading.setAttribute("class","loading-spinner");    
            
            function filtrering(data){
                console.log(data);
                let tid = data.filter((passandeTid) => new Date(passandeTid.start) > new Date());
                render(tid);
            }
            
            fetch(url)
            
            .then(function (response) {
                return response.json()
            }) 
            .then(function (data) {
            if(showAll){ render(data);
            }else {
                filtrering(data);
            }
            imgLoading.setAttribute("class","loading-spinner hidden");
            })
            .catch(function (err) {
                console.log(err);
            });  
            }

          
            
            
            function compare(a,b) {
                if (a.start < b.start){
                return -1;
                }
                if (a.start > b.start){
                return 1;
                
                }
                return 0; 
            }

        function render(data) {
            //jag tar "visa tidigare program" li efter raderat gamla js-schedule id
            var header = document.createElement("li");
            header.setAttribute("class","list-group-item show-previous");
            header.setAttribute("onclick","tidigareProgram()");
            header.textContent = 'Visa tidigare program';
           
            
            
            var mainContainer = document.getElementById("js-schedule");
            mainContainer.appendChild(header);
            data.sort(compare);


    //använder map() för att gå igenom data och formaterar tid.
            var formatedData=data.map(function(dateElement){
                const date = new Date(dateElement.start);
                const time2 = date.getHours()+ ' : ' +(date.getMinutes()<10?'0':'') + date.getMinutes() ;
                return {"name": dateElement.name, "start": time2};
            }); 
            
        for (var i = 0; i < formatedData.length; i++) {    
         
            var item = document.createElement("li");
            item.setAttribute("class","list-group-item");
            item.setAttribute("id","itemId");
            item.innerHTML = formatedData[i].name;
            mainContainer.appendChild(item);
        
            var strong = document.createElement("strong");
                
             
        strong.innerHTML = formatedData[i].start;
        mainContainer.appendChild(strong);
      
    }
        }

        //jag skapar funktion som tar hela list utan filtrering
        function tidigareProgram(){
            setChannel(document.getElementById("js-title").innerHTML, true);
        }

        //jag filtrerar program by time
        function filtrering(data){
        
        let tid = data.filter((passandeTid) => new Date(passandeTid.start) > new Date());
        render(tid);
        }


        //om klicker på setChannel på websidan då kommer filtrerat data by default
        function setChannel(channel) {

            setChannel(channel, false);
        };

        //viktigaste funktion som ropar på andra och inehåller data
        function setChannel(channel, all){
            document.getElementById("js-title").innerHTML = channel;
            if (channel == "SVT 1") {
            getData('https://raw.githubusercontent.com/IngridKutra/Tv-program/master/channels/channel1.json', all);
        } else if (channel == "SVT 2"  ) {
            getData('https://raw.githubusercontent.com/IngridKutra/Tv-program/master/channels/channel1.json', all);
        }else if (channel == "SVT Barn"  ) {
            getData('https://raw.githubusercontent.com/IngridKutra/Tv-program/master/channels/channel1.json', all);
        }else if (channel == "Kunskapskanalen"  ) {
        getData('https://raw.githubusercontent.com/IngridKutra/Tv-program/master/channels/channel1.json', all);
        }else if (channel == "SVT 24"  ) {
            getData('https://raw.githubusercontent.com/IngridKutra/Tv-program/master/channels/channel1.json', all);
        }
    };
  
    