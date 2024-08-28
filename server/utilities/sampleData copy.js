// SAMPLE USER DATA
{
    "userData": [
        {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "password": "password123",
            "userType": "user",
            "isActive": true,
        },
        {
            "firstName": "Jane",
            "lastName": "Smith",
            "email": "jane.smith@example.com",
            "phone": "0987654321",
            "password": "password456",
            "userType": "admin",
            "isActive": true,
        },
        {
            "firstName": "Michael",
            "lastName": "Johnson",
            "email": "michael.johnson@example.com",
            "phone": "1112223333",
            "password": "password789",
            "userType": "seller",
            "isActive": false,
        },
        {
            "firstName": "Emily",
            "lastName": "Brown",
            "email": "emily.brown@example.com",
            "phone": "5556667777",
            "password": "passwordabc",
            "userType": "user",
            "isActive": true,
        },
        {
            "firstName": "William",
            "lastName": "Wilson",
            "email": "william.wilson@example.com",
            "phone": "7778889999",
            "password": "passwordxyz",
            "userType": "admin",
            "isActive": true,
        },
        {
            "firstName": "Sophia",
            "lastName": "Garcia",
            "email": "sophia.garcia@example.com",
            "phone": "3334445555",
            "password": "password123",
            "userType": "seller",
            "isActive": false,
        },
        {
            "firstName": "David",
            "lastName": "Martinez",
            "email": "david.martinez@example.com",
            "phone": "6667778888",
            "password": "password456",
            "userType": "user",
            "isActive": true,
        },
        {
            "firstName": "Olivia",
            "lastName": "Lopez",
            "email": "olivia.lopez@example.com",
            "phone": "8889990000",
            "password": "password789",
            "userType": "admin",
            "isActive": true,
        },
        {
            "firstName": "Daniel",
            "lastName": "Gonzalez",
            "email": "daniel.gonzalez@example.com",
            "phone": "2223334444",
            "password": "passwordabc",
            "userType": "user",
            "isActive": true,
        },
        {
            "firstName": "Mia",
            "lastName": "Rodriguez",
            "email": "mia.rodriguez@example.com",
            "phone": "9990001111",
            "password": "passwordxyz",
            "userType": "seller",
            "isActive": false,
        }
    ]
}

// SAMPLE PRODUCT DATA
// 669f97fb6e8d39bebcf7da8d, 669f97fb6e8d39bebcf7da90, 66a0b9b072ba590ce939880b
// You must have a _id of the user from the MongoDB Database and the user can be of seller or admin type .
// Replace it with sellerIds 669f97fb6e8d39bebcf7da8d, 669f97fb6e8d39bebcf7da90, 66a0b9b072ba590ce939880b as in the current sample data these ids are used.
// if you need to use the below sample data.
// Replacement of these three ids are required as these ids doesnot exist in the MongoDB.

