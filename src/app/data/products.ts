import { Product } from '../models';

// ساندوتش سنجل/دبل: بيقبل الآن خصائص إضافية اختياريّة (bestseller, badge, etc.)
const sd = (
  id: string,
  name: string,
  description: string,
  single: number,
  double: number,
  categoryId: string,
  image: string,    
  extra?: Partial<Product> 
): Product => ({
  id,
  name,
  description,
  price: single, // السعر الأساسي = سنجل
  image,
  categoryId,
  variants: [
    { id: 'single', label: 'سنجل', price: single },
    { id: 'double', label: 'دبل', price: double },
  ],
  ...extra, // دمج أي خصائص إضافية هنا (مثل bestSeller, badge, etc.)
});

export const PRODUCTS: Product[] = [
  // ===== ساندوتشات تشيكن =====
  // مثال: إضافة bestSeller و badge لـ بيج ديزل
  sd('cs1', 'بيج ديزل', 'شرائح بانية متبلة + خس + خيار + مايونيز + صوص شيدر + باربيكيو', 90, 145, 'chicken-sandwiches', 'images/dizel.jpg', { bestSeller: true, badge: 'مميز' }),

  sd('cs2', 'بيج تيستي', 'شرائح بانية متبلة + خس + خيار + مايونيز + صوص تيستي', 90, 145, 'chicken-sandwiches', 'images/dizel1.jpg'),
  sd('cs3', 'بيج فاير', 'شرائح بانية متبلة + خس + مايونيز + هوت صوص + فلفل هالبينو', 90, 145, 'chicken-sandwiches', 'images/fire1.jpg'),
  sd('cs4', 'تشيكن رانش', 'شرائح بانية متبلة + مايونيز + خيار + خس + صوص رانش', 90, 145, 'chicken-sandwiches', 'images/ranch1.jpg'),
  sd('cs5', 'تشيز بارتي', 'شرائح بانية متبلة + خس + خيار + اكسترا شيدر', 90, 145, 'chicken-sandwiches', 'images/cheesy1.jpg'),

  // مثال آخر: إضافة مميز لـ بوم
  sd('cs6', 'بوم', 'شرائح بانية متبلة + مايونيز + خيار + خس + جبنة موتزاريلا', 110, 170, 'chicken-sandwiches', 'images/cheesy.jpg', { badge: 'جديد' }),

  sd('cs7', 'رينجز كينج', 'شرائح بانية متبلة + خس + حلقات بصل + مايونيز + باربيكيو + سلامي', 110, 175, 'chicken-sandwiches', 'images/dizel2.jpg'),
  sd('cs8', 'ستيكس كينج', 'شرائح بانية متبلة + خس + مايونيز + صوص شيدر + موتزاريلا ستيكس', 110, 175, 'chicken-sandwiches', 'images/sticks.jpg'),
  sd('cs9', 'تورنيدو ديزل', 'شرائح بانية متبلة + خس + خيار + مايونيز + باربيكيو + بيف بيكون', 105, 165, 'chicken-sandwiches', 'images/double.jpg'),

  { id: 'cs10', name: 'سموكي ستربس', description: 'شرائح ستربس + خيار + خس + صوص شيدر + باربيكيو + تركي مدخن', price: 120, image: 'images/broast.webp', categoryId: 'chicken-sandwiches' },
  { id: 'cs11', name: 'سوبر بروست', description: 'شرائح بانية دبل + خيار + خس + صوص شيدر + باربيكيو', price: 110, image: 'images/broast1.jpg', categoryId: 'chicken-sandwiches', bestSeller: true, badge: 'مميز' },

  // ===== ساندوتشات بيف =====
  { id: 'bs8', name: 'تشيزي دريب', description: 'قطعتين برجر محشو بينهم جبنة موتزاريلا + خس + خيار + صوص شيدر + ثاوزاند ايلاند', price: 125, image: 'images/cheesy-drip.jpg', categoryId: 'beef-sandwiches', badge: 'جديد' },
  sd('bs1', 'تشيز برجر', 'برجر + خيار + خس + صوص شيدر + ثاوزاند ايلاند', 90, 145, 'beef-sandwiches', 'images/brgr.jpg', { bestSeller: true, badge: 'مميز' }),
  sd('bs2', 'سبايسي برجر', 'برجر + خيار + خس + صوص شيدر + ثاوزاند ايلاند + هوت صوص', 90, 145, 'beef-sandwiches', 'images/spicy-brgr.jpg'),
  sd('bs3', 'ميكسيكان برجر', 'برجر + هوت دوج + خيار + خس + صوص شيدر + ثاوزاند ايلاند', 95, 155, 'beef-sandwiches', 'images/mixican-brgr.jpg'),

  // مثال لـ سماش برجر
  sd('bs4', 'سماش برجر', 'سماش برجر + خيار + خس + بصل مكرمل + بيكون + صوص شيدر + صوص تيستي', 120, 165, 'beef-sandwiches', 'images/smash.jpg'),

  sd('bs5', 'فولكانو برجر', 'سماش برجر + خيار + خس + حلقات بصل + بيكون + صوص شيدر + صوص تيستي', 120, 165, 'beef-sandwiches', 'images/volcano.jpg'),
  { id: 'bs6', name: 'ميكس ديزل', description: 'شريحة بانية + شريحة برجر + خس + خيار + صوص شيدر + ثاوزاند ايلاند', price: 145, image: 'images/mix.jpg', categoryId: 'beef-sandwiches' },
  { id: 'bs7', name: 'سوبر هوت دوج', description: 'أصابع هوت دوج + خس + خيار + مايونيز + ثاوزاند ايلاند', price: 100, image: 'images/sandwich-ss.jpg', categoryId: 'beef-sandwiches' },

  // باقي الأقسام (الوجبات، البوكسات، العروض، الكريب، إلخ) كما هي تماماً...
  // ===== وجبات فرايد تشيكن =====
  { id: 'fm7', name: 'لايت كريسبي', description: '2 قطعة ستربس + 2 خبز + بطاطس + تومية', price: 110, image: 'images/crispy.jpg', categoryId: 'fried-meals' },
  { id: 'fm8', name: 'لارج كريسبي', description: '5 قطع ستربس + 3 خبز + بطاطس + تومية', price: 220, image: 'images/crispy.jpg', categoryId: 'fried-meals' },
  { id: 'fm1', name: 'ميني سناك', description: 'قطعة بروست + 2 خبز + بطاطس + كلوسلو', price: 80, image: 'images/crispy.jpg', categoryId: 'fried-meals', available: false },
  { id: 'fm2', name: 'سناك بوكس', description: '2 قطعة بروست + أرز بسمتي + 2 خبز + بطاطس + كلوسلو', price: 120, image: 'images/crispy.jpg', categoryId: 'fried-meals', available: false },
  { id: 'fm3', name: 'دينر بوكس', description: '3 قطع بروست + أرز بسمتي + 3 خبز + بطاطس + كلوسلو', price: 170, image: 'images/crispy.jpg', categoryId: 'fried-meals', available: false },
  { id: 'fm4', name: 'سوبر دينر', description: '4 قطع بروست + أرز بسمتي + 4 خبز + بطاطس + كلوسلو', price: 220, image: 'images/crispy.jpg', categoryId: 'fried-meals', available: false },
  { id: 'fm5', name: 'إكسترا ميل', description: '5 قطع بروست + أرز بسمتي + 5 خبز + بطاطس + كلوسلو', price: 265, image: 'images/crispy.jpg', categoryId: 'fried-meals', available: false },
  { id: 'fm6', name: 'جامبو ميل', description: '6 قطع بروست + أرز بسمتي + 6 خبز + بطاطس + كلوسلو', price: 310, image: 'images/crispy.jpg', categoryId: 'fried-meals', available: false },


  // ===== بوكسات =====
  { id: 'bx2', name: 'ميكس بوكس', description: 'أرز + 2 بانية مشوح + 2 ستربس + بطاطس + صوص شيدر', price: 125, image: 'images/mix-box.jpg', categoryId: 'boxes' },
  { id: 'bx3', name: 'شاورما بوكس', description: 'أرز + شاورما فراخ + بطاطس + صوص شيدر', price: 125, image: 'images/shawerma-box.jpg', categoryId: 'boxes' },
  { id: 'bx1', name: 'شير بوكس', description: '4 ساندوتشات ميني "1 شاورما + 1 سوسيس + 1 فرايد تشيكن + 1 برجر"', price: 180, image: 'images/share.jpg', categoryId: 'boxes', bestSeller: true ,badge: "مميز"},
  // ===== عروض =====
  { id: 'off9', name: 'عرض الجمعة البيضاء', description: '3 تشيز برجر سنجل + 3 بطاطس بسعر 2 فقط', price: 180, image: 'images/offers9.jpg', categoryId: 'offers' },
  { id: 'off1', name: 'عرض الشتاء 1', description: '٢ حواوشى لحم بلدى + مخلل + كاتشب', price: 100, image: 'images/offers1.jpg', categoryId: 'offers' },
  { id: 'off2', name: 'عرض الشتاء 2', description: 'سوبر بروست حجم كبير + باكيت بطاطس', price: 100, image: 'images/offers2.jpg', categoryId: 'offers' },
  { id: 'off3', name: 'عرض الشتاء 3', description: 'شاورما سوري + بطاطس سوري + مخلل + كاتشب', price: 100, image: 'images/offers3.jpg', categoryId: 'offers' },
  { id: 'off4', name: 'عرض الشتاء 4', description: 'كريب زنجر + ريزو + بيج كولا', price: 160, image: 'images/offers4.jpg', categoryId: 'offers' },
  { id: 'off5', name: 'عرض الشتاء 5', description: 'ساندوتش دبل تشيكن أو بيف + بطاطس + بيج كولا', price: 145, image: 'images/offers5.jpg', categoryId: 'offers' },
  { id: 'off6', name: 'عرض الشتاء 6', description: 'ريزو + بطاطس سوري', price: 100, image: 'images/offers6.jpg', categoryId: 'offers' },
  { id: 'off7', name: 'عرض الشتاء 7', description: 'ساندوتشين سنجل تشيكن أو بيف + ٢ بطاطس', price: 170, image: 'images/offers7.jpg', categoryId: 'offers' },
  { id: 'off8', name: 'عرض الشتاء 8', description: '٢ كريب زنجر + بطاطس + بيج كولا', price: 175, image: 'images/offers8.jpg', categoryId: 'offers' },
  // ===== العروض (وجبات عائلية) =====
  { id: 'of1', name: 'وجبة عائلية 8 قطع', description: '8 قطع دجاج + 2 أرز + بطاطس + كلوسلو + هوت صوص + تومية + 8 كايزر', price: 420, image: 'images/family.webp', categoryId: 'fried-meals', available: false },
  { id: 'of2', name: 'وجبة عائلية 10 قطع', description: '10 قطع دجاج + 2 أرز + بطاطس + كلوسلو + هوت صوص + تومية + 8 كايزر', price: 500, image: 'images/family.webp', categoryId: 'fried-meals', available: false },
  { id: 'of3', name: 'وجبة عائلية 12 قطعة', description: '12 قطعة دجاج + 2 أرز + بطاطس + كلوسلو + هوت صوص + تومية + 8 كايزر', price: 590, image: 'images/family.webp', categoryId: 'fried-meals', available: false },
  { id: 'of4', name: 'وجبة عائلية 14 قطعة', description: '14 قطعة دجاج + 2 أرز + بطاطس + كلوسلو + هوت صوص + تومية + 8 كايزر', price: 670, image: 'images/family.webp', categoryId: 'fried-meals', available: false },
  { id: 'of5', name: 'وجبة عائلية 16 قطعة', description: '16 قطعة دجاج + 2 أرز + بطاطس + كلوسلو + هوت صوص + تومية + 8 كايزر', price: 750, image: 'images/family.webp', categoryId: 'fried-meals', available: false },

  // ===== كريب فراخ =====
  { id: 'cr1', name: 'كريب بانية فريش', description: ' بانية + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 85, image: 'images/baneh-crepe.jpg', categoryId: 'crepe' },
  { id: 'cr2', name: 'كريب زنجر', description: ' زنجر اوريجينال + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 85, image: 'images/mix-crepe2.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },
  { id: 'cr3', name: 'كريب ستربس', description: ' ستربس سبايسي + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 85, image: 'images/strips.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },
  { id: 'cr4', name: 'كريب تشيكن باربيكيو', description: ' زنجر اوريجينال + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز + صوص باربيكيو', price: 90, image: 'images/bar-crepe.jpg', categoryId: 'crepe' },
  { id: 'cr5', name: 'كريب تشيكن رانش', description: ' زنجر اوريجينال + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز + صوص رانش', price: 90, image: 'images/ranch-crepe.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },
  { id: 'cr6', name: 'كريب شاورما فراخ', description: ' شاورما فراخ + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 95, image: 'images/mix-crepe5.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },
  { id: 'cr7', name: 'كريب فاهيتا فراخ', description: ' فاهيتا فراخ + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 95, image: 'images/mix-crepe11.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },
  { id: 'cr8', name: 'كريب شيش طاووق', description: ' شيش طاووق + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 90, image: 'images/sheesh-crepe.jpg', categoryId: 'crepe' },
  { id: 'cr9', name: 'كريب ميكس جريل فراخ', description: ' زنجر اوريجينال + شاورما فراخ + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 100, image: 'images/mix-crepe6.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },

  // ===== كريب لحوم =====
  { id: 'cm1', name: 'كريب برجر', description: ' برجر + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 85, image: 'images/brgr-crepe.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },
  { id: 'cm2', name: 'كريب كفتة', description: ' كفتة + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 85, image: 'images/crepe4.jpg', categoryId: 'crepe' },
  { id: 'cm3', name: 'كريب سوسيس', description: ' سوسيس + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 80, image: 'images/crepe5.jpg', categoryId: 'crepe' },
  { id: 'cm4', name: 'كريب هوت دوج', description: ' هوت دوج + جبنة موتزاريلا + طماطم + فلفل + كاتشب + مايونيز', price: 80, image: 'images/crepe6.jpg', categoryId: 'crepe' },
  // { id: 'cm5', name: 'كريب سجق', description: 'كريب لحوم', price: 80, image: IMG, categoryId: 'crepe', available: false },
  // { id: 'cm6', name: 'كريب شاورما لحم', description: 'كريب لحوم', price: 110, image: IMG, categoryId: 'crepe', available: false },
  // { id: 'cm7', name: 'كريب فاهيتا لحم', description: 'كريب لحوم', price: 110, image: IMG, categoryId: 'crepe', available: false },
  // { id: 'cm8', name: 'كريب ميكس جريل لحوم', description: 'كريب لحوم', price: 120, image: IMG, categoryId: 'crepe', available: false },

  // ===== كريب حلو و حادق =====
  // { id: 'cs-n', name: 'كريب نوتيلا', description: 'كريب حلو', price: 75, image: IMG, categoryId: 'crepe', available: false },
  // { id: 'cs-l', name: 'كريب لوتس', description: 'كريب حلو', price: 75, image: IMG, categoryId: 'crepe', available: false },
  // { id: 'cs-f', name: 'كريب فواكه', description: 'كريب حلو', price: 75, image: IMG, categoryId: 'crepe', available: false },
  // { id: 'cs-r', name: 'كريب جبنة رومي', description: 'كريب حادق', price: 75, image: IMG, categoryId: 'crepe' },
  // { id: 'cs-m', name: 'كريب جبنة موتزاريلا', description: 'كريب حادق', price: 75, image: IMG, categoryId: 'crepe' },
  { id: 'cs-x', name: 'كريب ميكس جبن', description: 'ميكس جبن موتزاريلا + رومي + صوص شيدر', price: 75, image: 'images/crepe7.jpg', categoryId: 'crepe' },

  // ===== ميكسات كريب =====
  { id: 'mx1', name: 'سوبر لايت', description: 'ميكس جبن + بطاطس', price: 90, image: 'images/mix-crepe10.jpg', categoryId: 'crepe' },
  { id: 'mx2', name: 'سوبر ميكس', description: 'ستربس + بانية + بطاطس', price: 120, image: 'images/mix-crepe4.jpg', categoryId: 'crepe' },
  { id: 'mx3', name: 'سوبر كرانشي', description: 'ستربس + شيش + سوسيس', price: 120, image: 'images/mix-crepe8.jpg', categoryId: 'crepe' },
  { id: 'mx4', name: 'سوبر كريسبي', description: 'بانية + شاورما فراخ + ستربس', price: 125, image: 'images/crepe2.jpg', categoryId: 'crepe' },
  { id: 'mx5', name: 'سوبر تشيكن', description: 'بانية + شاورما فراخ + شيش', price: 125, image: 'images/mix-crepe12.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },
  { id: 'mx6', name: 'سوبر ديزل', description: 'بانية + شاورما فراخ + شيش + هوت دوج', price: 135, image: 'images/mix-crepe.jpg', categoryId: 'crepe', bestSeller: true, badge: 'مميز' },

  // ===== ركن السوري =====
  { id: 'sy1', name: 'بطاطس سوري', description: 'بطاطس + تومية + خيار مخلل + كاتشب', price: 40, image: 'images/syrian-potato.jpg', categoryId: 'syrian' },
  { id: 'sy2', name: 'زنجر سوري', description: 'زنجر + تومية + خيار مخلل + كاتشب', price: 80, image: 'images/syrian-baneh.jpg', categoryId: 'syrian' },
  { id: 'sy3', name: 'شاورما سوري', description: 'شاورما فراخ + تومية + خيار مخلل + كاتشب', price: 80, image: 'images/syrian-shawerma.jpg', categoryId: 'syrian', bestSeller: true, badge: 'مميز' },

  // ===== ركن البطاطس =====
  { id: 'pt5', name: 'ساندوتش سوبر فرايز', description: 'بطاطس + طماطم + خيار + كاتشب + مايونيز + صوص شيدر', price: 50, image: 'images/sandwich-potato.jpg', categoryId: 'potato', bestSeller: true, badge: 'جديد' },
  { id: 'pt4', name: 'كريب بطاطس', description: 'بطاطس + طماطم + كاتشب + مايونيز', price: 50, image: 'images/potato-crepe.jpg', categoryId: 'potato' },
  { id: 'pt3', name: 'لودد فرايز', description: 'بطاطس + قطع ستربس + صوص شيدر + صوص باربيكيو + فلفل هاليبينو', price: 65, image: 'images/loaded2.jpg', categoryId: 'potato', bestSeller: true, badge: 'جديد' },
  { id: 'pt1', name: 'تشيز فرايز', description: 'بطاطس متغرقة بصوص الشيدر', price: 40, image: 'images/cheesy-potato.jpg', categoryId: 'potato' },
  { id: 'pt2', name: 'ميكس فرايز', description: 'بطاطس متغرقة بصوص الشيدر + صوص باربيكيو', price: 50, image: 'images/loaded.jpg', categoryId: 'potato' },
  { id: 'pt6', name: 'سبايسي تشيز فرايز', description: 'بطاطس متغرقة بصوص الشيدر + هوت صوص', price: 50, image: 'images/spicy-fries.jpg', categoryId: 'potato' },

  // ===== إضافات للكريب =====
  { id: 'ac1', name: 'جبنة رومي (إضافة)', description: 'إضافة للكريب', price: 20, image: 'images/romy.jpg', categoryId: 'crepe' },
  { id: 'ac2', name: 'جبنة موتزاريلا (إضافة)', description: 'إضافة للكريب', price: 25, image: 'images/mozzarella.jpg', categoryId: 'crepe' },
  { id: 'ac3', name: 'صوص شيدر (إضافة)', description: 'إضافة للكريب', price: 25, image: 'images/gbna.jpg', categoryId: 'crepe' },
  { id: 'ac4', name: 'أي صوص (إضافة)', description: 'إضافة للكريب', price: 10, image: 'images/bbq.jpg', categoryId: 'crepe' },
  { id: 'ac5', name: 'بانية (إضافة)', description: 'إضافة للكريب', price: 20, image: 'images/aneh.jpg', categoryId: 'crepe' },
  { id: 'ac6', name: 'لحوم (إضافة)', description: 'إضافة للكريب', price: 25, image: 'images/meat.jpg', categoryId: 'crepe' },
  { id: 'ac7', name: 'هوت دوج (إضافة)', description: 'إضافة للكريب', price: 25, image: 'images/ssss.jpg', categoryId: 'crepe' },
  { id: 'ac8', name: 'بطاطس (إضافة)', description: 'إضافة للكريب', price: 15, image: 'images/potato.jpg', categoryId: 'crepe' },
  { id: 'ac9', name: 'إضافة موتزاريلا للسوري', description: 'إضافة لساندوتشات السوري', price: 20, image: 'images/mozzarella.jpg', categoryId: 'syrian' },

  // ===== إضافات جانبية =====
  { id: 'sd11', name: 'ريزو', description: 'رز ابيض بتتبيلة خاصة مضاف عليه قطع ستربس + صوص باربيكيو', price: 80, image: 'images/rizo.jpg', categoryId: 'additions' },
  { id: 'sd1', name: 'كلوسلو صغير', description: 'إضافة جانبية', price: 10, image: 'images/clos.jpg', categoryId: 'additions' },
  // { id: 'sd2', name: 'كلوسلو كبير', description: 'إضافة جانبية', price: 30, image: 'images/clos.jpg', categoryId: 'additions' },
  { id: 'sd3', name: 'صوص شيدر', description: 'إضافة جانبية', price: 20, image: 'images/gbna.jpg', categoryId: 'additions' },
  { id: 'sd4', name: 'باربيكيو', description: 'إضافة جانبية', price: 15, image: 'images/bbq.jpg', categoryId: 'additions' },
  { id: 'sd5', name: 'بيج تيستي', description: 'إضافة جانبية', price: 15, image: 'images/tastys.jpg', categoryId: 'additions' },
  { id: 'sd6', name: 'رانش', description: 'إضافة جانبية', price: 15, image: 'images/ranchs.jpg', categoryId: 'additions' },
  { id: 'sd7', name: 'ثاوزاند ايلاند', description: 'إضافة جانبية', price: 15, image: 'images/thousand.jpg', categoryId: 'additions' },
  { id: 'sd8', name: 'فلفل هالبينو', description: 'إضافة جانبية', price: 10, image: 'images/hal.jpg', categoryId: 'additions' },
  { id: 'sd9', name: 'هوت صوص', description: 'إضافة جانبية', price: 10, image: 'images/hot.jpg', categoryId: 'additions' },
  { id: 'sd10', name: 'تومية', description: 'إضافة جانبية', price: 10, image: 'images/tom.jpg', categoryId: 'additions' },
  { id: 'sd12', name: 'أرز بسمتي صغير', description: 'إضافة جانبية', price: 20, image: 'images/bsmty.jpg', categoryId: 'additions' },
  // { id: 'sd13', name: 'أرز بسمتي كبير', description: 'إضافة جانبية', price: 40, image: 'images/gbna.jpg', categoryId: 'additions' },
  { id: 'sd14', name: 'قطعة بروست', description: 'إضافة جانبية', price: 50, image: 'images/broast.jpg', categoryId: 'additions', available: false },
  { id: 'sd15', name: 'قطعة ستربس', description: 'إضافة جانبية', price: 30, image: 'images/strips1.jpg', categoryId: 'additions' },
  { id: 'sd16', name: 'بطاطس صغير', description: 'إضافة جانبية', price: 15, image: 'images/potato-packet.jpg', categoryId: 'additions' },
  // { id: 'sd17', name: 'بطاطس كبير', description: 'إضافة جانبية', price: 30, image: 'images/gbna.jpg', categoryId: 'additions' },
  { id: 'sd18', name: 'موتزاريلا ستيكس', description: 'إضافة جانبية', price: 15, image: 'images/mozzarilla.jpg', categoryId: 'additions' },

  // ===== الحواوشي =====
  { id: 'p13', name: 'حواوشى لحم بلدى', description: '125 جرام لحم بلدى صافى', price: 60, image: 'images/hawawshy-spinner.webp', categoryId: 'new', bestSeller: true, badge: 'جديد' },
  { id: 'p14', name: 'ساندوتش القنبلة', description: 'قطعة بانية + شاورما فراخ + قطعة ستربس + جبنة موتزاريلا + تركي مدخن + طماطم + خيار + خس + صوص باربيكيو + صوص شيدر', price: 150, image: 'images/qon.jpg', categoryId: 'new', bestSeller: true, badge: 'جديد' },
];