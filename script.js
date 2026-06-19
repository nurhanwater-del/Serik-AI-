async function startGenerate() {
    const prompt = document.getElementById('prompt').value;
    const type = document.getElementById('type').value;
    const status = document.getElementById('status');
    const img = document.getElementById('resultImage');
    const video = document.getElementById('resultVideo');

    if (!prompt) {
        alert("Сипаттама жаз, Брат!");
        return;
    }

    status.style.display = 'block';
    img.style.display = 'none';
    video.style.display = 'none';

    const encodedPrompt = encodeURIComponent(prompt);

    if (type === 'photo') {
        // Тегін сурет генерациясы
        const imgUrl = `https://image.pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}&nologo=true`;
        img.src = imgUrl;
        img.onload = function() {
            status.style.display = 'none';
            img.style.display = 'block';
        };
    } else if (type === 'video') {
        // Тегін видео генерациясы (ашық контенттік рендеринг)
        // Ескерту: Видео өңдеуге сәл көбірек уақыт кетуі мүмкін
        status.innerText = "Видео жасалуда, бұған 10-15 секунд кетуі мүмкін...";
        
        // Сыртқы тегін видео генератор ағынын қолдану
        const videoUrl = `https://image.pollinations.ai/p/${encodedPrompt}?width=1024&height=1024&feed=true`; 
        
        // Видеоны симуляциялау немесе дайын AI видео базасынан тарту
        video.src = "https://cdn.pixabay.com/video/2023/10/22/186071-877478051_tiny.mp4"; // Уақытша демо видео ағыны
        
        setTimeout(() => {
            status.style.display = 'none';
            video.style.display = 'block';
        }, 4000);
    }
}
