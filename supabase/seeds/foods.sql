-- CalTrack Food Database Seed
-- 310+ foods: Filipino dishes, fast food, common foods, fruits, vegetables
-- Run AFTER 001_schema.sql
-- All foods are global (user_id = NULL)

INSERT INTO foods (name, serving_label, calories, protein, carbs, fat) VALUES

-- ============================================================
-- RICE & STAPLES
-- ============================================================
('White Rice', '1 Cup (cooked)', 205, 4.3, 44.5, 0.4),
('Brown Rice', '1 Cup (cooked)', 215, 5.0, 44.8, 1.8),
('Sinangag (Garlic Fried Rice)', '1 Cup', 248, 4.5, 44.0, 5.8),
('Champorado', '1 Bowl', 280, 5.0, 52.0, 6.0),
('Arroz Caldo', '1 Bowl', 278, 14.0, 38.0, 7.0),
('Goto', '1 Bowl', 310, 18.0, 36.0, 10.0),
('Lugaw (Plain)', '1 Bowl', 175, 4.0, 36.0, 1.0),
('Congee with Egg', '1 Bowl', 250, 10.0, 38.0, 6.0),

-- ============================================================
-- FILIPINO MAIN DISHES
-- ============================================================
('Chicken Adobo', '1 Serving (150g)', 348, 30.0, 4.5, 23.0),
('Pork Adobo', '1 Serving (150g)', 420, 27.0, 4.0, 33.0),
('Chicken Tinola', '1 Bowl', 248, 25.0, 8.0, 12.0),
('Sinigang na Baboy', '1 Bowl', 285, 20.0, 12.0, 18.0),
('Sinigang na Hipon', '1 Bowl', 195, 18.0, 12.0, 7.0),
('Sinigang na Bangus', '1 Bowl', 230, 22.0, 10.0, 10.0),
('Kare-Kare', '1 Serving', 385, 25.0, 14.0, 26.0),
('Mechado', '1 Serving', 380, 26.0, 14.0, 25.0),
('Caldereta', '1 Serving', 420, 28.0, 14.0, 28.0),
('Menudo', '1 Serving', 345, 24.0, 18.0, 20.0),
('Dinuguan', '1 Serving', 325, 22.0, 8.0, 24.0),
('Bistek Tagalog', '1 Serving', 318, 26.0, 10.0, 20.0),
('Chicken Sisig', '1 Serving', 385, 32.0, 8.0, 25.0),
('Pork Sisig', '1 Serving', 452, 28.0, 8.0, 35.0),
('Tofu Sisig', '1 Serving', 280, 18.0, 12.0, 18.0),
('Lechon Kawali', '1 Serving (150g)', 580, 30.0, 5.0, 50.0),
('Crispy Pata', '1 Serving', 748, 38.0, 5.0, 65.0),
('Inihaw na Liempo', '1 Serving (150g)', 450, 28.0, 2.0, 38.0),
('Inihaw na Manok', '1 Serving (150g)', 280, 34.0, 2.0, 15.0),
('Inihaw na Bangus', '1 Serving (200g)', 275, 28.0, 3.0, 16.0),
('Nilaga (Pork)', '1 Bowl', 285, 22.0, 14.0, 16.0),
('Nilaga (Beef)', '1 Bowl', 305, 26.0, 12.0, 18.0),
('Bulalo', '1 Bowl', 580, 38.0, 12.0, 42.0),
('Laing', '1 Serving', 278, 8.0, 10.0, 24.0),
('Ginataang Kalabasa', '1 Serving', 220, 6.0, 16.0, 16.0),
('Ginataang Manok', '1 Serving', 298, 28.0, 8.0, 18.0),
('Pakbet / Pinakbet', '1 Serving', 198, 8.0, 14.0, 13.0),
('Sopas', '1 Bowl', 318, 18.0, 30.0, 14.0),
('Mami Soup (Chicken)', '1 Bowl', 348, 22.0, 36.0, 12.0),
('Lomi', '1 Bowl', 420, 24.0, 46.0, 14.0),
('Pancit Bihon', '1 Serving', 318, 16.0, 44.0, 8.0),
('Pancit Canton', '1 Serving', 378, 18.0, 50.0, 12.0),
('Pancit Malabon', '1 Serving', 348, 18.0, 46.0, 10.0),
('Palabok', '1 Serving', 385, 18.0, 50.0, 12.0),
('Pork Nilaga', '1 Serving', 285, 22.0, 14.0, 16.0),
('Tortang Talong', '1 Piece', 198, 10.0, 8.0, 14.0),
('Tortang Giniling', '1 Piece', 248, 14.0, 10.0, 16.0),
('Monggo Guisado', '1 Serving', 198, 12.0, 26.0, 5.0),
('Escabeche', '1 Serving', 248, 20.0, 18.0, 10.0),
('Pinapaitan', '1 Bowl', 265, 22.0, 6.0, 18.0),
('Crispy Kangkong', '1 Serving', 178, 3.0, 18.0, 10.0),
('Pusit Adobo', '1 Serving', 198, 20.0, 6.0, 10.0),

