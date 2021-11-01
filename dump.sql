--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: komisija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.komisija (
    id integer NOT NULL,
    naziv text,
    akronim text
);


ALTER TABLE public.komisija OWNER TO postgres;

--
-- Name: komisija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.komisija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.komisija_id_seq OWNER TO postgres;

--
-- Name: komisija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.komisija_id_seq OWNED BY public.komisija.id;


--
-- Name: zastupnik; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zastupnik (
    id integer NOT NULL,
    ime text,
    prezime text,
    nacionalni_klub text,
    klub text,
    datum_rodjenja date,
    mjesto_rodjenja text,
    otac text,
    majka text,
    razina_obrazovanja text
);


ALTER TABLE public.zastupnik OWNER TO postgres;

--
-- Name: zastupnik_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zastupnik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zastupnik_id_seq OWNER TO postgres;

--
-- Name: zastupnik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.zastupnik_id_seq OWNED BY public.zastupnik.id;


--
-- Name: zastupnik_komisija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zastupnik_komisija (
    komisija_id integer NOT NULL,
    zastupnik_id integer NOT NULL,
    uloga text
);


ALTER TABLE public.zastupnik_komisija OWNER TO postgres;

--
-- Name: komisija id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komisija ALTER COLUMN id SET DEFAULT nextval('public.komisija_id_seq'::regclass);


--
-- Name: zastupnik id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zastupnik ALTER COLUMN id SET DEFAULT nextval('public.zastupnik_id_seq'::regclass);


--
-- Data for Name: komisija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.komisija (id, naziv, akronim) FROM stdin;
1	Odbor za vanjske poslove	AFET
2	Odbor za kulturu i obrazovanje	CULT
3	Pododbor za sigurnost i obranu\n	SEDE
4	Odbor za unutarnje tržište i zaštitu potrošača	IMCO
5	Odbor za okoliš, javno zdravlje i sigurnost hrane	ENVI
6	Posebni odbor za umjetnu inteligenciju u digitalnom dobu	AIDA
7	Odbor za proračune	BUDG
8	Odbor za građanske slobode, pravosuđe i unutarnje poslove	LIBE
9	Odbor za industriju, istraživanje i energetiku	ITRE
10	Odbor za promet i turizam	TRAN
11	Odbor za poljoprivredu i ruralni razvoj	AGRI
12	Posebni odbor za vanjsko upletanje u sve demokratske procese u Europskoj uniji, uključujući dezinformiranje	INGE
13	Posebni odbor za borbu protiv raka	BECA
14	Odbor za ribarstvo	PECH
15	Odbor za regionalni razvoj	REGI
16	Odbor za prava žena i rodnu ravnopravnost	FEMM
17	Odbor za pravna pitanja	JURI
18	Odbor za građanske slobode, pravosuđe i unutarnje poslove	LIBE
\.


--
-- Data for Name: zastupnik; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zastupnik (id, ime, prezime, nacionalni_klub, klub, datum_rodjenja, mjesto_rodjenja, otac, majka, razina_obrazovanja) FROM stdin;
2	Biljana	Borzan	SDP	Klub zastupnika Progresivnog saveza socijalista i demokrata u Europskom parlamentu	1971-11-29	Osijek	Jovo	Rosa	poslijediplomski sveučilišni (doktorski) studiji
3	Valter	Flego	IDS	Klub zastupnika Renew Europe	1972-08-15	Koper	Đino	Marija	sveučilišni diplomski studiji
4	Sunčana	Glavak	HDZ	Klub zastupnika Europske pučke stranke	1968-12-09	Čakovec	\N	\N	poslijediplomski sveučilišni (doktorski) studiji
5	Ladislav	Ilčić	HRAST	Europski konzervativci i reformisti	1970-08-04	Varaždin	Stanko	Julijana	poslijediplomski sveučilišni (doktorski) studiji
6	Tonino	Picula	SDP	Klub zastupnika Progresivnog saveza socijalista i demokrata u Europskom parlamentu	1961-08-31	Mali Lošinj	\N	\N	sveučilišni diplomski studiji
7	Predrag Fred	Matić	SDP	Klub zastupnika Progresivnog saveza socijalista i demokrata u Europskom parlamentu	1962-06-02	Požega	Stanko	\N	sveučilišni preddiplomski studiji
8	Mislav	Kolakušić	\N	Nezavisni zastupnici	1969-09-15	Zagreb	\N	\N	sveučilišni diplomski studiji
9	Romana	Jerković	SDP	Klub zastupnika Progresivnog saveza socijalista i demokrata u Europskom parlamentu	1964-11-28	Split	\N	\N	poslijediplomski sveučilišni (doktorski) studiji
10	Ivan Vilibor	Sinčić	Živi zid	Nezavisni zastupnici	1990-08-28	Karlovac	Ivan	Marija	sveučilišni preddiplomski studiji
1	Karlo	Ressler	HDZ	Klub zastupnika Europske pučke stranke	1989-12-26	Zagreb	Dubravko	Ančica	magistarski studiji
11	Tomislav	Sokol	HDZ	Klub zastupnika Europske pučke stranke	1982-09-20	Zagreb	\N	\N	magistarski studiji
12	Željana	Zovko	HDZ\n	Klub zastupnika Europske pučke stranke	1970-03-25	Mostar	\N	\N	sveučilišni diplomski studiji
\.


--
-- Data for Name: zastupnik_komisija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zastupnik_komisija (komisija_id, zastupnik_id, uloga) FROM stdin;
1	12	potpredsjednik
2	12	zamjenik
3	12	zamjenik
4	2	clan
5	2	zamjenik
6	1	potpredsjenik
7	1	clan
8	1	zamjenik
9	3	clan
10	3	zamjenik
11	3	zamjenik
1	4	clan
12	4	clan
5	4	zamjenik
13	4	zamjenik
9	5	zamjenik
11	5	zamjenik
14	5	clan
1	6	clan
12	6	clan
15	6	zamjenik
11	6	zamjenik
3	6	zamjenik
14	7	clan
2	7	zamjenik
16	7	zamjenik
7	8	clan
17	8	clan
18	8	zamjenik
9	9	clan
5	9	zamjenik
13	9	zamjenik
5	10	clan
9	10	zamjenik
11	10	zamjenik
4	11	clan
15	11	zamjenik
13	11	zamjenik
\.


--
-- Name: komisija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.komisija_id_seq', 18, true);


--
-- Name: zastupnik_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.zastupnik_id_seq', 12, true);


--
-- Name: komisija komisija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.komisija
    ADD CONSTRAINT komisija_pkey PRIMARY KEY (id);


--
-- Name: zastupnik_komisija zastupnik_komisija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zastupnik_komisija
    ADD CONSTRAINT zastupnik_komisija_pkey PRIMARY KEY (komisija_id, zastupnik_id);


--
-- Name: zastupnik zastupnik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zastupnik
    ADD CONSTRAINT zastupnik_pkey PRIMARY KEY (id);


--
-- Name: fki_fk_zastupnik_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_zastupnik_id ON public.zastupnik_komisija USING btree (zastupnik_id);


--
-- Name: zastupnik_komisija fk_komisija_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zastupnik_komisija
    ADD CONSTRAINT fk_komisija_id FOREIGN KEY (komisija_id) REFERENCES public.komisija(id);


--
-- Name: zastupnik_komisija fk_zastupnik_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zastupnik_komisija
    ADD CONSTRAINT fk_zastupnik_id FOREIGN KEY (zastupnik_id) REFERENCES public.zastupnik(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

