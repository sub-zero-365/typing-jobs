export const pageAnimationVariants = {
  initial: {
    //defines the initial animation
    opacity: 0.6,
    y: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};
export const pageAnimationVariantsTransiton = {
  type: "tween",
  ease: "linear",
  duration: 0.5,
};
export const animateHeadingVariants = {
  initial: {
    //defines the initial animation
    opacity: 0.5,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};
export const animateHeadingVariants2 = (number: number) => ({
  initial: {
    //defines the initial animation
    opacity: 0.3,
    x: number % 2 ? -1000 : 1000,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
});
