import { SEOHead } from '@/components/SEO/SEOHead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Users, CheckCircle, Server } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description: 'Annual audits ensure our security controls meet the highest industry standards for availability, security, and confidentiality.',
    status: 'Certified'
  },
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption with customer-managed keys.',
    status: 'Active'
  },
  {
    icon: Eye,
    title: 'HIPAA Compliance',
    description: 'Full HIPAA compliance for medical spas and healthcare providers, with signed BAAs and audit trails.',
    status: 'Compliant'
  },
  {
    icon: Users,
    title: 'Role-Based Access Control',
    description: 'Granular permissions system ensures users only access data necessary for their role.',
    status: 'Active'
  },
  {
    icon: CheckCircle,
    title: 'PCI DSS Level 1',
    description: 'Highest level of PCI compliance for secure payment processing and cardholder data protection.',
    status: 'Certified'
  },
  {
    icon: Server,
    title: 'Infrastructure Security',
    description: 'Multi-region cloud infrastructure with automated backups, failover, and 99.9% uptime SLA.',
    status: 'Active'
  }
];

const complianceStandards = [
  { name: 'SOC 2 Type II', status: 'Certified', renewalDate: 'Annual' },
  { name: 'HIPAA', status: 'Compliant', renewalDate: 'Ongoing' },
  { name: 'PCI DSS Level 1', status: 'Certified', renewalDate: 'Annual' },
  { name: 'GDPR', status: 'Compliant', renewalDate: 'Ongoing' },
  { name: 'CCPA', status: 'Compliant', renewalDate: 'Ongoing' },
  { name: 'ISO 27001', status: 'In Progress', renewalDate: 'Q2 2025' }
];

export function Security() {
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
            <Badge variant="secondary" className="mb-4">Security & Compliance</Badge>
            <h1 className="text-4xl font-display font-bold mb-6">
              Enterprise-grade security you can trust
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your business data and customer information are protected by industry-leading 
              security measures and compliance certifications.
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
              <h2 className="text-3xl font-display font-bold mb-4">
                Compliance & Certifications
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We maintain the highest standards of compliance to protect your business 
                and ensure regulatory adherence.
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold">Standard</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Renewal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceStandards.map((standard, index) => (
                        <tr key={index} className="border-b border-border/50 last:border-0">
                          <td className="p-4 font-medium">{standard.name}</td>
                          <td className="p-4">
                            <Badge 
                              variant={
                                standard.status === 'Certified' || standard.status === 'Compliant' 
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
              <h3 className="text-2xl font-display font-bold mb-6">Data Protection</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Encryption Everywhere</h4>
                    <p className="text-muted-foreground text-sm">
                      TLS 1.3 for data in transit, AES-256 for data at rest
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Regular Backups</h4>
                    <p className="text-muted-foreground text-sm">
                      Automated daily backups with 30-day retention
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Data Residency</h4>
                    <p className="text-muted-foreground text-sm">
                      Choose where your data is stored and processed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Access Security</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Multi-Factor Authentication</h4>
                    <p className="text-muted-foreground text-sm">
                      Required for all admin accounts and staff access
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Session Management</h4>
                    <p className="text-muted-foreground text-sm">
                      Automatic logout and session timeout controls
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Audit Trails</h4>
                    <p className="text-muted-foreground text-sm">
                      Complete logging of all user actions and data access
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
                <CardTitle>Security Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our security team is available to answer any questions about our practices, 
                  compliance, or to provide additional documentation for your evaluation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:security@neono.com" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contact Security Team
                  </a>
                  <a 
                    href="/security-whitepaper.pdf" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    Download Security Whitepaper
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