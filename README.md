# الديزل فرايد تشيكن - Landing Page

Angular 19 (Standalone + Signals) + Bootstrap 5 RTL. كل حاجة Frontend، والطلب بيتأكد عبر واتساب.

## التشغيل
```bash
npm install
npm start        # http://localhost:4200
npm run build    # الناتج في dist/diesel-fried-chicken/browser
```
> لو نسختك من Angular مختلفة عن 19: اعمل `ng new` عادي وانسخ فولدر `src` و `public` فوقه،
> وضيف `bootstrap` و `bootstrap-icons` وحط ملفاتهم في `styles` جوه angular.json.

## الصور (فولدر public/images)
| الملف | الاستخدام |
|---|---|
| `cover.png` | سلايدر الهيرو (3 مرات حالياً) - `components/hero-slider` |
| `logo.png` | الفوتر والـ favicon |
| `test.png` | كل الأقسام والأصناف والساندوتش اللي بيلف (حالياً صورة مؤقتة مرسومة - استبدلها بصورتك بنفس الاسم) |

## أماكن التعديل
- `src/app/config.ts` : رقم الواتساب (`201144616637` = رقم 1 من التلاتة، غيّره لو غلط)، الأرقام، السوشيال، العملة.
- `src/app/data/categories.ts` و `products.ts` : الأقسام والأصناف (الداتا تجريبية).
- `src/styles.scss` : ألوان الهوية (`--brand: #f45302`).
- `components/spin-section` : الساندوتش اللي بيلف (CSS animation: `spin` + `float` + ظل بيتغير).
- `services/cart.service.ts` : السلة (signals + localStorage) وبناء رسالة الواتساب.

## ملاحظات
- رسوم التوصيل بتتحدد على الواتساب، والإجمالي في الرسالة "غير شامل التوصيل".
- الـ `bestSeller: true` في المنتج بيظهره في "الأكثر مبيعاً".
