// Editorial notes visible only in `npm run dev`; never rendered in the production build.
export default function Pending({ children }) {
  if (!import.meta.env.DEV) return null;
  return <span className="dev-pending">Pendência: {children}</span>;
}
