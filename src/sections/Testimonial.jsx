import { twMerge } from "tailwind-merge";
import PropTypes from 'prop-types';
import Marquee from "../components/Marquee";
import { skills } from "../constants";
import { FiCode } from 'react-icons/fi'; // Importar ícono de reemplazo

// Dividir las habilidades en dos filas para el efecto de marquesina
const firstRow = skills.slice(0, Math.ceil(skills.length / 2));
const secondRow = skills.slice(Math.ceil(skills.length / 2));

const SkillCard = ({ name, logo }) => {
  SkillCard.propTypes = {
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
  };
  
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex'; // Mostrar el ícono de reemplazo
  };

  return (
    <div
      className={twMerge(
        "relative h-40 w-40 flex flex-col items-center justify-center cursor-pointer overflow-hidden rounded-xl border p-6 border-gray-50/[0.1] bg-gradient-to-r from-indigo to-storm hover:bg-royal hover:scale-105 transition-transform duration-300"
      )}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 flex items-center justify-center mb-3 relative">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain"
            onError={handleImageError}
          />
          <div className="hidden w-full h-full items-center justify-center text-white text-3xl">
            <FiCode />
          </div>
        </div>
        <h3 className="text-white text-center font-medium text-sm md:text-base">
          {name}
        </h3>
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <div className="items-start mt-25 md:mt-35 c-space">
      <h2 className="text-heading">Technologies that I use</h2>
      <div className="relative flex flex-col items-center justify-center w-full mt-12 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s] py-4">
          {firstRow.map((skill, index) => (
            <div key={`first-${index}`} className="mx-2">
              <SkillCard {...skill} />
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s] py-4">
          {secondRow.map((skill, index) => (
            <div key={`second-${index}`} className="mx-2">
              <SkillCard {...skill} />
            </div>
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary"></div>
      </div>
    </div>
  );
}
