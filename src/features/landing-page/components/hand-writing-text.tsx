"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface HandWrittenTitleProps {
  title?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

function HandWrittenTitle({
  title = "Hand Written",
  subtitle,
  className
}: HandWrittenTitleProps) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] as const },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className={cn("relative w-full mx-auto flex items-center justify-center", className)}>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.svg
          width="140%"
          height="140%"
          viewBox="0 0 1200 600"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-[140%] h-[140%] absolute"
        >
          <motion.path
            d="M 950 90
               C 1250 300, 1050 480, 600 520
               C 250 520, 150 480, 150 300
               C 150 120, 350 80, 600 80
               C 850 80, 950 180, 950 180"
            fill="none"
            strokeWidth="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={draw}
            className="text-primary opacity-80"
          />
        </motion.svg>
      </div>
      <div className="relative text-center z-10 flex flex-col items-center justify-center">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {title}
        </motion.div>
        {subtitle && (
          <motion.p
            className="text-sm text-foreground/80 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export { HandWrittenTitle }
