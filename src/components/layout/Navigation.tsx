'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'TechFlow',
  navItems: [{ label: 'Home', href: '#hero' }],
  ctaText: 'Get Started',
  ctaHref: '#hero',
  showCta: true,
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsOpen(false);
  };

  return (
    <section
      id="navigation"
      className="bg-background text-foreground border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Name */}
          <div className="flex items-center">
            <span
              className="text-xl md:text-2xl font-bold text-foreground"
              data-editable="brandName"
            >
              {config.brandName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6">
              {config.navItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                    data-editable-href={`navItems[${idx}].href`}
                    data-href={item.href}
                  >
                    <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {config.showCta && (
              <Button
                onClick={handleCtaClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground border-border">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Brand */}
                  <div className="flex items-center pb-6 border-b border-border">
                    <span className="text-xl font-bold text-foreground" data-editable="brandName">
                      {config.brandName}
                    </span>
                  </div>

                  {/* Mobile Navigation Items */}
                  <ul className="flex flex-col space-y-4">
                    {config.navItems.map((item, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium w-full text-left"
                          data-editable-href={`navItems[${idx}].href`}
                          data-href={item.href}
                        >
                          <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile CTA */}
                  {config.showCta && (
                    <div className="pt-6 border-t border-border">
                      <Button
                        onClick={handleCtaClick}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                        data-editable-href="ctaHref"
                        data-href={config.ctaHref}
                      >
                        <span data-editable="ctaText">{config.ctaText}</span>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
