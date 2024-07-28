function NotFound() {
  return (
    <div className="flex items-center h-screen bg-[#cc4e45] text-white">
      <div className="text-left p-8 rounded-lg relative">
        <h1 className="text-[20vmin] leading-none text-clip font-bold">ERROR: 404</h1>
        <p className="text-[7vmin] text-clip before:">Page not found</p>
      </div>
    </div>
  );
}

export default NotFound;
