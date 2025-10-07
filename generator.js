document.addEventListener('DOMContentLoaded', () => {
    // ... (جلب العناصر وزر التوليد)
    const generateButton = document.getElementById('generate-button');
    const promptDisplay = document.getElementById('prompt-display');
    const jsonFile = 'prompts.json';
    let data = null;

    // ... (وظيفة loadPrompts و getRandomElement تبقى كما هي)
    async function loadPrompts() { /* ... */ }
    function getRandomElement(arr) { /* ... */ }

    // الوظيفة الجديدة لتوليد الأمر الفني الكامل بـ 7 أجزاء
    function generatePrompt() {
        if (!data) {
            promptDisplay.innerHTML = "البيانات لم تُحمّل بعد. حاول مرة أخرى.";
            return;
        }

        // 1. اختيار المكونات الـ 7 عشوائياً
        const subject = getRandomElement(data.subjects);
        const action = getRandomElement(data.actions);
        const setting = getRandomElement(data.settings);
        const style = getRandomElement(data.styles);
        const light = getRandomElement(data.lights);
        const detail = getRandomElement(data.details);
        const camera = getRandomElement(data.cameras);

        // 2. تجميع الأمر النهائي بتسلسل منطقي لغوي مُحكم
        const finalPrompt = 
            // الموضوع + الفعل
            `${subject} ${action}، ${setting}` +
            // الأسلوب الفني
            `، ${style}` +
            // الإضاءة والتفاصيل
            `، ${light}، ${detail}` +
            // زاوية الكاميرا (لإضافة طابع سينمائي)
            `، مصورة بـ ${camera}` + 
            // إضافة "Artstation" لتحسين النتائج في بعض نماذج الذكاء الاصطناعي
            ` --v 5.2 --s 750`; 
        
        promptDisplay.innerHTML = finalPrompt;
    }

    // ... (تحميل البيانات وربط الزر بالوظيفة)
    loadPrompts();
    generateButton.addEventListener('click', generatePrompt);
});
