export const transitionScreenVariants = (delay = 0) => {
  return {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        duration: 1,
        delay,
      },
    },
  };
};
