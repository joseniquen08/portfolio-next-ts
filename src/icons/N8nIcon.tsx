const N8nIcon = ({ color, size, className }: { color?: string; size: number; className?: string }) => {
  return (
    <svg role="img" width={size} height={size} fill={color} className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>n8n</title>
      <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-2.222c-5.397 0-9.778-4.381-9.778-9.778S6.603 2.222 12 2.222s9.778 4.381 9.778 9.778-4.381 9.778-9.778 9.778zm-4.444-6.667a2.222 2.222 0 1 1 0-4.444 2.222 2.222 0 0 1 0 4.444zm8.888-4.444a2.222 2.222 0 1 1 0 4.444 2.222 2.222 0 0 1 0-4.444zm-4.444 4.444a2.222 2.222 0 1 1 0-4.444 2.222 2.222 0 0 1 0 4.444z"/>
    </svg>
  );
};
export default N8nIcon;