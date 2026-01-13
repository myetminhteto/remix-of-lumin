import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[hsl(var(--dark-bg))]"
      style={{ minHeight: '400vh' }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* Sticky container */}
      <div className="sticky top-0 min-h-screen flex items-center overflow-hidden py-16 sm:py-20 lg:py-0">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary/6 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center">
            {/* Left: Headline content - Clean, no cards */}
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
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-6 sm:mt-8 text-white leading-[0.95]"
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
                className="text-base sm:text-lg md:text-xl mt-6 sm:mt-8 text-white/50 max-w-md leading-relaxed"
              >
                Configure HR services with granular role assignments and manage critical data with enterprise-grade security.
              </motion.p>

              {/* Feature highlights - Simple list */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 sm:mt-10 space-y-3 sm:space-y-4"
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

              {/* Scroll indicator for desktop */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="hidden lg:flex items-center gap-2 mt-12 text-white/30"
              >
                <ChevronDown className="w-4 h-4 animate-bounce" />
                <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
              </motion.div>
            </div>

            {/* Right: Sticky scrolling visuals - Improved */}
            <div className="relative min-h-[400px] sm:min-h-[500px] lg:min-h-[70vh] flex items-center">
              {scrollContent.map((item, index) => (
                <ScrollItem 
                  key={item.id}
                  item={item}
                  index={index}
                  total={scrollContent.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ScrollItemProps {
  item: typeof scrollContent[0];
  index: number;
  total: number;
  scrollYProgress: any;
}

function ScrollItem({ item, index, total, scrollYProgress }: ScrollItemProps) {
  const Icon = item.icon;
  
  // Calculate animation ranges for each item - smoother transitions
  const segmentSize = 1 / total;
  const startPoint = index * segmentSize;
  const fadeInEnd = startPoint + segmentSize * 0.2;
  const stableStart = startPoint + segmentSize * 0.25;
  const stableEnd = startPoint + segmentSize * 0.75;
  const fadeOutStart = startPoint + segmentSize * 0.8;
  const endPoint = (index + 1) * segmentSize;
  
  // Smoother opacity transitions
  const opacity = useTransform(
    scrollYProgress, 
    [startPoint, fadeInEnd, stableStart, stableEnd, fadeOutStart, endPoint],
    [0, 0.5, 1, 1, index === total - 1 ? 1 : 0.5, index === total - 1 ? 1 : 0]
  );
  
  // Smoother Y movement
  const y = useTransform(
    scrollYProgress,
    [startPoint, fadeInEnd, stableStart, stableEnd, fadeOutStart, endPoint],
    [60, 30, 0, 0, index === total - 1 ? 0 : -20, index === total - 1 ? 0 : -40]
  );
  
  // Subtle scale for depth
  const scale = useTransform(
    scrollYProgress,
    [startPoint, stableStart, stableEnd, endPoint],
    [0.95, 1, 1, index === total - 1 ? 1 : 0.98]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center"
    >
      <div className="w-full">
        {/* Image container - Clean, open layout */}
        <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mb-4 sm:mb-6 bg-dark-card/50">
          <img
            src={item.image}
            alt={item.title}
            className="w-full object-cover"
          />
        </div>
        
        {/* Caption - More detailed with full description */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm mt-0.5">
                {item.subtitle}
              </p>
              <p className="text-white/40 text-sm sm:text-base mt-3 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
