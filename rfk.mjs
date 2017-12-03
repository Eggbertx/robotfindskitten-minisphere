/*
 * robotfindskitten-minisphere v1.0
 * Yet another robotfindskitten clone
 * Copyright (c) 2017 Eggbertx
*/

import { Random, Prim } from 'sphere-runtime';

const font = Font.Default;
const kb = Keyboard.Default;
const screen = Surface.Screen;


var fontHeight = font.height;
var fontWidth = font.getTextSize("#").width;
var fieldWidth = 68;
var fieldHeight = 24;
var headerHeight = fontHeight * 3;
var windowWidth = fontWidth * fieldWidth;
var windowHeight = fontHeight * fieldHeight + headerHeight;

var numObjects = 16; // including kitten
var charCodes = [];
var fieldObjects = [];
var kittenObject = {}; // object use for the ending animation

var currentMessage = "";

// taken from the Rockbox source, some messages truncated or removed
// because they're too long
var messages = [
	"\"I pity the fool who mistakes me for kitten!\", sez Mr. T.",
	"That's just an old tin can.",
	"It's an altar to the horse god.",
	"A box of dancing mechanical pencils. They dance! They sing!",
	"It's an old Duke Ellington record.",
	"A box of fumigation pellets.",
	"A digital clock. It's stuck at 2:17 PM.",
	"That's just a charred human corpse.",
	"I don't know what that is, but it's not kitten.",
	"An empty shopping bag. Paper or plastic?",
	"Could it be... a big ugly bowling trophy?",
	"A coat hanger hovers in thin air. Odd.",
	"Not kitten, just a packet of Kool-Aid(tm).",
	"A shameless plug for Rockbox: http://www.rockbox.org",
	"A freshly-baked pumpkin pie.",
	"A lone, forgotten comma, sits here, sobbing.",
	"ONE HUNDRED THOUSAND CARPET FIBERS!!!!!",
	"It's Richard Nixon's nose!",
	"It's Lucy Ricardo. \"Aaaah, Ricky!\", she says.",
	"You stumble upon Bill Gates' stand-up act.",
	"Just an autographed copy of the Kama Sutra.",
	"It's the Will Rogers Highway. Who was Will Rogers, anyway?",
	//"It's another robot, more advanced in design than you but strangely immobile.",
	"It's another robot, more advanced in design than you.",
	"Leonard Richardson is here, asking people to lick him.",
	"It's a stupid mask, fashioned after a beagle.",
	"Your State Farm Insurance(tm) representative!",
	"It's the local draft board.",
	"Seven 1/4\" screws and a piece of plastic.",
	"An 80286 machine.",
	"One of those stupid \"Homes of the Stars\" maps.",
	"A signpost saying \"TO KITTEN\". It points in no particular direction.",
	"A hammock stretched between a tree and a volleyball pole.",
	"A Texas Instruments of Destruction calculator.",
	"It's a dark, amphorous blob of matter.",
	"Just a pincushion.",
	"Oh hey, you're not Llorean!",
	"It's a mighty zombie talking about some love and prosperity.",
	"\"Dear robot, you may have already won our 10 MILLION DOLLAR prize...\"",
	"It's just an object.",
	"A mere collection of pixels.",
	"A badly dented high-hat cymbal lies on its side here.",
	"A marijuana brownie.",
	"A plush Chewbacca.",
	"Daily hunger conditioner from Australasia",
	"Just some stuff.",
	"Why are you touching this when you should be finding kitten?",
	"A glorious fan of peacock feathers.",
	"It's some compromising photos of Babar the Elephant.",
	"A copy of the Weekly World News. Watch out for the chambered nautilus!",
	"It's the proverbial wet blanket.",
	"A \"Get Out of Jail Free\" card.",
	"An incredibly expensive \"Mad About You\" collector plate.",
	"Paul Moyer's necktie.",
	"A haircut and a real job. Now you know where to get one!",
	"An automated robot-hater. It frowns disapprovingly at you.",
	"An automated robot-liker. It smiles at you.",
	"It's a black hole. Don't fall in!",
	"It's a Toshiba MK8022GAA hard drive, untested, as-is.",
	"Just a big brick wall.",
	"You found kitten! No, just kidding.",
	"Heart of Darkness brand pistachio nuts.",
	"A smoking branding iron shaped like a 24-pin connector.",
	"It's a Java applet.",
	"An abandoned used-car lot.",
	"A shameless plug for Crummy: http://www.crummy.com/",
	"A shameless plug for the UCLA Linux Users Group: http://linux.ucla.edu/",
	"A can of Spam Lite.",
	"This is another fine mess you've gotten us into, Stanley.",
	"It's scenery for \"Waiting for Godot\".",
	"This grain elevator towers high above you.",
	"A Mentos wrapper.",
	"It's the constellation Pisces.",
	"It's a fly on the wall. Hi, fly!",
	"This kind of looks like kitten, but it's not.",
	"It's a banana! Oh, joy!",
	"A helicopter has crashed here.",
	"Carlos Tarango stands here, doing his best impression of Pat Smear.",
	"A patch of mushrooms grows here.",
	"It's a song by Kraftwerk, all about robots.",
	"A patch of grape jelly grows here.",
	"A spindle, and a grindle, and a bucka-wacka-woom!",
	"A geyser sprays water high into the air.",
	"A toenail? What good is a toenail?",
	"You've found the fish! Not that it does you much good in this game.",
	"A Buttertonsils bar.",
	"One of the few remaining discoes.",
	"Ah, the uniform of a Revolutionary-era minuteman.",
	"A punch bowl, filled with punch and lemon slices.",
	"It's nothing but a G-thang, baby.",
	"IT'S ALIVE! AH HA HA HA HA!",
	"This was no boating accident!",
	/*"Wait! This isn't the poker chip! You've been tricked! DAMN YOU, MENDEZ!",*/
	"A livery stable! Get your livery!",
	"It's a perpetual immobility machine.",
	"\"On this spot in 1962, Henry Winkler was sick.\"",
	"There's nothing here; it's just an optical illusion.",
	"The World's Biggest Motzah Ball!",
	/*"A tribe of cannibals lives here. They eat Malt-O-Meal for breakfast, you know.",*/
	"This appears to be a rather large stack of trashy romance novels.",
	"Look out! Exclamation points!",
	"A herd of wild coffee mugs slumbers here.",
	"It's a limbo bar! How low can you go?",
	"It's the horizon. Now THAT'S weird.",
	"A vase full of artificial flowers is stuck to the floor here.",
	"A large snake bars your way.",
	"A pair of saloon-style doors swing slowly back and forth here.",
	"It's an ordinary bust of Beethoven... but why is it painted green?",
	"It's TV's lovable wisecracking Crow! \"Bite me!\", he says.",
	/*"Hey, look, it's war. What is it good for? Absolutely nothing. Say it again.",*/
	"Hey, look, it's war. What is it good for? Absolutely nothing.",
	"It's the amazing self-referential thing that's not kitten.",
	"A flamboyant feather boa. Now you can dress up like Carol Channing!",
	"\"Sure hope we get some rain soon,\" says Farmer Joe.",
	/*"\"How in heck can I wash my neck if it ain't gonna rain no more?\" asks Farmer Al.",*/
	"\"Topsoil's all gone, ma,\" weeps Lil' Greg.",
	"This is a large brown bear. Oddly enough, it's currently peeing in the woods.",
	"A team of arctic explorers is camped here.",
	"This object here appears to be Louis Farrakhan's bow tie.",
	"This is the world-famous Chain of Jockstraps.",
	"A trash compactor, compacting away.",
	"This toaster strudel is riddled with bullet holes!",
	"A capsaicin molecule.",
	"It's a hologram of a crashed helicopter.",
	"This is a television. On screen you see a robot strangely similar to yourself.",
	"This balogna has a first name, it's R-A-N-C-I-D.",
	"A salmon hatchery? Look again. It's merely a single salmon.",
	"It's a rim shot. Ba-da-boom!",
	"It's creepy and it's kooky, mysterious and spooky.", // It's also somewhat ooky.",
	"This is an anagram.",
	"This object is like an analogy.",
	"It's a symbol. You see in it a model for all symbols everywhere.",
	"The object pushes back at you.",
	"A traffic signal. It appears to have been recently vandalized.",
	"\"There is no kitten!\" cackles the old crone.", // You are shocked by her blasphemy.",
	"This is a Lagrange point. Don't come too close now.",
	"The dirty old tramp bemoans the loss of his harmonica.",
	"Look, it's Fanny the Irishman!",
	"What in blazes is this?",
	"It's the instruction manual for a previous version of this game.",
	"A brain cell. Oddly enough, it seems to be functioning.",
	"Tea and/or crumpets.",
	"This jukebox has nothing but Cliff Richards albums in it.",
	"It's a Quaker Oatmeal tube, converted into a drum.",
	"This is a remote control. Being a robot, you keep a wide berth.",
	"It's a roll of industrial-strength copper wire.",
	"Oh boy! Grub! Er, grubs.",
	"A puddle of mud, where the mudskippers play.",
	"Plenty of nothing.",
	"Look at that, it's the Crudmobile.",
	"Just Walter Mattheau and Jack Lemmon.",
	"Two crepes, two crepes in a box.",
	"An autographed copy of \"Primary Colors\", by Anonymous.",
	"Another rabbit? That's three today!",
	"It's a segmentation fault. Core dumped, by the way.",
	"A historical marker showing the actual location of /dev/null.",
	"Thar's Mobius Dick, the convoluted whale. Arrr!",
	"It's a charcoal briquette, smoking away.",
	"A pizza, melting in the sun.",
	"It's a \"HOME ALONE 2: Lost in New York\" novelty cup.",
	"A stack of 7 inch floppies wobbles precariously.",
	"It's nothing but a corrupted floppy. Coaster anyone?",
	"A section of glowing phosphor cells sings a song of radiation to you.",
	"This TRS-80 III is eerily silent.",
	"A toilet bowl occupies this space.",
	"This peg-leg is stuck in a knothole!",
	"It's a solitary vacuum tube.",
	"This corroded robot is clutching a mitten.",
	"\"Hi, I'm Anson Williams, TV's 'Potsy'.\"",
	"This subwoofer was blown out in 1974.",
	"Three half-pennies and a wooden nickel.",
	"It's the missing chapter to \"A Clockwork Orange\".",
	"It's a burrito stand flyer. \"Taqueria El Ranchito\".",
	"This smiling family is happy because they eat LARD.",
	"Roger Avery, persona un famoso de los Estados Unidos.",
	"Ne'er but a potted plant.",
	"A parrot, kipping on its back.",
	"A forgotten telephone switchboard.",
	/*"It's a trio of Swedish hackers. They seem to be busy with that MP3 player.",*/
	"A forgotten telephone switchboard operator.",
	"It's an automated robot-disdainer. It pretends you're not there.",
	"It's a portable hole. A sign reads: \"Closed for the winter\".",
	"Just a moldy loaf of bread.",
	"A little glass tub of Carmex. ($.89) Too bad you have no lips.",
	"A Swiss-Army knife. All of its appendages are out. (toothpick lost)",
	"It's a zen simulation, trapped within an ASCII character.",
	"It's a copy of \"The Rubaiyat of Spike Schudy\".",
	"It's \"War and Peace\" (unabridged, very small print).",
	"A willing, ripe tomato bemoans your inability to digest fruit.",
	"A robot comedian. You feel amused.",
	"It's KITT, the talking car.",
	"Here's Pete Peterson. His batteries seem to have long gone dead.",
	"\"Blup, blup, blup\", says the mud pot.",
	"More grist for the mill.",
	"Cory Doctorow's hot air balloon is tethered here.",
	"Grind 'em up, spit 'em out, they're twigs.",
	"The boom box cranks out an old Ethel Merman tune.",
	"It's \"Finding kitten\", published by O'Reilly and Associates.",
	"Pumpkin pie spice.",
	"It's the Bass-Matic '76! Mmm, that's good bass!",
	"\"Lend us a fiver 'til Thursday\", pleas Andy Capp.",
	"It's a tape of '70s rock. All original hits! All original artists!",
	"You've found the fabled America Online disk graveyard!",
	"Empty jewelboxes litter the landscape.",
	"It's the astounding meta-object.",
	"Ed McMahon stands here, lost in thought. Seeing you, he bellows, \"YES SIR!\"",
	"...thingy???",
	"It's 1000 secrets the government doesn't want you to know!",
	"The letters O and R.",
	"A magical... magic thing.",
	"It's a moment of silence.",
	"It's Sirhan-Sirhan, looking guilty.",
	"It's \"Chicken Soup for the Kitten-seeking Soulless Robot.\"",
	"It is a set of wind-up chatter teeth.",
	"It is a cloud shaped like an ox.",
	"You see a snowflake here, melting slowly.",
	"It's 91 yards of twine.",
	"It's a big block of ice. Something seems to be frozen inside it.",
	"Vladimir Lenin's casket rests here.",
	"It's a copy of \"Zen and The Art of Robot Maintenance\".",
	"This invisible box contains a pantomime horse.",
	"A mason jar lies here open. It's label reads: \"do not open!\".",
	"A train of thought chugs through here.",
	"This jar of pickles expired in 1957.",
	"Someone's identity disk lies here.",
	"\"Yes!\" says the bit.",
	"\"No!\" says the bit.",
	"A dodecahedron bars your way.",
	"Mr. Hooper is here, surfing.",
	"It's a big smoking fish.",
	"You have new mail in /var/spool/robot",
	"Just a monitor with the blue element burnt out.",
	"A pile of coaxial plumbing lies here.",
	"It's a rotten old shoe.",
	"It's a hundred-dollar bill.",
	"It's a Dvorak keyboard.",
	"It's Bender, the loveable kleptomaniac robot! \"Bite my shiny metal ass!\"",
	"It's Bender, the kleptomaniac robot! \"Bite my shiny metal ass!\"",
	"It's a cardboard box full of 8-tracks.",
	"Just a broken hard drive containg the archives of Nerth Pork.",
	"A broken metronome sits here, it's needle off to one side.",
	"A sign reads: \"Go home!\"",
	"A sign reads: \"No robots allowed!\"",
	"It's the handheld robotfindskitten game, by Tiger.",
	"This particular monstrosity appears to be ENIAC.",
	"This is a tasty-looking banana creme pie.",
	"A wireframe model of a hot dog rotates in space here.",
	"Just the empty husk of a locust.",
	"You disturb a murder of crows.",
	"It's a copy of the robotfindskitten EULA.",
	"It's Death.",
	"It's an autographed copy of \"Secondary Colors,\" by Bob Ross.",
	"It is a marzipan dreadnought that appears to have melted and stuck.",
	"It's a DVD of \"Crouching Monkey, Hidden Kitten\", region encoded for the moon.",
	"It's Kieran Hervold. Damn dyslexia!",
	"A non-descript box of crackers.",
	"Carbonated Water, High Fructose Corn Syrup, Color, Phosphoric Acid, Flavors, Caffeine.",
	"\"Move along! Nothing to see here!\"",
	"It's the embalmed corpse of Vladimir Lenin.",
	"A coupon for one free steak-fish at your local family diner.",
	"A set of keys to a 2001 Rolls Royce. Worthless.",
	"A gravestone stands here. \"Izchak Miller, ascended.\"",
	"Someone has written \"ad aerarium\" on the ground here.",
	"A large blue eye floats in midair.",
	"This appears to be a statue of Perseus.",
	"There is an opulent throne here.",
	"It's a squad of Keystone Kops.",
	"This seems to be junk mail addressed to the finder of the Eye of Larn.",
	"A wondrous and intricate golden amulet. Too bad you have no neck.",
	"The swampy ground around you seems to stink with disease.",
	"An animate blob of acid. Being metallic, you keep well away.",
	"It's a copy of Knuth with the chapter on kitten-search algorithms torn out.",
	"It's a book by Donald Knuth about kitten-search algorithms",
	"A crowd of people, and at the center, a popular misconception.",
	"It's a blind man. When you touch, he exclaims \"It's a kitten prospecting robot!\"",
	"It's a lost wallet. It's owner didn't have pets, so you discard it.",
	"This place is called Antarctica. There is no kitten here.",
	"It's a mousetrap, baited with soap.",
	"A book with \"Don't Panic\" in large friendly letters across the cover.",
	"A compendium of haiku about metals.",
	"A discredited cosmology, relic of a bygone era.",
	"A hollow voice says \"Plugh\".",
	"A knight who says \"Either I am an insane knave, or you will find kitten.\"",
	"The secret meeting place of the Knights of the Lambda Calculus.",
	"A neural net -- maybe it's trying to recognize kitten.",
	"A screwdriver.",
	"A statue of a girl holding a goose like the one in Gottingen, Germany.",
	"A tetradrachm dated \"42 B.C.\"",
	"A voice booms out \"Onward, kitten soldiers...\"",
	"An eminently forgettable zahir.",
	"Apparently, it's Edmund Burke.",
	"For a moment, you feel something in your hands, but it disappears!",
	"Here is a book about Robert Kennedy.",
	"Hey, robot, leave those lists alone.",
	"Ho hum. Another synthetic a posteriori.",
	"It's Asimov's Laws of Robotics. You feel a strange affinity for them.",
	"It's Bach's Mass in B-minor!",
	"It's a bug.",
	"It's a synthetic a priori truth! Immanuel would be so pleased!",
	"It's the Tiki Room.",
	"Just some old play by a Czech playwright, and you can't read Czech.",
	"Kitten is the letter 'Q'. Oh, wait, maybe not.",
	"Quidquid Latine dictum sit, kitten non est.",
	"Sutro Tower is visible at some distance through the fog.",
	"The Digital Millennium Copyright Act of 1998.",
	"The United States Court of Appeals for the Federal Circuit.",
	"The non-kitten item like this but with \"false\" and \"true\" switched is true.", 
	"The non-kitten item like this but with \"true\" and \"false\" switched is false.",
	"This is the chapter called \"A Map of the Cat?\" from Feynman's autobiography.",
	"This is the forest primeval.",
	"Werner's \"Pocket Field Guide to Things That Are Not Kitten\".",
	"You found nettik, but that's backwards.",
	"You have found some zinc, but you must not stop here, for you must find kitten.", 
	"\"50 Years Among the Non-Kitten Items\", by Ann Droyd.",
	"\"Robot may not injure kitten, or, through inaction, ...\"",
	"\"Address Allocation for Private Internets\" by Yakov Rekhter et al.",
	"\"Mail Routing and the Domain System\" by Craig Partridge.",
	"\"The Theory and Practice of Oligarchical Collectivism\" by Emmanuel Goldstein.",
	"\"201 Kitten Verbs, Fully Conjugated\". You look for \"find\".",
	"A card shark sits here, practicing his Faro shuffle. He ignores you.",
	"A copy of DeCSS. They're a dime a dozen these days.",
	"A demonic voice proclaims \"There is no kitten, only Zuul\". You flee.",
	"A lotus. You make an interesting pair.",
	"It's the missing 24 seconds of \"Monty Python and the Holy Grail\".",
	"A milk carton, with a black and white picture of kitten on the side.",
	"Any ordinary robot could see from a mile away that this wasn't kitten.",
	"A stegosaurus, escaped from the stegosaurusfindsrobot game. It finds you.",
	"Baling wire and chewing gum.",
	"Chewing gum and baling wire.",
	"Here is no kitten but only rock, rock and no kitten and the sandy road.",
	"Hey, I bet you thought this was kitten.",
	"It is an ancient mariner, and he stoppeth one of three.",
	"It pleases you to be kind to what appears to be kitten -- but it's not!",
	"It's a blatant plug for Ogg Vorbis, http://www.vorbis.com/",
	"It's a business plan for a new startup, kitten.net.",
	"It's a revised business plan for a new startup, my.kitten.net.",
	"It's a square.",
	"It seems to be a copy of \"A Tail of Two Kitties\".",
	"It's the Donation of Constantine!",
	"It's this message, nothing more.",
	"Lysine, an essential amino acid. Well, maybe not for robots.",
	"No kitten here.",
	"The score for a Czech composer's \"Kitten-Finding Symphony in C\".",
	"This looks like Bradley's \"Appearance and Reality\", but it's really not.",
	"This non-kitten item no verb.",
	"You feel strangely unfulfilled.",
	"You hit the non-kitten item. The non-kitten item fails to yowl.",
	"You suddenly yearn for your distant homeland.",
	"You've found the snows of yesteryear! So that's where they all went to.",
	"Approaching. One car. J. Followed by. Two car. M, M. In five. Minutes.",
	"Free Jon Johansen!",
	"Free Dmitry Sklyarov!",
	"One person shouts \"What do we want?\" The crowd answers \"Free Dmitry!\"",
	"Judith Platt insults librarians.",
	"This map is not the territory.",
	"\"Go back to Libraria!\", says Pat Schroeder.",
	"This is a porcelain kitten-counter. 0, 0, 0, 0, 0...",
	"An old bootable business card, unfortunately cracked down the middle.",
	"A kitten sink, for washing kitten (if only kitten liked water).",
	"A kitten source (to match the kitten sink).",
	"If it's one thing, it's not another.",
	"If it's not one thing, it's another.",
	"A caboodle.",
	"A grin.",
	"A hedgehog. It looks like it knows something important.",
	"You've found... Oh wait, that's just a cat.",
	"Robot should not be touching that.",
	"Air Guitar!!! NA na NA na!!",
	"An aromatherapy candle burns with healing light.",
	"You find a bright shiny penny.",
	"It's a free Jon Johansen!",
	"It's a free Dmitry Sklyarov!",
	"The rothe hits! The rothe hits!",
	"It's an Internet chain letter about sodium laureth sulfate.",
	"Ed Witten sits here, pondering string theory.",
	"Something is written here in the dust. You read: \"rJbotf ndQkttten\".",
	"We wish you a merry kitten, and a happy New Year!",
	"Run away! Run away!",
	"You can see right through this copy of Brin\'s \"Transparent Society\".",
	"This copy of \"Steal This Book\" has been stolen from a bookstore.",
	"It's Roya Naini.",
	"This kit is the fourteenth in a series of kits named with Roman letters.",
	"This is the tenth key you've found so far.",
	"You find a fraud scheme in which loans are used as security for other loans.",
	"It's the phrase \"and her\", written in ancient Greek.",
	"It's the author of \"Randomness and Mathematical Proof\".",
	"It's the crusty exoskeleton of an arthropod!",
	"It's Emporer Shaddam the 4th's planet!",
	"It's the triangle leg adjacent to an angle divided by the leg opposite it.",
	"It's a bottle of nail polish remover.",
	"You found netkit! Way to go, robot!",
	"It's the ASCII Floating Head of Seth David Schoen!",
	"A frosted pink party-cake, half eaten.",
	"A bitchin' homemade tesla coil.",
	"Conan O'Brian, sans jawbone.",
	"It's either a mirror, or another soulless kitten-seeking robot.",
	"Preoccupation with finding kitten prevents you from investigating further.",
	"Fonzie sits here, mumbling incoherently about a shark and a pair of waterskis.",
	"The ghost of your dance instructor, his face a paper-white mask of evil.",
	"A bag of groceries taken off the shelf before the expiration date.",
	"A book: Feng Shui, Zen: the art of randomly arranging items that are not kitten.",
	"This might be the fountain of youth, but you'll never know.",
	"Tigerbot Hesh.",
	"Stimutacs.",
	"A canister of pressurized whipped cream, sans whipped cream.",
	"The non-kitten item bites!",
	"A chain hanging from two posts reminds you of the Gateway Arch.",
	"A mathematician calculates the halting probability of a Turing machine.",
	"A number of short theatrical productions are indexed 1, 2, 3, ... n.",
	"A technical university in Australia.",
	"It is -- I just feel something wonderful is about to happen.",
	"It's a Cat 5 cable.",
	"It's a U.S. president.",
	"It's a piece of cloth used to cover a stage in between performances.",
	"The ionosphere seems charged with meaning.",
	"This tomography is like, hella axial, man!",
	"It's your favorite game -- robotfindscatan!",
	"Just a man selling an albatross.",
	"The intermission from a 1930s silent movie.",
	"It's an inverted billiard ball!",
	"The spectre of Sherlock Holmes wills you onwards.",
	
	"A shameless plug for miniSphere: https://github.com/fatcerberus/miniSphere",
	"It's one of Fat Cerberus's eaty-pigs! Oh noes!",
	"Richard Stallman lectures you about the evils of proprietary software.",
	"Klaatu barada nikto!",
	"It's the wizard book, with some pages torn out.",
	"It's a sweet transvestite from Transsexual, Transylvania.",
	"I am Pennywise the dancing clown. You are robot!",
	"Snakes? Snakes!",
	"Never fear, I is here.",
	"HACK THE PLANET!!",
	"It's a robotfindskitten git repo.",
	"FLAGRANT SYSTEM ERROR",
	"It's an anonymous tip of $2.50 in Canadian dollars.",
	"It's an unexceptional exception.",
	"It's Ajit Pai, doing his best to ruin the internet."
];

