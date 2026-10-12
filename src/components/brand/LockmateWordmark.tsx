interface LockmateWordmarkProps {
  className?: string;
  title?: string;
}

/**
 * The Lockmate wordmark (mark + Coolvetica-outlined letterforms), inlined so
 * the letter fills follow the brand tokens and flip in dark mode. Because the
 * letterforms are pre-outlined paths, the wordmark renders correctly even
 * without the Coolvetica webfont.
 */
export default function LockmateWordmark({
  className,
  title = "Lockmate",
}: LockmateWordmarkProps) {
  return (
    <svg
      viewBox="0 0 438.01 114.53"
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
      <g className="fill-primary">
        <path d="M94.47,93v-54.25h11.36v44.36h26.88v9.88h-38.23Z" />
        <path d="M132.63,72.9c0-12.75,7.92-21.16,20.67-21.16s20.42,8.33,20.42,21.16-7.92,21.16-20.42,21.16-20.67-8.66-20.67-21.16ZM163.02,72.9c0-8.17-3.27-12.17-9.72-12.17s-9.72,4-9.72,12.17,3.27,12.25,9.72,12.25,9.72-4.08,9.72-12.25Z" />
        <path d="M213.75,78.46c-1.14,9.31-8.74,15.6-18.46,15.6-10.95,0-18.46-7.27-18.46-21.65s7.52-20.67,18.79-20.67c10.46,0,17.56,5.96,18.22,15.44h-10.7c-.57-4.17-3.59-6.62-7.6-6.62-4.49,0-8.17,2.86-8.17,11.6s3.68,12.99,7.84,12.99,7.43-2.37,7.84-6.7h10.7Z" />
        <path d="M241.53,93l-8.82-18.05-5.15,5.31v12.74h-10.7v-54.9h10.7v29.98l13.23-15.28h12.99l-13.48,14.79,13.15,25.41h-11.93Z" />
        <path d="M298.06,93v-37.17l-10.13,37.17h-11.27l-10.05-37.01v37.01h-10.54v-54.25h16.67l9.8,39.79,9.8-39.79h16.34v54.25h-10.62Z" />
        <path d="M350.51,93l-3.43-11.19h-20.02l-3.84,11.19h-12.01l19.36-54.25h13.15l19.12,54.25h-12.34ZM337.03,50.93h-.08l-6.94,21.57h13.81l-6.78-21.57Z" />
        <path d="M366.36,93v-44.77h-16.34v-9.48h44.12v9.48h-16.42v44.77h-11.36Z" />
        <path d="M396.83,93v-54.25h39.87v9.48h-28.84v11.6h26.55v9.56h-26.55v13.97h30.15v9.64h-41.17Z" />
      </g>
    </svg>
  );
}
