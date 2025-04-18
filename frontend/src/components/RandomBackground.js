"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/language_school/images/bg_icons/CPP.png", "/language_school/images/bg_icons/CSS3.png", "/language_school/images/bg_icons/HTML5.png", "/language_school/images/bg_icons/Java.png",
  "/language_school/images/bg_icons/JS.png", "/language_school/images/bg_icons/Python.png", "/language_school/images/bg_icons/React.svg",
  "/language_school/images/bg_icons/m1.png", "/language_school/images/bg_icons/m2.png", "/language_school/images/bg_icons/m3.png", "/language_school/images/bg_icons/m4.png",
  "/language_school/images/bg_icons/m5.png", "/language_school/images/bg_icons/m6.png"
];

function getRandomPosition() {
  const top = Math.floor(Math.random() * 60); 
  const left = Math.floor(Math.random() * 100); 
  return { top: `${top}%`, left: `${left}%` };
}

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

export default function RandomBackground() {
  const [bgItems, setBgItems] = useState([]);

  useEffect(() => {
    const addImage = () => {
      const id = Date.now() + Math.random();
      const newItem = {
        id,
        src: getRandomImage(),
        position: getRandomPosition(),
      };
      setBgItems(prev => [...prev, newItem]);

      // Remove after random duration
      const timeout = Math.random() * 7000 + 3000;
      setTimeout(() => {
        setBgItems(prev => prev.filter(item => item.id !== id));
      }, timeout);
    };

    const scheduleNext = () => {
      const nextIn = Math.random() * 500;
      setTimeout(() => {
        addImage();
        scheduleNext();
      }, nextIn);
    };

    scheduleNext();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden opacity-20">
      <AnimatePresence>
        {bgItems.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
            className="absolute bg-contain bg-no-repeat bg-contain w-10 h-10 opacity-40"
            style={{
              backgroundImage: `url(${item.src})`,
              top: item.position.top,
              left: item.position.left,
              willChange: "transform",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}