{
    "sampleProducts": [
        {
            "title": "Eternal Essence",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 1 description.",
            "price": 65,
            "category": "Litter",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mystic Meadows",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 2 description.",
            "price": 50,
            "category": "Food",
            "quantity": 25,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Serene Sanctuary",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 3 description.",
            "price": 75,
            "category": "Toy",
            "quantity": 18,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Tranquil Trails",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 4 description.",
            "price": 55,
            "category": "Accessory",
            "quantity": 22,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Harmony Haven",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 5 description.",
            "price": 60,
            "category": "Litter",
            "quantity": 23,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Blissful Breeze",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 6 description.",
            "price": 70,
            "category": "Food",
            "quantity": 30,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Serenity Springs",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 7 description.",
            "price": 80,
            "category": "Toy",
            "quantity": 15,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Tranquility Terrace",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 8 description.",
            "price": 45,
            "category": "Accessory",
            "quantity": 28,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Elysian Eden",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 9 description.",
            "price": 68,
            "category": "Litter",
            "quantity": 19,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mystical Moonlight",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 10 description.",
            "price": 72,
            "category": "Food",
            "quantity": 25,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Dreamscape Delight",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 11 description.",
            "price": 55,
            "category": "Toy",
            "quantity": 21,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Cascade Cove",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 12 description.",
            "price": 63,
            "category": "Accessory",
            "quantity": 17,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Glistening Glade",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 13 description.",
            "price": 85,
            "category": "Litter",
            "quantity": 23,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Zen Zenith",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 14 description.",
            "price": 47,
            "category": "Food",
            "quantity": 29,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Majestic Mountain",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 15 description.",
            "price": 78,
            "category": "Toy",
            "quantity": 16,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Peaceful Pines",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 16 description.",
            "price": 60,
            "category": "Accessory",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Divine Destiny",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 17 description.",
            "price": 53,
            "category": "Litter",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Oasis Opulence",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 18 description.",
            "price": 70,
            "category": "Food",
            "quantity": 18,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Mirage Majesty",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 19 description.",
            "price": 42,
            "category": "Toy",
            "quantity": 22,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Astral Amethyst",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 20 description.",
            "price": 65,
            "category": "Accessory",
            "quantity": 27,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Enigma Essence",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 21 description.",
            "price": 57,
            "category": "Litter",
            "quantity": 25,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Eternal Echo",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 22 description.",
            "price": 72,
            "category": "Food",
            "quantity": 21,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Mystic Mirage",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 23 description.",
            "price": 48,
            "category": "Toy",
            "quantity": 26,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Serenity Sky",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 24 description.",
            "price": 68,
            "category": "Accessory",
            "quantity": 19,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Tranquil Tide",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 25 description.",
            "price": 55,
            "category": "Litter",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Harmony Haven",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 26 description.",
            "price": 40,
            "category": "Food",
            "quantity": 28,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Tranquil Trails",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 27 description.",
            "price": 75,
            "category": "Toy",
            "quantity": 14,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Elysian Eden",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 28 description.",
            "price": 63,
            "category": "Accessory",
            "quantity": 23,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Mystical Moonlight",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 29 description.",
            "price": 50,
            "category": "Litter",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Dreamscape Delight",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 30 description.",
            "price": 70,
            "category": "Food",
            "quantity": 22,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Cascade Cove",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 31 description.",
            "price": 58,
            "category": "Toy",
            "quantity": 18,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Glistening Glade",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 32 description.",
            "price": 45,
            "category": "Accessory",
            "quantity": 26,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Zen Zenith",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 33 description.",
            "price": 62,
            "category": "Litter",
            "quantity": 21,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Majestic Mountain",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 34 description.",
            "price": 80,
            "category": "Food",
            "quantity": 17,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Peaceful Pines",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 35 description.",
            "price": 52,
            "category": "Toy",
            "quantity": 23,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Divine Destiny",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 36 description.",
            "price": 68,
            "category": "Accessory",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Oasis Opulence",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 37 description.",
            "price": 75,
            "category": "Litter",
            "quantity": 19,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mirage Majesty",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 38 description.",
            "price": 55,
            "category": "Food",
            "quantity": 26,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Astral Amethyst",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 39 description.",
            "price": 60,
            "category": "Toy",
            "quantity": 15,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Enigma Essence",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 40 description.",
            "price": 70,
            "category": "Accessory",
            "quantity": 22,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Eternal Echo",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 41 description.",
            "price": 50,
            "category": "Litter",
            "quantity": 18,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mystic Mirage",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 42 description.",
            "price": 65,
            "category": "Food",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Serenity Sky",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 43 description.",
            "price": 55,
            "category": "Toy",
            "quantity": 20,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Tranquil Tide",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 44 description.",
            "price": 48,
            "category": "Accessory",
            "quantity": 28,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Elysian Eden",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 45 description.",
            "price": 75,
            "category": "Litter",
            "quantity": 16,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mystical Moonlight",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 46 description.",
            "price": 62,
            "category": "Food",
            "quantity": 21,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Dreamscape Delight",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 47 description.",
            "price": 53,
            "category": "Toy",
            "quantity": 27,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Cascade Cove",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 48 description.",
            "price": 70,
            "category": "Accessory",
            "quantity": 19,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Glistening Glade",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 49 description.",
            "price": 68,
            "category": "Litter",
            "quantity": 22,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Zen Zenith",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 50 description.",
            "price": 47,
            "category": "Food",
            "quantity": 25,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Majestic Mountain",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 51 description.",
            "price": 78,
            "category": "Toy",
            "quantity": 15,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Peaceful Pines",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 52 description.",
            "price": 65,
            "category": "Accessory",
            "quantity": 23,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Divine Destiny",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 53 description.",
            "price": 70,
            "category": "Litter",
            "quantity": 18,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Oasis Opulence",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 54 description.",
            "price": 45,
            "category": "Food",
            "quantity": 26,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Mirage Majesty",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 55 description.",
            "price": 58,
            "category": "Toy",
            "quantity": 24,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Astral Amethyst",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 56 description.",
            "price": 60,
            "category": "Accessory",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Enigma Essence",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 57 description.",
            "price": 70,
            "category": "Litter",
            "quantity": 19,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Eternal Echo",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 58 description.",
            "price": 75,
            "category": "Food",
            "quantity": 17,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Mystic Mirage",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 59 description.",
            "price": 52,
            "category": "Toy",
            "quantity": 22,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Serenity Sky",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 60 description.",
            "price": 68,
            "category": "Accessory",
            "quantity": 18,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Tranquil Tide",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 61 description.",
            "price": 65,
            "category": "Litter",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Harmony Haven",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 62 description.",
            "price": 42,
            "category": "Food",
            "quantity": 28,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Tranquil Trails",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 63 description.",
            "price": 78,
            "category": "Toy",
            "quantity": 16,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Elysian Eden",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 64 description.",
            "price": 60,
            "category": "Accessory",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Mystical Moonlight",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 65 description.",
            "price": 72,
            "category": "Litter",
            "quantity": 21,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Dreamscape Delight",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 66 description.",
            "price": 80,
            "category": "Food",
            "quantity": 17,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Cascade Cove",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 67 description.",
            "price": 58,
            "category": "Toy",
            "quantity": 22,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Glistening Glade",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 68 description.",
            "price": 65,
            "category": "Accessory",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Zen Zenith",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 69 description.",
            "price": 47,
            "category": "Litter",
            "quantity": 25,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Majestic Mountain",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 70 description.",
            "price": 78,
            "category": "Food",
            "quantity": 15,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Peaceful Pines",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 71 description.",
            "price": 62,
            "category": "Toy",
            "quantity": 21,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Divine Destiny",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 72 description.",
            "price": 70,
            "category": "Accessory",
            "quantity": 17,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Oasis Opulence",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 73 description.",
            "price": 68,
            "category": "Litter",
            "quantity": 22,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mirage Majesty",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 74 description.",
            "price": 55,
            "category": "Food",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Astral Amethyst",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 75 description.",
            "price": 48,
            "category": "Toy",
            "quantity": 26,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Enigma Essence",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 76 description.",
            "price": 70,
            "category": "Accessory",
            "quantity": 18,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Eternal Echo",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 77 description.",
            "price": 60,
            "category": "Litter",
            "quantity": 26,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mystic Mirage",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 78 description.",
            "price": 75,
            "category": "Food",
            "quantity": 19,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Serenity Sky",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 79 description.",
            "price": 70,
            "category": "Toy",
            "quantity": 23,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Tranquil Tide",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 80 description.",
            "price": 50,
            "category": "Accessory",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Elysian Eden",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 81 description.",
            "price": 65,
            "category": "Litter",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Mystical Moonlight",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 82 description.",
            "price": 72,
            "category": "Food",
            "quantity": 17,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Dreamscape Delight",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 83 description.",
            "price": 55,
            "category": "Toy",
            "quantity": 25,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Cascade Cove",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 84 description.",
            "price": 78,
            "category": "Accessory",
            "quantity": 19,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Glistening Glade",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 85 description.",
            "price": 65,
            "category": "Litter",
            "quantity": 27,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Zen Zenith",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 86 description.",
            "price": 60,
            "category": "Food",
            "quantity": 18,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Majestic Mountain",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 87 description.",
            "price": 78,
            "category": "Toy",
            "quantity": 22,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Peaceful Pines",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 88 description.",
            "price": 65,
            "category": "Accessory",
            "quantity": 26,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Divine Destiny",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 89 description.",
            "price": 50,
            "category": "Litter",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Oasis Opulence",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 90 description.",
            "price": 70,
            "category": "Food",
            "quantity": 21,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Mirage Majesty",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 91 description.",
            "price": 55,
            "category": "Toy",
            "quantity": 15,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Astral Amethyst",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 92 description.",
            "price": 52,
            "category": "Accessory",
            "quantity": 23,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Enigma Essence",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 93 description.",
            "price": 80,
            "category": "Litter",
            "quantity": 18,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Eternal Echo",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 94 description.",
            "price": 75,
            "category": "Food",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Mystic Mirage",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 95 description.",
            "price": 53,
            "category": "Toy",
            "quantity": 19,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Serenity Sky",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 96 description.",
            "price": 78,
            "category": "Accessory",
            "quantity": 22,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        },
        {
            "title": "Tranquil Tide",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 97 description.",
            "price": 48,
            "category": "Litter",
            "quantity": 25,
            "sellerId": "669f97fb6e8d39bebcf7da8d"
        },
        {
            "title": "Harmony Haven",
            "age": "Kitten",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 98 description.",
            "price": 75,
            "category": "Food",
            "quantity": 20,
            "sellerId": "669f97fb6e8d39bebcf7da90"
        },
        {
            "title": "Tranquil Trails",
            "age": "All",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 99 description.",
            "price": 50,
            "category": "Toy",
            "quantity": 26,
            "sellerId": "66a0b9b072ba590ce939880b"
        },
        {
            "title": "Elysian Eden",
            "age": "Adult",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Product 100 description.",
            "price": 58,
            "category": "Accessory",
            "quantity": 24,
            "sellerId": "669f97fb6e8d39bebcf7da94"
        }
    ]
}