var colors = [
	Color.Yellow,
	Color.Cyan,
	Color.Purple,
	Color.Blue,
	Color.Red,
	Color.Green
];

var introMessage = [
	`robotfindskitten 1.0.${ Math.abs(Random.normal(32,32)) }`,
	"Copyright (c) 2017 Eggbertx",
	"Original rfk by Leonard Richardson (c) 1997, 2000",
	"",
	"In this game you are robot (#). Your job is to find kitten. This task",
	"is complicated by the existence of various things which are not kitten.",
	"Robot must touch items to determine if they are kitten or not. The game", 
	"ends when robotfindskitten.",
	"",
	"Press any key to start."
];

var foundKittenTime = 0;
var foundKittenAnimDistance = 4; // starting ending animation distance
var state = 0; // 0 = intro, 1 = game, 2 = ending animation
var playerX = 0;
var playerY = 0;

Dispatch.onUpdate(function() {
	switch(state) {
		case 0:
			if(kb.getKey() != null) state = 1;
			break;
		case 1:
			searchForKitten();
			break;
	}
	if(kb.isPressed(Key.Escape) || kb.isPressed(Key.Q)) Sphere.shutDown();
});

Dispatch.onRender(function() {
	switch(state) {
		case 0:
			drawIntro();
			break;
		case 1:
			drawField();
			break;
		case 2:
			drawField();
			foundKittenAnimation();
			break;
	}
});

