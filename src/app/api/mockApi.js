/**
 * Mock API Service for Demo Mode
 * This module intercepts API calls and returns demo data when running in demo mode.
 */

// Demo mode flag - set to true to enable demo mode
const DEMO_MODE = true;

// Demo user credentials for login
const DEMO_CREDENTIALS = {
  email: "demo@soboldigital.ma",
  password: "demo123",
  demoUsers: [
    {
      email: "demo@soboldigital.ma",
      password: "demo123",
      role: "adherent",
    },
    {
      email: "admin@soboldigital.ma",
      password: "admin123",
      role: "admin",
    },
  ],
};

// Demo adherent profiles (service providers) with pravatar profile pictures
const DEMO_ADHERENTS = [
  {
    id: 1,
    user_id: 101,
    email: "ayadi.oussama@email.ma",
    id_name: "AYADI Oussama",
    profession: "Développeur Full Stack",
    secteur_id: 1,
    secteur: { lib: "Développement Web" },
    ville: "Casablanca",
    rating: 4.8,
    myRating: null,
    propos:
      "Développeur web passionné avec plus de 5 ans d'expérience. Spécialisé dans les technologies React, Node.js et les bases de données relationnelles. Passionné par la création d'expériences utilisateur fluides et performantes.",
    img_path: "https://i.pravatar.cc/300?img=11",
  },
  {
    id: 2,
    user_id: 102,
    email: "elamrani.fatima@email.ma",
    id_name: "EL AMRANI Fatima",
    profession: "Designer Graphique",
    secteur_id: 2,
    secteur: { lib: "Design Graphique" },
    ville: "Rabat",
    rating: 4.9,
    myRating: null,
    propos:
      "Designer graphique créative avec une passion pour le branding et l'identité visuelle. J'aide les entreprises à se démarquer grâce à des designs uniques et mémorables.",
    img_path: "https://i.pravatar.cc/300?img=5",
  },
  {
    id: 3,
    user_id: 103,
    email: "khaldi.mohamed@email.ma",
    id_name: "KHALDI Mohamed",
    profession: "Expert Marketing Digital",
    secteur_id: 3,
    secteur: { lib: "Marketing Digital" },
    ville: "Marrakech",
    rating: 4.7,
    myRating: null,
    propos:
      "Expert en marketing digital certifié Google Ads et Meta Ads. J'accompagne les entreprises dans leur croissance en ligne grâce à des stratégies marketing personnalisées et efficaces.",
    img_path: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: 4,
    user_id: 104,
    email: "bensalem.kenza@email.ma",
    id_name: "BENSALEM Kenza",
    profession: "Formatrice en Langues",
    secteur_id: 4,
    secteur: { lib: "Formation" },
    ville: "Casablanca",
    rating: 4.9,
    myRating: null,
    propos:
      "Formatrice certifiée en anglais et français pour adultes et enfants. Méthodologie personnalisée pour chaque apprenant. Préparation aux examens TOEFL, IELTS et DELF.",
    img_path: "https://i.pravatar.cc/300?img=9",
  },
  {
    id: 5,
    user_id: 105,
    email: "nouiri.amine@email.ma",
    id_name: "NOUIRI Amine",
    profession: "Consultant en Stratégie",
    secteur_id: 5,
    secteur: { lib: "Conseil" },
    ville: "Rabat",
    rating: 4.6,
    myRating: null,
    propos:
      "Consultant stratégique avec une expertise en transformation digitale et gestion de projet. J'aide les entreprises à optimiser leurs processus et à adopter les meilleures pratiques.",
    img_path: "https://i.pravatar.cc/300?img=8",
  },
  {
    id: 6,
    user_id: 106,
    email: "tazi.sara@email.ma",
    id_name: "TAZI Sara",
    profession: "Développeuse Mobile",
    secteur_id: 8,
    secteur: { lib: "Développement Mobile" },
    ville: "Casablanca",
    rating: 4.8,
    myRating: null,
    propos:
      "Développeuse mobile spécialisée en applications iOS et Android. Expérience avec Flutter, React Native et Swift. Création d'applications modernes et performantes.",
    img_path: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 7,
    user_id: 107,
    email: "idrissi.youssef@email.ma",
    id_name: "IDRISSI Youssef",
    profession: "Vidéaste & Motion Designer",
    secteur_id: 6,
    secteur: { lib: "Infographie" },
    ville: "Marrakech",
    rating: 4.7,
    myRating: null,
    propos:
      "Créateur de contenu vidéo et animation 3D. Spécialisé dans le motion design, le montage vidéo et la création d'animations pour réseaux sociaux et publicités.",
    img_path: "https://i.pravatar.cc/300?img=13",
  },
  {
    id: 8,
    user_id: 108,
    email: "bouchama.levis@email.ma",
    id_name: "BOUCHAMA Levis",
    profession: "Rédacteur de Contenu",
    secteur_id: 7,
    secteur: { lib: "Rédaction" },
    ville: "Fès",
    rating: 4.5,
    myRating: null,
    propos:
      "Rédacteur professionnel et copywriter. Création de contenu web optimisé SEO, articles de blog, descriptions produits et contenus marketing persuasifs.",
    img_path: "https://i.pravatar.cc/300?img=3",
  },
];

