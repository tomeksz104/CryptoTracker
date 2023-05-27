const PageContent = ({ classes, children }) => {
  const containerClasses = classes
    ? `container mx-auto px-3 ${classes}`
    : "container mx-auto my-8 px-3";

  return (
    <div className={containerClasses}>
      <div className="relative overflow-visible">{children}</div>
    </div>
  );
};

export default PageContent;
