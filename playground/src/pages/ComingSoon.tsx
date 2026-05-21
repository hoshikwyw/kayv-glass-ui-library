import { Link, useParams } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';

export default function ComingSoon() {
  const { slug } = useParams<{ slug: string }>();
  const name = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'This component';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20
        flex items-center justify-center">
        <Construction className="h-7 w-7 text-amber-400" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-100">{name}</h1>
        <p className="text-slate-500 mt-2 text-sm max-w-sm leading-relaxed">
          This component is still being built. Check back soon or contribute to the library.
        </p>
      </div>
      <Link
        to="/overview"
        className="flex items-center gap-2 text-sm text-indigo-400
          hover:text-indigo-300 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to overview
      </Link>
    </div>
  );
}
