const translations = {
    kz: {
        navGen: "Генератор",
        navPricing: "Тарифтер",
        mainTitle: "Болашақтың Жасанды Интеллекті",
        mainSub: "Кәсіби фотолар мен футуристік дизайнды бір секундта жасаңыз.",
        lblStyle: "Контент Стилі",
        lblAspect: "Өлшемі (Aspect Ratio)",
        lblPrompt: "Сіздің Сипаттамаңыз (Prompt)",
        placeholder: "Не салғыңыз келеді? Мысалы: Алматыдағы робот...",
        btnGenerate: "PRO Генерация жасау",
        btnDownload: "Суретті Жүктеу (HD)",
        loading: "Нейрожелі ойланып жатыр... ⚡",
        emptyAlert: "Өтініш, сипаттама жазыңыз!"
    },
    ru: {
        navGen: "Генератор",
        navPricing: "Тарифы",
        mainTitle: "Искусственный Интеллект Будущего",
        mainSub: "Создавайте профессиональные фото и футуристичный дизайн за одну секунду.",
        lblStyle: "Стиль Контента",
        lblAspect: "Размер (Aspect Ratio)",
        lblPrompt: "Ваше Описание (Prompt)",
        placeholder: "Что хотите создать? Например: Робот в Алматы...",
        btnGenerate: "PRO Генерация",
        btnDownload: "Скачать Изображение (HD)",
        loading: "Нейросеть думает... ⚡",
        emptyAlert: "Пожалуйста, введите описание!"
    },
    en: {
        navGen: "Generator",
        navPricing: "Pricing",
        mainTitle: "Artificial Intelligence of the Future",
        mainSub: "Create professional photos and futuristic designs in one second.",
        lblStyle: "Content Style",
        lblAspect: "Aspect Ratio",
        lblPrompt: "Your Description (Prompt)",
        placeholder: "What do you want to create? Example: Robot in Almaty...",
        btnGenerate: "PRO Generate",
        btnDownload: "Download Image (HD)",
        loading: "AI is thinking... ⚡",
        emptyAlert: "Please enter a description!"
    }
};

// Тілді басқару
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.getElementById('langSelector').value = lang;

    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });

    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
    });
}

// ГЕНЕРАЦИЯ ФУНКЦИЯСЫ (ЛИМИТ ТОЛЫҚТАЙ АЛЫП ТАСТАЛДЫ - ШЕКСІЗ НҰСҚА)
function generateArt() {
    const lang = localStorage.getItem('selectedLanguage') || 'kz';
    const promptInput = document.getElementById('promptInput').value;
    const style = document.getElementById('styleSelect').value;
    const aspect = document.getElementById('aspectSelect').value;
    const btn = document.getElementById('genBtn');
    const resultBlock = document.getElementById('resultBlock');
    const artImage = document.getElementById('artImage');

    if (!promptInput.trim()) {
        alert(translations[lang].emptyAlert);
        return;
    }

    btn.disabled = true;
    btn.textContent = translations[lang].loading;

    // Өлшемдерді белгілеу (aspect ratio)
    let width = 512, height = 512;
    if (aspect === "9:16") { width = 400; height = 700; }
    if (aspect === "16:9") { width = 700; height = 400; }

    // Промтты байыту
    const finalPrompt = encodeURIComponent(`${promptInput}, ${style} style, ultra hd, 8k resolution, highly detailed`);
    const randomSeed = Math.floor(Math.random() * 999999);
    
    const apiUrl = `https://image.pollinations.ai/p/${finalPrompt}?width=${width}&height=${height}&seed=${randomSeed}&nologo=true`;

    artImage.src = apiUrl;

    artImage.onload = function() {
        btn.disabled = false;
        btn.textContent = translations[lang].btnGenerate;
        resultBlock.style.display = "flex";
    };
}

// Суретті HD жүктеу
function downloadImage() {
    const src = document.getElementById('artImage').src;
    const a = document.createElement('a');
    a.href = src;
    a.download = 'SerikAI_Pro_Art.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Тарифтерді басқанда көрсетілетін хабарлама
function openPricing() {
    alert("PRO Plan is active for testing! / Тесттік режимде PRO тариф қосулы тұр! 🔥");
}

// Сайт ашылғанда іске қосылу
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'kz';
    changeLanguage(savedLang);
});
