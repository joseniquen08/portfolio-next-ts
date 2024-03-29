export const ButtonLoading = () => {
  return (
    <button
      type="button"
      disabled
      className="flex items-center justify-center w-24 text-sm text-custom-light-text dark:text-custom-dark-text transition duration-150 ease-in-out shadow-lg cursor-not-allowed h-9 md:w-28 rounded-xl disabled:opacity-50 shadow-custom-light-secondary/50 dark:shadow-custom-dark-secondary/50 disabled:bg-custom-light-secondary dark:disabled:bg-custom-dark-secondary"
    >
      <svg
        className="w-5 h-5 text-custom-light-text dark:text-custom-dark-text animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </button>
  );
};
