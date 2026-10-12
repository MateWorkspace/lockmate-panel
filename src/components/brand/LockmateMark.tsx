interface LockmateMarkProps {
  className?: string;
  title?: string;
}

/**
 * The Lockmate lock mark, inlined so its fills follow the brand tokens
 * (accent body, primary outline, ink detail) and flip correctly in dark mode.
 */
export default function LockmateMark({
  className,
  title = "Lockmate",
}: LockmateMarkProps) {
  return (
    <svg
      viewBox="0 0 75.52 114.53"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-accent stroke-primary"
        strokeWidth={5}
        strokeMiterlimit={10}
        d="M54.61,70.85l17.16,41.18H15.99l17.16-41.18c-10.08-4.2-17.16-14.15-17.16-25.75,0-15.4,12.49-27.89,27.89-27.89s27.89,12.49,27.89,27.89c0,11.6-7.08,21.55-17.16,25.75Z"
      />
      <ellipse
        className="fill-primary stroke-foreground"
        cx="33.13"
        cy="26.52"
        rx="34.7"
        ry="11.79"
        transform="translate(-8.82 20.12) rotate(-30)"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
      <path
        className="fill-primary stroke-foreground"
        d="M50.17,8.19c.75,5.43-5.93,13.73-16.26,19.69-10.33,5.96-20.85,7.59-25.18,4.23-.71-3.76-.45-7.64.68-11.31,1.83-5.92,5.94-11.3,11.9-14.74s12.68-4.31,18.72-2.94c3.74.86,7.23,2.56,10.13,5.06Z"
        strokeWidth={5}
        strokeMiterlimit={10}
      />
    </svg>
  );
}
