const SectionHeading = ({ badge, title, subtitle }) => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      {badge && (
        <span className="inline-block rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
          {badge}
        </span>
      )}

      <h2 className="display-font text-5xl leading-tight">
        {title}
      </h2>

      <p className="mt-6 text-gray-600 text-lg leading-8">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeading;