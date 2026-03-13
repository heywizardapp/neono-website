#!/usr/bin/env node
/**
 * Batch 2: Add translation keys for ValueProposition, TrustSignals, TrustBadges,
 * EnhancedTestimonials, and ConversionOptimizedCTA components
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, '../src/i18n/locales');

// Shared English keys (used by en-CA)
const sharedKeys = {
  // ValueProposition
  "valueProp.badge": "Why NeonO?",
  "valueProp.title": "Everything you need to run your business, in one place",
  "valueProp.subtitle": "Stop juggling multiple apps. NeonO brings appointments, payments, marketing, and analytics together in one beautiful, easy-to-use platform.",
  "valueProp.benefit1.title": "Setup in minutes",
  "valueProp.benefit1.desc": "Go live today with zero technical knowledge required",
  "valueProp.benefit2.title": "Save 10+ hours/week",
  "valueProp.benefit2.desc": "Automate scheduling, payments, and customer communications",
  "valueProp.benefit3.title": "Increase revenue 25%",
  "valueProp.benefit3.desc": "Smart booking, upselling, and retention tools that work",
  "valueProp.startFreeTrial": "Start Your Free Trial",
  "valueProp.whatsIncluded": "What's included:",
  "valueProp.feature1": "Online booking & calendar management",
  "valueProp.feature2": "Point of sale with tip splitting",
  "valueProp.feature3": "SMS & email marketing automation",
  "valueProp.feature4": "Staff management & payroll",
  "valueProp.feature5": "Customer profiles & history",
  "valueProp.feature6": "Real-time analytics & reporting",
  "valueProp.feature7": "Website & social media integration",
  "valueProp.feature8": "24/7 customer support",
  "valueProp.setupProgress": "Setup Progress",
  "valueProp.fiveMinutes": "5 minutes",
  "valueProp.avgTimeToGoLive": "Average time to go live with NeonO",

  // TrustSignals
  "trustSignals.badge": "Trusted Worldwide",
  "trustSignals.title": "Join thousands of successful businesses",
  "trustSignals.subtitle": "From independent stylists to multi-location chains, beauty professionals worldwide trust NeonO to power their business.",
  "trustSignals.rating": "4.8/5 Rating",
  "trustSignals.reviews": "10,000+ reviews",
  "trustSignals.security": "Bank-Level Security",
  "trustSignals.pciCompliant": "PCI DSS Compliant",
  "trustSignals.leader": "Industry Leader",
  "trustSignals.bestSoftware": "Best Beauty Software 2024",
  "trustSignals.businesses": "50K+ Businesses",
  "trustSignals.trustWorldwide": "Trust NeonO worldwide",
  "trustSignals.trustedByBrands": "Trusted by leading beauty brands and independent professionals",

  // TrustBadges
  "trustBadges.title": "Trusted & Secure",
  "trustBadges.subtitle": "Enterprise-grade security and compliance to protect your business and customer data",
  "trustBadges.soc2": "SOC 2 Type II Certified",
  "trustBadges.soc2Desc": "Enterprise-grade security standards",
  "trustBadges.hipaa": "HIPAA Compliant",
  "trustBadges.hipaaDesc": "Healthcare data protection",
  "trustBadges.pci": "PCI DSS Certified",
  "trustBadges.pciDesc": "Secure payment processing",
  "trustBadges.uptime": "99.9% Uptime SLA",
  "trustBadges.uptimeDesc": "Reliable service guarantee",

  // EnhancedTestimonials
  "enhancedTestimonials.title": "Loved by thousands of beauty professionals",
  "enhancedTestimonials.subtitle": "See how NeonO is helping businesses like yours thrive and grow.",
  "enhancedTestimonials.keyResult": "Key Result",
  "enhancedTestimonials.prevAriaLabel": "Previous testimonial",
  "enhancedTestimonials.nextAriaLabel": "Next testimonial",
  "enhancedTestimonials.t1.quote": "NeonO transformed our salon completely. We've increased bookings by 85% and our no-show rate dropped to just 2%. The automated reminders and seamless booking experience keep our clients coming back.",
  "enhancedTestimonials.t1.role": "Salon Owner",
  "enhancedTestimonials.t1.stat": "85% increase in bookings",
  "enhancedTestimonials.t1.businessType": "Hair Salon",
  "enhancedTestimonials.t2.quote": "The POS system is incredibly intuitive. My stylists love how easy it is to process payments and manage tips. We've seen a 40% increase in tip income since switching.",
  "enhancedTestimonials.t2.role": "Manager",
  "enhancedTestimonials.t2.stat": "40% increase in tips",
  "enhancedTestimonials.t2.businessType": "Barbershop",
  "enhancedTestimonials.t3.quote": "Our spa's efficiency has improved dramatically. The staff scheduling and room management features alone have saved us 15 hours per week. ROI was immediate.",
  "enhancedTestimonials.t3.role": "Operations Director",
  "enhancedTestimonials.t3.stat": "15 hours saved per week",
  "enhancedTestimonials.t3.businessType": "Day Spa",
  "enhancedTestimonials.t4.quote": "The marketing automation is game-changing. Our client retention increased by 60% with automated campaigns and review requests. It practically runs itself.",
  "enhancedTestimonials.t4.role": "Clinic Director",
  "enhancedTestimonials.t4.stat": "60% better retention",
  "enhancedTestimonials.t4.businessType": "Medical Spa",

  // ConversionOptimizedCTA default props
  "conversionCta.defaultTitle": "Ready to grow your business?",
  "conversionCta.defaultSubtitle": "Join thousands of beauty professionals who've transformed their operations with NeonO",
  "conversionCta.startFreeTrial": "Start Free Trial",
  "conversionCta.watchDemo": "Watch Demo",
};

// en-US overrides (uses "customers" instead of "clients")
const enUSOverrides = {
  "valueProp.benefit2.desc": "Automate scheduling, payments, and customer communications",
  "valueProp.feature5": "Customer profiles & history",
  "enhancedTestimonials.t1.quote": "NeonO transformed our salon completely. We've increased bookings by 85% and our no-show rate dropped to just 2%. The automated reminders and seamless booking experience keep our customers coming back.",
};

// French Canadian translations
const frCA = {
  // ValueProposition
  "valueProp.badge": "Pourquoi NeonO?",
  "valueProp.title": "Tout ce dont vous avez besoin pour gérer votre entreprise, en un seul endroit",
  "valueProp.subtitle": "Arrêtez de jongler avec plusieurs applications. NeonO réunit les rendez-vous, les paiements, le marketing et les analyses dans une plateforme simple et élégante.",
  "valueProp.benefit1.title": "Configuration en quelques minutes",
  "valueProp.benefit1.desc": "Commencez dès aujourd'hui sans aucune connaissance technique",
  "valueProp.benefit2.title": "Économisez 10+ heures/semaine",
  "valueProp.benefit2.desc": "Automatisez la planification, les paiements et les communications clients",
  "valueProp.benefit3.title": "Augmentez vos revenus de 25%",
  "valueProp.benefit3.desc": "Outils de réservation intelligente, de vente incitative et de fidélisation qui fonctionnent",
  "valueProp.startFreeTrial": "Commencer l'essai gratuit",
  "valueProp.whatsIncluded": "Ce qui est inclus :",
  "valueProp.feature1": "Réservation en ligne et gestion du calendrier",
  "valueProp.feature2": "Point de vente avec partage des pourboires",
  "valueProp.feature3": "Automatisation du marketing par SMS et courriel",
  "valueProp.feature4": "Gestion du personnel et paie",
  "valueProp.feature5": "Profils et historique des clients",
  "valueProp.feature6": "Analyses et rapports en temps réel",
  "valueProp.feature7": "Intégration site web et médias sociaux",
  "valueProp.feature8": "Support client 24/7",
  "valueProp.setupProgress": "Progression de la configuration",
  "valueProp.fiveMinutes": "5 minutes",
  "valueProp.avgTimeToGoLive": "Temps moyen pour être opérationnel avec NeonO",

  // TrustSignals
  "trustSignals.badge": "Reconnu mondialement",
  "trustSignals.title": "Rejoignez des milliers d'entreprises prospères",
  "trustSignals.subtitle": "Des stylistes indépendants aux chaînes multi-établissements, les professionnels de la beauté du monde entier font confiance à NeonO.",
  "trustSignals.rating": "Note de 4.8/5",
  "trustSignals.reviews": "10 000+ avis",
  "trustSignals.security": "Sécurité bancaire",
  "trustSignals.pciCompliant": "Conforme PCI DSS",
  "trustSignals.leader": "Leader du secteur",
  "trustSignals.bestSoftware": "Meilleur logiciel beauté 2024",
  "trustSignals.businesses": "50 000+ entreprises",
  "trustSignals.trustWorldwide": "Font confiance à NeonO",
  "trustSignals.trustedByBrands": "Approuvé par les grandes marques de beauté et les professionnels indépendants",

  // TrustBadges
  "trustBadges.title": "Fiable et sécurisé",
  "trustBadges.subtitle": "Sécurité et conformité de niveau entreprise pour protéger votre entreprise et les données de vos clients",
  "trustBadges.soc2": "Certifié SOC 2 Type II",
  "trustBadges.soc2Desc": "Normes de sécurité de niveau entreprise",
  "trustBadges.hipaa": "Conforme HIPAA",
  "trustBadges.hipaaDesc": "Protection des données de santé",
  "trustBadges.pci": "Certifié PCI DSS",
  "trustBadges.pciDesc": "Traitement sécurisé des paiements",
  "trustBadges.uptime": "SLA de 99,9% de disponibilité",
  "trustBadges.uptimeDesc": "Garantie de service fiable",

  // EnhancedTestimonials
  "enhancedTestimonials.title": "Adoré par des milliers de professionnels de la beauté",
  "enhancedTestimonials.subtitle": "Découvrez comment NeonO aide des entreprises comme la vôtre à prospérer et à croître.",
  "enhancedTestimonials.keyResult": "Résultat clé",
  "enhancedTestimonials.prevAriaLabel": "Témoignage précédent",
  "enhancedTestimonials.nextAriaLabel": "Témoignage suivant",
  "enhancedTestimonials.t1.quote": "NeonO a complètement transformé notre salon. Nous avons augmenté les réservations de 85% et notre taux d'absence est tombé à seulement 2%. Les rappels automatisés et l'expérience de réservation fluide fidélisent nos clients.",
  "enhancedTestimonials.t1.role": "Propriétaire de salon",
  "enhancedTestimonials.t1.stat": "85% d'augmentation des réservations",
  "enhancedTestimonials.t1.businessType": "Salon de coiffure",
  "enhancedTestimonials.t2.quote": "Le système de point de vente est incroyablement intuitif. Mes stylistes adorent la facilité de traitement des paiements et de gestion des pourboires. Nous avons vu une augmentation de 40% des pourboires depuis le changement.",
  "enhancedTestimonials.t2.role": "Gestionnaire",
  "enhancedTestimonials.t2.stat": "40% d'augmentation des pourboires",
  "enhancedTestimonials.t2.businessType": "Barbier",
  "enhancedTestimonials.t3.quote": "L'efficacité de notre spa s'est améliorée de façon spectaculaire. La planification du personnel et la gestion des salles nous font économiser 15 heures par semaine à eux seuls. Le retour sur investissement a été immédiat.",
  "enhancedTestimonials.t3.role": "Directrice des opérations",
  "enhancedTestimonials.t3.stat": "15 heures économisées par semaine",
  "enhancedTestimonials.t3.businessType": "Spa de jour",
  "enhancedTestimonials.t4.quote": "L'automatisation du marketing change la donne. La fidélisation de nos clients a augmenté de 60% grâce aux campagnes automatisées et aux demandes d'avis. Ça fonctionne pratiquement tout seul.",
  "enhancedTestimonials.t4.role": "Directeur de clinique",
  "enhancedTestimonials.t4.stat": "60% de meilleure fidélisation",
  "enhancedTestimonials.t4.businessType": "Spa médical",

  // ConversionOptimizedCTA default props
  "conversionCta.defaultTitle": "Prêt à développer votre entreprise?",
  "conversionCta.defaultSubtitle": "Rejoignez des milliers de professionnels de la beauté qui ont transformé leurs opérations avec NeonO",
  "conversionCta.startFreeTrial": "Commencer l'essai gratuit",
  "conversionCta.watchDemo": "Voir la démo",
};

function mergeKeys(filePath, newKeys) {
  const existing = JSON.parse(readFileSync(filePath, 'utf8'));
  const merged = { ...existing, ...newKeys };
  writeFileSync(filePath, JSON.stringify(merged, null, 2) + '\n');
  const added = Object.keys(newKeys).filter(k => !(k in existing)).length;
  const updated = Object.keys(newKeys).filter(k => k in existing).length;
  console.log(`${filePath}: +${added} new, ${updated} updated (total: ${Object.keys(merged).length})`);
}

// en-CA gets shared keys
mergeKeys(resolve(localesDir, 'en-CA.json'), sharedKeys);

// en-US gets shared keys + overrides
mergeKeys(resolve(localesDir, 'en-US.json'), { ...sharedKeys, ...enUSOverrides });

// fr-CA gets French translations
mergeKeys(resolve(localesDir, 'fr-CA.json'), frCA);

console.log('\nDone! Added translation keys for batch 2.');
