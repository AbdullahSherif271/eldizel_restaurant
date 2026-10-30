// إعدادات المطعم - عدّل هنا فقط
export const RESTAURANT = {
  name: 'الديزل فرايد تشيكن',
  logo: 'images/logo.png',
  address: 'العياط - الطريق السريع - كافيه مناقيش',
  currency: 'ج.م',
  // رقم الواتساب لاستقبال الطلبات: بصيغة دولية بدون + ولا صفر في الأول (مصر = 20)
  whatsapp: '201102107809',
  // الأرقام: whatsapp: true يعني الرقم ده اتصال وواتساب، والباقي اتصال بس
  phones: [
    { number: '01144616637', whatsapp: false },
    { number: '01102107809', whatsapp: true },
    { number: '01207697073', whatsapp: false },
  ],
  social: [
    { name: 'فيسبوك', icon: 'bi-facebook', url: 'https://facebook.com/ElDezelFC' },
    { name: 'انستجرام', icon: 'bi-instagram', url: 'https://instagram.com/eldizel_fc' },
    { name: 'تيك توك', icon: 'bi-tiktok', url: 'https://www.tiktok.com/@eldessel' },
  ],
  deliveryNote: 'خدمة التوصيل بيتم تحديدها علي حسب المنطقة عند تأكيد الاودر على الواتساب',
};