// Demo current user (for logged in state)
const DEMO_CURRENT_USER = {
  id: 1,
  user_id: 101,
  email: "demo@soboldigital.ma",
  id_name: "AYADI Oussama",
  profession: "Développeur Full Stack",
  secteur_id: 1,
  secteur: { lib: "Développement Web" },
  ville: "Casablanca",
  rating: 4.8,
  propos: "Développeur web passionné avec plus de 5 ans d'expérience.",
  role: "adherent",
};

// Demo cities for filtering
const DEMO_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
];

// Simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock login API
 */
export const mockLogin = async (email, password) => {
  await delay(500);

  // Check against demo credentials
  if (email === "demo@soboldigital.ma" && password === "demo123") {
    return {
      user: DEMO_CURRENT_USER,
      token: "demo_token_123456789",
      message: "success",
    };
  }

  // Check if it's one of the adherent profiles
  const adherent = DEMO_ADHERENTS.find((a) => a.email === email);
  if (adherent && password === "demo123") {
    return {
      user: { ...adherent, role: "adherent" },
      token: "demo_token_" + adherent.user_id,
      message: "success",
    };
  }

  throw new Error("Email ou mot de passe incorrect");
};

/**
 * Mock get adherent by ID
 */
export const mockGetAdherent = async (id) => {
  await delay(300);
  const adherent = DEMO_ADHERENTS.find(
    (a) => a.user_id === parseInt(id) || a.id === parseInt(id),
  );
  if (adherent) {
    return adherent;
  }
  throw new Error("Adherent not found");
};

/**
 * Mock get all adherents
 */
export const mockGetAdherents = async (
  search = "",
  query = {},
  token = null,
) => {
  await delay(500);

  let filteredAdherents = [...DEMO_ADHERENTS];

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredAdherents = filteredAdherents.filter(
      (a) =>
        a.id_name.toLowerCase().includes(searchLower) ||
        a.profession.toLowerCase().includes(searchLower) ||
        a.ville.toLowerCase().includes(searchLower),
    );
  }

  // Filter by city
  if (query.cities && query.cities.length > 0) {
    filteredAdherents = filteredAdherents.filter((a) =>
      query.cities.includes(a.ville),
    );
  }

  // Filter by secteur
  if (query.secteur_id) {
    filteredAdherents = filteredAdherents.filter(
      (a) => a.secteur_id === parseInt(query.secteur_id),
    );
  }

  // Sorting
  if (query.sort === "rating") {
    filteredAdherents.sort((a, b) => b.rating - a.rating);
  } else if (query.sort === "recent") {
    filteredAdherents.sort((a, b) => b.id - a.id);
  } else if (query.sort === "ancien") {
    filteredAdherents.sort((a, b) => a.id - b.id);
  }

  // Pagination
  const page = 1;
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedAdherents = filteredAdherents.slice(start, end);

  return {
    data: paginatedAdherents.map((a) => ({
      user_id: a.user_id,
      id: a.id_name,
      profession: a.profession,
      ville: a.ville,
      rating: a.rating,
      img: a.img_path,
      secteur_id: a.secteur_id,
    })),
    last_page: Math.ceil(filteredAdherents.length / perPage),
    current_page: page,
    total: filteredAdherents.length,
  };
};

/**
 * Mock get all sectors (categories)
 */
