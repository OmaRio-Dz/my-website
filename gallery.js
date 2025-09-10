// ملف gallery.js - للتحميل التلقائي للصور من مجلد المحلي

// 1. إعداد المتغيرات العامة
const galleryGrid = document.querySelector('.gallery-grid');
const supportedFormats = ['png', 'jpg', 'jpeg']; // الصيغ المدعومة فقط PNG و JPEG

// التحقق من وجود العناصر الأساسية
if (!galleryGrid) {
    console.error('لم يتم العثور على عنصر المعرض (.gallery-grid)');
    // إنشاء عنصر المعرض إذا لم يكن موجودًا
    const gallerySection = document.querySelector('.gallery');
    if (gallerySection) {
        const container = gallerySection.querySelector('.container');
        if (container) {
            const newGalleryGrid = document.createElement('div');
            newGalleryGrid.className = 'gallery-grid';
            container.appendChild(newGalleryGrid);
            console.log('تم إنشاء عنصر المعرض (.gallery-grid) تلقائيًا');
        }
    }
}

// 3. دالة لتحميل الصور من المجلد المحلي
function getLocalImages() {
    // محاكاة لجميع الصور المتوفرة في مجلد الصور
    // في بيئة حقيقية، يمكن استخدام Fetch API للوصول إلى قائمة الملفات في الخادم
    // لكن هنا سنستخدم قائمة شاملة لجميع الصور المحتملة
    const imageFiles = [
        '01.png', '01.jpg', '01.webp',
        '03.png', '03.jpg', '03.webp',
        '1701301154192.jpg',
        'Gemini_Generated_Image_4ojgst4ojgst4ojg.png', 'Gemini_Generated_Image_4ojgst4ojgst4ojg.jpg', 'Gemini_Generated_Image_4ojgst4ojgst4ojg.webp',
        'Gemini_Generated_Image_7uq0647uq0647uq0.png', 'Gemini_Generated_Image_7uq0647uq0647uq0.jpg', 'Gemini_Generated_Image_7uq0647uq0647uq0.webp',
        'Gemini_Generated_Image_9buadr9buadr9bua.png', 'Gemini_Generated_Image_9buadr9buadr9bua.jpg', 'Gemini_Generated_Image_9buadr9buadr9bua.webp',
        'Gemini_Generated_Image_g2altjg2altjg2al.png', 'Gemini_Generated_Image_g2altjg2altjg2al.jpg', 'Gemini_Generated_Image_g2altjg2altjg2al.webp',
        'Gemini_Generated_Image_inoi3iinoi3iinoi.png', 'Gemini_Generated_Image_inoi3iinoi3iinoi.jpg', 'Gemini_Generated_Image_inoi3iinoi3iinoi.webp',
        'Gemini_Generated_Image_zboah5zboah5zboa.png', 'Gemini_Generated_Image_zboah5zboah5zboa.jpg', 'Gemini_Generated_Image_zboah5zboah5zboa.webp',
        'Swamp_Thing_Vol_5_25_Textless.jpg'
    ];

    // فلترة الملفات الصورية فقط بالصيغ المدعومة وتحويلها إلى كائنات
    const processedImages = imageFiles
        .filter(name => {
            const extension = name.split('.').pop().toLowerCase();
            return supportedFormats.includes(extension);
        })
        .map(name => {
            // استخراج اسم الصورة الأساسي بدون الامتداد
            const baseName = name.includes('.') ? name.split('.').slice(0, -1).join('.') : name;
            return {
                name: name,
                baseName: baseName
            };
        })
        // إزالة التكرارات بناءً على الاسم الأساسي
        .filter((image, index, self) => 
            index === self.findIndex(img => img.baseName === image.baseName)
        );

    return processedImages;
}

// تم إزالة نظام التصنيفات
// جميع الصور تعرض بدون تصنيف

