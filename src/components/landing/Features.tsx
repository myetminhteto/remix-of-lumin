import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Users, Calendar, BarChart3, FileText, 
  Clock, Globe, Shield, Zap 
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Centralize all employee data with customizable profiles and org charts.",
    color: "feature-icon-indigo",
  },
  {
    icon: Calendar,
    title: "Leave & Attendance",
    description: "Automate leave requests, approvals, and real-time attendance tracking.",
    color: "feature-icon-blue",
  },
  {
    icon: BarChart3,
    title: "Performance Reviews",
    description: "Run 360° feedback cycles with goal tracking and analytics.",
    color: "feature-icon-teal",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Secure storage for contracts, policies, and employee documents.",
    color: "feature-icon-emerald",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Accurate timesheets with project-based tracking and reports.",
    color: "feature-icon-amber",
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Stay compliant across 150+ countries with automated updates.",
    color: "feature-icon-rose",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 certified with SSO, 2FA, and role-based access.",
    color: "feature-icon-purple",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Build custom workflows for onboarding, approvals, and more.",
    color: "feature-icon-indigo",
  },
];

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      ref={sectionRef}
      id="features"
      className="relative py-20 sm:py-28 md:py-36 lg:py-44 bg-secondary/30 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 right-0 h-px divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px divider" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="badge-primary"
          >
            Features
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="headline-lg mt-4 sm:mt-6 mb-4 sm:mb-5"
          >
            Everything You Need to
            <br />
            <span className="gradient-text">Manage Your Team</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg"
          >
            A comprehensive suite of tools designed for modern HR teams.
            Powerful yet intuitive.
          </motion.p>
        </div>

        {/* Feature Grid - 3D Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto perspective-2000">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group"
              >
                <motion.div
                  animate={{
                    rotateX: isHovered ? 3 : 0,
                    rotateY: isHovered ? -3 : 0,
                    scale: isHovered ? 1.02 : 1,
                    z: isHovered ? 20 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="card-subtle p-5 sm:p-6 h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Icon */}
                  <div className={`feature-icon ${feature.color} mb-4 sm:mb-5`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover effect - subtle glow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08), transparent 60%)",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
