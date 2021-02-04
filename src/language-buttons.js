import {localize} from '@lion/localize';
    // document.getElementById("btn-nl").addEventListener("click",()=>{
    //     localize.locale = 'nl-NL';
    //     document.getElementById("btn-nl").classList.toggle("selected",true);
    //     document.getElementById("btn-fr").classList.toggle("selected",false);
    //     document.getElementById("btn-gb").classList.toggle("selected",false);
    // });
    // document.getElementById("btn-fr").addEventListener("click",()=>{
    //     localize.locale = 'fr-FR';
    //     document.getElementById("btn-fr").classList.toggle("selected",true);
    //     document.getElementById("btn-nl").classList.toggle("selected",false);
    //     document.getElementById("btn-gb").classList.toggle("selected",false);
    // });
    // document.getElementById("btn-gb").addEventListener("click",()=>{
    //     localize.locale = 'en-GB';
    //     document.getElementById("btn-gb").classList.toggle("selected",true);
    //     document.getElementById("btn-fr").classList.toggle("selected",false);
    //     document.getElementById("btn-nl").classList.toggle("selected",false);
    // });

    
    

    document.querySelector('#lang').addEventListener('change', () => {
        console.log('changed');
        // debugger;
        let selected_lang = document.querySelector('#lang').querySelector('select').value;
        if(selected_lang == 'english')
        {
            localize.locale = 'en-GB';
        }
        else if(selected_lang == 'french')
        {
            localize.locale = 'fr-FR';
        }
        else if(selected_lang == 'dutch')
        {
            localize.locale = 'nl-NL';
        }
    });
    