type Props = {
  name: string;
  className?: string;
  filled?: boolean;
  style?: React.CSSProperties;
  ariaHidden?: boolean;
};

export function Icon({ name, className = "", filled, style, ariaHidden = true }: Props) {
  return (
    <span
      aria-hidden={ariaHidden}
      className={`material-symbols-outlined${filled ? " filled" : ""} ${className}`}
      style={style}
    >
      {name}
    </span>
  );
}
