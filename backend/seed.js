const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  // ── Electronics ──
  {
    name: 'Wireless Noise-Cancelling Headphones',
    price: 79.99,
    category: 'Electronics',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life and foldable design. Compatible with all Bluetooth devices.',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
  },
  {
    name: 'Smart Watch Pro',
    price: 129.99,
    category: 'Electronics',
    description: 'Feature-packed smartwatch with heart rate monitor, GPS, sleep tracking and 7-day battery. Water resistant up to 50m.',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  },
  {
    name: 'Bluetooth Portable Speaker',
    price: 49.99,
    category: 'Electronics',
    description: '360-degree surround sound with deep bass. Waterproof, dustproof and drop-proof. 24-hour playtime on a single charge.',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
  },
  {
    name: 'USB-C Fast Charging Cable (3-Pack)',
    price: 14.99,
    category: 'Electronics',
    description: 'Braided nylon USB-C cables supporting 65W fast charging. 2m length, compatible with all USB-C devices.',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80',
  },
  {
    name: 'Wireless Charging Pad',
    price: 24.99,
    category: 'Electronics',
    description: '15W fast wireless charger compatible with all Qi-enabled devices. Slim design with LED indicator and anti-slip base.',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1586495777744-4e6232bf2177?w=800&q=80',
  },
  {
    name: 'Mechanical Gaming Keyboard',
    price: 89.99,
    category: 'Electronics',
    description: 'TKL mechanical keyboard with RGB backlight and tactile blue switches. Anti-ghosting with N-key rollover for competitive gaming.',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1601445638532-1b9e8cce8af0?w=800&q=80',
  },
  {
    name: 'Wireless Ergonomic Mouse',
    price: 39.99,
    category: 'Electronics',
    description: 'Ergonomic vertical mouse that reduces wrist strain. 2.4GHz wireless, 6 adjustable DPI levels, 90-day battery life.',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
  },
  {
    name: '4K Webcam',
    price: 69.99,
    category: 'Electronics',
    description: 'Ultra HD 4K webcam with built-in ring light, autofocus and noise-cancelling microphone. Perfect for streaming and video calls.',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&q=80',
  },
  {
    name: 'Portable Power Bank 20000mAh',
    price: 44.99,
    category: 'Electronics',
    description: 'High-capacity power bank with dual USB-A and USB-C ports. Charges your phone up to 5 times. LED battery indicator.',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80',
  },
  {
    name: 'True Wireless Earbuds',
    price: 59.99,
    category: 'Electronics',
    description: 'Active noise cancellation earbuds with 8-hour playtime and 32-hour charging case. IPX5 water resistant with touch controls.',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80',
  },
  {
    name: 'Smart LED Desk Lamp',
    price: 34.99,
    category: 'Electronics',
    description: 'Touch-controlled LED desk lamp with 5 color temperatures and 10 brightness levels. Built-in USB charging port.',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
  },
  {
    name: 'Laptop Stand Adjustable',
    price: 29.99,
    category: 'Electronics',
    description: 'Aluminium adjustable laptop stand with 6 height settings. Compatible with MacBooks and laptops up to 17 inches.',
    stock: 65,
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  },

  // ── Fashion ──
  {
    name: 'Classic White Sneakers',
    price: 64.99,
    category: 'Fashion',
    description: 'Minimalist leather sneakers with cushioned insole and rubber sole. Versatile design goes with any outfit.',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  },
  {
    name: 'Men\'s Slim Fit Chinos',
    price: 44.99,
    category: 'Fashion',
    description: 'Stretch cotton chinos in a modern slim fit. Wrinkle-resistant fabric perfect for office or casual wear.',
    stock: 70,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
  },
  {
    name: 'Women\'s Floral Sundress',
    price: 38.99,
    category: 'Fashion',
    description: 'Lightweight floral print sundress with adjustable straps and side pockets. Perfect for warm weather.',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80',
  },
  {
    name: 'Leather Bifold Wallet',
    price: 29.99,
    category: 'Fashion',
    description: 'Genuine leather bifold wallet with 8 card slots, 2 cash compartments and RFID blocking technology.',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  },
  {
    name: 'Oversized Hoodie',
    price: 49.99,
    category: 'Fashion',
    description: '100% cotton fleece oversized hoodie with kangaroo pocket and adjustable drawstring. Available in multiple colours.',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
  },
  {
    name: 'Polarised Sunglasses',
    price: 34.99,
    category: 'Fashion',
    description: 'UV400 polarised sunglasses with lightweight metal frame. Reduces glare and protects eyes from harmful UV rays.',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
  },
  {
    name: 'Canvas Tote Bag',
    price: 19.99,
    category: 'Fashion',
    description: 'Heavy-duty canvas tote bag with reinforced handles and inner zip pocket. Perfect for shopping, beach or daily use.',
    stock: 110,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
  },
  {
    name: 'Running Sneakers',
    price: 84.99,
    category: 'Fashion',
    description: 'Lightweight mesh running shoes with responsive foam cushioning and breathable upper. Ideal for long-distance runs.',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
  },
  {
    name: 'Leather Crossbody Bag',
    price: 54.99,
    category: 'Fashion',
    description: 'Compact genuine leather crossbody bag with adjustable strap and multiple compartments. Fits phone, keys and essentials.',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
  },
  {
    name: 'Knitted Beanie Hat',
    price: 17.99,
    category: 'Fashion',
    description: 'Soft ribbed knit beanie made from 100% acrylic. Stretchy one-size-fits-all design. Available in 8 colours.',
    stock: 95,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
  },
  {
    name: 'Men\'s Oxford Dress Shirt',
    price: 42.99,
    category: 'Fashion',
    description: 'Classic Oxford weave dress shirt with button-down collar. Easy-iron cotton blend. Perfect for formal or smart casual.',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
  },

  // ── Food & Drinks ──
  {
    name: 'Premium Ground Coffee 500g',
    price: 16.99,
    category: 'Food',
    description: 'Single-origin Arabica ground coffee with rich chocolate and caramel notes. Medium roast, perfect for espresso or filter.',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
  },
  {
    name: 'Organic Green Tea (50 bags)',
    price: 11.99,
    category: 'Food',
    description: 'Certified organic green tea bags with a smooth, grassy flavour. Rich in antioxidants. Individually wrapped for freshness.',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80',
  },
  {
    name: 'Raw Honey 500g',
    price: 13.99,
    category: 'Food',
    description: 'Pure unfiltered raw honey from free-range bees. No additives or preservatives. Rich in natural enzymes and antioxidants.',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
  },
  {
    name: 'Mixed Nuts & Dried Fruits 400g',
    price: 14.99,
    category: 'Food',
    description: 'Premium blend of cashews, almonds, walnuts, raisins and cranberries. No added salt or sugar. Great for snacking.',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80',
  },
  {
    name: 'Extra Virgin Olive Oil 750ml',
    price: 18.99,
    category: 'Food',
    description: 'Cold-pressed extra virgin olive oil from Greek olives. Rich fruity flavour, ideal for dressings, cooking and dipping.',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  },
  {
    name: 'Dark Chocolate Bar Set (6 pack)',
    price: 19.99,
    category: 'Food',
    description: 'Artisan 70% dark chocolate bars in 6 different flavours — sea salt, chilli, orange, mint, almond and plain.',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800&q=80',
  },
  {
    name: 'Protein Granola 600g',
    price: 12.99,
    category: 'Food',
    description: 'High-protein granola with oats, seeds, almonds and honey. 15g protein per serving. Great with yogurt or milk.',
    stock: 110,
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80',
  },
  {
    name: 'Himalayan Pink Salt 1kg',
    price: 8.99,
    category: 'Food',
    description: 'Pure mineral-rich Himalayan pink salt. Fine grain suitable for cooking, seasoning and baking.',
    stock: 160,
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=800&q=80',
  },
  {
    name: 'Coconut Oil 500ml',
    price: 11.99,
    category: 'Food',
    description: 'Organic virgin coconut oil, cold-pressed and unrefined. Great for cooking, baking, skin care and hair treatment.',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
  },

  // ── Beauty ──
  {
    name: 'Vitamin C Brightening Serum',
    price: 27.99,
    category: 'Beauty',
    description: '20% Vitamin C serum with hyaluronic acid and Vitamin E. Brightens skin tone, reduces dark spots and boosts collagen.',
    stock: 70,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
  },
  {
    name: 'Hydrating Face Moisturiser',
    price: 22.99,
    category: 'Beauty',
    description: 'Lightweight daily moisturiser with hyaluronic acid and ceramides. Suitable for all skin types. SPF 30 protection.',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
  },
  {
    name: 'Natural Lip Balm Set (5 pack)',
    price: 12.99,
    category: 'Beauty',
    description: 'Beeswax and shea butter lip balms in 5 flavours — vanilla, strawberry, mint, honey and coconut. 100% natural.',
    stock: 130,
    image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&q=80',
  },
  {
    name: 'Argan Oil Hair Serum',
    price: 18.99,
    category: 'Beauty',
    description: 'Pure Moroccan argan oil serum that tames frizz, adds shine and protects from heat damage. Suitable for all hair types.',
    stock: 65,
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80',
  },
  {
    name: 'Charcoal Face Wash',
    price: 15.99,
    category: 'Beauty',
    description: 'Activated charcoal face wash that deeply cleanses pores, removes impurities and controls excess oil. Gentle daily use.',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
  },
  {
    name: 'Rose Water Facial Toner',
    price: 14.99,
    category: 'Beauty',
    description: 'Pure Bulgarian rose water toner that hydrates, soothes and balances skin pH. Alcohol-free and suitable for sensitive skin.',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=800&q=80',
  },
  {
    name: 'Jade Facial Roller',
    price: 19.99,
    category: 'Beauty',
    description: 'Natural jade stone facial roller that reduces puffiness, improves circulation and helps skincare products absorb better.',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  },
  {
    name: 'Shea Butter Body Lotion 400ml',
    price: 16.99,
    category: 'Beauty',
    description: 'Rich shea butter body lotion with vitamin E and aloe vera. Deep moisturising, fast absorbing and non-greasy.',
    stock: 95,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80',
  },

  // ── Home ──
  {
    name: 'Scented Soy Candle Set',
    price: 28.99,
    category: 'Home',
    description: 'Set of 3 hand-poured soy wax candles in lavender, vanilla and sandalwood. 40-hour burn time each. Cotton wick.',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1602178506539-5b5a8fcb5e97?w=800&q=80',
  },
  {
    name: 'Bamboo Cutting Board Set',
    price: 34.99,
    category: 'Home',
    description: 'Set of 3 organic bamboo cutting boards in different sizes. Eco-friendly, knife-friendly and easy to clean.',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
  },
  {
    name: 'Ceramic Planter Set (3 pieces)',
    price: 32.99,
    category: 'Home',
    description: 'Set of 3 minimalist ceramic planters with drainage holes and bamboo trays. Perfect for succulents and small houseplants.',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
  },
  {
    name: 'Cotton Throw Blanket',
    price: 38.99,
    category: 'Home',
    description: 'Soft woven cotton throw blanket with fringed edges. 130x170cm, machine washable. Perfect for sofa or bedroom.',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80',
  },
  {
    name: 'Stainless Steel Water Bottle 1L',
    price: 24.99,
    category: 'Home',
    description: 'Double-wall vacuum insulated bottle. Keeps drinks cold 24 hours or hot 12 hours. BPA-free with leak-proof lid.',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
  },
  {
    name: 'Borosilicate Glass Food Containers (4 set)',
    price: 42.99,
    category: 'Home',
    description: 'Airtight borosilicate glass containers with snap-lock lids. Oven, microwave and dishwasher safe. BPA-free.',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80',
  },
  {
    name: 'Linen Cushion Covers (2 pack)',
    price: 21.99,
    category: 'Home',
    description: 'Natural linen cushion covers in neutral tones with hidden zip closure. 45x45cm. Machine washable.',
    stock: 70,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80',
  },
  {
    name: 'Aroma Diffuser & Humidifier',
    price: 36.99,
    category: 'Home',
    description: 'Ultrasonic essential oil diffuser with 7 LED colours, timer and auto shut-off. Covers up to 30 square metres.',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
  },
  {
    name: 'Wooden Kitchen Utensil Set',
    price: 26.99,
    category: 'Home',
    description: 'Set of 6 handcrafted teak wood kitchen utensils — spoon, slotted spoon, spatula, ladle, fork and holder.',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
  },
  {
    name: 'Desk Organiser Set',
    price: 29.99,
    category: 'Home',
    description: 'Bamboo desk organiser with 5 compartments for pens, scissors, phone, notes and miscellaneous items.',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
  },

  // ── Sports ──
  {
    name: 'Yoga Mat Non-Slip 6mm',
    price: 34.99,
    category: 'Sports',
    description: 'Eco-friendly TPE yoga mat with alignment lines, non-slip texture and carrying strap. 183x61cm, 6mm thickness.',
    stock: 65,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
  },
  {
    name: 'Resistance Bands Set (5 levels)',
    price: 22.99,
    category: 'Sports',
    description: 'Set of 5 latex resistance bands from extra-light to extra-heavy. Includes carry bag and exercise guide.',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
  },
  {
    name: 'Adjustable Dumbbell 10kg',
    price: 54.99,
    category: 'Sports',
    description: 'Space-saving adjustable dumbbell with quick-change weight selector from 2kg to 10kg. Ideal for home workouts.',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    name: 'Jump Rope Speed Cable',
    price: 16.99,
    category: 'Sports',
    description: 'Aluminium handle speed jump rope with ball bearing system. Adjustable cable length up to 3m. Great for cardio.',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?w=800&q=80',
  },
  {
    name: 'Sports Water Bottle 750ml',
    price: 18.99,
    category: 'Sports',
    description: 'BPA-free Tritan sports bottle with flip lid and carry loop. Leak-proof, dishwasher safe and odour resistant.',
    stock: 110,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
  },
  {
    name: 'Foam Roller for Recovery',
    price: 27.99,
    category: 'Sports',
    description: 'High-density EVA foam roller for muscle recovery, myofascial release and improving flexibility. 45cm length.',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?w=800&q=80',
  },
  {
    name: 'Running Armband Phone Holder',
    price: 13.99,
    category: 'Sports',
    description: 'Adjustable neoprene armband compatible with phones up to 6.8 inches. Sweat-resistant with key pocket and card slot.',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=800&q=80',
  },

  // ── Books ──
  {
    name: 'The Psychology of Money',
    price: 16.99,
    category: 'Books',
    description: 'Morgan Housel\'s timeless lessons on wealth, greed and happiness. One of the most recommended personal finance books of the decade.',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800&q=80',
  },
  {
    name: 'Atomic Habits',
    price: 17.99,
    category: 'Books',
    description: 'James Clear\'s proven framework for building good habits and breaking bad ones. Over 15 million copies sold worldwide.',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
  },
  {
    name: 'Deep Work',
    price: 15.99,
    category: 'Books',
    description: 'Cal Newport\'s rules for focused success in a distracted world. Essential reading for anyone who wants to produce meaningful work.',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  },
  {
    name: 'Sapiens: A Brief History of Humankind',
    price: 18.99,
    category: 'Books',
    description: 'Yuval Noah Harari\'s groundbreaking narrative of humanity\'s creation and evolution. A must-read for the intellectually curious.',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&q=80',
  },
  {
    name: 'Think and Grow Rich',
    price: 13.99,
    category: 'Books',
    description: 'Napoleon Hill\'s classic masterpiece on the philosophy of personal achievement. Over 100 million copies sold since 1937.',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&q=80',
  },

  // ── Toys ──
  {
    name: 'STEM Building Blocks Set (200 pieces)',
    price: 38.99,
    category: 'Toys',
    description: 'Educational magnetic building blocks for kids 3+. Develops creativity, spatial thinking and fine motor skills.',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    name: 'Wooden Puzzle Set (4 pack)',
    price: 24.99,
    category: 'Toys',
    description: 'Set of 4 colourful wooden jigsaw puzzles for toddlers. Chunky pieces, non-toxic paint. Ages 2-5.',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80',
  },
  {
    name: 'Remote Control Car',
    price: 44.99,
    category: 'Toys',
    description: '1:16 scale RC car with 2.4GHz control, 25km/h top speed and rechargeable battery. Works on all terrain.',
    stock: 35,
    image: 'https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=800&q=80',
  },
  {
    name: 'Art & Craft Supply Kit',
    price: 29.99,
    category: 'Toys',
    description: 'Complete art kit with 120 pieces — coloured pencils, markers, watercolours, brushes and sketchpad. Ages 6+.',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  },
  {
    name: 'Plush Teddy Bear 40cm',
    price: 21.99,
    category: 'Toys',
    description: 'Super soft premium plush teddy bear made from hypoallergenic materials. Safe for all ages. Machine washable.',
    stock: 70,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&q=80',
  },
  {
    name: 'Chess & Checkers Set',
    price: 32.99,
    category: 'Toys',
    description: 'Classic 2-in-1 wooden chess and checkers board with hand-carved pieces. Folding board with storage inside.',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=800&q=80',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert all products
    const inserted = await Product.insertMany(products);
    console.log(`✅ Inserted ${inserted.length} products successfully`);

    // Summary by category
    const categories = {};
    inserted.forEach(p => {
      categories[p.category] = (categories[p.category] || 0) + 1;
    });
    console.log('\n📦 Products by category:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });

    mongoose.disconnect();
    console.log('\n🎉 Seed complete!');
  } catch (err) {
    console.error('❌ Seed failed:', err);
    mongoose.disconnect();
    process.exit(1);
  }
}

seed();