// 4. دالة لتحميل المعرض من المجلد المحلي
function loadGalleryFromLocal() {
    try {
        // الحصول على الصور من المجلد المحلي
        const localImages = getLocalImages();

        // التأكد من أن المعرض فارغ قبل إضافة الصور
        if (galleryGrid) {
            galleryGrid.innerHTML = '';
            
            // إضافة الصور إلى المعرض
            localImages.forEach(image => {
                const imageElement = createImageElement(image);
                galleryGrid.appendChild(imageElement);
            });

            // تطبيق تأثيرات الظهور التدريجي
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'all 0.6s ease-out';
            });
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// 5. دالة لإنشاء عنصر الصورة
function createImageElement(image) {
    // إنشاء الوسم الرئيسي للصورة
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.style.cursor = 'pointer'; // تغيير شكل المؤشر عند المرور على الصورة

    // إنشاء عنصر الصورة الرئيسي
    const picture = document.createElement('picture');

    // صورة احتياطية
    const img = document.createElement('img');
    // استخدام baseName إذا كان متوفرًا، وإلا استخدم name
    const imageName = image.baseName || image.name;
    
    // محاولة تحميل الصور بجميع الصيغ المدعومة
    const webpSource = document.createElement('source');
    webpSource.setAttribute('data-srcset', `images/${imageName}.webp`);
    webpSource.setAttribute('type', 'image/webp');
    
    const pngSource = document.createElement('source');
    pngSource.setAttribute('data-srcset', `images/${imageName}.png`);
    pngSource.setAttribute('type', 'image/png');
    
    const jpgSource = document.createElement('source');
    jpgSource.setAttribute('data-srcset', `images/${imageName}.jpg`);
    jpgSource.setAttribute('type', 'image/jpeg');
    
    // إضافة جميع الصيغ إلى picture
    picture.appendChild(webpSource);
    picture.appendChild(pngSource);
    picture.appendChild(jpgSource);
    
    img.src = `images/${image.name}`;
    img.alt = imageName;
    img.loading = 'lazy';
    
    picture.appendChild(img);

    // إنشاء الـ overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    // إضافة العناصر إلى الـ overlay
    const title = document.createElement('h4');
    title.textContent = image.baseName || image.name.split('.')[0];

    const date = document.createElement('p');
    date.textContent = 'صورة من معرض الصور';

    overlay.appendChild(title);
    overlay.appendChild(date);

    // إضافة كل شيء إلى الـ gallery-item
    galleryItem.appendChild(picture);
    galleryItem.appendChild(overlay);

    return galleryItem;
}

// تحميل التصاميم مباشرة
function loadDesignsDirectly() {
    console.log("بدء تحميل التصاميم مباشرة...");
    const designElements = document.querySelectorAll('.gallery-item');
    console.log(`تم العثور على ${designElements.length} عنصرًا في المعرض`);
    
    // تأكد من أن جميع العناصر مرئية
    designElements.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
    });

    designElements.forEach((design, index) => {
        console.log(`معالجة التصميم ${index + 1}...`);
        const img = design.querySelector('img');
        
        if (img) {
            // محاولة تحميل الصورة من data-src
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
                console.log(`تحميل الصورة من data-src: ${dataSrc}`);
                img.src = dataSrc;
            } else {
                // استخدام عنوان الصورة الافتراضي
                console.log("استخدام عنوان الصورة الافتراضي");
                img.src = img.getAttribute('src');
            }
            
            console.log(`تم تعيين مصورة التصميم: ${img.src}`);
            
            // تأكد من تحميل الصورة
            img.onload = function() {
                console.log(`تم تحميل الصورة بنجاح: ${img.src}`);
            };
            
            img.onerror = function() {
                console.error(`فشل تحميل الصورة: ${img.src}`);
                // استبدال بصورة بديلة
                img.src = 'https://picsum.photos/seed/fallback' + index + '/400/300.jpg';
            };
        } else {
            console.log("لم يتم العثور على عنصر img في هذا التصميم");
        }
    });
    
    console.log("انتهى تحميل التصاميم مباشرة");
}

