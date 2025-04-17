"use client"
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp, Globe } from "lucide-react";


export default function Home() {
  const [selected, setSelected] = useState("Русский");
  const [selectedCurrent, setSelectedCurrent] = useState("ЯЗЫК САЙТА");
  const [isOpen, setIsOpen] = useState(false);
  const [svgLink, setSvgLink] = useState('/robot.svg');
  const [fadeIn, setFadeIn] = useState(false);

  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);

  const [isWebKit, setIsWebKit] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isWebKitBrowser = /AppleWebKit/.test(ua) && !/Chrome/.test(ua);
    setIsWebKit(isWebKitBrowser);
  }, []);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if(isWebKit) {
  //       setSvgLink(`/robot_amb.svg?${Date.now()}`); 
  //       fetch(`/robot_amb.svg?${Date.now()}`)
  //         .then(res => res.text())
  //         .then(setSvgContent);
  //     }
  //     else {
  //       setSvgLink(`/robot_start.svg?${Date.now()}`); // update svgLink after 3 seconds
  //       setTimeout(() => {
  //         setSvgLink(`/robot_amb.svg?${Date.now()}`); // update svgLink after 3 seconds
  //         fetch(`/robot_amb.svg?${Date.now()}`)
  //         .then(res => res.text())
  //         .then(setSvgContent);
  //       }, 2500); // 3000 milliseconds = 3 seconds
  //     }
  //   }, 3500) // 3000 milliseconds = 3 seconds


  // }, [isWebKit]);

  useEffect(() => {
    fetch(`/robot_amb.svg?${Date.now()}`)
      .then(res => res.text())
      .then(setSvgContent);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      const lerp = (start, end, amt) => start + (end - start) * amt;

      const svg = container.querySelector('svg');
      const leftEye = container.querySelector('#es0NnFBPiAJ31_to');
      const innerLeft = leftEye?.querySelector('g'); // this is the inner inverse-transform group
      const leftblink = container.querySelector('#es0NnFBPiAJ42_to');
      const leftblinkellipse = leftblink?.querySelector('ellipse');

      const rightEye = container.querySelector('#es0NnFBPiAJ24_to');
      const innerRight = rightEye?.querySelector('g'); // this is the inner inverse-transform group


      if (!(svg instanceof SVGSVGElement)) return;

      let currentXLeft = 0;
      let currentXRight = 0;
      let currentY = 0;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      currentXLeft = lerp(pt.x, -200, 0.000001);
      currentY = lerp(pt.y, 200, 0.00001);
      const distL = Math.hypot(currentXLeft, currentY);
      const W_LEFT  = 275;  // how far left
      const W_RIGHT = 350;
      const W = currentXLeft > 50 ? W_RIGHT : W_LEFT;
      const factorWL = distL < W ? 1 : W / distL;
      const H_TOP = 120;
      const H_BOTTOM = 170;
      const HL = currentY < -20 ? H_BOTTOM : H_TOP;
      const factorHL = distL < HL ? 1 : HL / distL;


      currentXRight = lerp(pt.x, 200, -0.00001);
      const distR = Math.hypot(currentXRight, currentY);
      const WR = currentXLeft > -50 ? W_LEFT : W_RIGHT;
      const factorWR = distR < W ? 1 : W / distR;
      const HR = 140;
      const factorHR = distR < HL ? 1 : HL / distR;

     
      leftEye.setAttribute('transform', `translate(${currentXLeft*factorWL-1000}, ${currentY*factorHL-500})`);
      innerLeft.setAttribute('transform', `translate(${currentXLeft*factorWL-1000}, ${currentY*factorHL-500})`);

      rightEye.setAttribute('transform', `translate(${currentXRight*factorWR-1400}, ${currentY*factorHR-490})`);
      innerRight.setAttribute('transform', `translate(${currentXRight*factorWR-1400}, ${currentY*factorHR-490})`);
    };  
    window.addEventListener('mousemove', handleGlobalMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
      };
  }, []);

  const languages = ["РУССКИЙ", "ENGLISH", "ESPAÑOL"];
  const current_lang = ["ЯЗЫК САЙТА: ", "LANGUAGE: ", "IDIOMA DEL SITIO: "];
  return (
    <div className="bg-white">
      <header className="fixed flex justify-between w-full bg-white/40 p-3 max-md:p-0 backdrop-blur-md">
        <div className="flex justify-left items-center">
          <Image className="items-left " src="/Itish.jpg" width={70} height={70} alt="Лого"/>
          <h1 className="text-xl text-left text-black ">Айтишкино</h1>
        </div>
        <div className="flex justify-left items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center text-black justify-center mr-4 w-60 max-md:w-40 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer transition duration-200
            ${isOpen ? "rounded-b-none border-b-0" : ""}`}
          >

            <div className="flex items-center text-xs text-black">
              <span className="max-md:hidden mr-4 font-md">{selectedCurrent}</span>
              <Globe className="w-4 h-4 mr-2 hidden max-md:block" />
              <span>{selected}</span>
              
            </div>
            {isOpen ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </button>

        {isOpen && (
          <ul className="absolute z-10 mt-38 w-60 max-md:w-40 bg-white border border-gray-200 border-t-0 rounded-lg rounded-t-none shadow-lg">
            {languages.map((lang, i) => (
              <li
                key={lang}
                onClick={() => {
                  setSelected(lang);
                  setSelectedCurrent(current_lang[i]);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-black cursor-pointer hover:bg-gray-100 transition duration-200 ${
                  lang === selected ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
        </div>
      </header>
      <div className="flex bg-white max-md:flex-col flex-row text-center justify-center items-center gap-[300px] max-md:gap-10 p-5 pt-20 ">
          {!svgContent ? 
          <Image src={svgLink} width={300} height={300} alt="robot" className="w-72 max-md:w-60" /> 
          :
          <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            className="w-72 max-md:w-60 mr-40"
          />
          }
          <div className={`flex flex-col gap-3 items-center transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            <div className="font-bold">
              <h2 >Запишитесь на пробное занятие в IT-Школе</h2>
            </div>
            <div className="flex flex-col gap-3 items-center">
             <button className="w-96 max-md:w-60 bg-[#e6f0fc] px-4 py-2 text-[#2A63A4] text-3xs border border-[#2A63A4] shadow-lg shadow-[#2A63A4] rounded-lg shadow-sm transition duration-500 ease-in-out hover:bg-[#2A63A4] hover:text-white cursor-pointer"> НАЧАТЬ </button>
             <button className="w-96 max-md:w-60 bg-[#ffeee3] px-4 py-2 text-[#d66e29] text-3xs border border-[#d66e29] shadow-lg shadow-[#d66e29] rounded-lg shadow-sm transition duration-500 ease-in-out hover:bg-[#d66e29] hover:text-white cursor-pointer"> У МЕНЯ УЖЕ ЕСТЬ АККАУНТ </button>
             </div>
          </div>
      </div>
    </div>
  );
}
