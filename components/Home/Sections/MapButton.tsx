'use client';

interface MapButtonProps {
  address: string;
}

const MapButton = ({ address }: MapButtonProps) => {
  const handleMapClick = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/?q=${encodedAddress}`, '_blank');
  };

  return (
    <button
      onClick={handleMapClick}
      className="text-xs text-[var(--text-color2)] hover:text-white transition-colors duration-200 bg-[var(--text-color2)]/10 hover:bg-[var(--text-color2)]/20 px-2 py-1 rounded"
    >
      📍 Ver mapa
    </button>
  );
};

export default MapButton;
