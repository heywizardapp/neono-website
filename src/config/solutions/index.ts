export const getSolutionsConfig = (t: (key: string) => string) => ({
  salons: {
    id: 'salons',
    title: t('solutions.index.salons.title'),
    path: '/solutions/salons',
    industry: t('solutions.index.salons.industry'),
    tags: ['hair', 'salon', 'beauty', 'stylist'],
    related: ['barbershops', 'spas'],
  },
  barbershops: {
    id: 'barbershops',
    title: t('solutions.index.barbershops.title'),
    path: '/solutions/barbershops',
    industry: t('solutions.index.barbershops.industry'),
    tags: ['barber', 'men', 'grooming'],
    related: ['salons', 'spas'],
  },
  spas: {
    id: 'spas',
    title: t('solutions.index.spas.title'),
    path: '/solutions/spas',
    industry: t('solutions.index.spas.industry'),
    tags: ['spa', 'wellness', 'massage', 'facial'],
    related: ['salons', 'aesthetics'],
  },
  aesthetics: {
    id: 'aesthetics',
    title: t('solutions.index.aesthetics.title'),
    path: '/solutions/aesthetics',
    industry: t('solutions.index.aesthetics.industry'),
    tags: ['medical', 'aesthetics', 'botox', 'dermal'],
    related: ['spas', 'salons'],
  },
});

// Keep backward compat — static version for non-component contexts
export const solutionsConfig = {
  salons: {
    id: 'salons',
    title: 'Hair Salon Software',
    path: '/solutions/salons',
    industry: 'Hair Salons',
    tags: ['hair', 'salon', 'beauty', 'stylist'],
    related: ['barbershops', 'spas'],
  },
  barbershops: {
    id: 'barbershops',
    title: 'Barbershop Software',
    path: '/solutions/barbershops',
    industry: 'Barbershops',
    tags: ['barber', 'men', 'grooming'],
    related: ['salons', 'spas'],
  },
  spas: {
    id: 'spas',
    title: 'Spa & Wellness Software',
    path: '/solutions/spas',
    industry: 'Spas & Wellness',
    tags: ['spa', 'wellness', 'massage', 'facial'],
    related: ['salons', 'aesthetics'],
  },
  aesthetics: {
    id: 'aesthetics',
    title: 'Medical Aesthetics Software',
    path: '/solutions/aesthetics',
    industry: 'Medical Aesthetics',
    tags: ['medical', 'aesthetics', 'botox', 'dermal'],
    related: ['spas', 'salons'],
  },
};

export function getRelatedSolutions(currentIndustry: string, t?: (key: string) => string) {
  const config = t ? getSolutionsConfig(t) : solutionsConfig;
  const current = Object.values(config).find(s => s.industry.toLowerCase() === currentIndustry.toLowerCase());
  if (!current) return [];

  return current.related.map(relatedId => {
    const related = Object.values(config).find(s => s.id === relatedId);
    return related ? {
      title: related.title,
      industry: related.industry,
      path: related.path,
      description: t
        ? t('solutions.index.specializedFor').replace('{industry}', related.industry.toLowerCase())
        : `Specialized features for ${related.industry.toLowerCase()}`,
    } : null;
  }).filter(Boolean);
}
