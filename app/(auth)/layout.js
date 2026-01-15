const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen pt-20 pb-10 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
