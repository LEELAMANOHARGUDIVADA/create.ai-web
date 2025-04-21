interface Template {
  image: string,
  title: string
}

export default function TemplateCard({ template }:{ template: Template }) {
  return (
    <div className="w-full h-52 bg-white shadow-xs rounded-lg cursor-pointer p-2">
      <img
        src={template.image}
        alt=""
        className="w-full h-40 object-cover object-center rounded-md border"
      />
      <h4 className="text-sm font-semibold mt-1.5 ml-2">{template.title}</h4>
      
    </div>
  );
}
