import React from "react";

const SkillCard = ({ logo, skillName }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-2xl p-4 w-32 h-40 hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
        <img src={logo} alt={skillName} className="w-10 h-10 object-contain" />
      </div>
      <p className="text-center text-sm font-medium text-gray-700">
        {skillName}
      </p>
    </div>
  );
};

const SkillsSection = ({ skills }) => {
  return (
    <div className="h-screen bg-black">
      <div className="w-[80vw] m-auto">
        <div>
          <h1 className="text-4xl font-bold text-white mb-6">My Skills</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-slate-300 p-6 rounded-lg">
          {skills.map((skill, index) => (
            <SkillCard key={index} logo={skill.image} skillName={skill.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
