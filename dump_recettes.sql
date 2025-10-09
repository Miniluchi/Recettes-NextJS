--
-- PostgreSQL database dump
--

\restrict AAp3MH8DLauR3qRmQPJtxu6AZcdro0TENMNQjgMq2vTYlkfDccuSbg7pm5cy3Rj

-- Dumped from database version 13.22
-- Dumped by pg_dump version 13.22

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: SCHEMA; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "SCHEMA";


ALTER SCHEMA "SCHEMA" OWNER TO postgres;

--
-- Name: Difficulty; Type: TYPE; Schema: SCHEMA; Owner: postgres
--

CREATE TYPE "SCHEMA"."Difficulty" AS ENUM (
    'facile',
    'moyen',
    'difficile'
);


ALTER TYPE "SCHEMA"."Difficulty" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."Account" (
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "SCHEMA"."Account" OWNER TO postgres;

--
-- Name: Authenticator; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."Authenticator" (
    "credentialID" text NOT NULL,
    "userId" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "credentialPublicKey" text NOT NULL,
    counter integer NOT NULL,
    "credentialDeviceType" text NOT NULL,
    "credentialBackedUp" boolean NOT NULL,
    transports text
);


ALTER TABLE "SCHEMA"."Authenticator" OWNER TO postgres;

--
-- Name: Comment; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."Comment" (
    id text NOT NULL,
    content text NOT NULL,
    rating integer DEFAULT 5 NOT NULL,
    "userId" text NOT NULL,
    "recipeId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "SCHEMA"."Comment" OWNER TO postgres;

--
-- Name: Favorite; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."Favorite" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "recipeId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "SCHEMA"."Favorite" OWNER TO postgres;

--
-- Name: Recipe; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."Recipe" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    image text NOT NULL,
    "prepTime" integer NOT NULL,
    difficulty "SCHEMA"."Difficulty" NOT NULL,
    servings integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "SCHEMA"."Recipe" OWNER TO postgres;

--
-- Name: Session; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."Session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "SCHEMA"."Session" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."User" (
    id text NOT NULL,
    name text,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text
);


ALTER TABLE "SCHEMA"."User" OWNER TO postgres;

--
-- Name: VerificationToken; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE "SCHEMA"."VerificationToken" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: SCHEMA; Owner: postgres
--

CREATE TABLE "SCHEMA"._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE "SCHEMA"._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Authenticator; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."Authenticator" ("credentialID", "userId", "providerAccountId", "credentialPublicKey", counter, "credentialDeviceType", "credentialBackedUp", transports) FROM stdin;
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."Comment" (id, content, rating, "userId", "recipeId", "createdAt", "updatedAt") FROM stdin;
cmgjeoon50005y2npt3jnjbuo	merdique\n\nSigné, Théo	1	cmghr2cch0000y2uicygzwv3y	cmghs3e040007y2fif38nhf84	2025-10-09 12:40:51.135	2025-10-09 12:41:10.502
cmgjf1uf60007y2npmmmatmzh	C'est bon putain	5	cmghr2cch0000y2uicygzwv3y	cmghs3dzx0000y2fiwqm7tfsf	2025-10-09 12:51:05.153	2025-10-09 12:51:05.153
cmgjfmtsc0001y2gdvl53b5tk	Du pain au gras	4	cmghr2cch0000y2uicygzwv3y	cmghs3e060009y2fiudm4g8kn	2025-10-09 13:07:24.108	2025-10-09 13:07:29.274
cmgjfnfay0003y2gd8ifwt4yr	Quel superbe film !	5	cmghr2cch0000y2uicygzwv3y	cmghs3e040007y2fif38nhf84	2025-10-09 13:07:51.994	2025-10-09 13:07:51.994
cmgjfrr7i0005y2gdvsbkl793	À quand la snowmobile de tiramisu ?	5	cmghr2cch0000y2uicygzwv3y	cmghs3e050008y2fiix3jjewc	2025-10-09 13:11:14.045	2025-10-09 13:11:14.045
cmgjfsdue0007y2gdj924rkh9	Miam	5	cmghr2cch0000y2uicygzwv3y	cmghs3e020004y2fiocsglpsv	2025-10-09 13:11:43.382	2025-10-09 13:11:43.382
cmgjfsoac0009y2gdglbfspli	J'ai un meme de Jojo qui me vient là	4	cmghr2cch0000y2uicygzwv3y	cmghs3e010002y2firfo5p8us	2025-10-09 13:11:56.916	2025-10-09 13:12:00.685
cmgjfvsxg000by2gdxivt5tlw	La quiche lorraine est une variante de quiche, une tarte salée de la cuisine lorraine et de la cuisine française, à base de pâte brisée, de migaine (œufs, crème fraîche), de lardons.\n\nLe nom dériverait du francique lorrain « Kuchen » / « Kuche » que l'on retrouve également en haut-allemand. La francisation a pu se faire via le pluriel de « Kuchen », qui est « Kéich » ou par le diminutif qui se dit « Kichel » en zone rhénane[5]. Par ailleurs, en francique lorrain, le mot « Kich » désigne la cuisine.\n\nLe terme « Kuchen » désigne tout mets salé ou sucré, aux formes les plus diverses à base de pâte, y compris les plus fines comme pour les Flammenkuche ou les Pannkuche (pancake). On désigne par « Kiechle » ou « Kéichelchen[6] » des beignets cuits à la graisse dans une poêle ou dans de l'huile de friture.\n\nIl est rare que, dans les langues germaniques, on ne précise pas la nature même du « Kuchen ». En Lorraine germanophone, le nom pour désigner une tarte varie selon les endroits : der Kuchen et de tart en francique rhénan, de floos en francique mosellan, den Schuedi dans la zone du francique luxembourgeois[7].\n\nL’évolution et la diversité régionale de la quiche\nDans sa description de la vie quotidienne lorraine de l’Ancien Régime, Guy Cabourdin précise que « la qualité de la quiche lorraine, mince et croustillante, était en fonction de la fraîcheur des produits employés ; le lard et l'épaisseur de la migaine ne vinrent qu'au XIXe siècle[8] ».\n\nDe fait, la quiche contemporaine est très épaisse par rapport à la version historique et elle ne se consomme sous cette forme que depuis le XIXe siècle. Il n’est pas déraisonnable de penser qu’à l’instar de nombreux plats initialement campagnards en Lorraine, marqués par la frugalité et la simplicité, l’augmentation du niveau de vie et l’adoption du plat par les citadins bourgeois aient contribué à lui donner une plus grande consistance. Le fait que la quiche soit aujourd’hui associée à une entrée n’est pas sans rapport avec cette évolution historique. En effet, à l’origine dans les campagnes, il n’y avait que très rarement des entrées, mais aussi et surtout parce que la quiche est une collation rapide par manque de temps de la maîtresse de maison le jour de la cuisson du pain.\n\nLa principale différence avec la quiche actuelle réside dans la nature et l’épaisseur de la pâte ; pendant des siècles, ce fut une pâte à pain fine[9], dont l’appareil issu des ingrédients du quotidien se résumait au strict minimum : des œufs battus avec de la crème et un peu de beurre parsemé en copeaux. À la belle saison, on va chercher de la ciboule dans le jardin qu’on émince pour rehausser le goût de l’appareil[10], qu’on appelle en français régional lorrain la migaine.\n\nLa parenté de la quiche originale avec les tartes flambées alsaciennes est flagrante, car ces dernières ont conservé la pratique de la pâte à pain finement étalée avec un appareil proche de la quiche historique. Les Lorrains, qui habitent les régions limitrophes de l’Alsace et qui pratiquent la tarte flambée cuite dans un four à bois personnel, savent par expérience qu’il y a néanmoins une différence de tradition culinaire entre les migaines lorraine et alsacienne : les Lorrains privilégient la crème fraîche alors que les Alsaciens marient fromage blanc (Bibeleskaes) et crème fraîche avec un soupçon de farine. La variante alsacienne se rapproche donc de la fiouse lorraine.\n\nCe plat rural variait beaucoup autrefois de région en région, de la Lorraine germanophone au nord aux Vosges lorraines romanes au sud. Au XIXe siècle, quand Charles Charton écrit Les Vosges pittoresques et historiques, il décrit, par exemple, la galette de Remiremont, en s’indignant du fait que c’est la « galette à laquelle on fait l'injure de l'appeler quiche[11] », ce qui laisse penser que, dans l’esprit des Lorrains méridionaux de cette époque, la quiche est une tarte rapide qu’on fait au dernier moment avec des restes de pâte et une migaine simple.\n\nOn remarque également que c’est le boulanger qui fait la bonne galette alors que la quiche est à l’origine affaire de famille et d’organisation collective en fonction des disponibilités du four commun. Il est vrai aussi que généralement, il n’y a pas d’oignons dans la quiche classique. C’est ce qui pousse un auteur du Cahier lorrain de 1936 à déclarer que la quiche consommée à Remiremont, décrite plus haut, est une importation d’Alsace, sous-entendu non authentique. Dans le même article, l’auteur affirme toutefois qu’à ses yeux la meilleure recette est à base de pâte feuilletée[N 1],[12]. Le caractère subjectif de son récit, et même contestable concernant la pâte employée, montre que la diversité des quiches était de mise.\n\nRien n’infirme l’idée qu’il n’y aurait pas eu par principe du lard dans la quiche avant le XIXe siècle. Toutes les galettes similaires en terres germanophones limitrophes comportent du lard dans leur version actuelle. En Franconie, région francique orientale culturellement proche des franciques lorrains, on continue de pratiquer la quiche fine, appelée « Blootz[13] », garnie en fonction des saisons comme le décrit le site du pays de Hohenlohe sur les spécialités culinaires de cette région : le lard sur le Blootz était pour le dimanche ; pour la version sucrée à l’automne, on utilisait les quetsches ou les pommes. Dans cette région aussi, on aime innover en utilisant aujourd’hui au printemps de l’ail des ours, des asperges ou des chanterelles de saison[14]. De fait, les similitudes entre la Franconie et la Lorraine concernant l’usage du lard pour améliorer le plat dans les meilleures occasions, ou pour faire plaisir à un invité, coïncident avec les pratiques culturelles et culinaires de nombreuses régions de France où on l’aimait sortir de l’ordinaire et marquer le coup par l’ajout d’un ingrédient plus cher et peu répandu.\n\nL’appellation « galette » n’est pas anecdotique. L’inventaire du patrimoine culinaire de la France pour la région lorraine[15] indique les dénominations en usage en 1845 pour ce plat : « quiche ou galette lorraine » ; mais on disait également « quiche au lard », ou « galette au lard du pays messin ». Le linguiste lorrain Jean Lanher évoque également, au XVIIe siècle, la cohabitation dans les Vosges de quiche et « tarte de ménage[16] ». Les précisions géographiques du pays messin, dernier secteur roman avant la Moselle germanophone et plus haut du pays de Remiremont, région tampon avec le pays franc-comtois, apportent un indice fort pour étayer l’idée que les Lorrains de langue romane avaient une prédilection pour le terme « galette » jusqu’au XIXe siècle. Dans la même logique, cela renforce la thèse que le terme « quiche » trouve son origine et son implantation spontanée en Lorraine francique. La quiche francique est certes connue des Lorrains méridionaux, mais les usages linguistiques font cohabiter les deux termes pendant une longue période.\n\nLa lente évolution de la galette lorraine vers la quiche contemporaine sur pâte brisée, voire feuilletée chez certains[N 2], plus épaisse et plus étoffée fait que dans l’esprit des Lorrains la confusion entre les deux plats n’est plus possible : pour tous les locuteurs de français régional lorrain des XXe et XXIe siècles, si un visiteur commande aujourd’hui une galette à une ménagère lorraine, il ne recevra pas de quiche.\n\nLes Vosgiens et Alsaciens ont leur variante de quiche aux lardons : ajout de fromage râpé pour les premiers, d'oignons rissolés pour les seconds[17].\n\nDans les Vosges, il existe une galette qu’on réalise avec des restes de purée et de la farine qu’on étale finement. On ajoute de la crème fraîche, sans œuf, et on enfourne jusqu’à ce que la pâte soit dorée et croustillante[N 3]. Galette et quiche historiques avec la crème fraîche qu'on écume au fur et à mesure du lait frais rappellent le toutché du bûcheron du Haut-Doubs où cette fois ce n'est pas la migaine qui diffère, mais la pâte briochée plus épaisse[N 4].\n\nLe jour de la cuisson du pain\nLes pratiques culinaires actuelles faussent la perception que l’on peut avoir de la quiche sur ses origines. Aujourd’hui, on peut acheter des mini-quiches chez les boulangers pour un en-cas, on enfourne une quiche dans un four électrique ou à gaz, chacun pour soi, dans l’intimité de sa cuisine. On peut la décliner sous toutes les formes avec des ingrédients peu conventionnels comme le thon, la féta ou du brocoli, par exemple. Ceci ne devint possible qu’avec la fin du four communal et la cuisson du pain pour deux semaines, voire plus.\n\nEn effet, le caractère premier de la quiche, galette ou tarte de ménage réside dans le fait qu’elle dépendait entièrement du jour de la cuisson du pain qui se faisait dans le four communal, mais aussi dans le four de la grosse ferme familiale, dans les régions où l’habitat est dispersé comme dans les Hautes-Vosges. La quiche est un plat que l’on doit à la chaleur résiduelle d’un four[18]. Une fois tous les pains cuits, on en profite pour enfourner les tartes salées et sucrées sur moule, ou à même la pierre. Cela en fait une proche parente, voire la forme améliorée de la fiouse lorraine. Le jour de cuisson du pain empêche les maîtresses de maison de préparer un repas plus copieux. Mais cette journée de cuisson permet de savourer les quiches et les tartes autour d’une table conviviale[N 5].\n\nCette dimension conviviale est restée bien après la fin des fours communaux. Quand un ami ou un visiteur passe à l’improviste, on lui dit de rester manger et on prépare rapidement une quiche pour le souper avec une salade verte[19]. Jusque dans les années 1960-1970, il y avait encore des maisons lorraines qui se chauffaient et cuisinaient au bois. On utilisait la chaleur du four pour enfourner des tartes salées et sucrées quand l’occasion se présentait ou quand il y avait des restes de pâte.\n\nProgressivement, la quiche devient synonyme de tarte salée avec un appareil aux œufs, dans lequel on peut intégrer d’autres ingrédients que ceux d’origine. Du coup, on ne parle pas de « quiche aux pommes », par exemple, alors que dans les régions qui cultivent encore la tradition de la tarte fine cuite au four à bois avec les ingrédients du moment, on peut invariablement utiliser le même terme. Cela vaut pour les régions du sud du bassin germanophone[20] qui partagent la tradition de la tarte salée-sucrée le jour de cuisson du pain.	5	cmghr2cch0000y2uicygzwv3y	cmghs3e030006y2firooiyh5q	2025-10-09 13:14:22.899	2025-10-09 13:14:22.899
cmgjfzdwi000dy2gdj8ra4nyf	11000011 10100111 01100001 00100000 01101101 11000011 10101001 01110010 01101001 01110100 01100101 00100000 00110010 00110000 00101111 00110010 00110000	5	cmghr2cch0000y2uicygzwv3y	cmghs3e000001y2fif3oblgsk	2025-10-09 13:17:10.05	2025-10-09 13:17:10.05
cmgjen4hr0003y2np4mcx0r2t	Arrêtez de manger ça s'il vous plaît...	1	cmghr2cch0000y2uicygzwv3y	cmgj4s60i001gy2kkpyjdx6sm	2025-10-09 12:39:38.366	2025-10-09 13:18:35.613
cmgjgey8x000gy2gddjwqzem3	Le plat préféré des Français	1	cmghr2cch0000y2uicygzwv3y	cmgjgehdy000ey2gd8aq6pfc1	2025-10-09 13:29:16.256	2025-10-09 13:29:20.166
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."Favorite" (id, "userId", "recipeId", "createdAt") FROM stdin;
cmgj3o24f0019y2kkihh1h2cx	cmghr2cch0000y2uicygzwv3y	cmghs3e050008y2fiix3jjewc	2025-10-09 07:32:26.175
cmgj3o2r1001by2kkt0hpa8q1	cmghr2cch0000y2uicygzwv3y	cmghs3e060009y2fiudm4g8kn	2025-10-09 07:32:26.989
cmgj6ecti0005y2185jej9ubk	cmghr2cch0000y2uicygzwv3y	cmghs3e020004y2fiocsglpsv	2025-10-09 08:48:52.326
cmgj6edyq0007y218x63k1p1z	cmghr2cch0000y2uicygzwv3y	cmghs3dzx0000y2fiwqm7tfsf	2025-10-09 08:48:53.811
\.


--
-- Data for Name: Recipe; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."Recipe" (id, title, description, image, "prepTime", difficulty, servings, "createdAt", "updatedAt") FROM stdin;
cmghs3dzx0000y2fiwqm7tfsf	Pâtes à la carbonara	Un grand classique italien avec des œufs, du parmesan et des lardons croustillants	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/pates-carbo.webp	20	facile	4	2025-10-08 09:20:39.837	2025-10-09 08:08:18.162
cmghs3e000001y2fif3oblgsk	Poulet rôti aux herbes	Poulet tendre parfumé au thym, romarin et ail, accompagné de légumes rôtis	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/poulet-herbes.jpg	90	moyen	6	2025-10-08 09:20:39.84	2025-10-09 08:08:19.344
cmghs3e010002y2firfo5p8us	Salade César	Salade croquante avec poulet grillé, croûtons, parmesan et sauce César maison	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/salade-cesar.jpg	15	facile	2	2025-10-08 09:20:39.841	2025-10-09 08:08:20.461
cmghs3e010003y2fieei4m3zi	Boeuf bourguignon	Plat mijoté traditionnel français avec bœuf, vin rouge, carottes et champignons	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/boeuf-bourguignon.jpg	180	difficile	6	2025-10-08 09:20:39.842	2025-10-09 08:08:22.082
cmghs3e020004y2fiocsglpsv	Tarte aux pommes	Tarte classique avec compote de pommes et lamelles de pommes caramélisées	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/tarte-pomme.jpg	60	moyen	8	2025-10-08 09:20:39.842	2025-10-09 08:08:23.223
cmghs3e020005y2finbin213b	Risotto aux champignons	Riz crémeux cuit lentement avec champignons, parmesan et vin blanc	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/risotto-champignons.webp	40	moyen	4	2025-10-08 09:20:39.843	2025-10-09 08:08:24.296
cmghs3e030006y2firooiyh5q	Quiche lorraine	Tarte salée garnie de lardons, crème fraîche et œufs sur pâte brisée	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/quiche-lorraine.jpg	50	facile	6	2025-10-08 09:20:39.844	2025-10-09 08:08:25.479
cmghs3e040007y2fif38nhf84	Ratatouille	Mélange de légumes méditerranéens mijotés : aubergines, courgettes, poivrons et tomates	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/Ratatouille.jpg	45	facile	4	2025-10-08 09:20:39.845	2025-10-09 08:08:26.593
cmghs3e050008y2fiix3jjewc	Tiramisu	Dessert italien avec biscuits imbibés de café, mascarpone et cacao	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/tiramisu.jpg	30	facile	8	2025-10-08 09:20:39.845	2025-10-09 08:08:27.67
cmghs3e060009y2fiudm4g8kn	Soupe à l'oignon gratinée	Soupe traditionnelle française avec oignons caramélisés, bouillon et fromage gratiné	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/soupe-oignons.jpg	60	moyen	4	2025-10-08 09:20:39.846	2025-10-09 08:08:28.762
cmgjgehdy000ey2gd8aq6pfc1	Couscous	C'est un couscous	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/24e29114642571ced968926ba846ff0d.jpg	45	moyen	6	2025-10-09 13:28:54.406	2025-10-09 13:28:54.406
cmgj4s60i001gy2kkpyjdx6sm	Raclette	C'est pas si bon, mais remplie bien le bide.	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/1814d8d702e2ba88acfdb24769bda5ec.jpg	25	facile	6	2025-10-09 08:03:37.457	2025-10-09 13:29:56.827
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."User" (id, name, email, "emailVerified", image, "createdAt", "updatedAt", password) FROM stdin;
cmghr2cch0000y2uicygzwv3y	Miniluchi	nathan.oger@pm.me	\N	\N	2025-10-08 08:51:51.425	2025-10-08 08:51:51.425	$2b$10$QaDb/URKo8u4NFLE6y0zZeIV/Eff3ZYE4SRRwFTwIPKaZFC3qEAfK
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: SCHEMA; Owner: postgres
--

COPY "SCHEMA"._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d7b90c93-1658-40c3-a3b3-c8378deb13fc	673ceef8d1cc684417254806034e8a400d0233a4490065f5408fb93189eaba3a	2025-10-08 07:36:23.828341+00	20251008073623_initial_migration	\N	\N	2025-10-08 07:36:23.787155+00	1
fcbd70b8-e1e3-4093-a2e1-7343dba506c2	ab80a534dfa4779eeae4ae5aeac192eea19b283671d6083c8f112e3c8a4229df	2025-10-08 08:51:41.262929+00	20251008085135_clear	\N	\N	2025-10-08 08:51:41.260665+00	1
d3cff288-95af-432e-aea0-9a94e2a870da	428f1aebfcaf29abfb5d229212b922fbeaf68e50a06f0aeb2985a56e746b7ad3	2025-10-08 09:02:24.03124+00	20251008090224_recipes	\N	\N	2025-10-08 09:02:24.016453+00	1
bc492a00-6a65-4352-89f5-a5e01b308b19	d31096b748da5bf4adbab67ce96cbddfb5dd2bdc2bf652d8900637e445b81d4d	2025-10-09 07:06:57.626133+00	20251009070657_favorites_addition	\N	\N	2025-10-09 07:06:57.603539+00	1
9f3849df-2ae5-4adb-a518-d153aaebb96e	134d4967ff774734f8251549bc526e2645d6275d82f2ad62f1875d8dc0df9146	2025-10-09 12:25:03.759344+00	20251009122503_comments	\N	\N	2025-10-09 12:25:03.735203+00	1
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: Authenticator Authenticator_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Authenticator"
    ADD CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId", "credentialID");


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Favorite Favorite_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (id);


--
-- Name: Recipe Recipe_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Recipe"
    ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Authenticator_credentialID_key; Type: INDEX; Schema: SCHEMA; Owner: postgres
--

CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "SCHEMA"."Authenticator" USING btree ("credentialID");


--
-- Name: Comment_recipeId_idx; Type: INDEX; Schema: SCHEMA; Owner: postgres
--

CREATE INDEX "Comment_recipeId_idx" ON "SCHEMA"."Comment" USING btree ("recipeId");


--
-- Name: Comment_userId_idx; Type: INDEX; Schema: SCHEMA; Owner: postgres
--

CREATE INDEX "Comment_userId_idx" ON "SCHEMA"."Comment" USING btree ("userId");


--
-- Name: Favorite_userId_recipeId_key; Type: INDEX; Schema: SCHEMA; Owner: postgres
--

CREATE UNIQUE INDEX "Favorite_userId_recipeId_key" ON "SCHEMA"."Favorite" USING btree ("userId", "recipeId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: SCHEMA; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON "SCHEMA"."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: SCHEMA; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON "SCHEMA"."User" USING btree (email);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Authenticator Authenticator_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Authenticator"
    ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_recipeId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Comment"
    ADD CONSTRAINT "Comment_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "SCHEMA"."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorite Favorite_recipeId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Favorite"
    ADD CONSTRAINT "Favorite_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "SCHEMA"."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorite Favorite_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Favorite"
    ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: postgres
--

ALTER TABLE ONLY "SCHEMA"."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict AAp3MH8DLauR3qRmQPJtxu6AZcdro0TENMNQjgMq2vTYlkfDccuSbg7pm5cy3Rj

