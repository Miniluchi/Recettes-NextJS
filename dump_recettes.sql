--
-- PostgreSQL database dump
--

\restrict LhygpdSMn2PUTq9c4CSWhWpS3RrgX1te16U7JZgFLOfN1r7JB9Y3lvDRdtuePWq

-- Dumped from database version 13.22
-- Dumped by pg_dump version 14.19 (Homebrew)

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

ALTER TABLE IF EXISTS ONLY "SCHEMA"."Session" DROP CONSTRAINT IF EXISTS "Session_userId_fkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Favorite" DROP CONSTRAINT IF EXISTS "Favorite_userId_fkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Favorite" DROP CONSTRAINT IF EXISTS "Favorite_recipeId_fkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Authenticator" DROP CONSTRAINT IF EXISTS "Authenticator_userId_fkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Account" DROP CONSTRAINT IF EXISTS "Account_userId_fkey";
DROP INDEX IF EXISTS "SCHEMA"."User_email_key";
DROP INDEX IF EXISTS "SCHEMA"."Session_sessionToken_key";
DROP INDEX IF EXISTS "SCHEMA"."Favorite_userId_recipeId_key";
DROP INDEX IF EXISTS "SCHEMA"."Authenticator_credentialID_key";
ALTER TABLE IF EXISTS ONLY "SCHEMA"._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY "SCHEMA"."VerificationToken" DROP CONSTRAINT IF EXISTS "VerificationToken_pkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Recipe" DROP CONSTRAINT IF EXISTS "Recipe_pkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Favorite" DROP CONSTRAINT IF EXISTS "Favorite_pkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Authenticator" DROP CONSTRAINT IF EXISTS "Authenticator_pkey";
ALTER TABLE IF EXISTS ONLY "SCHEMA"."Account" DROP CONSTRAINT IF EXISTS "Account_pkey";
DROP TABLE IF EXISTS "SCHEMA"._prisma_migrations;
DROP TABLE IF EXISTS "SCHEMA"."VerificationToken";
DROP TABLE IF EXISTS "SCHEMA"."User";
DROP TABLE IF EXISTS "SCHEMA"."Session";
DROP TABLE IF EXISTS "SCHEMA"."Recipe";
DROP TABLE IF EXISTS "SCHEMA"."Favorite";
DROP TABLE IF EXISTS "SCHEMA"."Authenticator";
DROP TABLE IF EXISTS "SCHEMA"."Account";
DROP TYPE IF EXISTS "SCHEMA"."Difficulty";
DROP SCHEMA IF EXISTS "SCHEMA";
--
-- Name: SCHEMA; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "SCHEMA";


--
-- Name: Difficulty; Type: TYPE; Schema: SCHEMA; Owner: -
--