export const mockGetSectors = async () => {
  await delay(300);
  return [
    {
      id: 1,
      lib: "Développement Web",
      description: "Création de sites web et applications",
    },
    {
      id: 2,
      lib: "Design Graphique",
      description: "Logos, affiches, branding",
    },
    {
      id: 3,
      lib: "Marketing Digital",
      description: "SEO, réseaux sociaux, publicité",
    },
    {
      id: 4,
      lib: "Formation",
      description: "Cours particuliers et formations professionnelles",
    },
    {
      id: 5,
      lib: "Conseil",
      description: "Conseil en stratégie et gestion d'entreprise",
    },
    { id: 6, lib: "Infographie", description: "Montage vidéo, animation 3D" },
    {
      id: 7,
      lib: "Rédaction",
      description: "Rédaction de contenu, copywriting",
    },
    {
      id: 8,
      lib: "Développement Mobile",
      description: "Applications iOS et Android",
    },
  ];
};

/**
 * Mock get all cities
 */
export const mockGetCities = async () => {
  await delay(200);
  return DEMO_CITIES;
};

/**
 * Mock get announcements by adherent ID (for profile page)
 */
export const mockGetAnnouncesByAdherent = async (adherentId) => {
  await delay(400);
  const allAnnouncements = [
    {
      id: 1,
      adherent_id: 101,
      prenom: "Hamza",
      nom: "Maach",
      title: "Création de Site Web Professionnel",
      description:
        "Je crée des sites web modernes et responsives avec React, Node.js et PostgreSQL. Includes UI/UX design, API REST, base de données et déploiement. Prix compétitifs et livraison rapide.",
      categorie: "Développement Web",
      price: "À partir de 2500 DH",
      delivery: "7 jours",
      created_at: "2026-01-15",
      img: "https://i.pravatar.cc/300?img=11",
    },
    {
      id: 2,
      adherent_id: 102,
      title: "Design d'Identité Visuelle Complète",
      description:
        "Je conçois l'identité visuelle complète de votre entreprise: logo, palette de couleurs, typographie, charte graphique et guidelines. Transformez votre image de marque.",
      categorie: "Design Graphique",
      price: "1500 DH",
      delivery: "5 jours",
      created_at: "2026-01-14",
      img: "https://i.pravatar.cc/300?img=5",
    },
    {
      id: 3,
      adherent_id: 103,
      title: "Audit SEO & Stratégie Marketing",
      description:
        "Analyse complète de votre présence en ligne avec rapport détaillé et plan d'action pour améliorer votre référencement naturel. Augmentez votre visibilité et vos conversions.",
      categorie: "Marketing Digital",
      price: "800 DH",
      delivery: "3 jours",
      created_at: "2026-01-13",
      img: "https://i.pravatar.cc/300?img=12",
    },
    {
      id: 4,
      adherent_id: 104,
      title: "Cours d'Anglais pour Professionnels",
      description:
        "Cours d'anglais professionnels adaptés à votre secteur d'activité. Conversation, grammaire, vocabulaire professionnel. Supports pédagogiques inclus. Possibilité de collectifs.",
      categorie: "Formation",
      price: "200 DH/heure",
      delivery: "Cours en ligne ou présentiel",
      created_at: "2026-01-12",
      img: "https://i.pravatar.cc/300?img=9",
    },
    {
      id: 5,
      adherent_id: 105,
      title: "Conseil en Transformation Digitale",
      description:
        "Accompagnement personnalisé pour moderniser vos processus et intégrer les outils numériques adaptés à votre entreprise. Audit, road map et mise en œuvre.",
      categorie: "Conseil",
      price: "1500 DH/jour",
      delivery: "Consultation initiale offerte",
      created_at: "2026-01-11",
      img: "https://i.pravatar.cc/300?img=8",
    },
    {
      id: 6,
      adherent_id: 106,
      title: "Développement Application Mobile",
      description:
        "Création d'applications mobiles iOS et Android avec Flutter. Design moderne, performances optimales et déployées sur les stores. Maintenance incluse.",
      categorie: "Développement Mobile",
      price: "À partir de 5000 DH",
      delivery: "14 jours",
      created_at: "2026-01-10",
      img: "https://i.pravatar.cc/300?img=1",
    },
    {
      id: 7,
      adherent_id: 107,
      title: "Production Vidéo & Motion Design",
      description:
        "Création de vidéos promotionnelles, motion graphics, animations 2D/3D pour vos réseaux sociaux et publicités. Montage professionnel avec effets spéciaux.",
      categorie: "Infographie",
      price: "1000 DH",
      delivery: "5 jours",
      created_at: "2026-01-09",
      img: "https://i.pravatar.cc/300?img=3",
    },
    {
      id: 8,
      adherent_id: 108,
      title: "Rédaction Content Marketing",
      description:
        "Rédaction d'articles de blog, contenus SEO, descriptions produits et textes marketing. Style adaptatif à votre tone of voice et optimisation pour les moteurs de recherche.",
      categorie: "Rédaction",
      price: "300 DH/article",
      delivery: "48 heures",
      created_at: "2026-01-08",
      img: "https://i.pravatar.cc/300?img=10",
    },
  ];

  // Filter by adherent ID and add order
  const filteredAnnouncements = allAnnouncements
    .filter((a) => a.adherent_id === parseInt(adherentId))
    .map((a, index) => ({ ...a, order: index }));

  return filteredAnnouncements;
};

