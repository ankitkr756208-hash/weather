import React from 'react';

// The average number of days in a lunar cycle
const LUNAR_CYCLE_DAYS = 29.530588853;

// A known date of a new moon to use as a reference point for calculations (January 6, 2000)
const KNOWN_NEW_MOON_DATE = new Date('2000-01-06T18:14:00Z').getTime();

/**
 * Calculates the moon phase for a given date.
 * @param date The date for which to calculate the moon phase.
 * @returns An object containing the phase value (0-1), name, and emoji.
 */
const getMoonPhase = (date: Date): { phase: number; name: string; emoji: string } => {
  const daysSinceKnownNewMoon = (date.getTime() - KNOWN_NEW_MOON_DATE) / (1000 * 60 * 60 * 24);
  const phase = (daysSinceKnownNewMoon % LUNAR_CYCLE_DAYS) / LUNAR_CYCLE_DAYS;

  // Determine the name and emoji based on the phase value
  if (phase < 0.03 || phase > 0.97) return { phase, name: 'New Moon', emoji: '🌑' };
  if (phase < 0.22) return { phase, name: 'Waxing Crescent', emoji: '🌒' };
  if (phase < 0.28) return { phase, name: 'First Quarter', emoji: '🌓' };
  if (phase < 0.47) return { phase, name: 'Waxing Gibbous', emoji: '🌔' };
  if (phase < 0.53) return { phase, name: 'Full Moon', emoji: '🌕' };
  if (phase < 0.72) return { phase, name: 'Waning Gibbous', emoji: '🌖' };
  if (phase < 0.78) return { phase, name: 'Third Quarter', emoji: '🌗' };
  return { phase, name: 'Waning Crescent', emoji: '🌘' };
};

interface MoonPhaseCardProps {
  date: string;
}

const MoonPhaseCard: React.FC<MoonPhaseCardProps> = ({ date }) => {
  // Use noon UTC to avoid timezone-related calculation shifts
  const currentDate = new Date(date + 'T12:00:00Z');
  const { name, emoji } = getMoonPhase(currentDate);

  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex flex-col items-start gap-2 transition-all duration-300 ease-in-out hover:bg-white/20 hover:scale-105 cursor-pointer shadow-lg">
      <div className="flex items-center gap-2 text-gray-300">
        <span className="text-xl" aria-hidden="true">{emoji}</span>
        <span className="text-sm font-medium">Moon Phase</span>
      </div>
      <p className="text-2xl font-bold text-white">{name}</p>
    </div>
  );
};

export default MoonPhaseCard;