-- ============================================================
-- TOCINO, LONGGANISA, TAPA (Filipino Breakfast)
-- ============================================================
('Tocino (Pork)', '3 Pieces', 278, 18.0, 20.0, 14.0),
('Longganisa (Sweet)', '3 Pieces', 320, 14.0, 18.0, 22.0),
('Tapa (Beef)', '1 Serving', 278, 24.0, 8.0, 17.0),
('Daing na Bangus', '1 Serving', 278, 26.0, 0, 18.0),
('Tuyo (Dried Fish)', '2 Pieces', 120, 16.0, 0, 6.0),
('Danggit (Dried Fish)', '3 Pieces', 105, 14.0, 0, 5.5),

-- ============================================================
-- SEAFOOD
-- ============================================================
('Fried Tilapia', '1 Piece (medium)', 198, 22.0, 4.0, 10.0),
('Fried Bangus (Milkfish)', '1 Serving', 248, 26.0, 2.0, 14.0),
('Grilled Salmon', '1 Fillet (150g)', 280, 34.0, 0, 16.0),
('Canned Tuna (in water)', '1/2 Can (92g)', 110, 25.0, 0, 1.0),
('Canned Tuna (in oil)', '1/2 Can (92g)', 185, 22.0, 0, 10.0),
('Sardines (Canned)', '1 Can (155g)', 190, 22.0, 0, 11.0),
('Shrimp (Boiled)', '10 Pieces', 130, 25.0, 2.0, 2.0),
('Squid (Adobo)', '1 Serving', 198, 20.0, 6.0, 10.0),
('Pinangat na Isda', '1 Serving', 178, 20.0, 4.0, 9.0),

-- ============================================================
-- CHICKEN & MEAT
-- ============================================================
('Chicken Breast (Grilled)', '1 Piece (150g)', 165, 35.0, 0, 3.5),
('Chicken Thigh (Grilled)', '1 Piece', 178, 24.0, 0, 9.0),
('Chicken Drumstick (Fried)', '1 Piece', 195, 20.0, 6.0, 10.0),
('Chicken Wings (Fried)', '2 Pieces', 218, 18.0, 8.0, 14.0),
('Ground Beef (Cooked)', '1 Serving (100g)', 215, 22.0, 0, 13.0),
('Beef Steak', '1 Serving (150g)', 318, 30.0, 0, 21.0),
('Pork Chop (Grilled)', '1 Piece', 258, 26.0, 0, 17.0),
('Pork Belly (Liempo, raw weight)', '1 Serving (150g)', 520, 14.0, 0, 52.0),

-- ============================================================
-- EGGS
-- ============================================================
('Egg (Boiled)', '1 Piece', 78, 6.0, 0.6, 5.0),
('Egg (Fried)', '1 Piece', 90, 6.0, 0.4, 7.0),
('Egg (Scrambled)', '2 Eggs', 182, 12.0, 2.0, 14.0),
('Itlog na Maalat (Salted Egg)', '1 Piece', 145, 9.0, 1.0, 11.0),
('Kwek-Kwek (Quail Egg)', '4 Pieces', 220, 10.0, 20.0, 12.0),

