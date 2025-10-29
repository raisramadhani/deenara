const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center animate-fade-in">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/30"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-primary"></div>
        </div>
        <p className="mt-6 text-charcoal-light font-medium animate-pulse">Memuat data...</p>
      </div>
    </div>
  );
};

export default Loading;
