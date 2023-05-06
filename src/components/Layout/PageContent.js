const PageContent = ({ classes, children }) => {
  const containerClasses = classes
    ? `container mx-auto ${classes}`
    : "container mx-auto my-8";

  return (
    <div className={containerClasses}>
      <div className="relative overflow-visible">{children}</div>
    </div>
  );
};

export default PageContent;