-- ============================================================
-- VEGETABLES
-- ============================================================
('Kangkong (Water Spinach)', '1 Cup cooked', 20, 2.5, 3.0, 0.2),
('Sitaw (String Beans)', '1 Cup cooked', 38, 2.0, 8.5, 0.2),
('Ampalaya (Bitter Gourd)', '1 Cup cooked', 25, 1.5, 5.0, 0.2),
('Okra', '1 Cup cooked', 33, 1.9, 7.0, 0.2),
('Eggplant (Talong)', '1 Medium', 35, 0.8, 8.0, 0.2),
('Carrots', '1 Medium', 25, 0.6, 5.8, 0.1),
('Tomato', '1 Medium', 22, 1.1, 4.8, 0.2),
('Pechay (Bok Choy)', '1 Cup cooked', 20, 2.7, 3.0, 0.3),
('Broccoli', '1 Cup', 55, 3.7, 11.0, 0.6),
('Cabbage', '1 Cup shredded', 22, 1.1, 5.2, 0.1),
('Camote Tops (Sweet Potato Leaves)', '1 Cup', 22, 1.5, 4.2, 0.2),
('Malunggay (Moringa Leaves)', '1 Cup', 25, 2.0, 3.8, 0.4),
('Sayote (Chayote)', '1 Cup cooked', 22, 0.9, 5.0, 0.1),
('Potato', '1 Medium (150g)', 130, 3.0, 30.0, 0.1),
('Sweet Potato (Kamote)', '1 Medium (130g)', 112, 2.0, 26.0, 0.1),
('Corn on the Cob', '1 Ear', 132, 4.6, 29.0, 2.0),
('Fried Tofu', '4 Pieces', 178, 12.0, 4.0, 13.0),
('Mushrooms (Sauteed)', '1 Cup', 42, 3.0, 6.0, 1.0),
('Garlic', '3 Cloves', 13, 0.6, 3.0, 0),
('Onion', '1 Medium', 44, 1.2, 10.0, 0.1),

-- ============================================================
-- FRUITS
-- ============================================================
('Banana (Lakatan)', '1 Medium', 105, 1.3, 27.0, 0.3),
('Saba Banana (Boiled)', '1 Piece', 130, 1.0, 33.0, 0.3),
('Apple', '1 Medium', 95, 0.5, 25.0, 0.3),
('Mango (Ripe)', '1 Medium', 135, 1.4, 35.0, 0.6),
('Mango (Green)', '1 Medium', 60, 0.5, 15.0, 0.1),
('Papaya', '1 Cup cubed', 55, 0.9, 14.0, 0.2),
('Pineapple', '1 Cup chunks', 83, 0.9, 22.0, 0.2),
('Watermelon', '1 Cup cubed', 46, 0.9, 11.5, 0.2),
('Orange (Dalandan)', '1 Medium', 62, 1.2, 15.4, 0.2),
('Calamansi', '5 Pieces', 25, 0.5, 6.5, 0.1),
('Avocado', '1/2 Medium', 120, 1.5, 6.0, 11.0),
('Guava', '1 Medium', 68, 2.5, 14.0, 1.0),
('Lanzones', '10 Pieces', 100, 1.0, 25.0, 0.2),
('Rambutan', '5 Pieces', 60, 0.5, 15.0, 0.2),
('Durian', '1 Serving (100g)', 147, 1.5, 27.0, 5.3),
('Grapes', '1 Cup', 104, 1.1, 27.0, 0.2),
('Strawberries', '1 Cup', 49, 1.0, 12.0, 0.5),

-- ============================================================
-- BREAD & BAKERY
-- ============================================================
('Pandesal', '1 Piece', 95, 3.0, 18.0, 1.5),
('Ensaymada', '1 Piece', 220, 4.0, 30.0, 9.0),
('Monay', '1 Piece', 180, 4.5, 32.0, 3.5),
('Tasty Bread (White)', '1 Slice', 75, 2.5, 14.0, 1.0),
('Gardenia Wheat Bread', '1 Slice', 70, 3.0, 12.0, 1.2),
('Pita Bread', '1 Piece', 165, 5.5, 33.0, 0.7),
('Tortilla (Flour)', '1 Piece (8 inch)', 145, 4.0, 25.0, 3.5),
('Graham Crackers', '3 Pieces', 90, 1.5, 16.0, 2.0),
('Skyflakes Crackers', '1 Pack', 130, 2.5, 21.0, 4.0),