// تحميل الصور عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log("بدء تحميل الصور...");
    loadGalleryFromLocal();
    console.log("انتهى تحميل الصور.");
    
    // إعداد نافذة الصورة المنبثقة
    setupLightbox();
    
    // تأكد من تحميل الصور عند التمرير
    window.addEventListener('scroll', function() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && img.getAttribute('src').indexOf('svg') === -1) {
                img.src = img.getAttribute('data-src');
            }
        });
    });

    // تم إزالة تحميل الصور من GitHub

    // إضافة تأثيرات عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // التحقق من دعم المتصفح لميزة IntersectionObserver
    let observer;
    if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
    } else {
        // بديل للمتصفحات التي لا تدعم IntersectionObserver
        observer = {
            observe: function(element) {
                // تطبيق التأثير مباشرة
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        };
    }

    // تطبيق التأثير على العناصر عند تحميل الصفحة
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // تطبيق التأثير على عناصر المعرض
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });

    // إضافة وظيفة لزر عرض المزيد
    const viewMoreButton = document.querySelector('.view-more a');
    if (viewMoreButton) {
        console.log("تم العثور على زر عرض المزيد");

        // التحقق من وجود المعرض قبل إضافة وظيفة الزر
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) {
            console.error('لم يتم العثور على عنصر المعرض (.gallery-grid)');
            viewMoreButton.style.display = 'none'; // إخفاء الزر إذا لم يكن هناك معرض
            return;
        }
        viewMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("تم النقر على زر عرض المزيد");
            console.log("بدء إضافة عناصر جديدة...");

            // إضافة مؤشر تحميل
            const loader = document.createElement('div');
            loader.classList.add('loading-indicator');
            loader.innerHTML = '<div class="spinner"></div>';
            viewMoreButton.parentNode.appendChild(loader);

            // إخفاء زر عرض المزيد مؤقتا
            viewMoreButton.style.display = 'none';

            console.log("بدء إنشاء عناصر جديدة...");
            // إنشاء عناصر تصميم جديدة
            const galleryGrid = document.querySelector('.gallery-grid');
            const currentCount = galleryGrid.querySelectorAll('.gallery-item').length;
            console.log(`عدد العناصر الحالية: ${currentCount}`);

            // الحصول على جميع الصور المتوفرة
            const allImages = getLocalImages();
            const displayedImages = Array.from(galleryGrid.querySelectorAll('.gallery-item img'))
                .map(img => img.getAttribute('src').replace('images/', ''));
            
            // الحصول على الصور التي لم يتم عرضها بعد
            const newItems = allImages
                .filter(image => !displayedImages.includes(image.name))
                .map(image => ({
                    name: image.name
                }));
            
            // إذا لم تكن هناك صور جديدة، لا تعرض زر "عرض المزيد" مرة أخرى
            if (newItems.length === 0) {
                viewMoreButton.style.display = 'none';
                loader.remove();
                return;
            }
            console.log(`تم إنشاء ${newItems.length} عناصر جديدة`);

            // تأكد من أن المعرض موجود
            if (!galleryGrid) {
                console.error("لم يتم العثور على عنصر المعرض (.gallery-grid)");
                return;
            }

            console.log("إضافة العناصر الجديدة...");
            // إضافة العناصر الجديدة للمصفوفة
            newItems.forEach((item, index) => {
                console.log(`إضافة عنصر ${index + 1}: ${item.name}`);
                console.log(`إنشاء عنصر جديد للصورة: ${item.name}`);
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.style.opacity = '0';
                galleryItem.style.transform = 'translateY(20px)';
                galleryItem.style.cursor = 'pointer'; // تغيير شكل المؤشر عند المرور على الصورة

                console.log(`تم تعيين مصورة العنصر: images/${item.name}`);
                galleryItem.innerHTML = `
                    <div class="image-container">
                        <img src="images/${item.name}" alt="${item.name}" data-src="images/${item.name}">
                    </div>
                    <div class="overlay">
                        <h4>${item.name.split('.')[0]}</h4>
                        <p>صورة من معرض الصور</p>
                    </div>
                `;

                console.log("إضافة العنصر إلى المعرض...");
                galleryGrid.appendChild(galleryItem);
                
                // تحميل الصورة مباشرة
                const img = galleryItem.querySelector('img');
                if (img) {
                    img.onload = function() {
                        console.log(`تم تحميل الصورة بنجاح: ${img.src}`);
                    };
                    
                    img.onerror = function() {
                        console.error(`فشل تحميل الصورة: ${img.src}`);
                        img.src = `images/01.png`; // استخدام صورة محلية بديلة
                    };
                }

                console.log("تطبيق تأثير الظهور التدريجي...");
                // تطبيق تأثير الظهور التدريجي
                setTimeout(() => {
                    console.log("تطبيق تأثير الظهور التدريجي على العنصر...");
                    galleryItem.style.transition = 'all 0.6s ease-out';
                    galleryItem.style.opacity = '1';
                    galleryItem.style.transform = 'translateY(0)';
                }, 100);

                console.log("إضافة حد النقر للتصميم الجديد...");
                // إضافة حد النقر للصورة الجديدة
                galleryItem.addEventListener('click', function() {
                    console.log(`تم النقر على الصورة: ${item.name}`);
                    // هنا يمكنك إضافة منطق لفتح الصورة الكاملة
                });
            });

            // إظهار زر عرض المزيد فقط إذا كانت هناك صور إضافية
            setTimeout(() => {
                loader.remove();
                
                // التحقق مما إذا كانت هناك المزيد من الصور للعرض
                const allImages = getLocalImages();
                const displayedImages = Array.from(galleryGrid.querySelectorAll('.gallery-item img'))
                    .map(img => img.getAttribute('src').replace('images/', ''));
                const remainingImages = allImages.filter(image => !displayedImages.includes(image.name));
                
                // إظهار الزر فقط إذا كانت هناك صور متبقية
                if (remainingImages.length > 0) {
                    viewMoreButton.style.display = 'inline-block';
                }
            }, 1000);
        });
    }
});

