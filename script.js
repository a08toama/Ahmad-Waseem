// Data for AI Tools
const tools = [
    {
        id: 1,
        name: "ElevenLabs",
        category: "audio",
        description: "أفضل أداة لتوليد الصوت بالذكاء الاصطناعي بجودة لا تضاهى.",
        rating: 5,
        logo: "https://ui-avatars.com/api/?name=EL&background=random&size=128",
        link: "#"
    },
    {
        id: 2,
        name: "Jasper AI",
        category: "writing",
        description: "مساعد كتابة ذكي لإنشاء محتوى تسويقي ومقالات احترافية.",
        rating: 4.5,
        logo: "https://ui-avatars.com/api/?name=JA&background=random&size=128",
        link: "#"
    },
    {
        id: 3,
        name: "Midjourney",
        category: "image",
        description: "توليد صور فنية بدقة عالية وخيال واسع من خلال الأوامر النصية.",
        rating: 5,
        logo: "https://ui-avatars.com/api/?name=MJ&background=random&size=128",
        link: "#"
    },
    {
        id: 4,
        name: "Synthesia",
        category: "video",
        description: "إنشاء فيديوهات بشخصيات افتراضية تتحدث لغات متعددة.",
        rating: 4,
        logo: "https://ui-avatars.com/api/?name=SY&background=random&size=128",
        link: "#"
    },
    {
        id: 5,
        name: "Copy.ai",
        category: "writing",
        description: "أداة كتابة نصوص إعلانية ورسائل بريد إلكتروني بسرعة فائقة.",
        rating: 4.5,
        logo: "https://ui-avatars.com/api/?name=CA&background=random&size=128",
        link: "#"
    },
    {
        id: 6,
        name: "Runway",
        category: "video",
        description: "منصة إبداعية لتحرير الفيديو وإنشاء محتوى مرئي بالذكاء الاصطناعي.",
        rating: 4.5,
        logo: "https://ui-avatars.com/api/?name=RW&background=random&size=128",
        link: "#"
    }
];

// Function to generate star ratings
function getStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star text-yellow-400"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star text-gray-500"></i>';
    }
    return starsHtml;
}

// Function to render tools with 3D Tilt
function renderTools(category = 'all') {
    const grid = document.getElementById('tools-grid');
    if (!grid) return; // Guard clause

    grid.innerHTML = '';

    const filteredTools = category === 'all'
        ? tools
        : tools.filter(tool => tool.category === category || (category === 'video' && tool.category === 'image'));

    filteredTools.forEach((tool, index) => {
        const card = document.createElement('div');
        // VanillaTilt class and data attributes
        card.className = 'tool-card bg-slate-800/40 rounded-2xl p-8 flex flex-col gap-6 relative group border border-white/5 scroll-reveal';
        card.style.transitionDelay = `${index * 100}ms`; // Staggered reveal

        // Tilt settings
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '15');
        card.setAttribute('data-tilt-speed', '400');
        card.setAttribute('data-tilt-glare', 'true');
        card.setAttribute('data-tilt-max-glare', '0.2');
        card.setAttribute('data-tilt-perspective', '1000');

        card.innerHTML = `
            <div class="tool-content flex items-center gap-5 relative z-10 transform translate-z-10">
                <div class="relative">
                    <div class="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                    <img src="${tool.logo}" alt="${tool.name}" class="w-16 h-16 rounded-xl relative z-10 shadow-2xl">
                </div>
                <div>
                    <h3 class="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">${tool.name}</h3>
                    <div class="flex gap-1 text-sm mt-2 opacity-80">
                        ${getStars(tool.rating)}
                    </div>
                </div>
            </div>
            
            <p class="tool-content text-slate-300 leading-relaxed text-base h-16 overflow-hidden relative z-10 font-light transform translate-z-10">
                ${tool.description}
            </p>

            <a href="${tool.link}" class="tool-content relative z-10 cta-button mt-auto bg-slate-700/50 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-lg transform transition-all border border-white/10 group-hover:border-sky-500/30 translate-z-20">
                جرب الأداة الآن <i class="fas fa-arrow-left mr-2 text-sm"></i>
            </a>
        `;

        grid.appendChild(card);
    });

    // Re-initialize VanillaTilt for new elements
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tool-card"));
    }
}


// Typewriter Effect Logic
const TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Tools (Only if on grid page)
    if (document.getElementById('tools-grid')) {
        renderTools();
    }

    // 2. Typewriter Init
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // 3. Scroll Reveal Init
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    // 4. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


});