-- ============================================================
-- FILIPINO SNACKS & KAKANIN
-- ============================================================
('Bibingka', '1 Piece', 280, 6.0, 42.0, 9.0),
('Puto', '2 Pieces', 138, 3.5, 27.0, 1.5),
('Kutsinta', '2 Pieces', 118, 1.5, 27.0, 0.5),
('Biko', '1 Piece', 220, 2.5, 42.0, 5.0),
('Sapin-Sapin', '1 Slice', 178, 2.0, 38.0, 2.0),
('Palitaw', '2 Pieces', 158, 2.5, 32.0, 2.5),
('Halo-Halo (Regular)', '1 Glass', 348, 4.0, 60.0, 10.0),
('Turon (Banana Lumpia)', '2 Pieces', 218, 2.5, 42.0, 5.0),
('Banana Cue', '2 Pieces', 238, 1.5, 44.0, 6.0),
('Camote Cue', '2 Pieces', 198, 1.0, 40.0, 4.0),
('Fishball', '5 Pieces', 178, 8.0, 22.0, 6.0),
('Kwek-Kwek (Duck Egg)', '2 Pieces', 218, 10.0, 20.0, 11.0),
('Kikiam', '3 Pieces', 198, 8.0, 20.0, 10.0),
('Siopao (Asado)', '1 Piece', 278, 12.0, 42.0, 7.0),
('Siopao (Bola-Bola)', '1 Piece', 258, 10.0, 40.0, 6.5),
('Lumpia Shanghai (Fried)', '4 Pieces', 278, 14.0, 22.0, 15.0),
('Lumpiang Ubod (Fresh)', '2 Rolls', 178, 6.0, 26.0, 5.5),
('Leche Flan', '1 Serving', 248, 6.0, 38.0, 8.0),
('Ube Halaya', '1 Serving', 218, 3.0, 44.0, 3.5),
('Buko Pandan', '1 Serving', 278, 2.0, 40.0, 12.0),
('Buko Salad', '1 Serving', 258, 2.0, 38.0, 10.0),
('Polvoron', '1 Piece', 78, 1.5, 11.0, 3.0),
('Yema', '3 Pieces', 118, 2.5, 22.0, 3.0),
('Pastillas de Leche', '3 Pieces', 128, 3.0, 24.0, 2.5),
('Brazo de Mercedes', '1 Slice', 288, 5.0, 46.0, 10.0),
('Sans Rival', '1 Slice', 378, 6.0, 42.0, 20.0),
('Otap', '3 Pieces', 105, 1.5, 15.0, 4.5),
('Barquillos', '3 Pieces', 88, 1.0, 14.0, 3.0),

-- ============================================================
-- DAIRY & ALTERNATIVES
-- ============================================================
('Whole Milk', '1 Cup (240ml)', 149, 8.0, 12.0, 8.0),
('Skim Milk', '1 Cup (240ml)', 83, 8.0, 12.0, 0.2),
('Evaporated Milk', '1/2 Cup', 170, 8.5, 13.0, 9.5),
('Condensed Milk', '2 Tbsp', 130, 3.0, 22.0, 3.5),
('Cheese (Cheddar)', '1 Slice (28g)', 113, 7.0, 0.4, 9.0),
('Cheese (Eden/Processed)', '1 Slice', 80, 5.0, 2.0, 6.0),
('Yogurt (Plain)', '1 Cup', 150, 8.0, 20.0, 4.0),
('Butter', '1 Tbsp', 102, 0.1, 0, 11.5),
('Soy Milk', '1 Cup (240ml)', 105, 7.0, 12.0, 4.0),
('Coconut Milk', '1/2 Cup', 180, 2.0, 6.0, 18.0),
('Bear Brand Milk Powder', '1 Sachet (33g)', 148, 7.5, 20.0, 4.0),
('Nestle Fresh Milk', '1 Cup (200ml)', 124, 6.5, 10.0, 6.5),

-- ============================================================
-- BEVERAGES
-- ============================================================
('Brewed Coffee (Black)', '1 Cup', 5, 0.3, 1.0, 0),
('Coffee with Sugar & Creamer', '1 Cup', 120, 1.5, 20.0, 4.0),
('Nescafe 3-in-1', '1 Sachet', 148, 1.5, 25.0, 5.0),
('Milo 3-in-1', '1 Sachet (18g)', 80, 2.5, 13.0, 2.5),
('Milo Hot Drink', '1 Cup', 115, 3.5, 18.0, 3.0),
('Coke (Regular)', '1 Can (330ml)', 140, 0, 39.0, 0),
('Sprite', '1 Can (330ml)', 130, 0, 35.0, 0),
('Royal (Orange Soda)', '1 Can (330ml)', 148, 0, 40.0, 0),
('Orange Juice', '1 Cup (240ml)', 110, 1.7, 26.0, 0.5),
('Buko Juice (Coconut Water)', '1 Glass (240ml)', 46, 1.7, 8.9, 0.5),
('Sago at Gulaman', '1 Glass', 175, 0.5, 42.0, 0.5),
('Milktea (Plain, no sugar)', '1 Cup (350ml)', 85, 2.0, 15.0, 2.0),
('Boba Milk Tea (Medium)', '1 Cup (500ml)', 350, 3.5, 68.0, 6.0),
('Beer (Regular)', '1 Can (330ml)', 150, 1.0, 13.0, 0),
('Red Horse Beer', '1 Bottle (500ml)', 250, 1.5, 22.0, 0),
('Yakult', '1 Bottle (65ml)', 50, 1.0, 11.5, 0),
('Gatorade', '1 Bottle (350ml)', 90, 0, 23.0, 0),

