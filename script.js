// Data for AI Tools
const tools = [
    {
        id: 1,
        name: "InVideo",
        category: "video",
        description_ar: "منصة شاملة لتحويل النص إلى فيديو وإنشاء محتوى مرئي احترافي.",
        description_en: "Comprehensive platform to turn text into video and create professional visual content.",
        rating: 4.8,
        logo: "https://ui-avatars.com/api/?name=IV&background=random&size=128",
        link: "#"
    },
    {
        id: 2,
        name: "ElevenLabs",
        category: "audio",
        description_ar: "أفضل أداة لتوليد الصوت بالذكاء الاصطناعي بجودة لا تضاهى.",
        description_en: "The best AI voice generation tool with unmatched quality.",
        rating: 5,
        logo: "https://ui-avatars.com/api/?name=EL&background=random&size=128",
        link: "#"
    },
    {
        id: 3,
        name: "Rytr",
        category: "video",
        description_ar: "لا تعاني من بياض الصفحة بعد الآن. Rytr يساعدك على كتابة رسائل البريد، المقالات، ومنشورات التواصل الاجتماعي بالعربية والإنجليزية في ثوانٍ.",
        description_en: "Say goodbye to writer's block! Rytr helps you create high-quality content for emails, blogs, and social media posts in seconds. It supports 30+",
        rating: 4.5,
        logo: "https://raw.githubusercontent.com/ahmad-waseem/assets/main/rytr-logo.png",
        link: "https://rytr.me/?via=ahmad-toama"
    },
    {
        id: 4,
        name: "Midjourney",
        category: "image",
        description_ar: "توليد صور فنية بدقة عالية وخيال واسع من خلال الأوامر النصية.",
        description_en: "Generate high-quality artistic images from text prompts.",
        rating: 5,
        logo: "https://ui-avatars.com/api/?name=MJ&background=random&size=128",
        link: "#"
    },
    {
        id: 5,
        name: "Synthesia",
        category: "video",
        description_ar: "إنشاء فيديوهات بشخصيات افتراضية تتحدث لغات متعددة.",
        description_en: "Create videos with AI avatars speaking multiple languages.",
        rating: 4,
        logo: "https://ui-avatars.com/api/?name=SY&background=random&size=128",
        link: "#"
    },
    {
        id: 6,
        name: "Copy.ai",
        category: "writing",
        description_ar: "أداة كتابة نصوص إعلانية ورسائل بريد إلكتروني بسرعة فائقة.",
        description_en: "Fast copywriting tool for ads and emails.",
        rating: 4.5,
        logo: "https://ui-avatars.com/api/?name=CA&background=random&size=128",
        link: "#"
    },
    {
        id: 7,
        name: "Runway",
        category: "video",
        description_ar: "منصة إبداعية لتحرير الفيديو وإنشاء محتوى مرئي بالذكاء الاصطناعي.",
        description_en: "Creative platform for video editing and AI content creation.",
        rating: 4.5,
        logo: "https://ui-avatars.com/api/?name=RW&background=random&size=128",
        link: "#"
    }
];

// Translations Dictionary
const translations = {
    ar: {
        nav_home: "الرئيسية",
        nav_library: "المكتبة",
        nav_tools_video: "أدوات الفيديو",
        nav_tools_audio: "أدوات الصوت",
        nav_tools_writing: "أدوات الكتابة",
        nav_contact: "تواصل معنا",
        nav_privacy: "سياسة الخصوصية",
        hero_tagline: "أدواتك لـ",
        hero_cta: "ابدأ التصفح الآن",
        hero_badges_free: "مجاني 100% • تحديث يومي",
        lib_title: "المكتبة الشاملة",
        lib_subtitle: "تصفح أفضل أدوات الذكاء الاصطناعي في العالم",
        tool_try: "جرب الأداة الآن",
        footer_rights: "&copy; 2025 Ahmad Waseem AI. جميع الحقوق محفوظة."
    },
    en: {
        nav_home: "Home",
        nav_library: "Library",
        nav_tools_video: "Video Tools",
        nav_tools_audio: "Audio Tools",
        nav_tools_writing: "Writing Tools",
        nav_contact: "Contact Us",
        nav_privacy: "Privacy Policy",
        hero_tagline: "Your tools for",
        hero_cta: "Start Browsing",
        hero_badges_free: "100% Free • Daily Updates",
        lib_title: "Comprehensive Library",
        lib_subtitle: "Browse the world's best AI tools",
        tool_try: "Try Tool Now",
        footer_rights: "&copy; 2025 Ahmad Waseem AI. All rights reserved."
    }
};

