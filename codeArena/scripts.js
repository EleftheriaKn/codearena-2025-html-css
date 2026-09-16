// menu dropdown
const menuItems = document.querySelectorAll('.menu-item');
const menu = document.getElementById('menu');
const menuButton = document.getElementById('menu-button');
let isHidden = true;

menuButton.addEventListener('click', () => {
    if (isHidden){
        menu.classList.remove('hidden');
        menuItems.forEach((item, i)=> {
            item.classList.add('opacity-0');
            setTimeout(() => {
                item.classList.remove('opacity-0');
                item.classList.add('opacity-100');
            }, i*400);
        })
    }else{
        [...menuItems].reverse().forEach((item, i)=> {
            setTimeout(() => {
                item.classList.remove('opacity-100');
                item.classList.add('opacity-0');
                if (i === menuItems.length - 1) {
                    menu.classList.add('hidden')
                }
            }, i*400);
        })
    }
    isHidden = !isHidden;

});


// carousel
document.querySelectorAll('.carousel').forEach(item => {
    const prevButton = item.querySelector('.prev-carousel');
    const nextButton = item.querySelector('.next-carousel');
    const slider = item.querySelector('.slider');
    const images = slider.querySelectorAll('img');
    let index_image = 0;
    function scrollCarousel(direction) {
        const firstItem = slider.querySelector('.flex-none') || slider.querySelector('.flex-col');
        // const pad = parseInt(getComputedStyle(slider).paddingLeft) || parseInt(getComputedStyle(slider).px) || 0;
        const gap = 30;
        const scrollWidth = firstItem.offsetWidth + gap;
        let newScrollLeft = slider.scrollLeft + (scrollWidth * direction);

        slider.scrollTo({
            left: slider.scrollLeft + (scrollWidth * direction),
            behavior: "smooth",
        });
        slider.addEventListener('scroll', hiddenButtons);
    }

    function hiddenButtons() {
        if (slider.scrollLeft <= 0) {
            prevButton.style.visibility = 'hidden';
        } else {
            prevButton.style.visibility = 'visible';
        }
    
        if (slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth - 1) {
            nextButton.style.visibility = 'hidden';
        } else {
            nextButton.style.visibility = 'visible';
        }
    }

    let intervalCarousel;
    function autoCarousel(){
        intervalCarousel=setInterval(() => {
            index_image = (index_image + 1) % images.length;
            if (index_image === 0) {
                slider.scrollTo({
                    left: 0,
                    behavior: 'smooth',
                });
            } else {
                scrollCarousel(1);
            }
        }, 4000);
    }
    
    function resetAutoCarousel(){
        if(intervalCarousel){
            clearInterval(intervalCarousel);
        }
        autoCarousel();
    }

    prevButton.addEventListener('click', () => {
        index_image = (index_image - 1 + images.length) % images.length;
        scrollCarousel(-1);
        if (window.innerWidth < 768) {
            resetAutoCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        index_image = (index_image - 1 + images.length) % images.length;
        scrollCarousel(1);
        if (window.innerWidth < 768) {
            resetAutoCarousel();
        }
    });

    if (window.innerWidth < 768) {
        autoCarousel();
        hiddenButtons();
    }
});

// scroll reviews
document.addEventListener("DOMContentLoaded", () => {
    const quotes=[
        {
            text: "Ένα μεγάλο ευχαριστώ είναι ίσως λίγο για να εκφράσει την ευγνωμοσύνη που νιώθω για τον γιατρό μου Κο Π. Νομικό. Το Σεπτέμβριο του 2009 ανακάλυψα ότι είχα έναν όγκο στον εγκέφαλο. Μετά το αρχικό σοκ, επισκεφτήκαμε με τον σύζυγο μου αρκετούς νευροχειρούργους σε Αθήνα και Θεσσαλονίκη. Πήραμε επίσης γνώμες από δύο γιατρούς του εξωτερικού και",
            author: "Ρουθ Π., Αθήνα."
        },
        {
            text: "Έμεινα πολύ ευχαριστημένος",
            author: "Πέτρος Κ., Αθήνα"
        },
        {
            text: "Με βοήθησε να λύσω ένα πρόβλημα που είχα για χρόνια",
            author: "Μαρία Μ., Αθήνα"
        },
    ];

    let quote=0;
    const textQuote = document.getElementById("text-quote");
    const prevButtonQuotes = document.getElementById("prev-review");
    const nextButtonQuotes = document.getElementById("next-review");

    prevButtonQuotes.classList.add("cursor-pointer", "max-w-[20px]", "max-h-[20px]");
    nextButtonQuotes.classList.add("cursor-pointer", "max-w-[20px]", "max-h-[20px]");
    
    const maxCount=335;
    function finText(index){
        if (quotes[index].text.length > maxCount){
            quotes[index].text= quotes[index].text.substring(0, maxCount) + " [...]";
        }
        textQuote.innerHTML = `${quotes[index].text}
                                    <span class="block font-bold mt-0">--${quotes[index].author}</span>
                                </p>
                            `;
        return quotes[index].text;
    }

    let intervalQuotes;
    function autoScrollQuotes(){
        intervalQuotes=setInterval(() => {
            quote = (quote + 1) % quotes.length;
            finText(quote);
        }, 4000);
    }
    
    function resetAutoScrollQuotes(){
        if(intervalQuotes){
            clearInterval(intervalQuotes);
        }
        autoScrollQuotes();
    }
    
    prevButtonQuotes.addEventListener('click', () => {
        quote = (quote - 1 + quotes.length) % quotes.length;
        finText(quote);
        resetAutoScrollQuotes();
    });

    nextButtonQuotes.addEventListener('click', () => {
        quote = (quote + 1) % quotes.length;
        finText(quote);
        resetAutoScrollQuotes();
    });

    finText(quote);
    autoScrollQuotes();
});