CREATE TYPE "SCHEMA"."Difficulty" AS ENUM (
    'facile',
    'moyen',
    'difficile'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: SCHEMA; Owner: -
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


--
-- Name: Authenticator; Type: TABLE; Schema: SCHEMA; Owner: -
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


--
-- Name: Favorite; Type: TABLE; Schema: SCHEMA; Owner: -
--

CREATE TABLE "SCHEMA"."Favorite" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "recipeId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Recipe; Type: TABLE; Schema: SCHEMA; Owner: -
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


--
-- Name: Session; Type: TABLE; Schema: SCHEMA; Owner: -
--

CREATE TABLE "SCHEMA"."Session" (
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: SCHEMA; Owner: -
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


--
-- Name: VerificationToken; Type: TABLE; Schema: SCHEMA; Owner: -
--

CREATE TABLE "SCHEMA"."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: SCHEMA; Owner: -
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


--
-- Data for Name: Account; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Authenticator; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"."Authenticator" ("credentialID", "userId", "providerAccountId", "credentialPublicKey", counter, "credentialDeviceType", "credentialBackedUp", transports) FROM stdin;
\.


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"."Favorite" (id, "userId", "recipeId", "createdAt") FROM stdin;
cmgj3o24f0019y2kkihh1h2cx	cmghr2cch0000y2uicygzwv3y	cmghs3e050008y2fiix3jjewc	2025-10-09 07:32:26.175
cmgj3o2r1001by2kkt0hpa8q1	cmghr2cch0000y2uicygzwv3y	cmghs3e060009y2fiudm4g8kn	2025-10-09 07:32:26.989
cmgj3o6j4001dy2kksx3zpwh8	cmghr2cch0000y2uicygzwv3y	cmghs3e010002y2firfo5p8us	2025-10-09 07:32:31.889
cmgj4au4u001fy2kkqqr7xxcu	cmghr2cch0000y2uicygzwv3y	cmghs3e040007y2fif38nhf84	2025-10-09 07:50:08.91
\.


--
-- Data for Name: Recipe; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"."Recipe" (id, title, description, image, "prepTime", difficulty, servings, "createdAt", "updatedAt") FROM stdin;
cmgj4s60i001gy2kkpyjdx6sm	Raclette	C'est pas si bon, mais remplie le bide.	https://pub-014c790ffa9b426f85feb6fd8217cd28.r2.dev/recipes/1814d8d702e2ba88acfdb24769bda5ec.jpg	25	facile	6	2025-10-09 08:03:37.457	2025-10-09 08:03:37.457
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
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"."User" (id, name, email, "emailVerified", image, "createdAt", "updatedAt", password) FROM stdin;
cmghr2cch0000y2uicygzwv3y	Miniluchi	nathan.oger@pm.me	\N	\N	2025-10-08 08:51:51.425	2025-10-08 08:51:51.425	$2b$10$QaDb/URKo8u4NFLE6y0zZeIV/Eff3ZYE4SRRwFTwIPKaZFC3qEAfK
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: SCHEMA; Owner: -
--

COPY "SCHEMA"._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d7b90c93-1658-40c3-a3b3-c8378deb13fc	673ceef8d1cc684417254806034e8a400d0233a4490065f5408fb93189eaba3a	2025-10-08 07:36:23.828341+00	20251008073623_initial_migration	\N	\N	2025-10-08 07:36:23.787155+00	1
fcbd70b8-e1e3-4093-a2e1-7343dba506c2	ab80a534dfa4779eeae4ae5aeac192eea19b283671d6083c8f112e3c8a4229df	2025-10-08 08:51:41.262929+00	20251008085135_clear	\N	\N	2025-10-08 08:51:41.260665+00	1
d3cff288-95af-432e-aea0-9a94e2a870da	428f1aebfcaf29abfb5d229212b922fbeaf68e50a06f0aeb2985a56e746b7ad3	2025-10-08 09:02:24.03124+00	20251008090224_recipes	\N	\N	2025-10-08 09:02:24.016453+00	1
bc492a00-6a65-4352-89f5-a5e01b308b19	d31096b748da5bf4adbab67ce96cbddfb5dd2bdc2bf652d8900637e445b81d4d	2025-10-09 07:06:57.626133+00	20251009070657_favorites_addition	\N	\N	2025-10-09 07:06:57.603539+00	1
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: Authenticator Authenticator_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Authenticator"
    ADD CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId", "credentialID");


--
-- Name: Favorite Favorite_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Favorite"
    ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY (id);


--
-- Name: Recipe Recipe_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Recipe"
    ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (identifier, token);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Authenticator_credentialID_key; Type: INDEX; Schema: SCHEMA; Owner: -
--

CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "SCHEMA"."Authenticator" USING btree ("credentialID");


--
-- Name: Favorite_userId_recipeId_key; Type: INDEX; Schema: SCHEMA; Owner: -
--

CREATE UNIQUE INDEX "Favorite_userId_recipeId_key" ON "SCHEMA"."Favorite" USING btree ("userId", "recipeId");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: SCHEMA; Owner: -
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON "SCHEMA"."Session" USING btree ("sessionToken");


--
-- Name: User_email_key; Type: INDEX; Schema: SCHEMA; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON "SCHEMA"."User" USING btree (email);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Authenticator Authenticator_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Authenticator"
    ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorite Favorite_recipeId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Favorite"
    ADD CONSTRAINT "Favorite_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "SCHEMA"."Recipe"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Favorite Favorite_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Favorite"
    ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: SCHEMA; Owner: -
--

ALTER TABLE ONLY "SCHEMA"."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SCHEMA"."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict LhygpdSMn2PUTq9c4CSWhWpS3RrgX1te16U7JZgFLOfN1r7JB9Y3lvDRdtuePWq

