'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Star, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  badge: 'New Release',
  title: 'Build the Future with Modern Tech',
  subtitle:
    'Streamline your development workflow with our cutting-edge platform. Ship faster, scale better, and focus on what matters most.',
  primaryCta: 'Start Building',
  primaryCtaHref: '/signup',
  secondaryCta: 'Watch Demo',
  secondaryCtaHref: '/demo',
  stats: [
    { label: 'Active Users', value: '50K+', icon: 'users' },
    { label: 'Uptime', value: '99.9%', icon: 'zap' },
    { label: 'Rating', value: '4.9/5', icon: 'star' },
  ],
  features: ['Zero-config deployment', 'Real-time collaboration', 'Enterprise security'],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryCta = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryCta = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="h-5 w-5" />;
      case 'zap':
        return <Zap className="h-5 w-5" />;
      case 'star':
        return <Star className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              <span data-editable="badge">{config.badge}</span>
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span data-editable="title">{config.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              size="lg"
              onClick={handlePrimaryCta}
              data-editable-href="primaryCtaHref"
              data-href={config.primaryCtaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span data-editable="primaryCta">{config.primaryCta}</span>
              <ArrowRight
                className={`ml-2 h-4 w-4 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`}
              />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleSecondaryCta}
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
              className="border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <Play className="mr-2 h-4 w-4" />
              <span data-editable="secondaryCta">{config.secondaryCta}</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {config.stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-card text-card-foreground border border-border hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-2 text-primary">
                  {getIcon(stat.icon)}
                  <span className="text-2xl font-bold" data-editable={`stats[${idx}].value`}>
                    {stat.value}
                  </span>
                </div>
                <span
                  className="text-sm text-muted-foreground"
                  data-editable={`stats[${idx}].label`}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {config.features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span data-editable={`features[${idx}]`}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