// تحميل الصور مباشرة
function loadImagesDirectly() {
    console.log("بدء تحميل الصور مباشرة...");
    const imageElements = document.querySelectorAll('.gallery-item');
    console.log(`تم العثور على ${imageElements.length} عنصرًا في المعرض`);

    // تأكد من أن جميع العناصر مرئية وقابلة للنقر
    imageElements.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.cursor = 'pointer'; // تغيير شكل المؤشر عند المرور على الصورة
    });

    imageElements.forEach((imageItem, index) => {
        console.log(`معالجة الصورة ${index + 1}...`);
        const img = imageItem.querySelector('img');

        if (img) {
            console.log(`تم تعيين مصورة الصورة: ${img.src}`);

            // تأكد من تحميل الصورة
            img.onload = function() {
                console.log(`تم تحميل الصورة بنجاح: ${img.src}`);
                // إضافة تأثير ظهور تدريجي للصورة
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in-out';
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
            };

            img.onerror = function() {
                console.error(`فشل تحميل الصورة: ${img.src}`);
                // استبدال بصورة بديلة مع التحقق من وجودها
                const fallbackImages = ['images/01.png', 'images/03.png', 'https://picsum.photos/seed/fallback/400/300.jpg'];
                let currentFallbackIndex = 0;

                function tryNextFallback() {
                    if (currentFallbackIndex < fallbackImages.length) {
                        img.src = fallbackImages[currentFallbackIndex];
                        currentFallbackIndex++;
                    } else {
                        // إذا فشلت جميع الصور البديلة، إظهار رسالة خطأ
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'عذراً، لم يتمكن النظام من تحميل هذه الصورة';
                        errorMessage.style.color = '#e74c3c';
                        errorMessage.style.padding = '10px';
                        errorMessage.style.textAlign = 'center';
                        img.parentNode.replaceChild(errorMessage, img);
                    }
                }

                tryNextFallback();
            };
        } else {
            console.log("لم يتم العثور على عنصر img في هذا العنصر");
        }
    });

    console.log("انتهى تحميل الصور مباشرة");
}

// تحميل الصور عند التمرير
window.addEventListener('scroll', function() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight && img.getAttribute('src').indexOf('svg') === -1) {
            img.src = img.getAttribute('data-src');
        }
    });
});

// دالة إعداد نافذة الصورة المنبثقة
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');

    // التحقق من وجود عناصر نافذة الصورة المنبثقة
    if (!lightbox) {
        console.error('لم يتم العثور على عنصر نافذة الصورة المنبثقة (#lightbox)');
        return;
    }

    if (!lightboxImg) {
        console.error('لم يتم العثور على عنصر صورة النافذة المنبثقة (.lightbox-image)');
        return;
    }

    if (!lightboxCaption) {
        console.error('لم يتم العثور على عنصر عنوان النافذة المنبثقة (.lightbox-caption)');
        return;
    }

    if (!closeBtn) {
        console.error('لم يتم العثور على زر إغلاق النافذة المنبثقة (.close-lightbox)');
        return;
    }
    
    // إضافة حدث النقر لجميع صور المعرض
    document.addEventListener('click', function(e) {
        if (e.target.closest('.gallery-item')) {
            const galleryItem = e.target.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('h4').textContent;
            
            if (img) {
                lightboxImg.src = img.src;
                lightboxCaption.textContent = title;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden'; // منع التمرير عند فتح الصورة
            }
        }
    });
    
    // إغلاق النافذة عند النقر على زر الإغلاق
    closeBtn.addEventListener('click', function() {
        lightbox.classList.remove('show');
        document.body.style.overflow = ''; // إعادة التمرير
    });
    
    // إغلاق النافذة عند النقر خارج الصورة
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = ''; // إعادة التمرير
        }
    });
}
