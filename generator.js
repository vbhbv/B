document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const promptDisplay = document.getElementById('prompt-display');
    const jsonFile = 'prompts.json';
    let data = null;

    // 1. وظيفة لجلب البيانات من ملف JSON
    async function loadPrompts() {
        try {
            const response = await fetch(jsonFile);
            if (!response.ok) {
                throw new Error('فشل في تحميل ملف prompts.json');
            }
            data = await response.json();
            console.log('تم تحميل البيانات بنجاح.');
        } catch (error) {
            promptDisplay.innerHTML = `خطأ: ${error.message}`;
            console.error(error);
        }
    }

    // 2. وظيفة لاختيار عنصر عشوائي
    function getRandomElement(arr) {
        if (!arr || arr.length === 0) return '';
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    // 3. وظيفة لتوليد الأمر الفني الكامل
    function generatePrompt() {
        if (!data) {
            promptDisplay.innerHTML = "البيانات لم تُحمّل بعد. حاول مرة أخرى.";
            return;
        }

        const subject = getRandomElement(data.subjects);
        const context = getRandomElement(data.contexts);
        const detail = getRandomElement(data.details);
        
        // استخدام رابطين عشوائيين لربط الأجزاء الثلاثة
        const connector1 = getRandomElement(data.connectors);
        const connector2 = getRandomElement(data.connectors);

        // تجميع الأمر النهائي
        const finalPrompt = `${subject} ${connector1} ${context} ${connector2} ${detail}`;
        
        promptDisplay.innerHTML = finalPrompt;
    }

    // تحميل البيانات عند بدء تشغيل الصفحة
    loadPrompts();

    // ربط الزر بوظيفة التوليد
    generateButton.addEventListener('click', generatePrompt);
});
