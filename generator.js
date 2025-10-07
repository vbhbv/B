document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-button');
    const promptDisplay = document.getElementById('prompt-display');
    
    // تم التعديل هنا: استخدام المسار المطلق للمستودع الفرعي /B/
    const jsonFile = '/B/prompts.json'; 
    let data = null;

    // وظيفة لتحميل البيانات من ملف JSON
    async function loadPrompts() {
        try {
            const response = await fetch(jsonFile);
            
            // إضافة تحقق إضافي لخطأ 404 أو غيره
            if (!response.ok) {
                // قد تكون المشكلة في المسار، جرب المسار النسبي كحل احتياطي
                const fallbackResponse = await fetch('prompts.json');
                if (!fallbackResponse.ok) {
                    throw new Error('فشل في تحميل ملف prompts.json في كلا المسارين.');
                }
                data = await fallbackResponse.json();
                console.log('تم تحميل البيانات بنجاح باستخدام المسار الاحتياطي.');
                return;
            }
            
            data = await response.json();
            console.log('تم تحميل البيانات بنجاح.');
        } catch (error) {
            promptDisplay.innerHTML = `خطأ: البيانات لم تُحمّل بعد. حاول مرة أخرى. (راجع Console للمزيد)`;
            console.error('خطأ في جلب/تحليل JSON:', error);
        }
    }

    // وظيفة لاختيار عنصر عشوائي (تبقى كما هي)
    function getRandomElement(arr) {
        if (!arr || arr.length === 0) return '';
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

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
            // الموضوع + الفعل + المكان
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

    // تحميل البيانات عند بدء تشغيل الصفحة
    loadPrompts();

    // ربط الزر بوظيفة التوليد
    generateButton.addEventListener('click', generatePrompt);
});
