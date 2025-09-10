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

export function getRelatedSolutions(currentIndustry: string) {
  const current = Object.values(solutionsConfig).find(s => s.industry.toLowerCase() === currentIndustry.toLowerCase());
  if (!current) return [];
  
  return current.related.map(relatedId => {
    const related = Object.values(solutionsConfig).find(s => s.id === relatedId);
    return related ? {
      title: related.title,
      industry: related.industry,
      path: related.path,
      description: `Specialized features for ${related.industry.toLowerCase()}`,
    } : null;
  }).filter(Boolean);
}