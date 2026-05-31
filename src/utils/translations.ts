export type Language = 'en' | 'rw';

export interface Translations {
  // Navigation & Core Names
  brandName: string;
  studioSuite: string;
  dashboard: string;
  myAlbums: string;
  uploadHub: string;
  pricingPlan: string;
  moderatorSettings: string;
  management: string;
  systemControl: string;
  cloudStorage: string;
  capacityConsumed: string;
  runningOutSpace: string;
  clientGallery: string;
  contactPhotographer: string;
  signIn: string;
  signOut: string;
  getStarted: string;

  // Landing Page
  heroTitle: string;
  heroSub: string;
  viewDemo: string;
  uploadTrial: string;
  exploreFeatures: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;

  // Overview / Dashboard
  overviewTitle: string;
  overviewSub: string;
  downloadCSV: string;
  liveFeedTracker: string;
  statAlbums: string;
  statViews: string;
  statDownloads: string;
  statStorage: string;
  visitorAction: string;
  noRecentActivity: string;
  backToGalleries: string;

  // Album Page
  albumsTitle: string;
  albumsSub: string;
  createAlbum: string;
  searchPlaceholder: string;
  filterTags: string;
  clearFilters: string;
  noExhibitions: string;
  items: string;
  secure: string;
  published: string;
  private: string;
  link: string;
  deleteAlbumConfirm: string;

  // Create Album Modal
  createTitle: string;
  albumTitleLabel: string;
  descriptionLabel: string;
  shootDateLabel: string;
  shootLocationLabel: string;
  portfolioTagsLabel: string;
  coverArtLabel: string;
  passwordLockLabel: string;
  passwordLockSub: string;
  expiryDateLabel: string;
  expiryDateSub: string;
  cancel: string;
  createAndLink: string;

  // Upload Hub
  uploadTitle: string;
  uploadSub: string;
  bindUploadLabel: string;
  simulateDrop: string;
  queueTitle: string;
  clearQueue: string;
  emptyQueue: string;
  dragDropText: string;
  dragDropSub: string;
  noAlbumWarning: string;

  // Pricing Page
  pricingTitle: string;
  pricingSub: string;
  currentSubscription: string;
  limit: string;
  renewalText: string;
  renewalAlert: string;
  freePlan: string;
  proPlan: string;
  studioPlan: string;
  active: string;
  startingPoint: string;
  busyArtists: string;
  bespokeBranding: string;
  currentPackage: string;
  downgradeFree: string;
  upgradePro: string;
  upgradeStudio: string;
  paymentHistory: string;
  receiptId: string;
  authDate: string;
  amount: string;
  method: string;
  status: string;

  // Checkout Modal
  checkoutTitle: string;
  secureSetup: string;
  billingSelection: string;
  mockPaymentSub: string;
  cardholderLabel: string;
  choosePaymentMethod: string;
  payWithMoMo: string;
  payWithCard: string;
  momoNumberLabel: string;
  momoNumberPlaceholder: string;
  momoPinAlert: string;
  processingMoMo: string;
  processMoMoBtn: string;
  processStripeBtn: string;
  successMoMoUpgrade: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    brandName: 'LuminaOS',
    studioSuite: 'STUDIO SUITE',
    dashboard: 'Dashboard',
    myAlbums: 'My Albums',
    uploadHub: 'Upload Hub',
    pricingPlan: 'Subscription Plan',
    moderatorSettings: 'Moderator settings',
    management: 'Management',
    systemControl: 'System Control',
    cloudStorage: 'Cloud Storage Space',
    capacityConsumed: 'Capacity Consumed',
    runningOutSpace: 'Running out of space! Expand',
    clientGallery: 'Client Gallery Port',
    contactPhotographer: 'Contact Photographer',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    getStarted: 'Get Started',

    // Landing Page
    heroTitle: 'High-Fidelity Media Share Platforms',
    heroSub: 'The bespoke workspace for elite independent photographers. Deliver raw photographs, lock client review galleries, and analyze traffic history with ease.',
    viewDemo: 'Enter Live Workspace',
    uploadTrial: 'Live Upload Test',
    exploreFeatures: 'Explore Elite Engine Features',
    feature1Title: 'Bespoke Aesthetic Galleries',
    feature1Desc: 'Stunning minimalism configured for premium brand experiences.',
    feature2Title: 'Ultra-Instant Cloud Deliveries',
    feature2Desc: 'Drag, drop, and auto-optimize raw captures directly in client terminals.',
    feature3Title: 'Granular Download Trackers',
    feature3Desc: 'Confirm exact timestamps and visitor IP addresses for downloaded content.',

