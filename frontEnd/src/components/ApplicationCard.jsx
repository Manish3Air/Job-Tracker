import { Pencil, Trash2 } from "lucide-react"; // icons for edit/delete (optional)

export default function ApplicationCard({ 
  company, 
  position, 
  status, 
  appliedDate,
  notes, 
  onEdit, 
  onDelete 
}) {
  // Choose badge color based on status

  
  const statusColor = {
    Applied: "badge-primary",
    Interview: "badge-info",
    Offer: "badge-success",
    Rejected: "badge-error",
  }[status] || "badge-ghost";

  
  

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-lg transition duration-300">
      <div className="card-body bg-base-100 space-y-4">

        {/* Top Section: Company + Position + Edit/Delete */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title">{company || "Unknown Company"}</h2>
            <p className="text-sm">{position || "No position"}</p>
          </div>

          {/* Edit/Delete Buttons */}
          <div className="flex space-x-2">
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={onEdit}
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={onDelete}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Middle Section: Notes (if any) */}
        {notes && (
          <div className="text-sm italic">
            {notes.length > 100 ? notes.substring(0, 100) + "..." : notes}
          </div>
        )}

        {/* Bottom Section: Status + Date */}
        <div className="flex justify-between items-center">
          <div className={`badge ${statusColor} text-xs capitalize`}>
            {status || "No Status"}
          </div>
          <div className="text-xs">{appliedDate ? new Date(appliedDate).toDateString() : "Unknown Date"}</div>
        </div>

      </div>
    </div>
  );
}
