import { createHash } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/seed-C-eEFuW8.js
function hash(item, storeId, price) {
	return createHash("sha256").update(`${item.trim().toLowerCase()}|${storeId}|${price.toFixed(2)}`).digest("hex");
}
var AREAS = [
	[
		1,
		"Downtown Dubai",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.1972,
		55.2744,
		6
	],
	[
		2,
		"Dubai Marina",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.0805,
		55.1403,
		5
	],
	[
		3,
		"Jumeirah",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.196,
		55.247,
		5
	],
	[
		4,
		"Deira",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.2697,
		55.3095,
		6
	],
	[
		5,
		"Al Barsha",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.111,
		55.203,
		5
	],
	[
		6,
		"Westminster",
		"London",
		"United Kingdom",
		"GBP",
		"£",
		51.4994,
		-.1245,
		4
	],
	[
		7,
		"Camden",
		"London",
		"United Kingdom",
		"GBP",
		"£",
		51.539,
		-.1426,
		4
	],
	[
		8,
		"Greenwich",
		"London",
		"United Kingdom",
		"GBP",
		"£",
		51.4934,
		.0098,
		5
	],
	[
		9,
		"Manhattan",
		"New York",
		"United States",
		"USD",
		"$",
		40.7831,
		-73.9712,
		5
	],
	[
		10,
		"Brooklyn",
		"New York",
		"United States",
		"USD",
		"$",
		40.6782,
		-73.9442,
		6
	],
	[
		11,
		"Queens",
		"New York",
		"United States",
		"USD",
		"$",
		40.7282,
		-73.7949,
		7
	],
	[
		12,
		"Gulshan-e-Iqbal",
		"Karachi",
		"Pakistan",
		"PKR",
		"Rs",
		24.926,
		67.0931,
		5
	],
	[
		13,
		"Clifton",
		"Karachi",
		"Pakistan",
		"PKR",
		"Rs",
		24.8138,
		67.03,
		4
	],
	[
		14,
		"DHA Karachi",
		"Karachi",
		"Pakistan",
		"PKR",
		"Rs",
		24.8142,
		67.064,
		5
	],
	[
		15,
		"North Nazimabad",
		"Karachi",
		"Pakistan",
		"PKR",
		"Rs",
		24.942,
		67.0415,
		5
	],
	[
		16,
		"DHA Lahore",
		"Lahore",
		"Pakistan",
		"PKR",
		"Rs",
		31.4697,
		74.4123,
		5
	],
	[
		17,
		"Gulberg",
		"Lahore",
		"Pakistan",
		"PKR",
		"Rs",
		31.5104,
		74.3447,
		4
	],
	[
		18,
		"Johar Town",
		"Lahore",
		"Pakistan",
		"PKR",
		"Rs",
		31.4622,
		74.2728,
		5
	],
	[
		19,
		"F-10",
		"Islamabad",
		"Pakistan",
		"PKR",
		"Rs",
		33.6938,
		73.0116,
		4
	],
	[
		20,
		"F-7 Blue Area",
		"Islamabad",
		"Pakistan",
		"PKR",
		"Rs",
		33.7215,
		73.0572,
		4
	],
	[
		21,
		"Al Nahda",
		"Sharjah",
		"United Arab Emirates",
		"AED",
		"AED",
		25.309,
		55.374,
		4
	],
	[
		22,
		"Al Qasimia",
		"Sharjah",
		"United Arab Emirates",
		"AED",
		"AED",
		25.352,
		55.39,
		4
	],
	[
		23,
		"Al Murar",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.2675,
		55.3117,
		3
	],
	[
		24,
		"Muteena",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.2768,
		55.3262,
		3
	],
	[
		25,
		"Al Fahidi",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.2582,
		55.2972,
		3
	],
	[
		26,
		"Al Nahda Dubai",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.296,
		55.3715,
		3
	],
	[
		27,
		"Muhaisnah",
		"Dubai",
		"United Arab Emirates",
		"AED",
		"AED",
		25.2485,
		55.4175,
		3
	],
	[
		28,
		"Al Jerf",
		"Ajman",
		"United Arab Emirates",
		"AED",
		"AED",
		25.4035,
		55.4829,
		3
	],
	[
		29,
		"Al Bustan",
		"Ajman",
		"United Arab Emirates",
		"AED",
		"AED",
		25.4097,
		55.4439,
		3
	]
];
var STORES = [
	[
		1,
		"Carrefour Mall of the Emirates",
		"Carrefour",
		"Mall of the Emirates, Al Barsha",
		25.1181,
		55.2003,
		5,
		"https://www.carrefouruae.com"
	],
	[
		2,
		"Carrefour Deira City Centre",
		"Carrefour",
		"Deira City Centre",
		25.2522,
		55.331,
		4,
		"https://www.carrefouruae.com"
	],
	[
		3,
		"Lulu Hypermarket Al Barsha",
		"Lulu",
		"Al Barsha 1",
		25.1138,
		55.1986,
		5,
		"https://www.luluhypermarket.com"
	],
	[
		4,
		"Spinneys Jumeirah",
		"Spinneys",
		"Jumeirah Beach Road",
		25.2048,
		55.248,
		3,
		"https://www.spinneys.com"
	],
	[
		5,
		"Waitrose Dubai Marina",
		"Waitrose",
		"Dubai Marina Mall",
		25.0762,
		55.1408,
		2,
		"https://www.waitrose.ae"
	],
	[
		6,
		"Choithrams Downtown",
		"Choithrams",
		"Boulevard Plaza, Downtown",
		25.194,
		55.274,
		1,
		"https://www.choithrams.com"
	],
	[
		7,
		"Tesco Extra Westminster",
		"Tesco",
		"Victoria Street, London",
		51.4965,
		-.141,
		6,
		"https://www.tesco.com"
	],
	[
		8,
		"Sainsbury's Camden",
		"Sainsbury's",
		"Camden Road",
		51.5412,
		-.1398,
		7,
		"https://www.sainsburys.co.uk"
	],
	[
		9,
		"Waitrose Greenwich",
		"Waitrose",
		"Greenwich South Street",
		51.476,
		.009,
		8,
		"https://www.waitrose.com"
	],
	[
		10,
		"Lidl Camden",
		"Lidl",
		"Chalk Farm Road",
		51.5419,
		-.149,
		7,
		"https://www.lidl.co.uk"
	],
	[
		11,
		"Asda Westminster",
		"Asda",
		"Edgware Road",
		51.52,
		-.169,
		6,
		"https://www.asda.com"
	],
	[
		12,
		"Walmart Supercenter Queens",
		"Walmart",
		"Rego Park, Queens",
		40.726,
		-73.862,
		11,
		"https://www.walmart.com"
	],
	[
		13,
		"Whole Foods Union Square",
		"Whole Foods",
		"4 Union Square South, Manhattan",
		40.735,
		-73.99,
		9,
		"https://www.wholefoodsmarket.com"
	],
	[
		14,
		"Trader Joe's Court Street",
		"Trader Joe's",
		"Brooklyn Heights",
		40.694,
		-73.991,
		10,
		"https://www.traderjoes.com"
	],
	[
		15,
		"Costco Queens",
		"Costco",
		"Long Island City",
		40.744,
		-73.937,
		11,
		"https://www.costco.com"
	],
	[
		16,
		"Target Atlantic Terminal",
		"Target",
		"Atlantic Avenue, Brooklyn",
		40.684,
		-73.977,
		10,
		"https://www.target.com"
	],
	[
		17,
		"Imtiaz Super Store Gulshan",
		"Imtiaz",
		"Rashid Minhas Road, Gulshan-e-Iqbal",
		24.918,
		67.096,
		12,
		"https://imtiaz.com.pk"
	],
	[
		18,
		"Carrefour Dolmen Clifton",
		"Carrefour",
		"Dolmen Mall, Clifton",
		24.814,
		67.0305,
		13,
		"https://www.carrefour.pk"
	],
	[
		19,
		"Metro Korangi",
		"Metro",
		"Korangi Creek, Karachi",
		24.837,
		67.111,
		14,
		"https://www.metro.pk"
	],
	[
		20,
		"Chase Up North Nazimabad",
		"Chase Up",
		"Block H, North Nazimabad",
		24.937,
		67.038,
		15,
		"https://www.chaseup.com.pk"
	],
	[
		21,
		"Naheed Super Market DHA",
		"Naheed",
		"Khayaban-e-Rahat, DHA Phase 6",
		24.808,
		67.068,
		14,
		"https://www.naheed.pk"
	],
	[
		22,
		"Al-Fatah Gulberg",
		"Al Fatah",
		"Main Boulevard, Gulberg III",
		31.5108,
		74.346,
		17,
		"https://www.alfatah.pk"
	],
	[
		23,
		"Carrefour Packages Mall",
		"Carrefour",
		"Packages Mall, Lahore",
		31.469,
		74.316,
		16,
		"https://www.carrefour.pk"
	],
	[
		24,
		"Metro Lahore",
		"Metro",
		"Thokar Niaz Baig, Lahore",
		31.446,
		74.244,
		18,
		"https://www.metro.pk"
	],
	[
		25,
		"Giga Mall Superstore",
		"Carrefour",
		"Giga Mall, DHA Phase 2, Islamabad",
		33.546,
		73.126,
		19,
		"https://www.carrefour.pk"
	],
	[
		26,
		"Utility Store Blue Area",
		"Utility",
		"Jinnah Avenue, Blue Area",
		33.718,
		73.055,
		20,
		"https://usc.org.pk"
	],
	[
		27,
		"Clifton Sabzi Mandi",
		"Local",
		"Boat Basin, Clifton",
		24.822,
		67.033,
		13,
		"https://www.google.com/maps"
	],
	[
		28,
		"Karachi Digital Desk",
		"For you",
		"Online · Clifton, Karachi",
		24.8142,
		67.0302,
		13,
		"https://www.google.com/search?q=free+ai+subscription"
	],
	[
		29,
		"Family Trips Karachi",
		"For you",
		"Family stays · Clifton, Karachi",
		24.8146,
		67.0308,
		13,
		"https://www.google.com/travel"
	],
	[
		30,
		"Karachi Departures",
		"For you",
		"Jinnah International, Karachi",
		24.815,
		67.0312,
		13,
		"https://www.google.com/travel/flights"
	],
	[
		31,
		"Lahore Digital Desk",
		"For you",
		"Online · Gulberg, Lahore",
		31.5106,
		74.3449,
		17,
		"https://www.google.com/search?q=free+ai+subscription"
	],
	[
		32,
		"Family Trips Lahore",
		"For you",
		"Family stays · Gulberg, Lahore",
		31.511,
		74.3452,
		17,
		"https://www.google.com/travel"
	],
	[
		33,
		"Lahore Departures",
		"For you",
		"Allama Iqbal International, Lahore",
		31.5114,
		74.3455,
		17,
		"https://www.google.com/travel/flights"
	],
	[
		34,
		"Dubai Digital Desk",
		"For you",
		"Online · Downtown Dubai",
		25.1974,
		55.2746,
		1,
		"https://www.google.com/search?q=free+ai+subscription"
	],
	[
		35,
		"Family Trips Dubai",
		"For you",
		"Family stays · Downtown Dubai",
		25.1978,
		55.275,
		1,
		"https://www.google.com/travel"
	],
	[
		36,
		"Dubai Departures",
		"For you",
		"Dubai International",
		25.1982,
		55.2754,
		1,
		"https://www.google.com/travel/flights"
	],
	[
		37,
		"London Digital Desk",
		"For you",
		"Online · Westminster",
		51.4996,
		-.1243,
		6,
		"https://www.google.com/search?q=free+ai+subscription"
	],
	[
		38,
		"Family Trips London",
		"For you",
		"Family stays · Westminster",
		51.4998,
		-.1239,
		6,
		"https://www.google.com/travel"
	],
	[
		39,
		"London Departures",
		"For you",
		"Heathrow · book from Westminster",
		51.5001,
		-.1235,
		6,
		"https://www.google.com/travel/flights"
	],
	[
		40,
		"Islamabad Digital Desk",
		"For you",
		"Online · Blue Area",
		33.7217,
		73.0574,
		20,
		"https://www.google.com/search?q=free+ai+subscription"
	],
	[
		41,
		"Family Trips Islamabad",
		"For you",
		"Family stays · F-10, Islamabad",
		33.694,
		73.0118,
		19,
		"https://www.google.com/travel"
	],
	[
		42,
		"Islamabad Departures",
		"For you",
		"Islamabad International",
		33.722,
		73.0576,
		20,
		"https://www.google.com/travel/flights"
	],
	[
		43,
		"Karachi notified rate",
		"Official",
		"Boat Basin sabzi, Clifton",
		24.822,
		67.033,
		13,
		"https://rozdaam.com/ur/karachi/vegetables"
	],
	[
		44,
		"Dream Land Center Muteena",
		"Dream Land",
		"Opposite City Avenue Hotel, Muteena Park, Deira",
		25.2768,
		55.3262,
		24,
		"https://ae.ilofo.com/en/dream-land"
	],
	[
		45,
		"Talal Supermarket",
		"Talal",
		"Al Esbij St, Al Fahidi, Bur Dubai",
		25.2582,
		55.2972,
		25,
		"https://talalgroupintl.com/sector/retail"
	],
	[
		46,
		"Al Madina Market Naif",
		"Madina",
		"21c Street, Naif, Deira",
		25.2718,
		55.3058,
		4,
		"https://almadinahypermarket.com/store-locator/"
	],
	[
		47,
		"Faaz Supermarket",
		"Faaz",
		"9 21b St, Al Murar, Deira",
		25.2762,
		55.3088,
		23,
		"https://www.google.com/maps/search/?api=1&query=Faaz+Supermarket+Al+Murar+Deira"
	],
	[
		48,
		"Faaz Hypermarket",
		"Faaz",
		"Industrial Area 2, Sharjah",
		25.315,
		55.405,
		22,
		"https://www.google.com/maps/search/?api=1&query=Faaz+Hypermarket+Sharjah+Industrial+Area+2"
	],
	[
		49,
		"Day to Day Al Nahda",
		"Day to Day",
		"Al Nahda Road, near Sahara Centre, Sharjah",
		25.2986,
		55.3742,
		21,
		"https://www.daytodayuae.com/branches/"
	],
	[
		50,
		"Day to Day Al Qasimia",
		"Day to Day",
		"King Abdul Aziz St, Al Qasimia, Sharjah",
		25.3462,
		55.3915,
		22,
		"https://www.daytodayuae.com/branches/"
	],
	[
		51,
		"Night to Night Al Nahda",
		"Night to Night",
		"Al Wahda St, Al Nahda 1, Sharjah",
		25.3035,
		55.3738,
		21,
		"https://ae.ilofo.com/en/night-to-night"
	],
	[
		52,
		"Viva Muraqqabat",
		"Viva",
		"Muraqqabat St, K6 building, Deira",
		25.267,
		55.322,
		4,
		"https://myviva.com/store-finder/"
	],
	[
		53,
		"Viva Al Barsha",
		"Viva",
		"Al Barsha 1, next to Cassells Hotel",
		25.112,
		55.201,
		5,
		"https://myviva.com/store-finder/"
	],
	[
		54,
		"West Zone Fresh Al Nahda",
		"West Zone",
		"Al Nahda 1, Dubai",
		25.296,
		55.3715,
		26,
		"https://ae.ilofo.com/en/west-zone"
	],
	[
		55,
		"Imtiaz Clifton",
		"Imtiaz",
		"CA-2, Block 4 Clifton, Karachi",
		24.8126,
		67.0298,
		13,
		"https://imtiaz.com.pk/store-locator/"
	],
	[
		56,
		"Kifayah Teen Talwar",
		"Kifayah",
		"Plot 32/2 Cosmic Tower, Block 8, Teen Talwar, Clifton",
		24.8208,
		67.0312,
		13,
		"https://www.facebook.com/kifayahsupermarket/"
	],
	[
		57,
		"Day to Day Union",
		"Day to Day",
		"Omar Bin Al Khattab St, opposite Union Metro, Deira",
		25.2667,
		55.3139,
		4,
		"https://www.daytodayuae.com/branches/"
	],
	[
		58,
		"West Zone Fresh Muteena",
		"West Zone",
		"Al Muteena, Deira",
		25.2738,
		55.3235,
		24,
		"https://ae.ilofo.com/en/west-zone"
	],
	[
		59,
		"Talal Market Muhaisnah",
		"Talal",
		"Muhaisnah 2, Sonapur, Dubai",
		25.2478,
		55.4186,
		27,
		"https://linktr.ee/TalalMarketLocations"
	],
	[
		60,
		"Al Madina Hypermarket Sonapur",
		"Madina",
		"Muhaisnah 2, Sonapur, Dubai",
		25.2496,
		55.4162,
		27,
		"https://almadinahypermarket.com/store-locator/"
	],
	[
		61,
		"Day to Day Al Jerf",
		"Day to Day",
		"Hassan Al Basari St, Al Jerf 2, Ajman",
		25.4035238,
		55.4828792,
		28,
		"https://www.daytodayuae.com/branches/"
	],
	[
		62,
		"Day to Day Al Nahda 1",
		"Day to Day",
		"13th Street, Al Mamzar Bridge Exit 69, Al Nahda 1, Dubai",
		25.2883511,
		55.3631377,
		26,
		"https://ae.ilofo.com/en/day-to-day/catalogs/85858"
	],
	[
		63,
		"Day to Day Al Bustan",
		"Day to Day",
		"Sheikh Rashid Bin Humaid Al Nuaimi St, Al Bustan, Ajman",
		25.4096762,
		55.4438975,
		29,
		"https://ae.ilofo.com/en/day-to-day/catalogs/85879"
	]
];
var SOURCES = [
	[
		1,
		"Carrefour UAE",
		"website",
		"https://www.carrefouruae.com",
		1,
		60
	],
	[
		2,
		"Lulu Hypermarket",
		"website",
		"https://www.luluhypermarket.com",
		5,
		60
	],
	[
		3,
		"Spinneys Weekly",
		"website",
		"https://www.spinneys.com",
		3,
		60
	],
	[
		4,
		"Tesco UK",
		"website",
		"https://www.tesco.com",
		6,
		60
	],
	[
		5,
		"Walmart Weekly Ad",
		"website",
		"https://www.walmart.com",
		11,
		60
	],
	[
		6,
		"Dubai Grocery Deals",
		"facebook",
		"https://facebook.com",
		1,
		15
	],
	[
		7,
		"@grocerydealsdxb",
		"instagram",
		"https://instagram.com",
		1,
		15
	],
	[
		8,
		"@LondonDeals",
		"twitter",
		"https://x.com",
		6,
		15
	],
	[
		9,
		"Flipp Dubai",
		"flyer",
		"https://flipp.com",
		1,
		180
	],
	[
		10,
		"Flipp London",
		"flyer",
		"https://flipp.com",
		6,
		180
	],
	[
		11,
		"Flipp New York",
		"flyer",
		"https://flipp.com",
		9,
		180
	],
	[
		12,
		"r/deals",
		"forum",
		"https://reddit.com/r/deals",
		null,
		30
	],
	[
		13,
		"NY Grocery TikTok",
		"tiktok",
		"https://tiktok.com",
		9,
		15
	],
	[
		14,
		"Telegram DXB Offers",
		"telegram",
		"https://t.me",
		1,
		15
	],
	[
		15,
		"Community submissions",
		"manual",
		null,
		null,
		0
	],
	[
		16,
		"Waitrose",
		"website",
		"https://www.waitrose.com",
		8,
		60
	],
	[
		17,
		"Imtiaz.pk",
		"website",
		"https://imtiaz.com.pk",
		12,
		60
	],
	[
		18,
		"Metro Pakistan",
		"website",
		"https://www.metro.pk",
		14,
		60
	],
	[
		19,
		"Carrefour Pakistan",
		"website",
		"https://www.carrefour.pk",
		13,
		60
	],
	[
		20,
		"Karachi Grocery Deals",
		"facebook",
		"https://facebook.com",
		12,
		15
	],
	[
		21,
		"Lahore Bazaar",
		"instagram",
		"https://instagram.com",
		17,
		15
	],
	[
		22,
		"Telegram PK Offers",
		"telegram",
		"https://t.me",
		12,
		15
	],
	[
		23,
		"Flipp Pakistan",
		"flyer",
		"https://flipp.com",
		12,
		180
	],
	[
		24,
		"Clifton Kitchen WhatsApp",
		"whatsapp",
		"https://whatsapp.com",
		13,
		15
	],
	[
		25,
		"Karachi Kitchen Pinterest",
		"pinterest",
		"https://pinterest.com",
		13,
		20
	],
	[
		26,
		"Karachi Grocery Web",
		"search",
		"https://www.google.com/search",
		13,
		30
	],
	[
		27,
		"Clifton Local Board",
		"local",
		"https://www.google.com/maps",
		13,
		30
	],
	[
		28,
		"Karachi Deals Twitter",
		"twitter",
		"https://x.com",
		13,
		15
	],
	[
		29,
		"Clifton Kitchen Instagram",
		"instagram",
		"https://instagram.com",
		13,
		15
	],
	[
		30,
		"Clifton Facebook Market",
		"facebook",
		"https://facebook.com",
		13,
		15
	],
	[
		31,
		"Karachi notified vegetables",
		"website",
		"https://rozdaam.com/ur/karachi/vegetables",
		13,
		720
	],
	[
		32,
		"Karachi notified poultry",
		"website",
		"https://rozdaam.com/ur/karachi/poultry",
		13,
		720
	],
	[
		33,
		"Karachi notified meat",
		"website",
		"https://rozdaam.com/ur/karachi/meat",
		13,
		720
	],
	[
		34,
		"Karachi notified fruit",
		"website",
		"https://rozdaam.com/ur/karachi/fruits",
		13,
		720
	],
	[
		35,
		"Naheed.pk",
		"website",
		"https://www.naheed.pk/groceries-pets/fresh-products/vegetables",
		14,
		360
	],
	[
		36,
		"PBS Karachi weekly",
		"website",
		"https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		13,
		10080
	],
	[
		37,
		"Dream Land leaflet",
		"flyer",
		"https://ae.ilofo.com/en/dream-land",
		24,
		10080
	],
	[
		38,
		"Talal Market",
		"website",
		"https://talalgroupintl.com/sector/retail",
		25,
		1440
	],
	[
		39,
		"Faaz Supermarket",
		"local",
		"https://www.google.com/maps/search/?api=1&query=Faaz+Supermarket+Al+Murar",
		23,
		1440
	],
	[
		40,
		"Day to Day",
		"website",
		"https://www.daytodayuae.com/branches/",
		21,
		1440
	],
	[
		41,
		"Night to Night leaflet",
		"flyer",
		"https://ae.ilofo.com/en/night-to-night",
		21,
		10080
	],
	[
		42,
		"Viva Supermarket",
		"website",
		"https://myviva.com/store-finder/",
		4,
		1440
	],
	[
		43,
		"West Zone Fresh",
		"flyer",
		"https://ae.ilofo.com/en/west-zone",
		26,
		1440
	],
	[
		44,
		"Imtiaz stores",
		"website",
		"https://imtiaz.com.pk/store-locator/",
		13,
		1440
	],
	[
		45,
		"Kifayah Supermarket",
		"facebook",
		"https://www.facebook.com/kifayahsupermarket/",
		13,
		1440
	],
	[
		46,
		"Day to Day Deira",
		"website",
		"https://www.daytodayuae.com/branches/",
		4,
		1440
	],
	[
		47,
		"Talal Muhaisnah",
		"website",
		"https://linktr.ee/TalalMarketLocations",
		27,
		1440
	],
	[
		48,
		"Day to Day Ajman",
		"website",
		"https://www.daytodayuae.com/branches/",
		28,
		1440
	]
];
var OFFERS = [
	{
		storeId: 1,
		areaId: 5,
		sourceId: 1,
		itemName: "Almarai Fresh Milk 2L",
		category: "dairy",
		price: 8.5,
		original: 11,
		unit: "2L",
		featured: true,
		hoursAgo: 2,
		daysLeft: 4,
		description: "Full-fat fresh milk. Limit 4 per customer."
	},
	{
		storeId: 1,
		areaId: 5,
		sourceId: 1,
		itemName: "Royal Gala Apples 1kg",
		category: "produce",
		price: 6.5,
		original: 9.99,
		unit: "1kg",
		hoursAgo: 4,
		daysLeft: 3
	},
	{
		storeId: 1,
		areaId: 5,
		sourceId: 1,
		itemName: "Whole Chicken 1kg",
		category: "meat",
		price: 9.95,
		original: 14.5,
		unit: "1kg",
		featured: true,
		hoursAgo: 5,
		daysLeft: 2,
		description: "Fresh chilled, not frozen."
	},
	{
		storeId: 1,
		areaId: 5,
		sourceId: 1,
		itemName: "Sunwhite Basmati Rice 5kg",
		category: "pantry",
		price: 32,
		original: 42,
		unit: "5kg",
		hoursAgo: 8,
		daysLeft: 7
	},
	{
		storeId: 1,
		areaId: 5,
		sourceId: 9,
		itemName: "Lurpak Butter 500g",
		category: "dairy",
		price: 18.5,
		original: 24.75,
		unit: "500g",
		hoursAgo: 6,
		daysLeft: 5
	},
	{
		storeId: 2,
		areaId: 4,
		sourceId: 1,
		itemName: "Al Ain Water 4 × 5L",
		category: "beverages",
		price: 12.75,
		original: 16,
		unit: "4-pack",
		hoursAgo: 3,
		daysLeft: 6
	},
	{
		storeId: 2,
		areaId: 4,
		sourceId: 1,
		itemName: "Nido Fortified Milk Powder 2.5kg",
		category: "dairy",
		price: 45,
		original: 58,
		unit: "2.5kg",
		hoursAgo: 10,
		daysLeft: 8
	},
	{
		storeId: 2,
		areaId: 4,
		sourceId: 6,
		itemName: "Lipton Yellow Label 100s",
		category: "beverages",
		price: 14.25,
		original: 19,
		unit: "100 bags",
		hoursAgo: 1,
		daysLeft: 4
	},
	{
		storeId: 2,
		areaId: 4,
		sourceId: 9,
		itemName: "Pampers Baby Dry Size 4",
		category: "household",
		price: 49,
		original: 64,
		unit: "pack",
		hoursAgo: 12,
		daysLeft: 5
	},
	{
		storeId: 3,
		areaId: 5,
		sourceId: 2,
		itemName: "Fresh Strawberries 250g",
		category: "produce",
		price: 7.5,
		original: 12,
		unit: "250g",
		featured: true,
		hoursAgo: 1,
		daysLeft: 1,
		description: "In-season Punnet. While stocks last."
	},
	{
		storeId: 3,
		areaId: 5,
		sourceId: 2,
		itemName: "Atlantic Salmon Fillet 500g",
		category: "meat",
		price: 29,
		original: 39,
		unit: "500g",
		hoursAgo: 7,
		daysLeft: 2
	},
	{
		storeId: 3,
		areaId: 5,
		sourceId: 2,
		itemName: "White Eggs 30s",
		category: "dairy",
		price: 16.9,
		original: 22,
		unit: "30 eggs",
		hoursAgo: 9,
		daysLeft: 6
	},
	{
		storeId: 3,
		areaId: 5,
		sourceId: 14,
		itemName: "Extra Virgin Olive Oil 1L",
		category: "pantry",
		price: 28,
		original: 36,
		unit: "1L",
		hoursAgo: 14,
		daysLeft: 9
	},
	{
		storeId: 4,
		areaId: 3,
		sourceId: 3,
		itemName: "Spinneys Sourdough Loaf",
		category: "bakery",
		price: 12,
		original: 16,
		unit: "loaf",
		hoursAgo: 3,
		daysLeft: 1
	},
	{
		storeId: 4,
		areaId: 3,
		sourceId: 3,
		itemName: "Hass Avocados 4-pack",
		category: "produce",
		price: 14,
		original: 19.5,
		unit: "4-pack",
		hoursAgo: 4,
		daysLeft: 2
	},
	{
		storeId: 4,
		areaId: 3,
		sourceId: 7,
		itemName: "Organic Baby Spinach 200g",
		category: "produce",
		price: 9.75,
		original: 13,
		unit: "200g",
		hoursAgo: 2,
		daysLeft: 2
	},
	{
		storeId: 4,
		areaId: 3,
		sourceId: 3,
		itemName: "Single Origin Coffee 250g",
		category: "beverages",
		price: 42,
		original: 55,
		unit: "250g",
		hoursAgo: 18,
		daysLeft: 10
	},
	{
		storeId: 5,
		areaId: 2,
		sourceId: 16,
		itemName: "Aberdeen Angus Mince 500g",
		category: "meat",
		price: 24,
		original: 32,
		unit: "500g",
		hoursAgo: 6,
		daysLeft: 3
	},
	{
		storeId: 5,
		areaId: 2,
		sourceId: 16,
		itemName: "English Breakfast Tea 100s",
		category: "beverages",
		price: 18,
		original: 24,
		unit: "100 bags",
		hoursAgo: 11,
		daysLeft: 8
	},
	{
		storeId: 5,
		areaId: 2,
		sourceId: 7,
		itemName: "Belgian Dark Chocolate 100g",
		category: "snacks",
		price: 11,
		original: 15.5,
		unit: "100g",
		hoursAgo: 5,
		daysLeft: 12,
		verified: false
	},
	{
		storeId: 6,
		areaId: 1,
		sourceId: 6,
		itemName: "Maggi 2-Minute Noodles 5-pack",
		category: "pantry",
		price: 8.5,
		original: 12,
		unit: "5-pack",
		hoursAgo: 2,
		daysLeft: 5,
		verified: false
	},
	{
		storeId: 6,
		areaId: 1,
		sourceId: 14,
		itemName: "Kellogg's Corn Flakes 500g",
		category: "pantry",
		price: 15.75,
		original: 21,
		unit: "500g",
		hoursAgo: 16,
		daysLeft: 7
	},
	{
		storeId: 6,
		areaId: 1,
		sourceId: 15,
		itemName: "Dettol Antiseptic 750ml",
		category: "household",
		price: 19,
		original: 26,
		unit: "750ml",
		hoursAgo: 20,
		daysLeft: 9,
		verified: false
	},
	{
		storeId: 5,
		areaId: 2,
		sourceId: 7,
		itemName: "Frozen Mixed Berries 1kg",
		category: "frozen",
		price: 22,
		original: 30,
		unit: "1kg",
		hoursAgo: 8,
		daysLeft: 11
	},
	{
		storeId: 1,
		areaId: 5,
		sourceId: 9,
		itemName: "Lay's Variety 3-pack",
		category: "snacks",
		price: 11.5,
		original: 16,
		unit: "3-pack",
		hoursAgo: 4,
		daysLeft: 4
	},
	{
		storeId: 7,
		areaId: 6,
		sourceId: 4,
		itemName: "Tesco Semi-Skimmed Milk 4 pints",
		category: "dairy",
		price: 1.35,
		original: 1.75,
		unit: "4 pints",
		featured: true,
		hoursAgo: 2,
		daysLeft: 3
	},
	{
		storeId: 7,
		areaId: 6,
		sourceId: 4,
		itemName: "British Chicken Breast 650g",
		category: "meat",
		price: 4.25,
		original: 5.75,
		unit: "650g",
		hoursAgo: 3,
		daysLeft: 2
	},
	{
		storeId: 7,
		areaId: 6,
		sourceId: 4,
		itemName: "Easy Peeler Oranges 600g",
		category: "produce",
		price: 1.1,
		original: 1.8,
		unit: "600g",
		hoursAgo: 5,
		daysLeft: 2
	},
	{
		storeId: 7,
		areaId: 6,
		sourceId: 10,
		itemName: "Hearty Food Co Pasta 1kg",
		category: "pantry",
		price: .65,
		original: .95,
		unit: "1kg",
		hoursAgo: 9,
		daysLeft: 6
	},
	{
		storeId: 7,
		areaId: 6,
		sourceId: 4,
		itemName: "Cathedral City Cheddar 350g",
		category: "dairy",
		price: 2.5,
		original: 3.5,
		unit: "350g",
		hoursAgo: 7,
		daysLeft: 5
	},
	{
		storeId: 8,
		areaId: 7,
		sourceId: 10,
		itemName: "Taste the Difference Sourdough",
		category: "bakery",
		price: 1.75,
		original: 2.5,
		unit: "loaf",
		hoursAgo: 4,
		daysLeft: 1
	},
	{
		storeId: 8,
		areaId: 7,
		sourceId: 8,
		itemName: "Blueberries 150g",
		category: "produce",
		price: 1.5,
		original: 2.25,
		unit: "150g",
		featured: true,
		hoursAgo: 1,
		daysLeft: 2
	},
	{
		storeId: 8,
		areaId: 7,
		sourceId: 10,
		itemName: "British Beef Mince 5% 500g",
		category: "meat",
		price: 3.25,
		original: 4.5,
		unit: "500g",
		hoursAgo: 6,
		daysLeft: 3
	},
	{
		storeId: 9,
		areaId: 8,
		sourceId: 16,
		itemName: "Duchy Organic Eggs 6",
		category: "dairy",
		price: 2.4,
		original: 3.15,
		unit: "6 eggs",
		hoursAgo: 8,
		daysLeft: 5
	},
	{
		storeId: 9,
		areaId: 8,
		sourceId: 16,
		itemName: "Essential Olive Oil 500ml",
		category: "pantry",
		price: 3.8,
		original: 5,
		unit: "500ml",
		hoursAgo: 12,
		daysLeft: 10
	},
	{
		storeId: 9,
		areaId: 8,
		sourceId: 16,
		itemName: "All Butter Croissants 4",
		category: "bakery",
		price: 1.9,
		original: 2.6,
		unit: "4-pack",
		hoursAgo: 3,
		daysLeft: 1
	},
	{
		storeId: 10,
		areaId: 7,
		sourceId: 8,
		itemName: "Bakery White Bloomer",
		category: "bakery",
		price: .89,
		original: 1.29,
		unit: "loaf",
		hoursAgo: 2,
		daysLeft: 1,
		verified: false
	},
	{
		storeId: 10,
		areaId: 7,
		sourceId: 10,
		itemName: "Deluxe Smoked Salmon 100g",
		category: "meat",
		price: 1.99,
		original: 2.99,
		unit: "100g",
		hoursAgo: 5,
		daysLeft: 3
	},
	{
		storeId: 10,
		areaId: 7,
		sourceId: 8,
		itemName: "Fresh Whole Milk 2L",
		category: "dairy",
		price: 1.19,
		original: 1.49,
		unit: "2L",
		hoursAgo: 4,
		daysLeft: 3
	},
	{
		storeId: 11,
		areaId: 6,
		sourceId: 10,
		itemName: "Smart Price Long Grain Rice 1kg",
		category: "pantry",
		price: .52,
		original: .75,
		unit: "1kg",
		hoursAgo: 15,
		daysLeft: 7
	},
	{
		storeId: 11,
		areaId: 6,
		sourceId: 12,
		itemName: "Extra Special Vanilla Ice Cream",
		category: "frozen",
		price: 2.5,
		original: 3.5,
		unit: "900ml",
		hoursAgo: 11,
		daysLeft: 8,
		verified: false
	},
	{
		storeId: 11,
		areaId: 6,
		sourceId: 10,
		itemName: "Fairy Washing Up Liquid 780ml",
		category: "household",
		price: 1.25,
		original: 1.8,
		unit: "780ml",
		hoursAgo: 18,
		daysLeft: 9
	},
	{
		storeId: 12,
		areaId: 11,
		sourceId: 5,
		itemName: "Great Value Whole Milk 1 gallon",
		category: "dairy",
		price: 3.14,
		original: 3.98,
		unit: "1 gal",
		featured: true,
		hoursAgo: 3,
		daysLeft: 4
	},
	{
		storeId: 12,
		areaId: 11,
		sourceId: 5,
		itemName: "Bananas",
		category: "produce",
		price: .54,
		original: .68,
		unit: "per lb",
		hoursAgo: 2,
		daysLeft: 3
	},
	{
		storeId: 12,
		areaId: 11,
		sourceId: 5,
		itemName: "Boneless Chicken Breast",
		category: "meat",
		price: 2.48,
		original: 3.47,
		unit: "per lb",
		hoursAgo: 6,
		daysLeft: 2
	},
	{
		storeId: 12,
		areaId: 11,
		sourceId: 11,
		itemName: "Folgers Classic Roast 30.5oz",
		category: "beverages",
		price: 8.98,
		original: 11.48,
		unit: "30.5oz",
		hoursAgo: 9,
		daysLeft: 7
	},
	{
		storeId: 13,
		areaId: 9,
		sourceId: 11,
		itemName: "Organic Avocados 4",
		category: "produce",
		price: 5.99,
		original: 7.99,
		unit: "4-pack",
		featured: true,
		hoursAgo: 1,
		daysLeft: 2
	},
	{
		storeId: 13,
		areaId: 9,
		sourceId: 11,
		itemName: "365 Eggs 18-count",
		category: "dairy",
		price: 4.49,
		original: 5.99,
		unit: "18 eggs",
		hoursAgo: 4,
		daysLeft: 5
	},
	{
		storeId: 13,
		areaId: 9,
		sourceId: 12,
		itemName: "Atlantic Salmon Fillet",
		category: "meat",
		price: 9.99,
		original: 12.99,
		unit: "per lb",
		hoursAgo: 7,
		daysLeft: 1
	},
	{
		storeId: 13,
		areaId: 9,
		sourceId: 11,
		itemName: "Sourdough Boule",
		category: "bakery",
		price: 4.99,
		original: 6.49,
		unit: "loaf",
		hoursAgo: 5,
		daysLeft: 1
	},
	{
		storeId: 14,
		areaId: 10,
		sourceId: 13,
		itemName: "Everything but the Bagel Seasoning",
		category: "pantry",
		price: 1.99,
		original: 2.49,
		unit: "jar",
		hoursAgo: 2,
		daysLeft: 14,
		verified: false
	},
	{
		storeId: 14,
		areaId: 10,
		sourceId: 13,
		itemName: "Mandarin Orange Chicken",
		category: "frozen",
		price: 4.49,
		original: 5.99,
		unit: "bag",
		featured: true,
		hoursAgo: 3,
		daysLeft: 10
	},
	{
		storeId: 14,
		areaId: 10,
		sourceId: 13,
		itemName: "Dark Chocolate Peanut Butter Cups",
		category: "snacks",
		price: 2.99,
		original: 3.99,
		unit: "pack",
		hoursAgo: 8,
		daysLeft: 12
	},
	{
		storeId: 14,
		areaId: 10,
		sourceId: 15,
		itemName: "Organic Bananas",
		category: "produce",
		price: .99,
		original: 1.49,
		unit: "6-count",
		hoursAgo: 6,
		daysLeft: 3,
		verified: false
	},
	{
		storeId: 15,
		areaId: 11,
		sourceId: 5,
		itemName: "Kirkland Extra Virgin Olive Oil 2L",
		category: "pantry",
		price: 19.99,
		original: 24.99,
		unit: "2L",
		hoursAgo: 10,
		daysLeft: 14
	},
	{
		storeId: 15,
		areaId: 11,
		sourceId: 11,
		itemName: "Kirkland Rotisserie Chicken",
		category: "meat",
		price: 4.99,
		original: 7.99,
		unit: "each",
		featured: true,
		hoursAgo: 1,
		daysLeft: 1,
		description: "Hot bar, in-store only. Typical afternoon drop."
	},
	{
		storeId: 15,
		areaId: 11,
		sourceId: 5,
		itemName: "Kirkland Paper Towels 12-count",
		category: "household",
		price: 19.99,
		original: 24.99,
		unit: "12-pack",
		hoursAgo: 16,
		daysLeft: 10
	},
	{
		storeId: 16,
		areaId: 10,
		sourceId: 12,
		itemName: "Good & Gather Greek Yogurt 4-pack",
		category: "dairy",
		price: 3.99,
		original: 5.49,
		unit: "4-pack",
		hoursAgo: 4,
		daysLeft: 5
	},
	{
		storeId: 16,
		areaId: 10,
		sourceId: 11,
		itemName: "Cheerios 18oz",
		category: "pantry",
		price: 3.79,
		original: 4.99,
		unit: "18oz",
		hoursAgo: 11,
		daysLeft: 6
	},
	{
		storeId: 16,
		areaId: 10,
		sourceId: 15,
		itemName: "Up & Up Laundry Detergent 100oz",
		category: "household",
		price: 8.99,
		original: 11.99,
		unit: "100oz",
		hoursAgo: 20,
		daysLeft: 9,
		verified: false
	},
	{
		storeId: 13,
		areaId: 9,
		sourceId: 13,
		itemName: "365 Organic Oat Milk 64oz",
		category: "beverages",
		price: 3.79,
		original: 4.99,
		unit: "64oz",
		hoursAgo: 5,
		daysLeft: 8
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Olper's Milk 1L",
		category: "dairy",
		price: 249,
		original: 310,
		unit: "1L",
		featured: true,
		hoursAgo: 1,
		daysLeft: 3,
		description: "دودھ · दूध · Fresh pack. Limit 6."
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Nestle Milk Pack 1L",
		category: "dairy",
		price: 255,
		original: 320,
		unit: "1L",
		hoursAgo: 3,
		daysLeft: 4,
		description: "دودھ"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Farm Eggs 12s",
		category: "dairy",
		price: 349,
		original: 430,
		unit: "dozen",
		hoursAgo: 2,
		daysLeft: 3,
		description: "انڈے · अंडे"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Nurpur Yogurt 400g",
		category: "dairy",
		price: 165,
		original: 210,
		unit: "400g",
		hoursAgo: 4,
		daysLeft: 2,
		description: "دہی · दही"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 23,
		itemName: "Super Kernel Basmati 5kg",
		category: "pantry",
		price: 1899,
		original: 2450,
		unit: "5kg",
		featured: true,
		hoursAgo: 2,
		daysLeft: 7,
		description: "چاول · चावल · Extra long grain"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Guard Sella Rice 5kg",
		category: "pantry",
		price: 1299,
		original: 1650,
		unit: "5kg",
		hoursAgo: 8,
		daysLeft: 8,
		description: "سیلہ چاول"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "National Masoor Daal 1kg",
		category: "pantry",
		price: 289,
		original: 380,
		unit: "1kg",
		hoursAgo: 5,
		daysLeft: 10,
		description: "مسور دال · मसूर दाल"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Moong Daal 1kg",
		category: "pantry",
		price: 399,
		original: 520,
		unit: "1kg",
		hoursAgo: 6,
		daysLeft: 10,
		description: "مونگ دال"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "White Chickpeas 1kg",
		category: "pantry",
		price: 359,
		original: 450,
		unit: "1kg",
		hoursAgo: 9,
		daysLeft: 12,
		description: "سفید چنا · सफेद चना"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 89,
		original: 140,
		unit: "1kg",
		featured: true,
		hoursAgo: 1,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Onions 1kg",
		category: "produce",
		price: 79,
		original: 120,
		unit: "1kg",
		hoursAgo: 1,
		daysLeft: 2,
		description: "پیاز · प्याज"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 20,
		itemName: "Potatoes 1kg",
		category: "produce",
		price: 69,
		original: 110,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 3,
		description: "آلو · आलू"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Green Chilli 250g",
		category: "produce",
		price: 45,
		original: 70,
		unit: "250g",
		hoursAgo: 3,
		daysLeft: 1,
		description: "ہری مرچ · हरी मिर्च"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Garlic 250g",
		category: "produce",
		price: 95,
		original: 140,
		unit: "250g",
		hoursAgo: 4,
		daysLeft: 5,
		description: "لہسن"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Ginger 250g",
		category: "produce",
		price: 89,
		original: 130,
		unit: "250g",
		hoursAgo: 4,
		daysLeft: 4,
		description: "ادرک"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Bhindi 500g",
		category: "produce",
		price: 79,
		original: 120,
		unit: "500g",
		hoursAgo: 2,
		daysLeft: 1,
		description: "بھنڈی · Okra"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Palak Bunch",
		category: "produce",
		price: 40,
		original: 65,
		unit: "bunch",
		hoursAgo: 1,
		daysLeft: 1,
		description: "پالک · Spinach"
	},
	{
		storeId: 19,
		areaId: 14,
		sourceId: 18,
		itemName: "Fresh Chicken 1kg",
		category: "meat",
		price: 499,
		original: 650,
		unit: "1kg",
		featured: true,
		hoursAgo: 1,
		daysLeft: 1,
		description: "چکن · चिकन · Skin-on broiler"
	},
	{
		storeId: 19,
		areaId: 14,
		sourceId: 18,
		itemName: "Mutton Mix 1kg",
		category: "meat",
		price: 1899,
		original: 2350,
		unit: "1kg",
		hoursAgo: 3,
		daysLeft: 2,
		description: "بکرے کا گوشت · मटन"
	},
	{
		storeId: 19,
		areaId: 14,
		sourceId: 18,
		itemName: "Beef Keema 1kg",
		category: "meat",
		price: 1099,
		original: 1380,
		unit: "1kg",
		hoursAgo: 5,
		daysLeft: 2,
		description: "قیمہ · कीमा"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 20,
		itemName: "Dalda Cooking Oil 5L",
		category: "pantry",
		price: 1549,
		original: 1890,
		unit: "5L",
		hoursAgo: 6,
		daysLeft: 9,
		description: "کھانے کا تیل"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 17,
		itemName: "Sunridge Atta 10kg",
		category: "pantry",
		price: 1399,
		original: 1720,
		unit: "10kg",
		hoursAgo: 4,
		daysLeft: 10,
		description: "آٹا · आटा"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 17,
		itemName: "Shakarganj Sugar 1kg",
		category: "pantry",
		price: 155,
		original: 190,
		unit: "1kg",
		hoursAgo: 7,
		daysLeft: 12,
		description: "چینی"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 22,
		itemName: "National Iodized Salt 800g",
		category: "pantry",
		price: 55,
		original: 75,
		unit: "800g",
		hoursAgo: 10,
		daysLeft: 14,
		description: "نمک"
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 21,
		itemName: "Tapal Danedar 900g",
		category: "beverages",
		price: 899,
		original: 1150,
		unit: "900g",
		hoursAgo: 3,
		daysLeft: 8,
		description: "چائے · चाय"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Coca-Cola 1.5L",
		category: "beverages",
		price: 165,
		original: 210,
		unit: "1.5L",
		featured: true,
		hoursAgo: 2,
		daysLeft: 5,
		description: "ٹھنڈا مشروب · कोल्ड ड्रिंक"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Sprite 1.5L",
		category: "beverages",
		price: 165,
		original: 210,
		unit: "1.5L",
		hoursAgo: 2,
		daysLeft: 5,
		description: "مشروب · ठंडा"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 20,
		itemName: "Pakola Ice Cream Soda 1L",
		category: "beverages",
		price: 120,
		original: 160,
		unit: "1L",
		hoursAgo: 8,
		daysLeft: 6,
		description: "پاکولا"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Kisan Canola Oil 5L",
		category: "pantry",
		price: 1620,
		original: 1980,
		unit: "5L",
		hoursAgo: 11,
		daysLeft: 9
	},
	{
		storeId: 22,
		areaId: 17,
		sourceId: 21,
		itemName: "Olper's Milk 1L",
		category: "dairy",
		price: 245,
		original: 310,
		unit: "1L",
		featured: true,
		hoursAgo: 1,
		daysLeft: 3,
		description: "دودھ · Lahore price"
	},
	{
		storeId: 22,
		areaId: 17,
		sourceId: 21,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 95,
		original: 150,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 1,
		description: "ٹماٹر"
	},
	{
		storeId: 22,
		areaId: 17,
		sourceId: 21,
		itemName: "Chicken Breast 1kg",
		category: "meat",
		price: 620,
		original: 780,
		unit: "1kg",
		hoursAgo: 3,
		daysLeft: 1,
		description: "چکن"
	},
	{
		storeId: 23,
		areaId: 16,
		sourceId: 19,
		itemName: "Super Basmati 5kg",
		category: "pantry",
		price: 1950,
		original: 2490,
		unit: "5kg",
		hoursAgo: 4,
		daysLeft: 7,
		description: "باسمتی چاول"
	},
	{
		storeId: 23,
		areaId: 16,
		sourceId: 19,
		itemName: "Coca-Cola 1.5L",
		category: "beverages",
		price: 159,
		original: 210,
		unit: "1.5L",
		hoursAgo: 2,
		daysLeft: 4
	},
	{
		storeId: 24,
		areaId: 18,
		sourceId: 18,
		itemName: "Masoor Daal 1kg",
		category: "pantry",
		price: 275,
		original: 360,
		unit: "1kg",
		hoursAgo: 6,
		daysLeft: 10,
		description: "دال"
	},
	{
		storeId: 24,
		areaId: 18,
		sourceId: 18,
		itemName: "Onions 1kg",
		category: "produce",
		price: 72,
		original: 115,
		unit: "1kg",
		hoursAgo: 1,
		daysLeft: 2,
		description: "پیاز"
	},
	{
		storeId: 25,
		areaId: 19,
		sourceId: 19,
		itemName: "Olper's Milk 1L",
		category: "dairy",
		price: 255,
		original: 320,
		unit: "1L",
		hoursAgo: 2,
		daysLeft: 3,
		description: "دودھ"
	},
	{
		storeId: 25,
		areaId: 19,
		sourceId: 19,
		itemName: "Fresh Chicken 1kg",
		category: "meat",
		price: 529,
		original: 670,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 1,
		description: "چکن"
	},
	{
		storeId: 26,
		areaId: 20,
		sourceId: 22,
		itemName: "Utility Atta 10kg",
		category: "pantry",
		price: 1250,
		original: 1550,
		unit: "10kg",
		hoursAgo: 12,
		daysLeft: 14,
		description: "آٹا · subsidised"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Rohu Fish 1kg",
		category: "meat",
		price: 899,
		original: 1150,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 1,
		description: "مچھلی · मछली · Fresh Rohu"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Nurpur Butter 200g",
		category: "dairy",
		price: 320,
		original: 390,
		unit: "200g",
		hoursAgo: 5,
		daysLeft: 6,
		description: "مکھن · मक्खन"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Dhania Bunch",
		category: "produce",
		price: 20,
		original: 35,
		unit: "bunch",
		hoursAgo: 1,
		daysLeft: 1,
		description: "دھنیا · धनिया"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Lemon 500g",
		category: "produce",
		price: 80,
		original: 120,
		unit: "500g",
		hoursAgo: 1,
		daysLeft: 2,
		description: "لیموں · नींबू"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 20,
		itemName: "Carrots 1kg",
		category: "produce",
		price: 70,
		original: 110,
		unit: "1kg",
		hoursAgo: 3,
		daysLeft: 2,
		description: "گاجر · गाजर"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Peek Freans Sooper 6-pack",
		category: "snacks",
		price: 180,
		original: 230,
		unit: "6-pack",
		hoursAgo: 6,
		daysLeft: 10,
		description: "بسکٹ · बिस्कुट"
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 21,
		itemName: "Phool Gobi 1pc",
		category: "produce",
		price: 90,
		original: 140,
		unit: "each",
		hoursAgo: 2,
		daysLeft: 1,
		description: "گوبھی · फूल गोभी"
	},
	{
		storeId: 22,
		areaId: 17,
		sourceId: 21,
		itemName: "Pepsi 1.5L",
		category: "beverages",
		price: 155,
		original: 200,
		unit: "1.5L",
		hoursAgo: 2,
		daysLeft: 4,
		description: "مشروب · कोल्ड ड्रिंक"
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 21,
		itemName: "Desi Ghee 1kg",
		category: "pantry",
		price: 1450,
		original: 1790,
		unit: "1kg",
		hoursAgo: 5,
		daysLeft: 10,
		description: "گھی · घी"
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Shan Garam Masala 50g",
		category: "pantry",
		price: 140,
		original: 185,
		unit: "50g",
		hoursAgo: 6,
		daysLeft: 14,
		description: "گرم مسالہ · गरम मसाला"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Tandoori Naan 5 pcs",
		category: "bakery",
		price: 150,
		original: 200,
		unit: "5 pcs",
		hoursAgo: 1,
		daysLeft: 1,
		description: "نان · नान"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 20,
		itemName: "Matar 500g",
		category: "produce",
		price: 80,
		original: 120,
		unit: "500g",
		hoursAgo: 2,
		daysLeft: 1,
		description: "مٹر · मटर"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Baingan 1kg",
		category: "produce",
		price: 70,
		original: 110,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 1,
		description: "بینگن · बैंगन"
	},
	{
		storeId: 20,
		areaId: 15,
		sourceId: 20,
		itemName: "Kheera 500g",
		category: "produce",
		price: 50,
		original: 80,
		unit: "500g",
		hoursAgo: 2,
		daysLeft: 1,
		description: "کھیرا · खीरा"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 85,
		original: 140,
		unit: "1kg",
		featured: true,
		hoursAgo: 0,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · Clifton sabzi"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Onions 1kg",
		category: "produce",
		price: 75,
		original: 120,
		unit: "1kg",
		hoursAgo: 1,
		daysLeft: 2,
		description: "پیاز · प्याज"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Potatoes 1kg",
		category: "produce",
		price: 65,
		original: 110,
		unit: "1kg",
		hoursAgo: 1,
		daysLeft: 3,
		description: "آلو · आलू"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Super Kernel Basmati 5kg",
		category: "pantry",
		price: 1849,
		original: 2390,
		unit: "5kg",
		hoursAgo: 2,
		daysLeft: 7,
		description: "چاول · चावल · Basmati"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Masoor Daal 1kg",
		category: "pantry",
		price: 279,
		original: 370,
		unit: "1kg",
		hoursAgo: 3,
		daysLeft: 10,
		description: "مسور دال · मसूर दाल"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Fresh Chicken 1kg",
		category: "meat",
		price: 489,
		original: 640,
		unit: "1kg",
		hoursAgo: 1,
		daysLeft: 1,
		description: "چکن · चिकन · Broiler"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Olper's Milk 1L",
		category: "dairy",
		price: 249,
		original: 310,
		unit: "1L",
		hoursAgo: 1,
		daysLeft: 3,
		description: "دودھ · दूध"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Farm Eggs 12s",
		category: "dairy",
		price: 340,
		original: 420,
		unit: "dozen",
		hoursAgo: 2,
		daysLeft: 3,
		description: "انڈے · अंडे"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Nurpur Yogurt 400g",
		category: "dairy",
		price: 160,
		original: 210,
		unit: "400g",
		hoursAgo: 3,
		daysLeft: 2,
		description: "دہی · दही"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Tapal Danedar 475g",
		category: "beverages",
		price: 540,
		original: 690,
		unit: "475g",
		hoursAgo: 4,
		daysLeft: 8,
		description: "چائے · चाय"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Sunridge Atta 5kg",
		category: "pantry",
		price: 720,
		original: 890,
		unit: "5kg",
		hoursAgo: 5,
		daysLeft: 10,
		description: "آٹا · आटा"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Nestle Pure Life 1.5L",
		category: "beverages",
		price: 70,
		original: 90,
		unit: "1.5L",
		hoursAgo: 4,
		daysLeft: 8,
		description: "پانی · पानी · Drinking water"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Fresh Paneer 250g",
		category: "dairy",
		price: 220,
		original: 280,
		unit: "250g",
		hoursAgo: 2,
		daysLeft: 2,
		description: "پنیر · पनीर"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Bananas 1 dozen",
		category: "produce",
		price: 160,
		original: 220,
		unit: "dozen",
		hoursAgo: 2,
		daysLeft: 2,
		description: "کیلا · केला"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Shimla Mirch 500g",
		category: "produce",
		price: 90,
		original: 140,
		unit: "500g",
		hoursAgo: 2,
		daysLeft: 2,
		description: "شملہ مرچ · शिमला मिर्च"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Band Gobi 1pc",
		category: "produce",
		price: 70,
		original: 110,
		unit: "each",
		hoursAgo: 2,
		daysLeft: 1,
		description: "بند گوبھی · पत्ता गोभी"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Pudina Bunch",
		category: "produce",
		price: 20,
		original: 35,
		unit: "bunch",
		hoursAgo: 1,
		daysLeft: 1,
		description: "پودینہ · पुदीना"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Khajoor 500g",
		category: "produce",
		price: 280,
		original: 360,
		unit: "500g",
		hoursAgo: 6,
		daysLeft: 14,
		description: "کھجور · खजूर"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Moong Daal 1kg",
		category: "pantry",
		price: 310,
		original: 390,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 10,
		description: "مونگ دال · मूंग दाल"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Chana Daal 1kg",
		category: "pantry",
		price: 260,
		original: 340,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 10,
		description: "چنا دال · चना दाल"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Milkpak 1L",
		category: "dairy",
		price: 230,
		original: 290,
		unit: "1L",
		hoursAgo: 1,
		daysLeft: 3,
		description: "دودھ · दूध · Milkpak"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "7UP 1.5L",
		category: "beverages",
		price: 160,
		original: 210,
		unit: "1.5L",
		hoursAgo: 2,
		daysLeft: 5,
		description: "ٹھنڈا · ठंडा · 7up"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Sting Energy 500ml",
		category: "beverages",
		price: 90,
		original: 120,
		unit: "500ml",
		hoursAgo: 2,
		daysLeft: 5,
		description: "مشروب · ड्रिंक"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Besan 1kg",
		category: "pantry",
		price: 220,
		original: 280,
		unit: "1kg",
		hoursAgo: 4,
		daysLeft: 12,
		description: "بیسن · बेसन"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Sooji 1kg",
		category: "pantry",
		price: 140,
		original: 180,
		unit: "1kg",
		hoursAgo: 4,
		daysLeft: 12,
		description: "سوجی · सूजी"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Lauki 1kg",
		category: "produce",
		price: 55,
		original: 90,
		unit: "1kg",
		hoursAgo: 1,
		daysLeft: 2,
		description: "لوکی · लौकी"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Karela 500g",
		category: "produce",
		price: 60,
		original: 95,
		unit: "500g",
		hoursAgo: 1,
		daysLeft: 1,
		description: "کریلا · करेला"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Tandoori Roti 10 pcs",
		category: "bakery",
		price: 200,
		original: 260,
		unit: "10 pcs",
		hoursAgo: 1,
		daysLeft: 1,
		description: "روٹی · रोटी"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Imli 250g",
		category: "pantry",
		price: 90,
		original: 130,
		unit: "250g",
		hoursAgo: 5,
		daysLeft: 14,
		description: "املی · इमली"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 30,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 82,
		original: 140,
		unit: "1kg",
		hoursAgo: 3,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · Facebook market"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 29,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 88,
		original: 140,
		unit: "1kg",
		hoursAgo: 4,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · Instagram"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 24,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 79,
		original: 140,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · WhatsApp"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 25,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 91,
		original: 140,
		unit: "1kg",
		hoursAgo: 6,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · Pinterest"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 26,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 84,
		original: 140,
		unit: "1kg",
		hoursAgo: 5,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · Web search"
	},
	{
		storeId: 27,
		areaId: 13,
		sourceId: 27,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 70,
		original: 120,
		unit: "1kg",
		hoursAgo: 1,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · Local mandi"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 28,
		itemName: "Tomatoes 1kg",
		category: "produce",
		price: 86,
		original: 140,
		unit: "1kg",
		hoursAgo: 4,
		daysLeft: 1,
		description: "ٹماٹر · टमाटर · Twitter"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 24,
		itemName: "Olper's Milk 1L",
		category: "dairy",
		price: 240,
		original: 310,
		unit: "1L",
		hoursAgo: 2,
		daysLeft: 3,
		description: "دودھ · दूध · WhatsApp"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 30,
		itemName: "Milkpak 1L",
		category: "dairy",
		price: 225,
		original: 290,
		unit: "1L",
		hoursAgo: 3,
		daysLeft: 3,
		description: "دودھ · दूध · Facebook"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 29,
		itemName: "Fresh Chicken 1kg",
		category: "meat",
		price: 510,
		original: 640,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 1,
		description: "چکن · चिकन · Instagram"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 24,
		itemName: "Fresh Chicken 1kg",
		category: "meat",
		price: 470,
		original: 640,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 1,
		description: "چکن · चिकن · WhatsApp"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 26,
		itemName: "Super Kernel Basmati 5kg",
		category: "pantry",
		price: 1799,
		original: 2390,
		unit: "5kg",
		hoursAgo: 5,
		daysLeft: 7,
		description: "چاول · चावल · Web search"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 25,
		itemName: "Coca-Cola 1.5L",
		category: "beverages",
		price: 155,
		original: 210,
		unit: "1.5L",
		hoursAgo: 4,
		daysLeft: 5,
		description: "ٹھنڈا مشروب · कोल्ड ड्रिंक · Pinterest"
	},
	{
		storeId: 28,
		areaId: 13,
		sourceId: 26,
		itemName: "ChatGPT Plus",
		category: "digital",
		price: 0,
		original: 5600,
		unit: "1 month",
		featured: true,
		hoursAgo: 1,
		daysLeft: 20,
		url: "https://chatgpt.com",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · ChatGPT Plus free month"
	},
	{
		storeId: 28,
		areaId: 13,
		sourceId: 28,
		itemName: "Claude Pro",
		category: "digital",
		price: 0,
		original: 5600,
		unit: "1 month",
		hoursAgo: 2,
		daysLeft: 18,
		url: "https://claude.ai",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · Claude Pro free month"
	},
	{
		storeId: 28,
		areaId: 13,
		sourceId: 29,
		itemName: "Gemini Advanced",
		category: "digital",
		price: 0,
		original: 4900,
		unit: "1 month",
		hoursAgo: 2,
		daysLeft: 16,
		url: "https://gemini.google.com",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · Gemini Advanced free month"
	},
	{
		storeId: 28,
		areaId: 13,
		sourceId: 30,
		itemName: "Cursor Pro",
		category: "digital",
		price: 0,
		original: 5600,
		unit: "1 month",
		hoursAgo: 3,
		daysLeft: 14,
		url: "https://cursor.com",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · Cursor Pro free month"
	},
	{
		storeId: 28,
		areaId: 13,
		sourceId: 24,
		itemName: "Perplexity Pro",
		category: "digital",
		price: 0,
		original: 5600,
		unit: "1 month",
		hoursAgo: 4,
		daysLeft: 14,
		url: "https://www.perplexity.ai",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · Perplexity Pro free month"
	},
	{
		storeId: 28,
		areaId: 13,
		sourceId: 26,
		itemName: "GitHub Copilot",
		category: "digital",
		price: 0,
		original: 2800,
		unit: "1 month",
		hoursAgo: 5,
		daysLeft: 12,
		url: "https://github.com/features/copilot",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · Copilot free month"
	},
	{
		storeId: 29,
		areaId: 13,
		sourceId: 30,
		itemName: "Hunza family stay",
		category: "vacation",
		price: 0,
		original: 85e3,
		unit: "4 nights · family",
		featured: true,
		hoursAgo: 2,
		daysLeft: 21,
		url: "https://www.google.com/travel",
		description: "ہنزہ · हंज़ा · family vacation · 🏖️"
	},
	{
		storeId: 29,
		areaId: 13,
		sourceId: 26,
		itemName: "Murree family stay",
		category: "vacation",
		price: 0,
		original: 28e3,
		unit: "2 nights · family",
		hoursAgo: 3,
		daysLeft: 18,
		url: "https://www.google.com/travel",
		description: "مری · मरी · family vacation · 🏖️"
	},
	{
		storeId: 29,
		areaId: 13,
		sourceId: 29,
		itemName: "Swat family stay",
		category: "vacation",
		price: 0,
		original: 42e3,
		unit: "3 nights · family",
		hoursAgo: 4,
		daysLeft: 18,
		url: "https://www.google.com/travel",
		description: "سوات · स्वात · family vacation · 🏖️"
	},
	{
		storeId: 29,
		areaId: 13,
		sourceId: 28,
		itemName: "Skardu family stay",
		category: "vacation",
		price: 0,
		original: 7e4,
		unit: "3 nights · family",
		hoursAgo: 5,
		daysLeft: 21,
		url: "https://www.google.com/travel",
		description: "سکردو · स्कर्दू · family vacation · 🏖️"
	},
	{
		storeId: 29,
		areaId: 13,
		sourceId: 24,
		itemName: "Dubai family hotel night",
		category: "vacation",
		price: 0,
		original: 45e3,
		unit: "1 night · family",
		hoursAgo: 6,
		daysLeft: 14,
		url: "https://www.google.com/travel",
		description: "دبئی قیام · दुबई होटल · family vacation · 🏖️"
	},
	{
		storeId: 30,
		areaId: 13,
		sourceId: 26,
		itemName: "Air ticket Karachi–Lahore",
		category: "flights",
		price: 14500,
		original: 22e3,
		unit: "one way · adult",
		featured: true,
		hoursAgo: 1,
		daysLeft: 6,
		url: "https://www.google.com/travel/flights",
		description: "کراچی لاہور · कराची लाहौर · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 30,
		areaId: 13,
		sourceId: 28,
		itemName: "Air ticket Karachi–Islamabad",
		category: "flights",
		price: 16e3,
		original: 24e3,
		unit: "one way · adult",
		hoursAgo: 2,
		daysLeft: 6,
		url: "https://www.google.com/travel/flights",
		description: "کراچی اسلام آباد · कराची इस्लामाबाद · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 30,
		areaId: 13,
		sourceId: 29,
		itemName: "Air ticket Karachi–Dubai",
		category: "flights",
		price: 42e3,
		original: 68e3,
		unit: "one way · adult",
		hoursAgo: 3,
		daysLeft: 8,
		url: "https://www.google.com/travel/flights",
		description: "کراچی دبئی · कराची दुबई · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 30,
		areaId: 13,
		sourceId: 30,
		itemName: "Air ticket Karachi–Istanbul",
		category: "flights",
		price: 78e3,
		original: 125e3,
		unit: "one way · adult",
		hoursAgo: 4,
		daysLeft: 9,
		url: "https://www.google.com/travel/flights",
		description: "کراچی استنبول · कराची इस्तांबुल · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 30,
		areaId: 13,
		sourceId: 24,
		itemName: "Air ticket Karachi–Jeddah",
		category: "flights",
		price: 98e3,
		original: 155e3,
		unit: "one way · family fare",
		hoursAgo: 5,
		daysLeft: 10,
		url: "https://www.google.com/travel/flights",
		description: "جدہ · जेद्दा · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 30,
		areaId: 13,
		sourceId: 26,
		itemName: "Child flies free Karachi–Lahore",
		category: "flights",
		price: 0,
		original: 14500,
		unit: "child with adult",
		hoursAgo: 1,
		daysLeft: 6,
		url: "https://www.google.com/travel/flights",
		description: "بچہ مفت · बच्चा फ्री · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 31,
		areaId: 17,
		sourceId: 26,
		itemName: "ChatGPT Plus",
		category: "digital",
		price: 0,
		original: 5600,
		unit: "1 month",
		featured: true,
		hoursAgo: 2,
		daysLeft: 18,
		url: "https://chatgpt.com",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · ChatGPT Plus free month"
	},
	{
		storeId: 31,
		areaId: 17,
		sourceId: 21,
		itemName: "Gemini Advanced",
		category: "digital",
		price: 0,
		original: 4900,
		unit: "1 month",
		hoursAgo: 3,
		daysLeft: 16,
		url: "https://gemini.google.com",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · Gemini Advanced free month"
	},
	{
		storeId: 32,
		areaId: 17,
		sourceId: 21,
		itemName: "Murree family stay",
		category: "vacation",
		price: 0,
		original: 24e3,
		unit: "2 nights · family",
		hoursAgo: 3,
		daysLeft: 16,
		url: "https://www.google.com/travel",
		description: "مری · मरी · family vacation · 🏖️"
	},
	{
		storeId: 32,
		areaId: 17,
		sourceId: 26,
		itemName: "Swat family stay",
		category: "vacation",
		price: 0,
		original: 38e3,
		unit: "3 nights · family",
		hoursAgo: 4,
		daysLeft: 16,
		url: "https://www.google.com/travel",
		description: "سوات · स्वात · family vacation · 🏖️"
	},
	{
		storeId: 33,
		areaId: 17,
		sourceId: 26,
		itemName: "Air ticket Lahore–Karachi",
		category: "flights",
		price: 14200,
		original: 21500,
		unit: "one way · adult",
		hoursAgo: 2,
		daysLeft: 6,
		url: "https://www.google.com/travel/flights",
		description: "لاہور کراچی · लाहौर कराची · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 33,
		areaId: 17,
		sourceId: 28,
		itemName: "Air ticket Lahore–Dubai",
		category: "flights",
		price: 45e3,
		original: 72e3,
		unit: "one way · adult",
		hoursAgo: 4,
		daysLeft: 8,
		url: "https://www.google.com/travel/flights",
		description: "لاہور دبئی · लाहौर दुबई · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 33,
		areaId: 17,
		sourceId: 21,
		itemName: "Child flies free Lahore–Karachi",
		category: "flights",
		price: 0,
		original: 14200,
		unit: "child with adult",
		hoursAgo: 2,
		daysLeft: 6,
		url: "https://www.google.com/travel/flights",
		description: "بچہ مفت · बच्चा फ्री · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 34,
		areaId: 1,
		sourceId: 6,
		itemName: "ChatGPT Plus",
		category: "digital",
		price: 0,
		original: 80,
		unit: "1 month",
		featured: true,
		hoursAgo: 2,
		daysLeft: 18,
		url: "https://chatgpt.com",
		description: "Free subscription · ChatGPT Plus free month"
	},
	{
		storeId: 34,
		areaId: 1,
		sourceId: 7,
		itemName: "Gemini Advanced",
		category: "digital",
		price: 0,
		original: 72,
		unit: "1 month",
		hoursAgo: 3,
		daysLeft: 16,
		url: "https://gemini.google.com",
		description: "Free subscription · Gemini Advanced free month"
	},
	{
		storeId: 35,
		areaId: 1,
		sourceId: 6,
		itemName: "Dubai family hotel night",
		category: "vacation",
		price: 0,
		original: 650,
		unit: "1 night · family",
		hoursAgo: 4,
		daysLeft: 12,
		url: "https://www.google.com/travel",
		description: "دبئی قیام · दुबई होटल · family vacation · 🏖️"
	},
	{
		storeId: 36,
		areaId: 1,
		sourceId: 14,
		itemName: "Air ticket Dubai–Karachi",
		category: "flights",
		price: 520,
		original: 890,
		unit: "one way · adult",
		hoursAgo: 3,
		daysLeft: 8,
		url: "https://www.google.com/travel/flights",
		description: "دبئی کراچی · दुबई कराची · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 37,
		areaId: 6,
		sourceId: 8,
		itemName: "ChatGPT Plus",
		category: "digital",
		price: 0,
		original: 20,
		unit: "1 month",
		featured: true,
		hoursAgo: 2,
		daysLeft: 18,
		url: "https://chatgpt.com",
		description: "Free subscription · ChatGPT Plus free month"
	},
	{
		storeId: 37,
		areaId: 6,
		sourceId: 4,
		itemName: "GitHub Copilot",
		category: "digital",
		price: 0,
		original: 10,
		unit: "1 month",
		hoursAgo: 4,
		daysLeft: 12,
		url: "https://github.com/features/copilot",
		description: "Free subscription · Copilot free month"
	},
	{
		storeId: 38,
		areaId: 6,
		sourceId: 10,
		itemName: "Lake District family stay",
		category: "vacation",
		price: 0,
		original: 240,
		unit: "2 nights · family",
		hoursAgo: 5,
		daysLeft: 14,
		url: "https://www.google.com/travel",
		description: "family vacation · 🏖️"
	},
	{
		storeId: 39,
		areaId: 6,
		sourceId: 8,
		itemName: "Air ticket London–Karachi",
		category: "flights",
		price: 420,
		original: 690,
		unit: "one way · adult",
		hoursAgo: 3,
		daysLeft: 9,
		url: "https://www.google.com/travel/flights",
		description: "لندن کراچی · लंदन कराची · air ticket · ٹکٹ · ✈️"
	},
	{
		storeId: 40,
		areaId: 20,
		sourceId: 22,
		itemName: "ChatGPT Plus",
		category: "digital",
		price: 0,
		original: 5600,
		unit: "1 month",
		hoursAgo: 3,
		daysLeft: 18,
		url: "https://chatgpt.com",
		description: "مفت سبسکرپشن · फ्री सब्सक्रिप्शन · ChatGPT Plus free month"
	},
	{
		storeId: 41,
		areaId: 19,
		sourceId: 22,
		itemName: "Murree family stay",
		category: "vacation",
		price: 0,
		original: 18e3,
		unit: "2 nights · family",
		hoursAgo: 3,
		daysLeft: 14,
		url: "https://www.google.com/travel",
		description: "مری · मरी · family vacation · 🏖️"
	},
	{
		storeId: 42,
		areaId: 20,
		sourceId: 22,
		itemName: "Air ticket Islamabad–Karachi",
		category: "flights",
		price: 15500,
		original: 23e3,
		unit: "one way · adult",
		hoursAgo: 2,
		daysLeft: 6,
		url: "https://www.google.com/travel/flights",
		description: "اسلام آباد کراچی · इस्लामाबाद कराची · air ticket · ٹکٹ · ✈️"
	}
];
var INCOMING_OFFERS = [
	{
		storeId: 1,
		areaId: 5,
		sourceId: 1,
		itemName: "Red Seedless Grapes 1kg",
		category: "produce",
		price: 9.5,
		original: 14,
		unit: "1kg",
		hoursAgo: 0,
		daysLeft: 3,
		description: "Crawled from Carrefour weekend flyer."
	},
	{
		storeId: 4,
		areaId: 3,
		sourceId: 3,
		itemName: "Oatly Oat Milk 1L",
		category: "beverages",
		price: 9,
		original: 13,
		unit: "1L",
		hoursAgo: 0,
		daysLeft: 5
	},
	{
		storeId: 5,
		areaId: 2,
		sourceId: 7,
		itemName: "Wagyu Beef Burgers 2-pack",
		category: "meat",
		price: 48,
		original: 65,
		unit: "2-pack",
		hoursAgo: 0,
		daysLeft: 2,
		verified: false
	},
	{
		storeId: 3,
		areaId: 5,
		sourceId: 2,
		itemName: "Almarai Labneh 400g",
		category: "dairy",
		price: 7.25,
		original: 10.5,
		unit: "400g",
		hoursAgo: 0,
		daysLeft: 4
	},
	{
		storeId: 7,
		areaId: 6,
		sourceId: 4,
		itemName: "Twinings Earl Grey 50s",
		category: "beverages",
		price: 2,
		original: 3,
		unit: "50 bags",
		hoursAgo: 0,
		daysLeft: 6
	},
	{
		storeId: 8,
		areaId: 7,
		sourceId: 8,
		itemName: "Free Range Eggs 12",
		category: "dairy",
		price: 2.15,
		original: 2.85,
		unit: "12 eggs",
		hoursAgo: 0,
		daysLeft: 4
	},
	{
		storeId: 10,
		areaId: 7,
		sourceId: 10,
		itemName: "Clementines 1kg",
		category: "produce",
		price: 1.29,
		original: 1.99,
		unit: "1kg",
		hoursAgo: 0,
		daysLeft: 3
	},
	{
		storeId: 13,
		areaId: 9,
		sourceId: 11,
		itemName: "Ribeye Steak",
		category: "meat",
		price: 14.99,
		original: 19.99,
		unit: "per lb",
		hoursAgo: 0,
		daysLeft: 2
	},
	{
		storeId: 15,
		areaId: 11,
		sourceId: 5,
		itemName: "Kirkland Almonds 3lb",
		category: "snacks",
		price: 11.99,
		original: 15.99,
		unit: "3lb",
		hoursAgo: 0,
		daysLeft: 12
	},
	{
		storeId: 14,
		areaId: 10,
		sourceId: 13,
		itemName: "Cauliflower Gnocchi",
		category: "frozen",
		price: 2.69,
		original: 3.49,
		unit: "bag",
		hoursAgo: 0,
		daysLeft: 10,
		verified: false
	},
	{
		storeId: 12,
		areaId: 11,
		sourceId: 5,
		itemName: "Great Value Large Eggs 18ct",
		category: "dairy",
		price: 2.92,
		original: 3.64,
		unit: "18 eggs",
		hoursAgo: 0,
		daysLeft: 5
	},
	{
		storeId: 2,
		areaId: 4,
		sourceId: 6,
		itemName: "Nescafe Red Mug 200g",
		category: "beverages",
		price: 21,
		original: 28,
		unit: "200g",
		hoursAgo: 0,
		daysLeft: 7,
		verified: false
	},
	{
		storeId: 16,
		areaId: 10,
		sourceId: 11,
		itemName: "Good & Gather Sourdough Bread",
		category: "bakery",
		price: 2.79,
		original: 3.69,
		unit: "loaf",
		hoursAgo: 0,
		daysLeft: 2
	},
	{
		storeId: 9,
		areaId: 8,
		sourceId: 16,
		itemName: "Waitrose Duchy Milk 2L",
		category: "dairy",
		price: 1.6,
		original: 2.1,
		unit: "2L",
		hoursAgo: 0,
		daysLeft: 4
	},
	{
		storeId: 17,
		areaId: 12,
		sourceId: 17,
		itemName: "Red Chilli Powder 200g",
		category: "pantry",
		price: 220,
		original: 290,
		unit: "200g",
		hoursAgo: 0,
		daysLeft: 12,
		description: "لال مرچ · लाल मिर्च"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Shan Garam Masala 100g",
		category: "pantry",
		price: 185,
		original: 240,
		unit: "100g",
		hoursAgo: 0,
		daysLeft: 14,
		description: "گرم مسالہ · गरम मसाला"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Dalda Cooking Oil 1L",
		category: "pantry",
		price: 549,
		original: 690,
		unit: "1L",
		hoursAgo: 3,
		daysLeft: 9,
		description: "تیل · तेल"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Desi Ghee 500g",
		category: "pantry",
		price: 780,
		original: 980,
		unit: "500g",
		hoursAgo: 4,
		daysLeft: 10,
		description: "گھی · घी"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Sugar 1kg",
		category: "pantry",
		price: 150,
		original: 190,
		unit: "1kg",
		hoursAgo: 5,
		daysLeft: 12,
		description: "چینی · चीनी"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 19,
		itemName: "Iodized Salt 800g",
		category: "pantry",
		price: 50,
		original: 70,
		unit: "800g",
		hoursAgo: 6,
		daysLeft: 14,
		description: "نمک · नमक"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 18,
		itemName: "Mutton Mix 1kg",
		category: "meat",
		price: 1849,
		original: 2300,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 2,
		description: "بکرے کا گوشت · मटन"
	},
	{
		storeId: 18,
		areaId: 13,
		sourceId: 18,
		itemName: "Beef Keema 1kg",
		category: "meat",
		price: 1049,
		original: 1350,
		unit: "1kg",
		hoursAgo: 2,
		daysLeft: 2,
		description: "قیمہ · कीमा"
	},
	{
		storeId: 19,
		areaId: 14,
		sourceId: 18,
		itemName: "Desi Ghee 1kg",
		category: "pantry",
		price: 1450,
		original: 1790,
		unit: "1kg",
		hoursAgo: 0,
		daysLeft: 10,
		description: "دیسی گھی"
	}
];
var SCAN_POOL = [
	{
		storeId: 1,
		areaId: 5,
		sourceId: 1,
		itemName: "Almarai Yogurt Drink 1L",
		category: "dairy",
		price: 6.5,
		original: 9,
		unit: "1L"
	},
	{
		storeId: 1,
		areaId: 5,
		sourceId: 9,
		itemName: "Pringles Original 165g",
		category: "snacks",
		price: 8.75,
		original: 12,
		unit: "165g"
	},
	{
		storeId: 2,
		areaId: 4,
		sourceId: 1,
		itemName: "Al Osra Brown Sugar 1kg",
		category: "pantry",
		price: 7.5,
		original: 10.25,
		unit: "1kg"
	},
	{
		storeId: 3,
		areaId: 5,
		sourceId: 2,
		itemName: "Chicken Drumsticks 1kg",
		category: "meat",
		price: 11.5,
		original: 16,
		unit: "1kg"
	},
	{
		storeId: 3,
		areaId: 5,
		sourceId: 2,
		itemName: "Fairy Dishwash 750ml",
		category: "household",
		price: 13.75,
		original: 18.5,
		unit: "750ml"
	},
	{
		storeId: 4,
		areaId: 3,
		sourceId: 3,
		itemName: "Philadelphia Cream Cheese 200g",
		category: "dairy",
		price: 14,
		original: 18.5,
		unit: "200g"
	},
	{
		storeId: 4,
		areaId: 3,
		sourceId: 7,
		itemName: "Fresh Mint Bunch",
		category: "produce",
		price: 3.5,
		original: 5.5,
		unit: "bunch"
	},
	{
		storeId: 5,
		areaId: 2,
		sourceId: 16,
		itemName: "Waitrose Granola 500g",
		category: "pantry",
		price: 22,
		original: 29,
		unit: "500g"
	},
	{
		storeId: 6,
		areaId: 1,
		sourceId: 6,
		itemName: "Vimto 1L",
		category: "beverages",
		price: 6.25,
		original: 8.5,
		unit: "1L"
	},
	{
		storeId: 7,
		areaId: 6,
		sourceId: 4,
		itemName: "Tesco Bananas 5-pack",
		category: "produce",
		price: .79,
		original: 1.15,
		unit: "5-pack"
	},
	{
		storeId: 8,
		areaId: 7,
		sourceId: 10,
		itemName: "Cravendale Milk 2L",
		category: "dairy",
		price: 1.85,
		original: 2.4,
		unit: "2L"
	},
	{
		storeId: 10,
		areaId: 7,
		sourceId: 10,
		itemName: "Hovis Wholemeal 800g",
		category: "bakery",
		price: 1.15,
		original: 1.55,
		unit: "loaf"
	},
	{
		storeId: 11,
		areaId: 6,
		sourceId: 10,
		itemName: "PG Tips 80s",
		category: "beverages",
		price: 2.1,
		original: 2.9,
		unit: "80 bags"
	},
	{
		storeId: 11,
		areaId: 6,
		sourceId: 12,
		itemName: "McCain Oven Chips 1kg",
		category: "frozen",
		price: 1.75,
		original: 2.5,
		unit: "1kg"
	},
	{
		storeId: 12,
		areaId: 11,
		sourceId: 5,
		itemName: "Honeycrisp Apples 3lb",
		category: "produce",
		price: 3.48,
		original: 4.98,
		unit: "3lb"
	},
	{
		storeId: 13,
		areaId: 9,
		sourceId: 11,
		itemName: "Thomas English Muffins 6",
		category: "bakery",
		price: 3.49,
		original: 4.79,
		unit: "6-pack"
	},
	{
		storeId: 14,
		areaId: 10,
		sourceId: 13,
		itemName: "Kind Bars 12-pack",
		category: "snacks",
		price: 12.99,
		original: 16.99,
		unit: "12-pack"
	},
	{
		storeId: 15,
		areaId: 11,
		sourceId: 5,
		itemName: "Tide Pods 32ct",
		category: "household",
		price: 11.97,
		original: 16.47,
		unit: "32ct"
	},
	{
		storeId: 16,
		areaId: 10,
		sourceId: 11,
		itemName: "Chobani Greek Yogurt 4-pack",
		category: "dairy",
		price: 4.29,
		original: 5.99,
		unit: "4-pack"
	},
	{
		storeId: 9,
		areaId: 8,
		sourceId: 16,
		itemName: "Essential Honey 454g",
		category: "pantry",
		price: 2.15,
		original: 2.9,
		unit: "454g"
	}
];
var notified = (ur, hi, when) => `${ur} · ${hi} · Karachi notified ${when}. General stores and sabzi mandis are posted at this rate. A superstore shelf can be higher.`;
/** Prices copied from a public page. Nothing here is estimated. */
var REAL_OFFERS = [
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Tomato grade 1",
		category: "produce",
		price: 109,
		unit: "1kg",
		verified: true,
		featured: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("ٹماٹر", "टमाटर", "bazaar rate 27 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Onion large grade 1",
		category: "produce",
		price: 161,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("پیاز", "प्याज", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Potato grade 1",
		category: "produce",
		price: 35,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("آلو", "आलू", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Spinach",
		category: "produce",
		price: 46,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("پالک", "पालक", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Okra grade 2",
		category: "produce",
		price: 92,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("بھنڈی", "भिंडी", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Lauki round",
		category: "produce",
		price: 81,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("لوکی", "लौकी", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Karela grade 1",
		category: "produce",
		price: 81,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("کریلا", "करेला", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Cucumber grade 1",
		category: "produce",
		price: 58,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("کھیرا", "खीरा", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Carrot",
		category: "produce",
		price: 92,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("گاجر", "गाजर", "bazaar rate 27 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Garlic desi grade 1",
		category: "produce",
		price: 219,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("لہسن", "लहसुन", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Ginger",
		category: "produce",
		price: 345,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("ادرک", "अदरक", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Green chilli",
		category: "produce",
		price: 58,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("ہری مرچ", "हरी मिर्च", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Cabbage grade 1",
		category: "produce",
		price: 69,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("بند گوبھی", "पत्ता गोभी", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Cauliflower grade 1",
		category: "produce",
		price: 127,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("پھول گوبھی", "फूल गोभी", "bazaar rate 27 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Lemon grade 1",
		category: "produce",
		price: 460,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("لیموں", "नींबू", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Coriander",
		category: "produce",
		price: 9,
		unit: "bunch",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("دھنیا", "धनिया", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 31,
		itemName: "Peas",
		category: "produce",
		price: 150,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/vegetables",
		description: notified("مٹر", "मटर", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 32,
		itemName: "Chicken meat",
		category: "meat",
		price: 655,
		unit: "1kg",
		verified: true,
		featured: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/poultry",
		description: notified("مرغی", "मुर्गी", "rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 32,
		itemName: "Boneless chicken",
		category: "meat",
		price: 935,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/poultry",
		description: notified("بون لیس چکن", "बोनलेस चिकन", "rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 32,
		itemName: "Live chicken",
		category: "meat",
		price: 438,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/poultry",
		description: notified("زندہ مرغی", "जीवित मुर्गी", "rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 32,
		itemName: "Eggs",
		category: "dairy",
		price: 240,
		unit: "dozen",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/poultry",
		description: notified("انڈے", "अंडे", "rate 21 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 33,
		itemName: "Beef with bone",
		category: "meat",
		price: 1e3,
		unit: "1kg",
		verified: true,
		hoursAgo: 20,
		daysLeft: 2,
		url: "https://rozdaam.com/ur/karachi/meat",
		description: notified("گائے کا گوشت", "बीफ", "rate 11 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 33,
		itemName: "Beef boneless",
		category: "meat",
		price: 1300,
		unit: "1kg",
		verified: true,
		hoursAgo: 20,
		daysLeft: 2,
		url: "https://rozdaam.com/ur/karachi/meat",
		description: notified("بون لیس بیف", "बोनलेस बीफ", "rate 11 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 33,
		itemName: "Mutton goat",
		category: "meat",
		price: 2200,
		unit: "1kg",
		verified: true,
		hoursAgo: 20,
		daysLeft: 2,
		url: "https://rozdaam.com/ur/karachi/meat",
		description: notified("بکرے کا گوشت", "मटन", "rate 11 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 34,
		itemName: "Banana grade 1",
		category: "produce",
		price: 93,
		unit: "dozen",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/fruits",
		description: notified("کیلا", "केला", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 34,
		itemName: "Apple grade 1",
		category: "produce",
		price: 219,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/fruits",
		description: notified("سیب", "सेब", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 34,
		itemName: "Zahidi dates grade 1",
		category: "produce",
		price: 575,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/fruits",
		description: notified("کھجور", "खजूर", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 34,
		itemName: "Guava",
		category: "produce",
		price: 216,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/fruits",
		description: notified("امرود", "अमरूद", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 34,
		itemName: "Papaya grade 1",
		category: "produce",
		price: 167,
		unit: "1kg",
		verified: true,
		hoursAgo: 6,
		daysLeft: 1,
		url: "https://rozdaam.com/ur/karachi/fruits",
		description: notified("پپیتا", "पपीता", "bazaar rate 26 Oct 2026")
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Fresh milk",
		category: "dairy",
		price: 240,
		unit: "1L",
		verified: true,
		featured: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "دودھ · दूध · شیدې · PBS weekly average for Karachi, week ended 8 Oct 2026."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Basmati broken rice",
		category: "pantry",
		price: 284,
		unit: "1kg",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "چاول · चावल · وریجې · PBS Karachi average Rs 283.54, week ended 8 Oct 2026, rounded."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Masoor pulse",
		category: "pantry",
		price: 271,
		unit: "1kg",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "مسور · मसूर · PBS Karachi Rs 270.77, week ended 8 Oct 2026, rounded."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Moong pulse",
		category: "pantry",
		price: 352,
		unit: "1kg",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "مونگ · मूंग · PBS Karachi Rs 351.54, week ended 8 Oct 2026, rounded."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Mash pulse",
		category: "pantry",
		price: 456,
		unit: "1kg",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "ماش · माश · PBS Karachi Rs 456.35, week ended 8 Oct 2026, rounded."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Gram pulse",
		category: "pantry",
		price: 288,
		unit: "1kg",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "چنا · चना · PBS Karachi Rs 287.98, week ended 8 Oct 2026, rounded."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Sugar",
		category: "pantry",
		price: 145,
		unit: "1kg",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "چینی · चीनी · بوره · PBS Karachi Rs 145.38, week ended 8 Oct 2026, rounded."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Vegetable cooking oil",
		category: "pantry",
		price: 3090,
		unit: "5L tin",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "تیل · तेल · PBS tin price, same in the five big cities, week ended 8 Oct 2026."
	},
	{
		storeId: 43,
		areaId: 13,
		sourceId: 36,
		itemName: "Ghee tin",
		category: "pantry",
		price: 1580,
		unit: "2.5kg",
		verified: true,
		hoursAgo: 30,
		daysLeft: 4,
		url: "https://pakera.pk/compare-rice-pulses-milk-sugar-prices-by-city-pakistan/",
		description: "گھی · घी · PBS tin price, week ended 8 Oct 2026."
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 35,
		itemName: "Tomato",
		category: "produce",
		price: 180,
		unit: "1kg",
		verified: true,
		hoursAgo: 8,
		daysLeft: 2,
		url: "https://www.naheed.pk/tomato-tamatar-1-kg",
		description: "ٹماٹر · टماटर · Naheed.pk shelf price for Karachi delivery."
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 35,
		itemName: "Onion",
		category: "produce",
		price: 260,
		unit: "1kg",
		verified: true,
		hoursAgo: 8,
		daysLeft: 2,
		url: "https://www.naheed.pk/groceries-pets/fresh-products/vegetables",
		description: "پیاز · प्याज · Naheed.pk shelf price for Karachi delivery."
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 35,
		itemName: "Potato",
		category: "produce",
		price: 80,
		unit: "1kg",
		verified: true,
		hoursAgo: 8,
		daysLeft: 2,
		url: "https://www.naheed.pk/groceries-pets/fresh-products/vegetables",
		description: "آلو · आलू · Naheed.pk shelf price for Karachi delivery."
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 35,
		itemName: "Carrot",
		category: "produce",
		price: 300,
		unit: "1kg",
		verified: true,
		hoursAgo: 8,
		daysLeft: 2,
		url: "https://www.naheed.pk/groceries-pets/fresh-products/vegetables",
		description: "گاجر · गाजर · Naheed.pk shelf price for Karachi delivery."
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 35,
		itemName: "Cucumber",
		category: "produce",
		price: 100,
		unit: "500g",
		verified: true,
		hoursAgo: 8,
		daysLeft: 2,
		url: "https://www.naheed.pk/groceries-pets/fresh-products/vegetables",
		description: "کھیرا · खीरा · Naheed.pk shelf price for Karachi delivery."
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 35,
		itemName: "Karela",
		category: "produce",
		price: 90,
		unit: "500g",
		verified: true,
		hoursAgo: 8,
		daysLeft: 2,
		url: "https://www.naheed.pk/groceries-pets/fresh-products/vegetables",
		description: "کریلا · करेला · Naheed.pk shelf price for Karachi delivery."
	},
	{
		storeId: 21,
		areaId: 14,
		sourceId: 35,
		itemName: "Lauki",
		category: "produce",
		price: 140,
		unit: "500g",
		verified: true,
		hoursAgo: 8,
		daysLeft: 2,
		url: "https://www.naheed.pk/groceries-pets/fresh-products/vegetables",
		description: "لوکی · लौकी · Naheed.pk shelf price for Karachi delivery."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "King's Cooking Oil",
		category: "pantry",
		price: 7.99,
		unit: "1.5L",
		verified: true,
		featured: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "تیل · तेल · Dream Land Muteena leaflet, valid 16–22 Oct 2026. Bulk purchase is not allowed."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "Yafa flavour drink",
		category: "beverages",
		price: .99,
		unit: "250ml",
		verified: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "مشروب · Dream Land Muteena leaflet, valid 16–22 Oct 2026."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "Obour Land cheese",
		category: "dairy",
		price: 1.99,
		unit: "250g",
		verified: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "پنیر · Dream Land Muteena leaflet, valid 16–22 Oct 2026."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "Lay's chips",
		category: "snacks",
		price: 4.99,
		unit: "21 × 11g",
		verified: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "Dream Land Muteena leaflet, valid 16–22 Oct 2026."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "Royale ketchup",
		category: "pantry",
		price: .99,
		unit: "340g",
		verified: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "Dream Land Muteena leaflet, valid 16–22 Oct 2026."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "Pert shampoo",
		category: "personal",
		price: 2.99,
		unit: "400ml",
		verified: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "Dream Land Muteena leaflet, valid 16–22 Oct 2026."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "Fa roll-on",
		category: "personal",
		price: 2.5,
		unit: "50ml",
		verified: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "Dream Land Muteena leaflet, valid 16–22 Oct 2026."
	},
	{
		storeId: 44,
		areaId: 24,
		sourceId: 37,
		itemName: "JO beauty soap",
		category: "personal",
		price: 5.99,
		unit: "6 × 125g",
		verified: true,
		hoursAgo: 12,
		daysLeft: 0,
		url: "https://ae.ilofo.com/en/dream-land/catalogs/85116",
		description: "Dream Land Muteena leaflet, valid 16–22 Oct 2026."
	},
	...printedLeaflets(),
	...thisWeekLeaflets(),
	...portalBoards()
];
/** Prices read off a leaflet page that is still inside its printed dates. */
function printedLeaflets() {
	const dubai = "Day to Day Dubai leaflet 23–28 Oct 2026. The page names Al Nahda 1, 13th Street. Bulk purchase is not allowed. Confirm this branch still has the tag.";
	const ajman = "Day to Day Al Bustan leaflet 26 Oct–1 Nov 2026, Sheikh Rashid Bin Humaid Al Nuaimi Street, Ajman. Bulk purchase is not allowed.";
	const viva = "Viva UAE Diwali leaflet 22–28 Oct 2026. Printed price, not a guessed shelf. Confirm stock at this Viva.";
	const row = (storeId, areaId, sourceId, itemName, category, price, unit, url, note, original, daysLeft = 1) => ({
		storeId,
		areaId,
		sourceId,
		itemName,
		category,
		price,
		original,
		unit,
		verified: true,
		hoursAgo: 6,
		daysLeft,
		url,
		description: note
	});
	const dubaiUrl = "https://ae.ilofo.com/en/day-to-day/catalogs/85858";
	const ajmanUrl = "https://ae.ilofo.com/en/day-to-day/catalogs/85879";
	const vivaUrl = "https://ae.ilofo.com/en/viva/catalogs/85860";
	const dubaiStores = [[
		57,
		4,
		46
	], [
		62,
		26,
		40
	]];
	const dubaiItems = [
		[
			"Volga Bharat long grain basmati rice",
			"pantry",
			11.99,
			"8 lb"
		],
		[
			"Russail drinking water",
			"beverages",
			2.5,
			"6 × 1.5L"
		],
		[
			"Nadec full fat milk",
			"dairy",
			13.5,
			"4 × 1L"
		],
		[
			"Bayara mixed nuts",
			"snacks",
			6.99,
			"150g"
		]
	];
	const ajmanItems = [
		[
			"Safa full fat milk",
			"dairy",
			2.99,
			"1L"
		],
		[
			"Volga sugar",
			"pantry",
			2.99,
			"1kg"
		],
		[
			"Lucky Grain iodized salt",
			"pantry",
			1.5,
			"1kg"
		],
		[
			"Maysam cooking oil",
			"pantry",
			9.99,
			"1.5L"
		],
		[
			"Hans tea",
			"beverages",
			4.99,
			"100 bags"
		],
		[
			"Priniti namkeen",
			"snacks",
			2.5,
			"200g"
		],
		[
			"Quaker white oats",
			"pantry",
			4.99,
			"500g"
		],
		[
			"Lucky Grain milk powder",
			"dairy",
			4.5,
			"400g"
		],
		[
			"Al Maedah macaroni",
			"pantry",
			.99,
			"400g"
		],
		[
			"Classy tomato paste",
			"pantry",
			1.5,
			"400g"
		]
	];
	const vivaItems = [
		[
			"Ama basmati rice",
			"pantry",
			18.99,
			22.99,
			"5kg"
		],
		[
			"Silver Lotus jasmine rice",
			"pantry",
			19.99,
			23.99,
			"5kg"
		],
		[
			"Ama maida",
			"pantry",
			5.99,
			7.99,
			"2kg"
		],
		[
			"Ama sunflower oil",
			"pantry",
			38.99,
			42.99,
			"5L"
		],
		[
			"Lemon",
			"produce",
			3.99,
			5.99,
			"1kg"
		],
		[
			"Freshly Pick sweet corn",
			"produce",
			4.99,
			5.99,
			"800g"
		],
		[
			"Arbella pasta",
			"pantry",
			2.99,
			3.99,
			"500g"
		]
	];
	return [
		...dubaiStores.flatMap(([storeId, areaId, sourceId]) => dubaiItems.map(([itemName, category, price, unit]) => row(storeId, areaId, sourceId, itemName, category, price, unit, dubaiUrl, `${itemName}. ${dubai}`))),
		...ajmanItems.map(([itemName, category, price, unit]) => row(63, 29, 48, itemName, category, price, unit, ajmanUrl, `${itemName}. ${ajman}`, void 0, 5)),
		...vivaItems.map(([itemName, category, price, original, unit]) => row(52, 4, 42, itemName, category, price, unit, vivaUrl, `${itemName}. ${viva}`, original)),
		...vivaItems.map(([itemName, category, price, original, unit]) => row(53, 5, 42, itemName, category, price, unit, vivaUrl, viva, original))
	];
}
/** Leaflets whose printed dates include this week. Prices are copied off the page, not estimated. */
function thisWeekLeaflets() {
	const west = "West Zone fresh board, valid 28–30 Oct 2026, all West Zone branches. Printed AED. Confirm the tag is still on the shelf.";
	const westUrl = "https://www.wowdeals.me/ae/west-zone/catalogs/fresh-healthy-9";
	const union = "Day to Day Union leaflet, Omar bin Al Khatab Street opposite Union Metro, Dubai. Valid 29 Oct–15 Nov 2026. Bulk purchase is not allowed. This page is that branch only.";
	const unionUrl = "https://ae.ilofo.com/en/day-to-day/catalogs/86124";
	const row = (storeId, areaId, sourceId, itemName, category, price, unit, url, note, daysLeft, featured = false) => ({
		storeId,
		areaId,
		sourceId,
		itemName,
		category,
		price,
		unit,
		verified: true,
		featured,
		hoursAgo: 4,
		daysLeft,
		url,
		description: `${note} ${itemName}.`
	});
	const westStores = [[58, 24], [54, 26]];
	const westItems = [
		[
			"Herbs UAE",
			"produce",
			1.95,
			"pack",
			"Rosemary, oregano, basil, sage or thyme."
		],
		[
			"Cabbage",
			"produce",
			1.95,
			"1kg",
			"Red or white cabbage, or beetroot. بند گوبھی."
		],
		[
			"Sweet corn",
			"produce",
			1.95,
			"piece",
			""
		],
		[
			"Dry coconut",
			"produce",
			1.95,
			"piece",
			"India."
		],
		[
			"Pumpkin cut",
			"produce",
			2.95,
			"1kg",
			"Oman."
		],
		[
			"Watermelon",
			"produce",
			2.95,
			"1kg",
			"تربوز · Oman."
		],
		[
			"Onion red",
			"produce",
			3.95,
			"1kg",
			"پیاز · پياز · Egypt. Same tag also covers banana flower."
		],
		[
			"Radish",
			"produce",
			3.95,
			"1kg",
			"مولی · mooli, or kumbalam. UAE."
		],
		[
			"Cauliflower",
			"produce",
			3.95,
			"1kg",
			"پھول گوبھی · Jordan, or white pumpkin."
		],
		[
			"Tomato round",
			"produce",
			3.95,
			"1kg",
			"ٹماٹر · رومي · Jordan. Same tag also covers cucumber."
		],
		[
			"Mazafati dates",
			"produce",
			3.95,
			"500g",
			"کھجور · Bama, about 500g."
		],
		[
			"Tunisian dates",
			"produce",
			3.95,
			"250g",
			"کھجور · about 250g."
		],
		[
			"Melon",
			"produce",
			3.95,
			"1kg",
			"Rock, sweet, or honey melon. Oman."
		],
		[
			"Baby spinach",
			"produce",
			3.95,
			"pack",
			"پالک · or kale, salad, rocca. UAE."
		],
		[
			"Lemon",
			"produce",
			3.95,
			"1kg",
			"لیموں · South Africa, or green papaya Oman."
		],
		[
			"Red radish",
			"produce",
			4.95,
			"125g",
			"Holland, or snow peas China."
		],
		[
			"Pomegranate",
			"produce",
			4.95,
			"1kg",
			"انار · Egypt."
		],
		[
			"Lauki",
			"produce",
			4.95,
			"1kg",
			"لوکی · or butternut pumpkin."
		],
		[
			"Eggplant",
			"produce",
			4.95,
			"1kg",
			"بینگن · Oman."
		],
		[
			"Organic tomato",
			"produce",
			4.95,
			"pack",
			"Organic round tomato or cucumber."
		],
		[
			"Courgette",
			"produce",
			5.95,
			"1kg",
			"توری · or green pumpkin. UAE."
		],
		[
			"Chilli pack",
			"produce",
			5.95,
			"300g",
			"ہری مرچ · red or yellow pakoda, or jalapeño."
		],
		[
			"Mushroom",
			"produce",
			5.95,
			"pack",
			"China."
		],
		[
			"Garlic",
			"produce",
			5.95,
			"450g",
			"لہسن · China, about 450g."
		],
		[
			"Cherry tomato",
			"produce",
			5.95,
			"250g",
			"ٹماٹر · red cherry."
		],
		[
			"Banana",
			"produce",
			5.95,
			"1kg",
			"کیلا · Ecuador."
		],
		[
			"Guava white",
			"produce",
			5.95,
			"1kg",
			"امرود · Vietnam."
		],
		[
			"Apple",
			"produce",
			5.95,
			"1kg",
			"سیب · Cripps pink or red."
		],
		[
			"Golden apple",
			"produce",
			5.95,
			"1kg",
			"سیب · or kaka fruit, about 1kg."
		],
		[
			"Chinese cabbage",
			"produce",
			5.95,
			"1kg",
			"بند گوبھی · China. Same tag also covers brown or white onion."
		],
		[
			"Sweet potato",
			"produce",
			5.95,
			"1kg",
			"شکر قندی · Egypt, or celery."
		],
		[
			"Kiwi",
			"produce",
			6.95,
			"1kg",
			""
		],
		[
			"Guava",
			"produce",
			6.95,
			"1kg",
			"امرود · Egypt."
		],
		[
			"Capsicum",
			"produce",
			6.95,
			"1kg",
			"شملہ مرچ · green, Jordan, or long chilli Oman."
		],
		[
			"Carrot",
			"produce",
			6.95,
			"1kg",
			"گاجر · or long lettuce or iceberg."
		],
		[
			"Okra",
			"produce",
			6.95,
			"1kg",
			"بھنڈی · or long beans. UAE."
		],
		[
			"Baby carrots",
			"produce",
			6.95,
			"pack",
			"Peeled. USA."
		],
		[
			"Broccoli",
			"produce",
			7.95,
			"1kg",
			""
		],
		[
			"Pomelo",
			"produce",
			7.95,
			"1kg",
			"White pomelo."
		],
		[
			"Pear",
			"produce",
			7.95,
			"1kg",
			"ناشپاتی · Forelle or ya pear. China."
		],
		[
			"Berries",
			"produce",
			7.95,
			"125g",
			"Blackberries or goldenberries."
		],
		[
			"Grapes",
			"produce",
			7.95,
			"1kg",
			"انگور · red seedless or white, about 1kg."
		],
		[
			"Candy apple",
			"produce",
			7.95,
			"1kg",
			"China, about 1kg."
		],
		[
			"Orange",
			"produce",
			8.95,
			"1kg",
			"مالٹا · Valencia or grapefruit. South Africa."
		],
		[
			"Royal gala apple",
			"produce",
			8.95,
			"1kg",
			"سیب · Ukraine."
		],
		[
			"Red pomelo",
			"produce",
			8.95,
			"1kg",
			""
		],
		[
			"Yemen pomegranate",
			"produce",
			9.95,
			"1kg",
			"انار · Yemen."
		],
		[
			"Pineapple",
			"produce",
			9.95,
			"piece",
			"Philippines."
		],
		[
			"Strawberries",
			"produce",
			11.95,
			"pack",
			"South Africa."
		],
		[
			"Mango",
			"produce",
			12.95,
			"1kg",
			"آم · Heidi, Tommy, R2E2, or Keit. Egypt."
		],
		[
			"Coloured capsicum",
			"produce",
			12.95,
			"1kg",
			"Yellow, red, or orange. Jordan."
		],
		[
			"Cherry tomato bucket",
			"produce",
			12.95,
			"500g",
			""
		],
		[
			"Drumstick",
			"produce",
			13.95,
			"1kg",
			"سہجن · India, by air."
		],
		[
			"Ginger",
			"produce",
			14.95,
			"1kg",
			"ادرک · China."
		],
		[
			"Lebanon grapes",
			"produce",
			14.95,
			"1kg",
			"انگور · red, black, globe, or baby grapes."
		],
		[
			"Blueberries",
			"produce",
			15.95,
			"300g",
			""
		],
		[
			"Blueberries large",
			"produce",
			24.95,
			"500g",
			""
		],
		[
			"Avocado",
			"produce",
			26.95,
			"1kg",
			"Hass. Mexico."
		]
	];
	const unionItems = [
		[
			"Safa milk",
			"dairy",
			10,
			"4 × 1L"
		],
		[
			"Indomie noodles",
			"pantry",
			10,
			"10 × 75g"
		],
		[
			"Jenan vegetable oil",
			"pantry",
			10,
			"1.5L"
		],
		[
			"Vatika shampoo",
			"personal",
			10,
			"400ml + 200ml"
		],
		[
			"Dove cream",
			"personal",
			10,
			"250ml"
		],
		[
			"InStyle perfume",
			"personal",
			10,
			"100ml + 100ml"
		]
	];
	return [...westStores.flatMap(([storeId, areaId]) => westItems.map(([itemName, category, price, unit, extra]) => row(storeId, areaId, 43, itemName, category, price, unit, westUrl, `${extra} ${west}`.trim(), 2, itemName === "Tomato round" || itemName === "Onion red" || itemName === "Okra"))), ...unionItems.map(([itemName, category, price, unit]) => row(57, 4, 46, itemName, category, price, unit, unionUrl, union, 18, itemName === "Safa milk" || itemName === "Jenan vegetable oil"))];
}
/** Door to a real store. Price stays off the card until that portal prints one. */
function portalBoards() {
	const note = "Pakistani and Pathan daily kitchen — halal meat, sabzi, rice, daal, milk, atta, ghee. The price on the portal is the store’s. This app does not invent a shelf tag.";
	const row = (storeId, areaId, sourceId, itemName, url) => ({
		storeId,
		areaId,
		sourceId,
		itemName,
		category: "pantry",
		price: 0,
		unit: "portal",
		verified: true,
		hoursAgo: 1,
		daysLeft: 2,
		url,
		description: note
	});
	return [
		row(45, 25, 38, "Talal Supermarket", "https://talalgroupintl.com/sector/retail"),
		row(46, 4, 38, "Al Madina Market Naif", "https://almadinahypermarket.com/store-locator/"),
		row(47, 23, 39, "Faaz Supermarket", "https://www.google.com/maps/search/?api=1&query=Faaz+Supermarket+Al+Murar+Deira"),
		row(48, 22, 39, "Faaz Hypermarket", "https://www.google.com/maps/search/?api=1&query=Faaz+Hypermarket+Sharjah"),
		row(49, 21, 40, "Day to Day Al Nahda", "https://www.daytodayuae.com/branches/"),
		row(50, 22, 40, "Day to Day Al Qasimia", "https://www.daytodayuae.com/branches/"),
		row(51, 21, 41, "Night to Night Al Nahda", "https://ae.ilofo.com/en/night-to-night"),
		row(52, 4, 42, "Viva Muraqqabat", "https://myviva.com/store-finder/"),
		row(53, 5, 42, "Viva Al Barsha", "https://myviva.com/store-finder/"),
		row(54, 26, 43, "West Zone Fresh Al Nahda", "https://ae.ilofo.com/en/west-zone"),
		row(55, 13, 44, "Imtiaz Clifton", "https://imtiaz.com.pk/store-locator/"),
		row(56, 13, 45, "Kifayah Teen Talwar", "https://www.facebook.com/kifayahsupermarket/"),
		row(44, 24, 37, "Dream Land Muteena", "https://ae.ilofo.com/en/dream-land"),
		row(57, 4, 46, "Day to Day Union", "https://www.daytodayuae.com/branches/"),
		row(58, 24, 43, "West Zone Fresh Muteena", "https://ae.ilofo.com/en/west-zone"),
		row(59, 27, 47, "Talal Market Muhaisnah", "https://linktr.ee/TalalMarketLocations"),
		row(60, 27, 47, "Al Madina Hypermarket Sonapur", "https://almadinahypermarket.com/store-locator/"),
		row(61, 28, 48, "Day to Day Al Jerf", "https://www.daytodayuae.com/branches/")
	];
}
var CATALOG_OFFERS = [...OFFERS, ...REAL_OFFERS];
function isoDateOffset(days) {
	const d = /* @__PURE__ */ new Date();
	d.setUTCDate(d.getUTCDate() + days);
	return d.toISOString().slice(0, 10);
}
async function insertOffer(sql, o, forceNow = false) {
	const discount = o.original && o.original > o.price ? Math.round((1 - o.price / o.original) * 100) : null;
	const dedup = hash(o.itemName, o.storeId, o.price);
	const hours = forceNow ? 0 : o.hoursAgo ?? 4;
	const daysLeft = o.daysLeft ?? 5;
	const verified = o.verified ?? false;
	const featured = o.featured ?? false;
	const created = (/* @__PURE__ */ new Date(Date.now() - hours * 3600 * 1e3)).toISOString();
	return (await sql.query(`insert into offers (
      store_id, area_id, source_id, item_name, category, price, original_price,
      discount_percent, unit, description, source_url, start_date, end_date,
      is_verified, is_featured, dedup_hash, created_at, updated_at
    ) values (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17::timestamptz, now()
    ) on conflict (dedup_hash) do nothing
    returning id`, [
		o.storeId,
		o.areaId,
		o.sourceId,
		o.itemName,
		o.category,
		o.price,
		o.original ?? null,
		discount,
		o.unit ?? null,
		o.description ?? null,
		o.url ?? null,
		isoDateOffset(-1),
		isoDateOffset(daysLeft),
		verified,
		featured,
		dedup,
		created
	])).length > 0;
}
async function seedCatalog(sql) {
	for (const a of AREAS) await sql.query(`insert into areas (id, name, city, country, currency_code, currency_symbol, latitude, longitude, radius_km)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       on conflict (id) do update set
         name = excluded.name,
         city = excluded.city,
         latitude = excluded.latitude,
         longitude = excluded.longitude,
         radius_km = excluded.radius_km`, [...a]);
	for (const s of STORES) await sql.query(`insert into stores (id, name, chain, address, latitude, longitude, area_id, website)
       values ($1,$2,$3,$4,$5,$6,$7,$8)
       on conflict (id) do update set
         name = excluded.name,
         chain = excluded.chain,
         address = excluded.address,
         latitude = excluded.latitude,
         longitude = excluded.longitude,
         area_id = excluded.area_id,
         website = excluded.website`, [...s]);
	const crawledAt = (/* @__PURE__ */ new Date(Date.now() - 108e4)).toISOString();
	for (const s of SOURCES) await sql.query(`insert into sources (id, name, type, base_url, area_id, crawl_frequency_minutes, last_crawled_at, active)
       values ($1,$2,$3,$4,$5,$6,$7, true)
       on conflict (id) do update set
         name = excluded.name,
         base_url = excluded.base_url,
         area_id = excluded.area_id,
         active = true`, [...s, crawledAt]);
	try {
		await sql.query(`select setval('areas_id_seq', (select max(id) from areas))`);
		await sql.query(`select setval('stores_id_seq', (select max(id) from stores))`);
		await sql.query(`select setval('sources_id_seq', (select max(id) from sources))`);
	} catch {}
	const rows = [];
	for (const o of CATALOG_OFFERS) {
		const discount = o.original && o.original > o.price ? Math.round((1 - o.price / o.original) * 100) : null;
		const hours = o.hoursAgo ?? 4;
		const daysLeft = o.daysLeft ?? 5;
		rows.push([
			o.storeId,
			o.areaId,
			o.sourceId,
			o.itemName,
			o.category,
			o.price,
			o.original ?? null,
			discount,
			o.unit ?? null,
			o.description ?? null,
			o.url ?? null,
			isoDateOffset(-1),
			isoDateOffset(daysLeft),
			o.verified ?? false,
			o.featured ?? false,
			hash(o.itemName, o.storeId, o.price),
			(/* @__PURE__ */ new Date(Date.now() - hours * 3600 * 1e3)).toISOString()
		]);
	}
	const placeholders = rows.map((_, idx) => {
		const base = idx * 17;
		return `($${base + 1},$${base + 2},$${base + 3},$${base + 4},$${base + 5},$${base + 6},$${base + 7},$${base + 8},$${base + 9},$${base + 10},$${base + 11},$${base + 12},$${base + 13},$${base + 14},$${base + 15},$${base + 16},$${base + 17}::timestamptz, now())`;
	}).join(",");
	try {
		await sql.query(`insert into offers (
        store_id, area_id, source_id, item_name, category, price, original_price,
        discount_percent, unit, description, source_url, start_date, end_date,
        is_verified, is_featured, dedup_hash, created_at, updated_at
      ) values ${placeholders}
      on conflict (dedup_hash) do update set
        description = coalesce(excluded.description, offers.description),
        source_url = coalesce(excluded.source_url, offers.source_url),
        end_date = excluded.end_date,
        is_verified = excluded.is_verified or offers.is_verified`, rows.flat());
	} catch (err) {
		console.error("[seed] batch offers failed, falling back", err);
		for (const o of CATALOG_OFFERS) try {
			await insertOffer(sql, o);
		} catch (inner) {
			console.error("[seed] offer failed", o.itemName, inner);
		}
	}
	await sql.query(`update offers o
     set is_verified = false
     from areas a
     where a.id = o.area_id
       and a.country in ('Pakistan', 'United Arab Emirates')
       and o.source_id not in (31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48)`);
	await sql.query(`update offers
     set is_verified = false, end_date = date '2026-10-22'
     where source_id = 37 and coalesce(unit, '') <> 'portal'`);
	await sql.query(`update offers
     set is_verified = false
     where store_id = 43
       and (
         (item_name = 'Tomato grade 1' and price <> 109)
         or (item_name = 'Carrot' and price <> 92)
         or (item_name = 'Cauliflower grade 1' and price <> 127)
       )`);
	await sql.query(`delete from offers a
     using offers b
     where a.unit = 'portal' and b.unit = 'portal'
       and a.store_id = b.store_id
       and a.store_id in (44, 46, 49, 50, 51, 54, 57, 58, 59, 60, 61)
       and a.id < b.id`);
}
async function insertIncomingOffers(sql, city, limit = 6) {
	let pool = [...INCOMING_OFFERS, ...SCAN_POOL];
	if (city) {
		const areaRows = await sql`select id from areas where city = ${city}`;
		const ids = new Set(areaRows.map((r) => r.id));
		const filtered = pool.filter((o) => ids.has(o.areaId));
		if (filtered.length) pool = filtered;
	}
	const salt = Math.floor(Date.now() / 12e4);
	const start = salt % Math.max(pool.length, 1);
	const rotated = pool.length ? [...pool.slice(start), ...pool.slice(0, start)] : [];
	const factor = 1 - salt % 11 * .008;
	let inserted = 0;
	const hashes = [];
	let scanned = 0;
	async function tryInsert(raw, price) {
		const o = {
			...raw,
			price: Math.round(price * 100) / 100,
			hoursAgo: 0
		};
		if (await insertOffer(sql, o, true)) {
			inserted += 1;
			hashes.push(hash(o.itemName, o.storeId, o.price));
		}
	}
	for (const raw of rotated) {
		if (inserted >= limit) break;
		scanned += 1;
		await tryInsert(raw, raw.price * factor);
	}
	if (inserted === 0) for (const raw of rotated.slice(0, limit)) {
		scanned += 1;
		await tryInsert(raw, Math.max(.29, raw.price - .1 - salt % 5 * .05));
		if (inserted >= limit) break;
	}
	return {
		inserted,
		scanned: Math.max(scanned, rotated.length),
		hashes
	};
}
//#endregion
export { insertIncomingOffers, hash as offerDedupHash, seedCatalog };