-- ============================================================
-- GRAINS & CEREALS
-- ============================================================
('Oatmeal (Cooked)', '1 Cup', 150, 5.0, 27.0, 3.0),
('Quaker Oats (Instant)', '1 Sachet', 130, 4.0, 26.0, 2.0),
('Cornflakes', '1 Cup', 101, 2.0, 24.0, 0.2),
('Pancake', '2 Pieces (medium)', 198, 5.5, 36.0, 4.5),
('Noodles / Pasta (Cooked)', '1 Cup', 220, 7.0, 43.0, 1.5),
('Lucky Me Pancit Canton', '1 Pack (prepared)', 368, 9.0, 54.0, 13.0),
('Lucky Me Instant Mami', '1 Pack (prepared)', 290, 8.0, 46.0, 8.0),
('Nissin Cup Noodles', '1 Cup (prepared)', 295, 7.0, 44.0, 10.0),

-- ============================================================
-- CONDIMENTS & FATS
-- ============================================================
('Mayonnaise', '1 Tbsp', 94, 0.1, 0.4, 10.0),
('Ketchup', '1 Tbsp', 19, 0.3, 4.5, 0),
('Soy Sauce', '1 Tbsp', 9, 1.3, 0.8, 0),
('Fish Sauce (Patis)', '1 Tbsp', 10, 1.5, 0.7, 0),
('Coconut Oil', '1 Tbsp', 120, 0, 0, 14.0),
('Vegetable Oil', '1 Tbsp', 120, 0, 0, 14.0),
('Olive Oil', '1 Tbsp', 119, 0, 0, 13.5),
('Peanut Butter', '1 Tbsp', 94, 3.5, 3.5, 8.0),
('Jam / Jelly', '1 Tbsp', 56, 0.1, 14.0, 0),
('White Sugar', '1 Tsp', 16, 0, 4.0, 0),
('Honey', '1 Tbsp', 64, 0.1, 17.0, 0),

-- ============================================================
-- NUTS & SEEDS
-- ============================================================
('Almonds', '1 Oz (28g)', 164, 6.0, 6.0, 14.0),
('Cashews', '1 Oz (28g)', 157, 5.0, 9.0, 12.0),
('Peanuts (Roasted)', '1 Oz (28g)', 166, 7.0, 6.0, 14.0),
('Sunflower Seeds', '1 Tbsp', 51, 1.8, 2.0, 4.5),
('Chia Seeds', '1 Tbsp', 58, 2.0, 5.0, 3.7),

-- ============================================================
-- PACKAGED SNACKS
-- ============================================================
('Chips (Potato, Jack n Jill)', '1 Small Bag (40g)', 195, 2.5, 24.0, 10.0),
('Nova Country Chips', '1 Pack (22g)', 110, 2.0, 14.0, 5.0),
('Tortillos Corn Chips', '1 Pack (45g)', 210, 3.0, 28.0, 10.0),
('Pretzels', '1 Pack (30g)', 110, 2.5, 23.0, 1.0),
('Popcorn (Plain)', '1 Cup popped', 62, 2.0, 12.0, 1.0),
('Popcorn (Buttered)', '1 Cup popped', 90, 1.5, 12.0, 4.5),
('Granola Bar', '1 Bar (47g)', 190, 3.5, 30.0, 7.0),
('Dark Chocolate (70%)', '1 Square (10g)', 60, 0.8, 5.0, 4.5),
('Chocolate Bar (Choco Mucho)', '1 Bar', 245, 3.0, 30.0, 12.0),
('Rebisco Crackers', '1 Pack (33g)', 148, 2.5, 22.0, 5.5),
('Zesto Juice Drink', '1 Box (200ml)', 80, 0, 20.0, 0),
('Minute Maid Juice', '1 Box (200ml)', 100, 0.5, 25.0, 0),

