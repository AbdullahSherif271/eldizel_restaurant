// إعدادات المطعم - عدّل هنا فقط
export const RESTAURANT = {
  name: 'الديزل فرايد تشيكن',
  logo: 'images/logo.png',
  address: 'العياط - الطريق السريع - كافيه مناقيش',
  currency: 'ج.م',
  whatsapp: '201102107809',
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

export interface DeliveryArea {
  id: string;
  name: string;
  fee: number;
}

export const DELIVERY_AREAS: DeliveryArea[] = [
  { id: 'a1', name: 'العياط', fee: 10 },
  { id: 'a2', name: 'المسانده', fee: 10 },
  { id: 'a3', name: 'بهبيت', fee: 15 },
  { id: 'a4', name: 'العطف', fee: 20 },
  { id: 'a5', name: 'طهما', fee: 20 },
  { id: 'a6', name: 'بمها', fee: 20 },
  { id: 'a7', name: 'كفر شحاته', fee: 20 },
  { id: 'a8', name: 'المتانيا', fee: 25 },
  { id: 'a9', name: 'الجملة', fee: 25 },
  { id: 'a10', name: 'البليدة', fee: 30 },
  { id: 'a11', name: 'بيدف', fee: 30 },
  { id: 'a12', name: 'ابو نجم', fee: 35 },
  { id: 'a13', name: 'اللشت', fee: 35 },
  { id: 'a14', name: 'السعودية', fee: 35 },
  { id: 'a15', name: 'المقاطفية', fee: 35 },
  { id: 'a16', name: 'كفر قاسم', fee: 35 },
  { id: 'a17', name: 'بتسا', fee: 40 },
  { id: 'a18', name: 'الضبعي', fee: 40 },
  { id: 'a19', name: 'ابو العباس', fee: 40 },
  { id: 'a20', name: 'منشية ابو العباس', fee: 40 },
  { id: 'a21', name: 'المنيا (منيه القائد)', fee: 40 },
  { id: 'a22', name: 'الناصرية', fee: 45 },
  { id: 'a23', name: 'كفر عمار', fee: 45 },
  { id: 'a24', name: 'برنشت', fee: 50 },
  { id: 'a25', name: 'كفر تركي', fee: 50 },
  { id: 'a26', name: 'زاوية ابو سويلم', fee: 60 },
  { id: 'a27', name: 'كفر الرفاعي', fee: 60 },
  { id: 'a28', name: 'البرغوتي', fee: 65 },
  { id: 'a29', name: 'الاخصاص', fee: 70 },
  { id: 'a30', name: 'القطوري', fee: 70 },
  { id: 'a31', name: 'جرزا', fee: 100 },
];