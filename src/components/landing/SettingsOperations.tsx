import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Shield, Settings, Lock, Users, ChevronDown } from "lucide-react";
import settingsPanel from "@/assets/settings-panel-new.png";
import operationsGrid from "@/assets/operations-grid-new.png";

const scrollContent = [
  {
    id: "settings",
    icon: Settings,
    title: "Settings",
    subtitle: "Configure with Confidence",
    description: "Perform HR service configurations with stringent role assignments that allow access only to authorized persons. Define granular permissions, set up approval workflows, and ensure complete audit trails for every change.",
    image: settingsPanel,
  },
  {
    id: "operations",
    icon: Shield,
    title: "Operations",
    subtitle: "Manage with Precision",
    description: "Easily alter and efficiently manage all data integral to an HR admin's day-to-day processes. From bulk updates to individual record management, handle it all with enterprise-grade reliability.",
    image: operationsGrid,
  },
];

export function SettingsOperations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for scroll progress - slower, more elegant
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001
  });

  // Mobile: Simple stacked layout without sticky
  if (isMobile) {
    return (
      <section className="relative bg-[hsl(var(--dark-bg))] py-16 sm:py-20">
        {/* Subtle top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="max-w-xl mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="badge-dark"
            >
              Settings & Operations
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold mt-6 text-white leading-[0.95]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Secure Access
              <br />
              to Sensitive
              <br />
              <span className="gradient-text-light">Data</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg mt-6 text-white/50 max-w-md leading-relaxed"
            >
              Configure HR services with granular role assignments and manage critical data with enterprise-grade security.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 space-y-3"
            >
              {[
                { icon: Lock, text: "Role-based access control" },
                { icon: Users, text: "Multi-level permissions" },
                { icon: Shield, text: "Audit logging & compliance" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/60">
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Cards - Stacked on mobile */}
          <div className="space-y-8">
            {scrollContent.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Image */}
                  <div className="rounded-xl overflow-hidden shadow-2xl mb-4 bg-dark-card/50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full object-cover"
                    />
                  </div>
                  
                  {/* Caption */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-display font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-0.5">
                          {item.subtitle}
                        </p>
                        <p className="text-white/40 text-sm mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Desktop: Sticky scroll with smooth animations
  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[hsl(var(--dark-bg))]"
      style={{ minHeight: '300vh' }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Sticky container */}
      <div className="sticky top-0 min-h-screen flex items-center overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Left: Headline content */}
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="badge-dark"
              >
                Settings & Operations
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mt-8 text-white leading-[0.95]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Secure Access
                <br />
                to Sensitive
                <br />
                <span className="gradient-text-light">Data</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl mt-8 text-white/50 max-w-md leading-relaxed"
              >
                Configure HR services with granular role assignments and manage critical data with enterprise-grade security.
              </motion.p>

              {/* Feature highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-10 space-y-4"
              >
                {[
                  { icon: Lock, text: "Role-based access control" },
                  { icon: Users, text: "Multi-level permissions" },
                  { icon: Shield, text: "Audit logging & compliance" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/60">
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mt-12 text-white/30"
              >
                <ChevronDown className="w-4 h-4 animate-bounce" />
                <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
              </motion.div>
            </div>

            {/* Right: Smooth scrolling visuals */}
            <div className="relative min-h-[70vh] flex items-center">
              {scrollContent.map((item, index) => (
                <DesktopScrollItem 
                  key={item.id}
                  item={item}
                  index={index}
                  total={scrollContent.length}
                  smoothProgress={smoothProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DesktopScrollItemProps {
  item: typeof scrollContent[0];
  index: number;
  total: number;
  smoothProgress: any;
}

function DesktopScrollItem({ item, index, total, smoothProgress }: DesktopScrollItemProps) {
  const Icon = item.icon;
  
  // Calculate animation ranges - longer stable periods for smoother experience
  const segmentSize = 1 / total;
  const startPoint = index * segmentSize;
  const fadeInMid = startPoint + segmentSize * 0.15;
  const stableStart = startPoint + segmentSize * 0.2;
  const stableEnd = startPoint + segmentSize * 0.8;
  const fadeOutMid = startPoint + segmentSize * 0.85;
  const endPoint = (index + 1) * segmentSize;
  
  // Smooth opacity - longer stable period
  const opacity = useTransform(
    smoothProgress, 
    [startPoint, fadeInMid, stableStart, stableEnd, fadeOutMid, endPoint],
    [0, 0.6, 1, 1, index === total - 1 ? 1 : 0.6, index === total - 1 ? 1 : 0]
  );
  
  // Smooth Y movement - gradual slide
  const y = useTransform(
    smoothProgress,
    [startPoint, fadeInMid, stableStart, stableEnd, fadeOutMid, endPoint],
    [80, 40, 0, 0, index === total - 1 ? 0 : -30, index === total - 1 ? 0 : -60]
  );
  
  // Subtle scale for depth
  const scale = useTransform(
    smoothProgress,
    [startPoint, stableStart, stableEnd, endPoint],
    [0.96, 1, 1, index === total - 1 ? 1 : 0.98]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center"
    >
      <div className="w-full">
        {/* Image container */}
        <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 bg-dark-card/50">
          <img
            src={item.image}
            alt={item.title}
            className="w-full object-cover"
          />
        </div>
        
        {/* Caption */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6 text-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-display font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm mt-0.5">
                {item.subtitle}
              </p>
              <p className="text-white/40 text-base mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