let currentLang = 'ar';

// Language Management Functions
function initLanguage() {
    const savedLang = localStorage.getItem('ahmad_ai_lang');
    if (savedLang) {
        currentLang = savedLang;
    } else {
        currentLang = 'ar'; // Default
    }
    setLanguage(currentLang);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ahmad_ai_lang', lang);

    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update Text Content for data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update Switcher Button Text
    const switcher = document.getElementById('lang-switcher');
    if (switcher) {
        switcher.textContent = lang === 'ar' ? 'English' : 'عربي';
    }

    // Re-render tools if on library page
    if (document.getElementById('tools-grid')) {
        renderTools();
    }

    // Update Typewriter if exists
    initTypewriter();
}

function toggleLanguage() {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
}

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

        const description = currentLang === 'ar' ? tool.description_ar : tool.description_en;
        const btnText = translations[currentLang].tool_try;
        const arrowClass = currentLang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right';
        const arrowMargin = currentLang === 'ar' ? 'mr-2' : 'ml-2';

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
                ${description}
            </p>

            <a href="${tool.link}" class="tool-content relative z-10 cta-button mt-auto bg-slate-700/50 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-xl text-center shadow-lg transform transition-all border border-white/10 group-hover:border-sky-500/30 translate-z-20 flex items-center justify-center">
                ${currentLang === 'ar' ? `<span>${btnText}</span><i class="fas ${arrowClass} ${arrowMargin} text-sm"></i>` : `<span class="order-first">${btnText}</span><i class="fas ${arrowClass} ${arrowMargin} text-sm"></i>`}
            </a>
        `;

        grid.appendChild(card);
    });

    // Re-initialize VanillaTilt for new elements
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tool-card"));
    }

    // Re-trigger scroll reveal for new elements
    document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('visible');
    });
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

// Global Store for Typewriter Instances
let typewriterInstances = [];

function initTypewriter() {
    // Clear existing
    typewriterInstances = [];
    // In a real robust app we'd stop the old timers, but for simplicity we rely on re-init logic or simple page refreshes.
    // Actually, TxtType is self-looping with setTimeout. To properly reset, we'd need to clear those timeouts.
    // For this level of complexity, a simple reload is often cleaner, but let's try to just update the data if possible.

    // Instead of full re-init logic which is complex with the current TxtType implementation,
    // we will just update the DOM elements if they have data-type-ar and data-type-en attributes
    // But since TxtType is already running, it's tricky. 
    // Recommendation: simpler approach for this task is to simple rely on the DOM update for the static parts
    // and for the typewriter, maybe we just leave it or try a simple reload logic if needed.
    // BETTER APPROACH: Let's simply reload the page when language changes? No, that's not SPA-like.
    // Let's modify the TxtType to read from a global source or attribute that we change.

    const elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        // Clear previous content to avoid overlapping text if we were to re-run
        // Ideally we should kill the previous instance. 
        // Given the constraints, let's just make the typewriter use the attribute that matches current lang.

        // Actually, easiest way for Typewriter in this specific code base:
        // The HTML has `data-type`. We can update `data-type` based on lang and then reload the page?
        // Or just let the user see the new text on refresh?
        // Let's try to support it: 

        // We will remove the old instance by ... we can't easily without refactoring TxtType class to have a .stop().
        // So for now, we will handle Typewriter by having TWO typewriter elements in HTML, one for AR and one for EN,
        // and toggle their visibility with the CSS classes. Much simpler!
    }
}

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();

    // 1. Render Tools (Only if on grid page)
    if (document.getElementById('tools-grid')) {
        renderTools();
    }

    // 2. Typewriter Init - (Handled by CSS visibility of two different elements in HTML)
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
