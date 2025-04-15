"use client"
import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [selected, setSelected] = useState("Русский");
  const [selectedCurrent, setSelectedCurrent] = useState("ЯЗЫК САЙТА");
  const [isOpen, setIsOpen] = useState(false);

  const languages = ["РУССКИЙ", "ENGLISH", "ESPAÑOL"];
  const current_lang = ["ЯЗЫК САЙТА: ", "WEBSITE LANGUAGE: ", "IDIOMA DEL SITIO: "]
  return (
    <div className="bg-white">
      <header className="flex justify-between">
        <div className="flex justify-left items-center">
          <Image className="items-left " src="/Itish.jpg" width={70} height={70} alt="Лого"/>
          <h1 className="text-xl text-left text-black ">Айтишкино</h1>
        </div>
        <div className="flex justify-left items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center text-black justify-center mr-4 w-60 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none cursor-pointer"
          >

            <div className="flex items-center text-xs text-black">
              <span className="mr-4">{selectedCurrent}</span>
              <span>{selected}</span>
              
            </div>
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

        {isOpen && (
          <ul className="absolute z-10 mt-38 w-40  bg-white border border-gray-200 rounded-lg shadow-lg">
            {languages.map((lang, i) => (
              <li
                key={lang}
                onClick={() => {
                  setSelected(lang);
                  setSelectedCurrent(current_lang[i]);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-black cursor-pointer hover:bg-gray-100 ${
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
      <div className="flex bg-white max-md:flex-col flex-row text-center justify-center items-center gap-[50px] p-20 ">
          <Image src="/robot_amb.svg" width={300} height={300} alt="robot" />
          <div className="flex flex-col gap-10 m-10">
            <div className="font-bold">
              <h2 >Запишитесь на пробное занятие в IT-Школе</h2>
            </div>
            <div className="flex flex-col gap-2">
             <button className="bg-[#e6f0fc] px-4 py-2 text-[#2A63A4] text-3xs border border-[#2A63A4] shadow-lg shadow-[#2A63A4] rounded-lg shadow-sm transition duration-500 ease-in-out hover:bg-[#2A63A4] hover:text-white cursor-pointer"> НАЧАТЬ </button>
             <button className="bg-[#ffeee3] px-4 py-2 text-[#d66e29] text-3xs border border-[#d66e29] shadow-lg shadow-[#d66e29] rounded-lg shadow-sm transition duration-500 ease-in-out hover:bg-[#d66e29] hover:text-white cursor-pointer"> У МЕНЯ УЖЕ ЕСТЬ АККАУНТ </button>
             </div>
          </div>
      </div>
    </div>
  );
}