/**
 * Mock get announcements
 */
export const mockGetAnnouncements = async () => {
  await delay(400);
  return [
    {
      id: 1,
      adherent_id: 101,
      prenom: "Yassine",
      nom: "Bennani",
      title: "Création de Site Web Professionnel",
      description:
        "Je crée des sites web modernes et responsives avec React, Node.js et PostgreSQL. Includes UI/UX design, API REST, base de données et déploiement. Prix compétitifs et livraison rapide.",
      categorie: "Développement Web",
      price: "À partir de 2500 DH",
      delivery: "7 jours",
      created_at: "2026-03-18",
      adherent_img: "https://i.pravatar.cc/300?img=11",
      img: "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/272297881/original/ecc7a2b8edd89d6b7f1917cb63c3e9242e386621/build-website-using-mongo-db-postgresql-express-js-react-js-node-js.png",
    },
    {
      id: 2,
      adherent_id: 102,
      prenom: "Salma",
      nom: "El Amrani",
      title: "Design d'Identité Visuelle Complète",
      description:
        "Je conçois l'identité visuelle complète de votre entreprise: logo, palette de couleurs, typographie, charte graphique et guidelines. Transformez votre image de marque.",
      categorie: "Design Graphique",
      price: "1500 DH",
      delivery: "5 jours",
      created_at: "2026-02-27",
      adherent_img: "https://i.pravatar.cc/300?img=5",
      img: "https://www.tailorbrands.com/wp-content/uploads/2018/12/Header-color-combinations.jpg",
    },
    {
      id: 3,
      adherent_id: 103,
      prenom: "Omar",
      nom: "Alaoui",
      title: "Audit SEO & Stratégie Marketing",
      description:
        "Analyse complète de votre présence en ligne avec rapport détaillé et plan d'action pour améliorer votre référencement naturel. Augmentez votre visibilité et vos conversions.",
      categorie: "Marketing Digital",
      price: "800 DH",
      delivery: "3 jours",
      created_at: "2026-04-02",
      adherent_img: "https://i.pravatar.cc/300?img=12",
      img: "https://audreytips.com/wp-content/uploads/2017/04/5-astuces-pour-augmenter-votre-visibilite-sur-le-web-3.jpg",
    },
    {
      id: 4,
      adherent_id: 104,
      prenom: "Nadia",
      nom: "Kabbaj",
      title: "Cours d'Anglais pour Professionnels",
      description:
        "Cours d'anglais professionnels adaptés à votre secteur d'activité. Conversation, grammaire, vocabulaire professionnel. Supports pédagogiques inclus. Possibilité de collectifs.",
      categorie: "Formation",
      price: "200 DH/heure",
      delivery: "Cours en ligne ou présentiel",
      created_at: "2026-03-05",
      adherent_img: "https://i.pravatar.cc/300?img=9",
      img: "https://www.globallingua.ca/hubfs/cours-adultes.jpg",
    },
    {
      id: 5,
      adherent_id: 105,
      prenom: "Karim",
      nom: "Toumi",
      title: "Conseil en Transformation Digitale",
      description:
        "Accompagnement personnalisé pour moderniser vos processus et intégrer les outils numériques adaptés à votre entreprise. Audit, road map et mise en œuvre.",
      categorie: "Conseil",
      price: "1500 DH/jour",
      delivery: "Consultation initiale offerte",
      created_at: "2026-01-22",
      adherent_img: "https://i.pravatar.cc/300?img=8",
      img: "https://formation-pro.grenoble-inp.fr/medias/photo/l-accompagnement-personalise-au-coeur-de-notre-savoir-faire_1746008116110-jpg",
    },
    {
      id: 6,
      adherent_id: 106,
      prenom: "Imane",
      nom: "Rami",
      title: "Développement Application Mobile",
      description:
        "Création d'applications mobiles iOS et Android avec Flutter. Design moderne, performances optimales et déployées sur les stores. Maintenance incluse.",
      categorie: "Développement Mobile",
      price: "À partir de 5000 DH",
      delivery: "14 jours",
      created_at: "2026-02-10",
      adherent_img: "https://i.pravatar.cc/300?img=1",
      img: "https://webusupload.apowersoft.info/airmorecom/wp-content/uploads/2022/01/mirror-android-iphone.jpg",
    },
    {
      id: 7,
      adherent_id: 107,
      prenom: "Mehdi",
      nom: "Benali",
      title: "Production Vidéo & Motion Design",
      description:
        "Création de vidéos promotionnelles, motion graphics, animations 2D/3D pour vos réseaux sociaux et publicités. Montage professionnel avec effets spéciaux.",
      categorie: "Infographie",
      price: "1000 DH",
      delivery: "4 jours",
      created_at: "2026-03-30",
      adherent_img: "https://i.pravatar.cc/300?img=13",
      img: "https://fiverr-res.cloudinary.com/videos/t_main1,q_auto,f_auto/sa00nqc4r3ahfqxfkosx/engaging-animated-motion-graphic-video-ads-gif-promos-slide-product-video-brand.png",
    },
    {
      id: 8,
      adherent_id: 108,
      prenom: "Sara",
      nom: "Chaoui",
      title: "Rédaction Contenu SEO",
      description:
        "Rédaction d'articles optimisés pour le SEO, descriptions produits, pages web et contenus marketing. Transformez votre stratégie de contenu en résultats.",
      categorie: "Rédaction",
      price: "150 DH/article",
      delivery: "24-48 heures",
      created_at: "2026-01-29",
      adherent_img: "https://i.pravatar.cc/300?img=3",
      img: "https://www.comete.com/wp-content/uploads/2025/04/rediger_un_article_SEO-1.webp",
    },
    {
      id: 9,
      adherent_id: 101,
      prenom: "Youssef",
      nom: "Lahlou",
      title: "Refonte & Optimisation de Site Existant",
      description:
        "Améliorez les performances de votre site web actuel. Optimisation SEO, refonte UI/UX, amélioration de la vitesse et de l'expérience utilisateur.",
      categorie: "Développement Web",
      price: "2000 DH",
      delivery: "5 jours",
      created_at: "2026-04-05",
      adherent_img: "https://i.pravatar.cc/300?img=11",
      img: "https://jrtechnologiesweb.com/wp-content/uploads/2019/06/SEO.jpg",
    },
    {
      id: 10,
      adherent_id: 102,
      prenom: "Hind",
      nom: "Boussaid",
      title: "Création de Supports Print",
      description:
        "Diseño de flyers, affiches, catalogues et brochures professionnelles. Impression de haute qualité avec partenaires locaux. Tout format accepté.",
      categorie: "Design Graphique",
      price: "800 DH",
      delivery: "3 jours",
      created_at: "2026-02-14",
      adherent_img: "https://i.pravatar.cc/300?img=5",
      img: "https://www.graphicstyle.fr/wp-content/uploads/940gird6.jpg",
    },
    {
      id: 11,
      adherent_id: 103,
      prenom: "Rachid",
      nom: "Zerouali",
      title: "Gestion Réseaux Sociaux",
      description:
        "Gestion complète de vos réseaux sociaux: planification, création de contenu, community management et rapports analytiques. Augmentez votre communauté.",
      categorie: "Marketing Digital",
      price: "1200 DH/mois",
      delivery: "Gestion mensuelle",
      created_at: "2026-03-12",
      adherent_img: "https://i.pravatar.cc/300?img=12",
      img: "https://www.blogdigital.fr/wp-content/uploads/2021/10/meilleurs-outils-gestion-reseaux-sociaux.jpg",
    },
    {
      id: 12,
      adherent_id: 106,
      prenom: "Amine",
      nom: "Fassi",
      title: "Maintenance & Support Mobile",
      description:
        "Maintenance continue de vos applications mobiles. Mises à jour, corrections de bugs, nouvelles fonctionnalités et optimisation des performances.",
      categorie: "Développement Mobile",
      price: "500 DH/mois",
      delivery: "Support continu",
      created_at: "2026-04-01",
      adherent_img: "https://i.pravatar.cc/300?img=1",
      img: "https://webtech.fr/wp-content/uploads/2024/10/agence-mobile-app-1.webp",
    },
  ];
};