function setupObjects() {
	for(let i = 33; i < 127; i++) {
		if(i != 35) charCodes[charCodes.length] = String.fromCharCode(i);
	}
	
	var freeTiles = [];
	for(let y = 0; y < fieldHeight; y++) {
		for(let x = 0; x < fieldWidth; x++) {
			freeTiles[freeTiles.length] = {x: x, y: y};
		}
	}
	var playerIndex = Random.discrete(0, freeTiles.length - 1);
	playerX = freeTiles[playerIndex].x;
	playerY = freeTiles[playerIndex].y;

	freeTiles.splice(playerIndex, 1);

	for(var i = 0; i < numObjects; i++) {
		if(i == charCodes.length) break;

		var objChar = charCodes[i];
		var randTileIndex = Random.discrete(0, freeTiles.length - 1);
		var randTilePos = freeTiles[randTileIndex];
		if(randTilePos == undefined) return; // out of space
		freeTiles.splice(randTileIndex,1);

		fieldObjects[i] = {
			code: charCodes[i],
			color: Random.sample(colors),
			x: randTilePos.x,
			y: randTilePos.y,
			message: Random.sample(messages),
			isKitten: false
		};
	}
	fieldObjects[Random.discrete(0,fieldObjects.length - 1)].isKitten = true;
}

