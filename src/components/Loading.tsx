import styles from "./Loading.module.css";
import LoadingIcon from "../images/loading_dark.svg";

const Loading = ({ label, className }: { label?: string, className?: string }) => {

  const fallbackStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    textAlign: 'center' as const,
    width: '10rem',
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontStyle: 'italic',
    gap: '0.5rem',
    minHeight: '60px'
  };

  return (
    <div className={`${styles.loading} ${className ?? ''}`} style={fallbackStyle}>
      <LoadingIcon />
      <span>{label ? label : "Carregando..."}</span>
    </div>
  );
}

export default Loading;