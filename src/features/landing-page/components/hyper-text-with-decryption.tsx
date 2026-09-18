"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCRAMBLE_SPEED = 10;
const CYCLES_PER_LETTER = 3;
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

interface HyperTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  /** When true, the scramble animation automatically sweeps across every
   *  word (first to last) the first time the paragraph scrolls into view,
   *  so users see the effect without discovering the hover first. */
  autoPlay?: boolean;
}

interface WordProps {
  children: string;
  isDimmed: boolean;
  isHighlightable: boolean;
  /** Driven by the parent's auto-play sweep: this word is currently
   *  "performing" even though the mouse is elsewhere. */
  forceActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const Word = ({
  children,
  isDimmed,
  isHighlightable,
  forceActive,
  onHoverStart,
  onHoverEnd,
}: WordProps) => {
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isActive = isHovered || forceActive;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Keep the rendered text in sync when the prop changes (e.g. a language
  // switch swaps every word); cancel any in-flight scramble first.
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  }, [children]);

  const scramble = useCallback(() => {
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) return char;
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= children.length * CYCLES_PER_LETTER) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
      }
    }, SCRAMBLE_SPEED);
  }, [children]);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  }, [children]);

  // Auto-play sweep: the parent activates one word at a time; give it
  // the same scramble + highlight treatment a real hover gets.
  useEffect(() => {
    if (forceActive) {
      scramble();
    }
  }, [forceActive, scramble]);

  const handleMouseEnter = () => {
    if (isHighlightable) {
      setIsHovered(true);
      onHoverStart();
      scramble();
    }
  };

  const handleMouseLeave = () => {
    if (isHighlightable) {
      setIsHovered(false);
      onHoverEnd();
      stopScramble();
    }
  };

  return (
    <motion.span
      className={cn(
        "relative inline-block font-mono font-medium whitespace-nowrap",
        isHighlightable ? "cursor-pointer" : "cursor-default"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        scale: isActive ? 1.1 : 1,
        y: isActive ? -2 : 0,
        opacity: isDimmed && !isActive ? 0.3 : 1,
        filter: isDimmed && !isActive ? "blur(2px)" : "blur(0px)",
        zIndex: isActive ? 20 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence>
        {isActive && (
          <motion.span
            className="absolute -inset-1.5 rounded-md bg-primary z-[-1]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            layoutId="hover-bg"
            style={{
              boxShadow: "0px 8px 20px -4px oklch(from var(--primary) l c h / 0.4)",
            }}
          />
        )}
      </AnimatePresence>

      <span
        className={cn(
          "relative z-10 px-0.5 transition-colors duration-150",
          isActive
            ? "text-primary-foreground"
            : isHighlightable
            ? "text-primary"
            : "text-inherit"
        )}
      >
        {displayText}
      </span>

      <AnimatePresence>
        {isActive && (
          <>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-foreground rounded-full z-20"
            />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-accent rounded-full z-20"
            />
          </>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

export default function HyperTextParagraph({
  text,
  className = "",
  highlightWords = [],
  autoPlay = false,
}: HyperTextProps) {
  const [isParagraphHovered, setIsParagraphHovered] = useState(false);
  // Index of the word currently performing in the auto-play sweep,
  // -1 when the sweep is idle.
  const [autoIndex, setAutoIndex] = useState(-1);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAutoPlayedRef = useRef(false);
  const lastTextRef = useRef(text);

  const words = text.split(" ");
  const clean = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    // New text (e.g. a language switch) means new words to sweep, so allow
    // the auto-play to run again for them.
    if (lastTextRef.current !== text) {
      lastTextRef.current = text;
      hasAutoPlayedRef.current = false;
      setAutoIndex(-1);
    }

    if (!autoPlay || hasAutoPlayedRef.current) return;

    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timers: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasAutoPlayedRef.current) return;
        hasAutoPlayedRef.current = true;
        observer.disconnect();

        // Sweep only the highlightable words, in order. Each gets the
        // same treatment a hover gives it: scramble + highlight, then a
        // short beat before the next one takes over.
        let delay = 400;
        words.forEach((word, i) => {
          const isHighlightable = highlightWords.some(
            (hw) => clean(hw) === clean(word)
          );
          if (!isHighlightable) return;

          const scrambleDuration = word.length * CYCLES_PER_LETTER * SCRAMBLE_SPEED;
          const dwell = Math.max(900, scrambleDuration + 700);

          timers.push(window.setTimeout(() => setAutoIndex(i), delay));
          delay += dwell;
          timers.push(window.setTimeout(() => setAutoIndex(-1), delay));
          delay += 250;
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
    // text identity covers content changes; highlightWords always changes
    // together with text (both come from the same translation), so keying
    // on text alone is sufficient.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, text]);

  const isDimmed = isParagraphHovered || autoIndex >= 0;

  return (
    <span
      ref={containerRef}
      className={cn("leading-relaxed tracking-wide", className)}
    >
      {words.map((word, i) => {
        const isHighlightable = highlightWords.some(
          (hw) => clean(hw) === clean(word)
        );

        return (
          <React.Fragment key={i}>
            <Word
              isDimmed={isDimmed}
              isHighlightable={isHighlightable}
              forceActive={i === autoIndex}
              onHoverStart={() => setIsParagraphHovered(true)}
              onHoverEnd={() => setIsParagraphHovered(false)}
            >
              {word}
            </Word>
            {i < words.length - 1 && (
              <span className="inline-block whitespace-pre"> </span>
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
}