/**
 * Mock get events
 */
export const mockGetEvents = async () => {
  await delay(300);
  return [
    {
      id: 1,
      title: "Atelier: Initiation au Développement Web",
      description:
        "Venez découvrir les bases du développement web avec HTML, CSS et JavaScript. Ideal pour les débutants qui souhaitent se lancer dans la programmation.",
      date: "2026-04-20",
      lieu: "Casablanca, Sobol Digital",
      organisateur: "Sobol Digital",
      category: "Formation",
      created_at: "2026-05-15T10:30:00.000Z",
    },
    {
      id: 2,
      title: "Meetup: Networking des Professionnels IT",
      description:
        "Rejoignez-nous pour une soirée de networking avec les professionnels de l'IT à Casablanca. Échangez, partagez et créez des connexions précieuses.",
      date: "2026-05-02",
      lieu: "Rabat, Coworking Center",
      organisateur: "Sobol Digital",
      category: "Networking",
      created_at: "2026-01-20T14:00:00.000Z",
    },
    {
      id: 3,
      title: "Webinaire: SEO pour les Freelances",
      description:
        "Apprenez à optimiser votre présence en ligne pour attirer plus de clients. Techniques avancées de référencement naturel pour indépendants.",
      date: "2026-04-28",
      lieu: "En ligne",
      organisateur: "Sobol Digital",
      category: "Marketing",
      created_at: "2026-04-01T09:15:00.000Z",
    },
    {
      id: 4,
      title: "Formation: Maîtrise de Figma pour Designers",
      description:
        "Formation intensive sur Figma pour créer des interfaces utilisateur modernes. Apprenez les dernières tendances du design digital.",
      date: "2026-05-18",
      lieu: "Casablanca",
      organisateur: "Sobol Digital",
      category: "Formation",
      created_at: "2026-02-10T11:45:00.000Z",
    },
    {
      id: 5,
      title: "Hackathon Sobol Digital 2026",
      description:
        "Participez au plus grand hackathon du Maroc. Formez des équipes, développpez des solutions innovantes et gagnez des prix.",
      date: "2026-06-07",
      lieu: "Marrakech, Centre de Congrès",
      organisateur: "Sobol Digital",
      category: "Competition",
      created_at: "2026-02-15T16:20:00.000Z",
    },
    {
      id: 6,
      title: "Conférence: L'IA au service des entreprises",
      description:
        "Découvrez comment l'intelligence artificielle transforme les businesses. Des experts partageront leurs expériences et cas d'usage.",
      date: "2026-04-15",
      lieu: "Casablanca, Centre de Conferance",
      organisateur: "Sobol Digital",
      category: "Conference",
      created_at: "2026-03-01T08:00:00.000Z",
    },
    {
      id: 7,
      title: "Workshop: Photographie Professionnelle",
      description:
        "Apprenez les techniques de photographie professionnelle pour valoriser votre portfolio et vos projets.",
      date: "2026-05-10",
      lieu: "Marrakech, Studio Photo",
      organisateur: "Sobol Digital",
      category: "Workshop",
      created_at: "2026-03-05T13:30:00.000Z",
    },
    {
      id: 8,
      title: "Table Ronde: Entrepreneuriat au Maroc",
      description:
        "Échangez avec des entrepreneurs erfolgreich et découvre les clés du succès entrepreneurial au Maroc.",
      date: "2026-04-25",
      lieu: "Rabat, Université",
      organisateur: "Sobol Digital",
      category: "Discussion",
      created_at: "2026-03-10T10:00:00.000Z",
    },
  ];
};
/**
 * Mock rate adherent
 */
export const mockRateAdherent = async (id, value, token) => {
  await delay(300);
  return { message: "success", rating: value };
};

/**
 * Mock check auth
 */
export const mockCheckAuth = async (token) => {
  await delay(200);
  if (token && token.startsWith("demo_token_")) {
    return { message: true };
  }
  return { message: false };
};

// Export demo mode flag and credentials
export { DEMO_MODE, DEMO_CREDENTIALS };

const mockApi = {
  mockLogin,
  mockGetAdherent,
  mockGetAdherents,
  mockGetSectors,
  mockGetCities,
  mockGetAnnouncements,
  mockGetAnnouncesByAdherent,
  mockGetEvents,
  mockRateAdherent,
  mockCheckAuth,
  DEMO_MODE,
  DEMO_CREDENTIALS,
};

export default mockApi;
