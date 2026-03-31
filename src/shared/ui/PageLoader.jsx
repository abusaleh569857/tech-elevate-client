const PageLoader = () => {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Loading view
        </p>
      </div>
    </div>
  );
};

export default PageLoader;

