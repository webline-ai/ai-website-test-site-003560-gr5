'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Gauge } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Streamlined Technology Solutions',
  subtitle:
    'Cutting-edge technology made accessible and user-friendly. Reliable solutions that deliver measurable results through streamlined processes.',
  ctaText: 'Get Started',
  ctaHref: '/contact',
  secondaryCtaText: 'View Solutions',
  secondaryCtaHref: '/solutions',
  logoUrl:
    'https://pub-60de11c8c43b49ea9bd786eb6273aa91.r2.dev/394e026a1b7f0bc1403b869b5a803415.svg',
  logoAlt: 'Company Logo',
  features: ['Scalable & Optimized', 'Results-Driven', 'Intuitive Design'],
  stats: [
    { value: '99.9%', label: 'Uptime' },
    { value: '50ms', label: 'Response Time' },
    { value: '24/7', label: 'Support' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src={config.logoUrl}
                alt={config.logoAlt}
                width={120}
                height={48}
                className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                data-editable-src="logoUrl"
              />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-3">
              {config.features.map((feature, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium"
                >
                  <span data-editable={`features[${idx}]`}>{feature}</span>
                </Badge>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>
          </div>

          {/* Stats Column */}
          <div
            className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Card className="bg-card text-card-foreground border-border shadow-lg">
              <CardContent className="p-8">
                <div className="grid gap-8">
                  {/* Performance Metrics */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Gauge className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">Performance Metrics</h3>
                    </div>

                    <div className="grid gap-6">
                      {config.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                        >
                          <div>
                            <div className="text-2xl font-bold text-primary">
                              <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                            </div>
                          </div>
                          <div className="p-2 bg-primary/10 rounded-full">
                            {idx === 0 && <Shield className="h-5 w-5 text-primary" />}
                            {idx === 1 && <Zap className="h-5 w-5 text-primary" />}
                            {idx === 2 && <Gauge className="h-5 w-5 text-primary" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Excellence Indicator */}
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground font-medium">
                        All systems operational
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