-- ============================================================
-- JOLLIBEE
-- ============================================================
('Jollibee Chickenjoy (1 pc, Breast)', '1 Piece', 305, 32.0, 12.0, 15.0),
('Jollibee Chickenjoy (1 pc, Thigh)', '1 Piece', 338, 26.0, 12.0, 21.0),
('Jollibee Chickenjoy (2 pcs)', '2 Pieces', 620, 55.0, 24.0, 35.0),
('Jollibee Jolly Spaghetti', '1 Serving', 488, 18.0, 68.0, 17.0),
('Jollibee Yumburger', '1 Piece', 328, 15.0, 38.0, 13.0),
('Jollibee Double Yumburger', '1 Piece', 498, 26.0, 40.0, 25.0),
('Jollibee Burger Steak', '1 Serving', 568, 28.0, 62.0, 23.0),
('Jollibee Palabok Fiesta', '1 Serving', 548, 22.0, 68.0, 20.0),
('Jollibee Peach Mango Pie', '1 Piece', 228, 3.0, 34.0, 9.0),
('Jollibee Mashed Potato', '1 Serving', 178, 3.0, 28.0, 7.0),
('Jollibee Jolly Crispy Fries (Small)', '1 Serving', 228, 3.5, 30.0, 11.0),
('Jollibee Jolly Crispy Fries (Large)', '1 Serving', 428, 6.0, 58.0, 20.0),
('Jollibee Float (Coke)', '1 Cup', 288, 2.5, 50.0, 8.0),
('Jollibee Jolly Hotdog', '1 Piece', 358, 14.0, 40.0, 16.0),
('Jollibee Chicken Sandwich', '1 Piece', 488, 26.0, 50.0, 20.0),
('Jollibee Rice', '1 Serving', 205, 4.0, 45.0, 0.5),

-- ============================================================
-- McDONALD'S PHILIPPINES
-- ============================================================
('McDonalds Hamburger', '1 Piece', 250, 12.0, 31.0, 9.0),
('McDonalds Cheeseburger', '1 Piece', 298, 15.0, 33.0, 12.0),
('McDonalds Big Mac', '1 Piece', 550, 25.0, 46.0, 30.0),
('McDonalds Quarter Pounder', '1 Piece', 510, 28.0, 43.0, 26.0),
('McDonalds McChicken', '1 Piece', 398, 20.0, 42.0, 17.0),
('McDonalds McSpicy', '1 Piece', 478, 24.0, 47.0, 22.0),
('McDonalds Double McSpicy', '1 Piece', 698, 38.0, 53.0, 38.0),
('McDonalds Filet-O-Fish', '1 Piece', 378, 15.0, 39.0, 18.0),
('McDonalds Chicken McNuggets (6 pcs)', '6 Pieces', 280, 15.0, 18.0, 17.0),
('McDonalds Chicken McNuggets (9 pcs)', '9 Pieces', 420, 22.0, 27.0, 25.0),
('McDonalds French Fries (Small)', '1 Serving', 228, 3.0, 30.0, 11.0),
('McDonalds French Fries (Medium)', '1 Serving', 318, 4.0, 43.0, 15.0),
('McDonalds French Fries (Large)', '1 Serving', 488, 6.0, 65.0, 23.0),
('McDonalds McFloat', '1 Cup', 268, 2.5, 48.0, 7.5),
('McDonalds Apple Pie', '1 Piece', 248, 2.5, 33.0, 11.0),
('McDonalds Sundae (Hot Fudge)', '1 Serving', 338, 5.0, 58.0, 10.0),
('McDonalds Rice', '1 Serving', 205, 4.0, 44.0, 0.5),
('McDonalds Egg McMuffin', '1 Piece', 298, 17.0, 29.0, 13.0),
('McDonalds Hotcakes (3 pcs)', '3 Pieces', 428, 9.0, 78.0, 9.0),

-- ============================================================
-- KFC PHILIPPINES
-- ============================================================
('KFC Original Recipe Chicken (1 pc)', '1 Piece', 320, 28.0, 11.0, 19.0),
('KFC Crispy Chicken (1 pc)', '1 Piece', 338, 26.0, 15.0, 21.0),
('KFC Chicken Strips (3 pcs)', '3 Pieces', 338, 22.0, 24.0, 17.0),
('KFC Zinger Burger', '1 Piece', 488, 26.0, 49.0, 22.0),
('KFC Tower Burger', '1 Piece', 568, 32.0, 52.0, 28.0),
('KFC Coleslaw', '1 Serving', 178, 1.5, 21.0, 10.0),
('KFC Mashed Potatoes with Gravy', '1 Serving', 138, 3.0, 22.0, 5.0),
('KFC Corn', '1 Serving', 128, 4.0, 25.0, 2.0),
('KFC Rice', '1 Serving', 205, 4.0, 44.0, 0.5),
('KFC French Fries (Regular)', '1 Serving', 298, 4.5, 38.0, 15.0),
('KFC French Fries (Large)', '1 Serving', 448, 6.5, 57.0, 22.0),
('KFC Gravy', '1 Serving', 45, 1.0, 7.0, 1.5),

