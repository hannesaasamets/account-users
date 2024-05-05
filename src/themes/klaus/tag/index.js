export default {
  root: ({ props }) => ({
    class: [
      // Font
      'text-sm font-medium whitespace-nowrap',

      // Alignments
      'inline-flex items-center justify-center',

      // Spacing
      'px-[0.572rem] py-[0.2rem]',

      // Shape
      {
        'rounded-md': !props.rounded,
        'rounded-full': props.rounded,
      },

      // Colors
      {
        'bg-primary-500': props.severity == null || props.severity == 'primary',
        'bg-violet-100 text-violet-900': props.severity == 'success',
        'bg-sky-200 text-sky-900': props.severity == 'info',
        'bg-orange-100 text-amber-800': props.severity == 'warning',
        'bg-red-100 text-pink-800': props.severity == 'danger',
      },
    ],
  }),
  value: {
    class: 'leading-normal font-medium',
  },
  icon: {
    class: 'mr-1 text-sm',
  },
};
