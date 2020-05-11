class TypeWriter {
    constructor(txtElement, words, wait=3000){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait);
        this.type();
        this.isDeleting = false;
    }

    type(){
        const current = this.wordIndex % this.words.length;
        const fulltxt = this.words[current];

        if(this.isDeleting){
            this.txt = fulltxt.substring(0, this.txt.length -1);
        }
        else{
            this.txt = fulltxt.substring(0, this.txt.length +1);
        }

        this.txtElement.innerHTML = `<span class = "txt">${this.txt}</span>`;

        let typeSpeed = 300;

        if(this.isDeleting){
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fulltxt){
            typeSpeed = this.wait;
            this.isDeleting = true;
        }
        else if(this.isDeleting && this.txt === ""){
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(()=>this.type(),typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', init);

function init(){
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");

    new TypeWriter(txtElement,words,wait);
}