    // Overview
    overviewTitle: 'Executive Studio Overview',
    overviewSub: 'Track real-time digital portal engagement, storage constraints, and customer downloads.',
    downloadCSV: 'Download CSV',
    liveFeedTracker: 'Live Feed Tracker',
    statAlbums: 'ACTIVE EXHIBITIONS',
    statViews: 'PORTAL VIEWS',
    statDownloads: 'TOTAL ACQUISITIONS',
    statStorage: 'BANDWIDTH USED',
    visitorAction: 'visitor matched event logs',
    noRecentActivity: 'No recent tracking feeds recorded. Simulate clicks to begin.',
    backToGalleries: 'Back to private galleries',

    // Album Page
    albumsTitle: 'My Shared Albums',
    albumsSub: 'Manage client download ports, proof locks, and bespoke exhibition details.',
    createAlbum: 'Create Album',
    searchPlaceholder: 'Search albums...',
    filterTags: 'Filter Tags:',
    clearFilters: 'Clear filters',
    noExhibitions: 'No exhibition matches your filter preferences.',
    items: 'items',
    secure: 'SECURE',
    published: 'PUBLISHED',
    private: 'PRIVATE',
    link: 'Link',
    deleteAlbumConfirm: 'Are you sure you want to delete this exhibition?',

    // Create Album Modal
    createTitle: 'Create exhibition gallery',
    albumTitleLabel: 'Album Title / Client Family',
    descriptionLabel: 'Description / Client Memo',
    shootDateLabel: 'Shoot Event Date',
    shootLocationLabel: 'Shoot Location (Optional)',
    portfolioTagsLabel: 'Portfolio Tags (separated by commas)',
    coverArtLabel: 'Visual Cover Art URL',
    passwordLockLabel: 'Password Authentication Lock',
    passwordLockSub: 'Require clients to type a passcode to load media',
    expiryDateLabel: 'Active Share Link Expiration',
    expiryDateSub: 'Client sharing link will automatically expire after date',
    cancel: 'Cancel',
    createAndLink: 'Create & Link',

    // Upload Hub
    uploadTitle: 'Batch Upload Hub',
    uploadSub: 'Upload and optimize high-fidelity images or video files directly to Cloud shares with real-time feedback.',
    bindUploadLabel: 'Bind Uploads to Shared Album',
    simulateDrop: 'Simulate Instant Drop',
    queueTitle: 'Upload Queue',
    clearQueue: 'Clear Queue',
    emptyQueue: 'Uploader queue is empty. Drag in photographs or click the simulate trigger above to transfer files.',
    dragDropText: 'Drag and drop media files, or browse files',
    dragDropSub: 'Supports High-Res JPG, raw images, PNG, and streamable MP4 (max 500MB per file)',
    noAlbumWarning: 'You don\'t have any albums created. Please create one on the Albums page first!',

    // Pricing Page
    pricingTitle: 'Pricing & Portfolio Limits',
    pricingSub: 'Scale your cloud storage limit and unlock security passcodes and client feedback collectors.',
    currentSubscription: 'CURRENT SUBSCRIPTION',
    limit: 'Limit',
    renewalText: 'Next renewal date is scheduled for June 15, 2026',
    renewalAlert: 'Upload progress calculations depend on your plan limit. Pro plans permit 100 GB share limits.',
    freePlan: 'Free Plan',
    proPlan: 'Pro Plan',
    studioPlan: 'Studio Plan',
    active: 'Active',
    startingPoint: 'Starting point for portfolio trials',
    busyArtists: 'Best utility for busy independent artists',
    bespokeBranding: 'Bespoke branding for scale studios',
    currentPackage: 'Current Package',
    downgradeFree: 'Downgrade to Free',
    upgradePro: 'Upgrade with MTN MoMo / Card',
    upgradeStudio: 'Upgrade with MTN MoMo / Card',
    paymentHistory: 'Receipt Billing Log History',
    receiptId: 'Receipt Index ID',
    authDate: 'Authorized Date',
    amount: 'Amount',
    method: 'Gateway Method',
    status: 'Status',

