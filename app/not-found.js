import Link from "next/link";

/**
 * Custom 404 Page for CarbonSense.
 * Renders a premium styled error page with navigation links.
 * 
 * @returns {JSX.Element}
 */
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="text-accent text-8xl font-heading font-black tracking-widest mb-4">
        404
      </div>
      <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-text mb-4">
        Page Not Found
      </h1>
      <p className="text-textMuted max-w-md mb-8 font-body">
        The path you are looking for has either been recycled or never existed. {"Let's"} guide you back to safety.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-accent text-background font-medium rounded-full shadow-lg hover:bg-accent/90 transition-colors duration-200"
      >
        Return Home
      </Link>
    </div>
  );
}
