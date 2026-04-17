import { SEOHead } from '@/components/SEO/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Users, CheckCircle, Server } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export function Security() {
  const { t } = useI18n();

  const securityFeatures = [
    {
      icon: Shield,
      title: t('security.soc2Title'),
      description: t('security.soc2Desc'),
      status: t('security.certified')
    },
    {
      icon: Lock,
      title: t('security.encryptionTitle'),
      description: t('security.encryptionDesc'),
      status: t('security.active')
    },
    {
      icon: Eye,
      title: t('security.hipaaTitle'),
      description: t('security.hipaaDesc'),
      status: t('security.compliant')
    },
    {
      icon: Users,
      title: t('security.rbacTitle'),
      description: t('security.rbacDesc'),
      status: t('security.active')
    },
    {
      icon: CheckCircle,
      title: t('security.pciTitle'),
      description: t('security.pciDesc'),
      status: t('security.certified')
    },
    {
      icon: Server,
      title: t('security.infraTitle'),
      description: t('security.infraDesc'),
      status: t('security.active')
    }
  ];

  const complianceStandards = [
    { name: 'SOC 2 Type II', status: t('security.certified'), renewalDate: 'Annual' },
    { name: 'HIPAA', status: t('security.compliant'), renewalDate: 'Ongoing' },
    { name: 'PCI DSS Level 1', status: t('security.certified'), renewalDate: 'Annual' },
    { name: 'GDPR', status: t('security.compliant'), renewalDate: 'Ongoing' },
    { name: 'CCPA', status: t('security.compliant'), renewalDate: 'Ongoing' },
    { name: 'ISO 27001', status: t('security.inProgress'), renewalDate: 'Q2 2025' }
  ];

  return (
    <>
      <SEOHead
        title="Security & Compliance - NeonO"
        description="Learn about NeonO's enterprise-grade security measures, compliance certifications, and data protection practices."
        path="/security"
      />

      <div className="min-h-screen py-20">
        <div className="container">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">{t('security.badge')}</Badge>
            <h1 className="text-4xl font-serif font-bold mb-6">
              {t('security.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('security.subtitle')}
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-lift">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {feature.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Compliance Table */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">
                {t('security.complianceTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif italic">
                {t('security.complianceSubtitle')}
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold">{t('security.thStandard')}</th>
                        <th className="text-left p-4 font-semibold">{t('security.thStatus')}</th>
                        <th className="text-left p-4 font-semibold">{t('security.thRenewal')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceStandards.map((standard, index) => (
                        <tr key={index} className="border-b border-border/50 last:border-0">
                          <td className="p-4 font-medium">{standard.name}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                standard.status === t('security.certified') || standard.status === t('security.compliant')
                                  ? 'default'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {standard.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-muted-foreground">{standard.renewalDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Practices */}
          <div className="grid gap-12 lg:grid-cols-2 mb-20">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-6">{t('security.dataProtection')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('security.encryptionEverywhere')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('security.encryptionEverywhereDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('security.regularBackups')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('security.regularBackupsDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('security.dataResidency')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('security.dataResidencyDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold mb-6">{t('security.accessSecurity')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('security.mfa')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('security.mfaDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('security.sessionManagement')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('security.sessionManagementDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">{t('security.auditTrails')}</h4>
                    <p className="text-muted-foreground text-sm">
                      {t('security.auditTrailsDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>{t('security.questionsTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t('security.questionsDesc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:security@neono.com"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {t('security.contactTeam')}
                  </a>
                  <a
                    href="/security-whitepaper.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    {t('security.downloadWhitepaper')}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}