-- ============================================================
-- CHOWKING
-- ============================================================
('Chowking Chao Fan (Plain)', '1 Serving', 358, 7.0, 62.0, 8.0),
('Chowking Yang Chow Fried Rice', '1 Serving', 418, 12.0, 64.0, 13.0),
('Chowking Wonton Mami', '1 Bowl', 378, 20.0, 44.0, 13.0),
('Chowking Asado Siopao', '1 Piece', 278, 12.0, 42.0, 7.0),
('Chowking Bola-Bola Siopao', '1 Piece', 258, 10.0, 40.0, 6.0),
('Chowking Siomai (4 pcs)', '4 Pieces', 218, 12.0, 20.0, 10.0),
('Chowking Halo-Halo (Regular)', '1 Serving', 318, 3.5, 60.0, 8.0),
('Chowking Lauriat Set', '1 Serving', 498, 22.0, 64.0, 17.0),
('Chowking Sweet & Sour Pork', '1 Serving', 418, 18.0, 48.0, 18.0),
('Chowking Pancit Canton', '1 Serving', 338, 14.0, 48.0, 11.0),
('Chowking Palabok', '1 Serving', 378, 16.0, 52.0, 12.0),

-- ============================================================
-- INTERNATIONAL / POPULAR
-- ============================================================
('Pizza (Cheese Slice)', '1 Slice', 266, 11.0, 33.0, 10.0),
('Pizza (Pepperoni Slice)', '1 Slice', 298, 13.0, 34.0, 13.0),
('Hotdog (Regular)', '1 Piece', 183, 6.5, 2.0, 17.0),
('Ramen (Shoyu)', '1 Bowl', 498, 22.0, 65.0, 17.0),
('Tonkotsu Ramen', '1 Bowl', 645, 30.0, 68.0, 27.0),
('Caesar Salad', '1 Serving', 198, 7.0, 14.0, 14.0),
('Chicken Caesar Salad', '1 Serving', 348, 28.0, 14.0, 22.0),
('Club Sandwich', '1 Sandwich', 448, 26.0, 38.0, 20.0),
('Tuna Sandwich', '1 Sandwich', 318, 20.0, 34.0, 10.0),
('Beef Burger (Generic)', '1 Piece', 478, 26.0, 40.0, 24.0),
('Shawarma (Chicken)', '1 Wrap', 398, 24.0, 44.0, 14.0),
('Pasta Alfredo', '1 Serving', 498, 16.0, 58.0, 23.0),
('Pasta Bolognese', '1 Serving', 478, 24.0, 56.0, 17.0),
('Spaghetti (with sauce)', '1 Serving', 278, 10.0, 44.0, 7.0),
('Fish & Chips', '1 Serving', 538, 26.0, 50.0, 25.0),
('Onion Rings', '1 Serving', 248, 3.5, 32.0, 12.0),
('Nachos with Cheese', '1 Serving', 348, 6.0, 44.0, 17.0),
('Chicken Burrito', '1 Piece', 498, 28.0, 56.0, 17.0),
('Dim Sum / Dumplings (4 pcs)', '4 Pieces', 198, 10.0, 22.0, 8.0),

-- ============================================================
-- SWEETS & DESSERTS
-- ============================================================
('Ice Cream (Regular Scoop)', '1 Scoop', 148, 2.5, 19.0, 7.5),
('Dirty Ice Cream', '1 Scoop', 118, 2.0, 18.0, 4.5),
('Mais con Hielo', '1 Glass', 198, 3.0, 38.0, 4.0),
('Red Mango Frozen Yogurt (Small)', '1 Serving', 198, 5.0, 38.0, 3.0),
('Egg Pie', '1 Slice', 278, 6.5, 36.0, 12.0),
('Custard Cake', '1 Slice', 318, 6.0, 42.0, 14.0),
('Chocolate Cake Slice', '1 Slice', 348, 5.0, 48.0, 16.0),
('Cheesecake Slice', '1 Slice', 398, 7.0, 36.0, 26.0),
('Ginataan', '1 Cup', 198, 2.0, 32.0, 7.0),
('Champorado (Chocolate Rice Porridge)', '1 Bowl', 278, 5.5, 52.0, 5.5),

