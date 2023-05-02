const PageContent = ({ children }) => {
  return (
    <div className="container mx-auto my-8">
      <div className="relative overflow-visible">{children}</div>
    </div>
  );
};

export default PageContent;
