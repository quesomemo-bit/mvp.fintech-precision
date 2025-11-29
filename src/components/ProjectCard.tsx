// components/ProjectCard.tsx
export default function ProjectCard({ project }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{project.location} • {project.crop}</p>
      <div className="text-sm mb-3">{project.summary}</div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700">Ticket: €{project.ticketSize}</div>
        <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Ver</button>
      </div>
    </div>
  );
}