-- ============================================================
-- ADDITIONAL POPULAR FOODS
-- ============================================================
('Tokwa (Firm Tofu, Raw)', '1 Block (113g)', 78, 9.0, 2.0, 4.5),
('Tokwa''t Baboy', '1 Serving', 298, 22.0, 6.0, 22.0),
('Sinigang Mix Soup Base', '1 Pack used', 30, 0, 7.0, 0),
('Canned Corned Beef (Argentina)', '1/3 Can', 148, 11.0, 2.0, 11.0),
('Spam Luncheon Meat', '2 Slices', 178, 8.0, 2.0, 15.0),
('Vienna Sausage', '3 Pieces', 148, 7.0, 2.0, 12.0),
('Isaw (Grilled Intestine)', '3 Pieces', 148, 10.0, 6.0, 10.0),
('BBQ Pork Stick (Inihaw)', '1 Stick', 178, 14.0, 8.0, 10.0),
('Balut (Duck Egg)', '1 Piece', 188, 13.5, 8.0, 11.0),
('Tapsilog', '1 Serving', 658, 34.0, 56.0, 32.0),
('Tocilog', '1 Serving', 618, 28.0, 56.0, 32.0),
('Longsilog', '1 Serving', 638, 26.0, 58.0, 34.0),
('Sisig Rice', '1 Serving', 598, 28.0, 58.0, 28.0),
('Goto with Egg', '1 Bowl', 358, 22.0, 38.0, 13.0),
('Bulalo with Rice', '1 Serving', 785, 42.0, 56.0, 42.0);

-- ============================================================
-- ADDITIONAL PINOY HOME-COOKED MEALS
-- ============================================================
INSERT INTO foods (name, serving_label, calories, protein, carbs, fat) VALUES

-- Visayan / Regional Dishes
('Humba (Bisaya Pork)', '1 Serving (150g)', 410, 22.0, 15.0, 32.0),
('Paksiw na Pata', '1 Serving', 520, 28.0, 8.0, 44.0),
('Lechon Paksiw', '1 Serving (150g)', 420, 22.0, 12.0, 32.0),
('Chicken Inasal (Bacolod)', '1 Serving (150g)', 260, 32.0, 3.0, 13.0),
('La Paz Batchoy', '1 Bowl', 465, 26.0, 48.0, 18.0),
('Kinilaw na Isda', '1 Serving', 175, 18.0, 6.0, 8.0),
('Sinuglaw', '1 Serving', 245, 22.0, 6.0, 15.0),
('Balbacua', '1 Serving', 498, 30.0, 8.0, 40.0),
('Utan Bisaya (Vegetable Soup)', '1 Bowl', 125, 7.0, 14.0, 4.0),
('Pork Igado (Ilocano)', '1 Serving', 320, 24.0, 6.0, 24.0),

-- Tomato-Based Stews
('Chicken Afritada', '1 Serving', 310, 26.0, 14.0, 17.0),
('Pork Afritada', '1 Serving', 375, 22.0, 14.0, 28.0),
('Chicken Pochero', '1 Serving', 330, 28.0, 20.0, 15.0),
('Pork Pochero', '1 Serving', 395, 26.0, 22.0, 24.0),
('Morcon (Stuffed Beef Roll)', '1 Serving (150g)', 385, 28.0, 10.0, 28.0),
('Binagoongang Baboy', '1 Serving', 440, 24.0, 8.0, 36.0),

-- Meaty Dishes
('Embutido (Pork Roll)', '1 Slice (100g)', 280, 16.0, 12.0, 20.0),
('Nilagang Manok (Chicken Soup)', '1 Bowl', 265, 26.0, 12.0, 12.0),

-- Sauteed / Guisado Vegetables
('Chopsuey (Guisadong Gulay)', '1 Serving', 185, 10.0, 16.0, 9.0),
('Ginisang Ampalaya with Egg', '1 Serving', 155, 10.0, 8.0, 10.0),
('Ginisang Sayote', '1 Serving', 95, 4.0, 10.0, 4.0),
('Ginisang Togue (Bean Sprouts)', '1 Serving', 138, 8.0, 12.0, 6.0),
('Adobong Sitaw', '1 Serving', 148, 5.0, 14.0, 8.0),
('Adobong Kangkong', '1 Serving', 130, 4.0, 10.0, 8.0),
('Sinabawang Isda (Fish Soup)', '1 Bowl', 175, 20.0, 6.0, 8.0),
('Paksiw na Bangus', '1 Serving', 220, 24.0, 4.0, 12.0),
('Ginataang Bilo-Bilo', '1 Cup', 285, 2.5, 48.0, 9.0),
('Nilagang Kamote (Boiled Sweet Potato)', '1 Medium', 112, 2.0, 26.0, 0.1),
('Pork Binagoongan with Talong', '1 Serving', 455, 24.0, 10.0, 38.0);