    // Checkout Modal
    checkoutTitle: 'SaaS CHECKOUT PROXY',
    secureSetup: 'Secure payment setup',
    billingSelection: 'Billing Order Selection:',
    mockPaymentSub: 'Choose MTN Mobile Money or Credit Card to upgrade instant capacity limits.',
    cardholderLabel: 'Your Registered Name',
    choosePaymentMethod: 'CHOOSE PAYMENT GATEWAY',
    payWithMoMo: 'MTN Mobile Money',
    payWithCard: 'Credit / Debit Card',
    momoNumberLabel: 'MTN Mobile Money Phone Number',
    momoNumberPlaceholder: 'e.g. 078XXXXXXX or 079XXXXXXX',
    momoPinAlert: 'A simulated push notification prompt will ask for your MTN MoMo PIN to authorize this transaction.',
    processingMoMo: 'Confirming mobile money transaction...',
    processMoMoBtn: 'Pay with MTN MoMo',
    processStripeBtn: 'Authorize Card Payment',
    successMoMoUpgrade: 'Transaction approved! MOMO Upgrade complete. Plan has been updated to '
  },
  rw: {
    brandName: 'LuminaOS',
    studioSuite: 'PROGARA Y’AGATANGAZA',
    dashboard: 'Igenzura ry’Ibyakozwe',
    myAlbums: 'Alubumu Zanjye',
    uploadHub: 'Kohereza Amafoto',
    pricingPlan: 'Guhitamo Igiciro',
    moderatorSettings: 'Igenzura rya Moderator',
    management: 'Ubuyobozi',
    systemControl: 'Igenzura rya Sisitemu',
    cloudStorage: 'Ububiko bwa Cloud',
    capacityConsumed: 'Ubushobozi bwakoreshejwe',
    runningOutSpace: 'Ububiko burashize! Wagura ububiko',
    clientGallery: 'Irembo ry\'Umukiliya',
    contactPhotographer: 'Vugana n’Umufotora',
    signIn: 'Kwinjira',
    signOut: 'Gusohoka',
    getStarted: 'Tangira Ubu',

    // Landing Page
    heroTitle: 'Isangizanyamakuru Ryihuse Rya High-Fidelity',
    heroSub: 'Urubuga rwihariye rw’abafotora b’indashyikirwa. Ohereza amafoto meza y’umwimerere, funga ama-galeries y’abakiliya, kandi usuzume amakuru y\'abayicayeho neza.',
    viewDemo: 'Injira Aho Gukorera',
    uploadTrial: 'Gerageza Kohereza Foto',
    exploreFeatures: 'Shakisha Ibiranga Moteri nshya',
    feature1Title: 'Sisitemu Ndangamiterere y’Ubwiza',
    feature1Desc: 'Ubwiza buhebuje bwateguwe mu buryo bworoshye kandi bugezweho.',
    feature2Title: 'Kohereza Kuri Cloud Ako Kanya',
    feature2Desc: 'Kurura, ushyiremo, kandi uhite unonosora amafoto meza ako kanya.',
    feature3Title: 'Igenzura Ryihariye ryo Gukuraho Ibyifujwe',
    feature3Desc: 'Menya neza igihe n’aho aba-visiteurs bari (IP address) igihe bakuraho ibintu.',

    // Overview
    overviewTitle: 'Incamake Rugerezo ya Sitidiyo',
    overviewSub: 'Kurikirana ibikorwa by’abakiliya mu gihe nyacyo, ubwinshi bw’ububiko, n’amafoto yakuweho.',
    downloadCSV: 'Kura mbonerahamwe muli CSV',
    liveFeedTracker: 'Ibyandikwa Ako Kanya',
    statAlbums: 'AMALUBUMU ARI GUKORESHWA',
    statViews: 'KUREBA HO KUKO KANYA',
    statDownloads: 'AMAFILES YAKUWEHO',
    statStorage: 'UBUBIKO BWAKORESHEJWE',
    visitorAction: 'ibikorwa byanditswe by’abantu',
    noRecentActivity: 'Nta bikorwa bya vuba byanditswe. Kanda ahandi ugerageze.',
    backToGalleries: 'Subira inyuma kuri galeries',

    // Album Page
    albumsTitle: 'Alubumu Zanjye Zasangiwe',
    albumsSub: 'Genzura ports zo gukuraho amadosiye, proof locks, n’andi makuru arambuye y’imurikagurisha.',
    createAlbum: 'Kora Alubumu',
    searchPlaceholder: 'Shakisha alubumu...',
    filterTags: 'Gushungura na Tags:',
    clearFilters: 'Gukuraho ibyo wasatuye',
    noExhibitions: 'Nta murikagurisha riri muri filteri wahisemo.',
    items: 'amafoto/amavidewo',
    secure: 'BIFUNZE',
    published: 'BYASHYIZWE HANZE',
    private: 'BIRYIHIYE',
    link: 'Ihuza',
    deleteAlbumConfirm: 'Ese ufite icyizere cyo gushaka gusiba iri murikagurisha?',

    // Create Album Modal
    createTitle: 'Kora alubumu nshya',
    albumTitleLabel: 'Izina rya Alubumu / Umuryango w’Umukiliya',
    descriptionLabel: 'Ibisobanuro / Inyandiko y’Umukiliya',
    shootDateLabel: 'Itariki y’Ikiganiro cyiza',
    shootLocationLabel: 'Aho byafotorewe (Ntabwo ari itegeko)',
    portfolioTagsLabel: 'Tags (Zitandukanijwe n’akavirgila)',
    coverArtLabel: 'Ihuza rya Cover Art',
    passwordLockLabel: 'Gufunga na Password/Passcode',
    passwordLockSub: 'Bizasaba umukiliya kwandika umubare w’ibanga kugira ngo arebe amafoto',
    expiryDateLabel: 'Itariki yo Gucika kw’Ihuza',
    expiryDateSub: 'Ihuza ry’abakiliya rizahagarara nyuma y’iyi tariki',
    cancel: 'Guhagarika',
    createAndLink: 'Kora Alubumu uhite usangiza',

    // Upload Hub
    uploadTitle: 'Gushyiraho Amashusho na Mafoto',
    uploadSub: 'Ohereza kandi unonosore amafoto meza n’amashusho meza yerekeza kuri Cloud mu gihe gito cyane.',
    bindUploadLabel: 'Ohereza aya mafoto muri iyi Alubumu',
    simulateDrop: 'Gerageza Kohereza Ako Kanya',
    queueTitle: 'Urutonde ry-Ibiri Koherezwa',
    clearQueue: 'Guhagarika Urutonde',
    emptyQueue: 'Nta mafoto ari ku rutonde rwo kohereza. Kurura amafoto cyangwa ukande buto ya "Simulate" haruguru.',
    dragDropText: 'Kurura ushyiremo amafoto hano, cyangwa uhitemo kuri mudasobwa yawe',
    dragDropSub: 'Ishyigikiye amafoto ya JPG high-res, RAW, PNG, ndetse na MP4 (ntayarenze 500MB)',
    noAlbumWarning: 'Nta alubumu ufite ubu. Nyabuneka banza ukore alubumu nshya ku rupapuro rwa Alubumu!',

    // Pricing Page
    pricingTitle: 'Igiciro & Imbibi z’Ububiko',
    pricingSub: 'Wagura ububiko bwa Cloud, ongeramo umubare w’ibanga, kandi urebe ibyo abakiliya baguhayeho inyiganzo (feedback).',
    currentSubscription: 'GAHUNDA UKORESHA UBU',
    limit: 'Imbibi',
    renewalText: 'Izongera kwishyurwa ku ya 15 Kamena 2026',
    renewalAlert: 'Ubushobozi bwo kohereza amafoto bushingiye ku giciro wahisemo. Gahunda ya Pro iguha ububiko bwa 100 GB.',
    freePlan: 'Ubuntu (Free)',
    proPlan: 'Gahunda ya Pro',
    studioPlan: 'Gahunda ya Sitidiyo',
    active: 'Iri Gukoreshwa',
    startingPoint: 'Gahunda yo kugerageza kubanza',
    busyArtists: 'Ijyanye n’abafotora babizobereye cyane',
    bespokeBranding: 'Kuri sitidiyo nini n’inganda nini',
    currentPackage: 'Gahunda Ufite Ubu',
    downgradeFree: 'Downgrade kuri Free',
    upgradePro: 'Kura muri MTN MoMo / Credit Card',
    upgradeStudio: 'Kura muri MTN MoMo / Credit Card',
    paymentHistory: 'Amateka y-Iyishyurwa',
    receiptId: 'Inomero y-Inyemezabwishyu',
    authDate: 'Itariki Byemejwe',
    amount: 'Amafaranga yishyuwe',
    method: 'Uburyo bwakoreshejwe',
    status: 'Imiterere',

    // Checkout Modal
    checkoutTitle: 'ISANGIRA RYA SAAS SECURE',
    secureSetup: 'Kwishyura Mu Buryo Bwizewe',
    billingSelection: 'Guhitamo Bizayishyurwa:',
    mockPaymentSub: 'Hitamo guhindura gahunda ukoresheje MTN Mobile Money cyangwa Ikarita Visa/Mastercard ako kanya.',
    cardholderLabel: 'Izina ryawe Ryanditswe',
    choosePaymentMethod: 'HITAMO UBURYO BWO KWISHYURA',
    payWithMoMo: 'MTN Mobile Money (MoMo)',
    payWithCard: 'Ikarita ya Credit / Debit Card',
    momoNumberLabel: 'Inomero ya MTN Mobile Money',
    momoNumberPlaceholder: 'Urugero: 078XXXXXXX cyangwa 079XXXXXXX',
    momoPinAlert: 'Uzahita ubona ubutumwa bukubaza pin yawe ya MTN MoMo kuri terefone yawe kugira ngo wemeze iri yishyurwa.',
    processingMoMo: 'Guhuza na MTN MoMo... Tegereza gato...',
    processMoMoBtn: 'Ishyura na MTN MoMo',
    processStripeBtn: 'Ishyura na Card yawe',
    successMoMoUpgrade: 'Ubwishyu bwemejwe neza bwa MTN MoMo! Gahunda yawe yahise ihinduka nka '
  }
};