function drawIntro() {
	introMessage.forEach(function(str, i) {
		font.drawText(screen, 8, 16 + (i * fontHeight) , str);	
	})
}

function drawField() {
	font.drawText(screen, 4, 5, introMessage[0]);
	font.drawText(screen, 4, 5 + 3 + fontHeight, currentMessage);
	Prim.drawLine(screen, 0, headerHeight - 1, windowWidth, headerHeight - 1, 1, Color.White);

	fieldObjects.forEach(function(obj,i) {
		font.drawText(screen, obj.x * fontWidth, obj.y * fontHeight + headerHeight, obj.code, obj.color);
	});
	font.drawText(screen, playerX * fontWidth, playerY * fontHeight + headerHeight, "#", Color.Gray);
}

function objectAt(x,y) {
	var foundObj = null;
	fieldObjects.forEach(function(obj,i) {
		if(obj.x == x && obj.y == y) foundObj = obj;
	});
	return foundObj;
}

function searchForKitten() {
	// handle robot input
	if(state == 2) return;
	var currentKey = kb.getKey();
	var moveToX = playerX;
	var moveToY = playerY;
	switch(currentKey) {
		case Key.Up:
			moveToY--;
			break;
		case Key.Down:
			moveToY++;
			break;
		case Key.Left:
			moveToX--;
			break;
		case Key.Right:
			moveToX++;
			break;
	}
	// check if moveToX/Y is a valid location and if it is an object
	var obj = objectAt(moveToX, moveToY);
	if(obj != null) {
		if(obj.isKitten) {
			kittenObject = obj;
			state = 2;
			if(foundKittenTime == 0) foundKittenTime = GetTime(); //Date.now();
		}
		else currentMessage = obj.message;
	} else if(moveToX >= 0 && moveToX < fieldWidth && moveToY >= 0 && moveToY < fieldHeight) {
		playerX = moveToX;
		playerY = moveToY;
	}
}

function foundKittenAnimation(character) {
	var currentTime = GetTime();
	if(currentTime >= foundKittenTime)
		foundKittenAnimDistance = 3;
	if(currentTime >= foundKittenTime + 1e3)
		foundKittenAnimDistance = 2;
	if(currentTime >= foundKittenTime + 2e3)
		foundKittenAnimDistance = 1;
	if(currentTime >= foundKittenTime + 3e3)
		foundKittenAnimDistance = 0.5;
	if(currentTime >= foundKittenTime + 4e3)
		currentMessage = "You found kitten! Way to go, robot!";
	if(currentTime >= foundKittenTime + 8e3)
		Sphere.shutDown();
	
	if(currentTime < foundKittenTime + 4e3) {
		var middleX = fieldWidth / 2;
		var robotX = middleX * fontWidth - foundKittenAnimDistance * fontWidth;
		var kittenX = middleX * fontWidth + foundKittenAnimDistance * fontWidth;

		currentMessage = "";
		font.drawText(screen, robotX, 8 + fontHeight,
			"#", Color.Gray
		);
		font.drawText(screen, kittenX, 8 + fontHeight,
			kittenObject.code, kittenObject.color
		);
	}
}

Sphere.setResolution(windowWidth, windowHeight);
setupObjects();
